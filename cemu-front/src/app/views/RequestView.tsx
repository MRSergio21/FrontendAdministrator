'use client';

import { useMemo, useState } from 'react';
import { useQueryState } from 'nuqs';
import {
  Box,
  Skeleton,
  Stack,
  TableCell,
  TableRow,
  IconButton,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DownloadIcon from '@mui/icons-material/Download';

import { CustomSearchBar } from '../components/TextField/CumstomSearchBar';
import { DataTable } from '../components/Table/DataTable';

import type { Column } from '@/app/utils/types.utils';
import { useRequestQueryList } from '@/app/hooks/useRequest';

export default function RequestView() {
  const { data: allRequests = [], isLoading } = useRequestQueryList();

  const [searchQuery, setSearchQuery] = useQueryState('search');
  const [page, setPage] = useQueryState('page', {
    defaultValue: 0,
    parse: Number,
    serialize: String,
  });
  const [rowsPerPage, setRowsPerPage] = useQueryState('limit', {
    parse: Number,
    serialize: String,
    defaultValue: 5,
  });

  const [sortBy, setSortBy] = useQueryState('sortBy', {
    defaultValue: 'name',
  });

  const [orderDir, setOrderDir] = useQueryState<'asc' | 'desc'>('orderDir', {
    defaultValue: 'asc',
    parse: v => (v === 'desc' ? 'desc' : 'asc'),
    serialize: String,
  });

  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  const toggleVisibility = (id: string) => {
    setVisibleIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDownload = (cvUrl: string) => {
    if (!cvUrl) return;
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'cv.pdf';
    link.target = '_blank';
    link.click();
  };

  const filtered = useMemo(() => {
    const q = searchQuery?.trim().toLowerCase() ?? '';
    if (!q) return allRequests;
    return allRequests.filter(request =>
      request.lastnameStudent.toLowerCase().includes(q),
    );
  }, [allRequests, searchQuery]);

  const sorted = useMemo(() => {
    if (!sortBy) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = (a as any)[sortBy];
      const bVal = (b as any)[sortBy];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return orderDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return orderDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filtered, sortBy, orderDir]);

  const paginated = useMemo(
    () => sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sorted, page, rowsPerPage],
  );

  const columns: Column[] = [
    { id: 'name', label: 'Nombres' },
    { id: 'lastname', label: 'Apellidos' },
    { id: 'email', label: 'Correo Institucional' },
    { id: 'internship', label: 'Práctica Asociada' },
    { id: 'actions', label: 'Acciones', align: 'right' },
  ];

  const tableData = paginated.map(request => ({
    id: request.id,
    name: request.nameStudent,
    lastname: request.lastnameStudent,
    email: request.email,
    cv: request.cv,
    internship: request.internship_id?.internshipTitle || 'N/A',
    actions: (
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        {/* Botón de visibilidad */}
        <IconButton onClick={() => toggleVisibility(request.id)}>
          {visibleIds.has(request.id) ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
        {/* Botón de descarga */}
        <IconButton onClick={() => handleDownload(request.cv)}>
          <DownloadIcon />
        </IconButton>
      </Stack>
    ),
  }));

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" p={3} pb={1}>
        <CustomSearchBar value={searchQuery ?? ''} onSearch={setSearchQuery} />
      </Stack>

      <Box p={3}>
        <DataTable
          tableName="Solicitudes de Prácticas Profesionales"
          columns={columns}
          data={tableData}
          totalCount={filtered.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          handleChangePage={(_, newPage) => setPage(newPage)}
          handleChangeRowsPerPage={e => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          sortBy={sortBy ?? undefined}
          orderDirection={orderDir}
          handleChangeSort={colId => {
            if (sortBy === colId) {
              setOrderDir(orderDir === 'asc' ? 'desc' : 'asc');
            } else {
              setSortBy(colId);
              setOrderDir('asc');
            }
            setPage(0);
          }}
          actions={() => []}
          isLoading={isLoading}
          height="60vh"
          collapsible={false}
          SkeletonRow={() => (
            <TableRow>
              {columns.map(col => (
                <TableCell key={col.id}>
                  <Skeleton />
                </TableCell>
              ))}
            </TableRow>
          )}
        />
      </Box>
    </>
  );
}
