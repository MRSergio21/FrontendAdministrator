'use client';

import { useState, useTransition } from 'react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { Box, Chip, Skeleton, Stack, TableCell, TableRow } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

import { CustomSearchBar } from '@/app/components/TextField/CustomSearchBar';
import { DataTable } from '@/app/components/Table/DataTable';
import { SitesCreation } from '@/app/components/Buttons/SitesCreation';
import { CreationSite } from '@/app/components/Modal/CreationSite';
import type { SiteResponseDTO } from '@/app/models/site.models';
import type { Column, Action } from '@/app/utils/types.utils';
import { ClientButton } from '../components/Buttons/ClientButton';
import { Global } from '@emotion/react';
import GlobalModal from '../components/Modal/GlobalModal';

type Props = {
  data: {
    total: number;
    sites: SiteResponseDTO[];
  };
};

type CreationData = {
  name: string;
  domain: string;
  totalProfiles: number;
  organizationId: string;
};

export default function SitesView({ data }: Props) {
  const { sites, total } = data;
  const [isLoading, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useQueryState('search', {
    defaultValue: '',
    shallow: false,
    startTransition,
  });

  const [page, setPage] = useQueryState<number>(
    'page',
    parseAsInteger
      .withDefault(1)
      .withOptions({ shallow: false, startTransition }),
  );

  const [rowsPerPage, setRowsPerPage] = useQueryState<number>(
    'rows',
    parseAsInteger
      .withDefault(10)
      .withOptions({ shallow: false, startTransition }),
  );

  const [isSaving, setIsSaving] = useQueryState<boolean>('saving', {
    defaultValue: false,
    parse: r => r === 'true',
    serialize: v => String(v),
  });

  const [openCreation, setOpenCreation] = useQueryState<boolean>('create', {
    defaultValue: false,
    parse: r => r === 'true',
    serialize: v => String(v),
  });

  const [selectedSite, setSelectedSite] = useState<SiteResponseDTO | null>(
    null,
  );

  const tableData = sites.map(site => ({
    id: site.id,
    name: site.name,
    orgs: site.organizationIds?.map(orgId => (
      <Chip key={orgId} label={orgId} size='small' />
    )),
    totalProfiles: site.totalProfiles,
  }));

  const columns: Column[] = [
    { id: 'name', label: 'Nombre' },
    { id: 'orgs', label: 'Organización' },
    { id: 'totalProfiles', label: 'Perfiles' },
  ];

  const rowActions = (row: (typeof tableData)[0]): Action[] => [
    {
      id: 'view',
      name: 'Ver sitio',
      icon: <PermIdentityIcon />,
      onClick: () => {
        const siteInfo = sites.find(s => s.id === row.id);
        if (siteInfo) setSelectedSite(siteInfo);
      },
      outsideMenu: true,
    },
    {
      id: 'edit',
      name: 'Editar sitio',
      icon: <Edit />,
      onClick: () => console.log('Editar', row.id),
      outsideMenu: true,
    },
    {
      id: 'more',
      name: 'Más opciones',
      icon: <MoreVertIcon />,
      onClick: () => console.log('Más', row.id),
      outsideMenu: true,
    },
  ];

  const handleConfirm = async (data: CreationData) => {
    setIsSaving(true);
    try {
      await fetch('/api/sites/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          domain: data.domain,
          profile: data.totalProfiles,
          organizationIds: [data.organizationId],
        }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
      setOpenCreation(false);
    }
  };

  return (
    <>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        p={3}
        pb={1.25}
      >
        <CustomSearchBar value={searchQuery} onSearch={setSearchQuery} />
        <SitesCreation
          text='CREAR'
          onClick={() => setOpenCreation(true)}
          disabled={false}
          loading={isSaving}
          icon={<AddIcon />}
        />
      </Stack>

      <Box p={3}>
        <DataTable
          tableName='Sites'
          columns={columns}
          data={tableData}
          totalCount={total}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          handleChangePage={(_, newPage) => setPage(newPage)}
          handleChangeRowsPerPage={e => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(1);
          }}
          isLoading={isLoading}
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
          actions={rowActions}
          height='60vh'
        />
      </Box>

      {/* Modal de creación */}
      <CreationSite
        open={openCreation}
        onClose={() => setOpenCreation(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
