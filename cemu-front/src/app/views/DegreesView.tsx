'use client';

import { useMemo } from 'react';
import { useQueryState } from 'nuqs';
import {
  Box,
  Skeleton,
  Stack,
  TableCell,
  TableRow,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { CustomSearchBar } from '../components/TextField/CumstomSearchBar';
import { DataTable } from '../components/Table/DataTable';

import type { Column, Action } from '@/app/utils/types.utils';
import type { DegreesResponseDTO } from '../models/degrees.model';

type Props = {
  allDegrees: DegreesResponseDTO[];
};

export default function DegreesView({ allDegrees }: Props) {
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

  const filtered = useMemo(() => {
    const q = searchQuery?.trim().toLowerCase() ?? '';
    if (!q) return allDegrees;
    return allDegrees.filter(degree =>
      degree.name.toLowerCase().includes(q),
    );
  }, [allDegrees, searchQuery]);

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

  const tableData = paginated.map(degree => ({
    id: degree.id,
    name: degree.name,
    degreeCount: degree.degreesIds?.length ?? 0,
  }));

  const columns: Column[] = [
    { id: 'name', label: 'Nombre del Grado' },
    {
      id: 'degreeCount',
      label: 'Titulaciones relacionadas',
      align: 'center',
      sortable: true,
    },
  ];

  const rowActions = (row: (typeof tableData)[0]): Action[] => [
    {
      id: 'view',
      name: 'Ver',
      icon: <SchoolIcon />,
      onClick: () => console.log('Ver grado:', row.name),
      outsideMenu: false,
    },
    {
      id: 'more',
      name: 'Más',
      icon: <MoreVertIcon />,
      onClick: () => console.log('Más sobre:', row.name),
      outsideMenu: false,
    },
  ];

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" p={3} pb={1}>
        <CustomSearchBar value={searchQuery ?? ''} onSearch={setSearchQuery} />
      </Stack>

      <Box p={3}>
        <DataTable
          tableName="Grados Académicos"
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
          actions={rowActions}
          isLoading={false}
          height="60vh"
          collapsible={false}
          SkeletonRow={() => (
            <TableRow>
              {columns.map(col => (
                <TableCell key={col.id}>
                  <Skeleton />
                </TableCell>
              ))}
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          )}
        />
      </Box>
    </>
  );
}
