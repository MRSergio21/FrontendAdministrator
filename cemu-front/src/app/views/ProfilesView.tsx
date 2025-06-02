'use client';

import { useMemo } from 'react';
import { useQueryState } from 'nuqs';
import {
  Box,
  Chip,
  Skeleton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { CustomSearchBar } from '../components/TextField/CumstomSearchBar';
import { DataTable } from '../components/Table/DataTable';
import TableInTable from '@/app/components/Table/TableInTable';

import type { Column, Action } from '@/app/utils/types.utils';
import type { ProfileResponseDTO } from '../models/profile.models';

type Props = {
  allProfiles: ProfileResponseDTO[];
};

export default function ProfilesView({ allProfiles }: Props) {
  // — URL‐synced state via nuqs —
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
    defaultValue: 'siteCount',
  });

  const [orderDir, setOrderDir] = useQueryState<'asc' | 'desc'>('orderDir', {
    defaultValue: 'asc',
    parse: v => (v === 'desc' ? 'desc' : 'asc'),
    serialize: String,
  });

  // — 1) Filter —
  const filtered = useMemo(() => {
    const q = searchQuery?.trim().toLowerCase() ?? '';
    if (!q) return allProfiles;
    return allProfiles.filter(p => p.profilename.toLowerCase().includes(q));
  }, [allProfiles, searchQuery]);

  // — 2) Sort —
  const sorted = useMemo(() => {
    if (!sortBy) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = (a as any)[sortBy];
      const bVal = (b as any)[sortBy];

      // numbers
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return orderDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      // strings
      return orderDir === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [filtered, sortBy, orderDir]);

  // — 3) Paginate —
  const paginated = useMemo(
    () => sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sorted, page, rowsPerPage],
  );

  // — 4) Build DataTable rows —
  const tableData = paginated.map(profile => ({
    id: profile.id,
    name: profile.profilename,
    emails: profile.emails.map(e => (
      <Chip key={e.id} label={e.email} size='small' />
    )),
    siteCount: profile.emails.reduce((acc, e) => acc + e.roles.length, 0),
    status: <Chip label='Active' size='small' color='success' />,
  }));

  const columns: Column[] = [
    { id: 'name', label: 'Profile' },
    { id: 'emails', label: 'Emails' },
    { id: 'siteCount', label: 'Sites', align: 'center', sortable: true },
    { id: 'status', label: 'Status', align: 'center' },
  ];

  const rowActions = (row: (typeof tableData)[0]): Action[] => [
    {
      id: 'view',
      name: 'View',
      icon: <PermIdentityIcon />,
      onClick: () => console.log('Viewing', row.name),
      outsideMenu: false,
    },
    {
      id: 'more',
      name: 'More',
      icon: <MoreVertIcon />,
      onClick: () => console.log('More for', row.name),
      outsideMenu: false,
    },
  ];

  return (
    <>
      {/* Search bar */}
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        p={3}
        pb={1}
      >
        <CustomSearchBar value={searchQuery ?? ''} onSearch={setSearchQuery} />
      </Stack>

      <Box p={3}>
        <DataTable
          tableName='Profiles'
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
          height='60vh'
          collapsible
          renderRowDetail={row => (
            <Box>
              <Typography variant='subtitle2'>Complete Emails:</Typography>
              {row.emails.map((_, i) => (
                <TableInTable key={i} />
              ))}
            </Box>
          )}
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
