'use client';
import React, { useState } from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { CustomSearchBar } from '../../../../components/TextField/CumstomSearchBar';
import SitesTable from '../../../../components/Table/SitesTable';
import { ClientButton } from '@/app/components/Buttons/ClientButton';
import projects from './projects';
import { useSearchParams } from 'next/navigation';
import Dialog from '@/app/components/Modal/GlobalModal';

import { Creation } from '@/app/components/Modal/Creation';

export default function SitesPage() {
  const searchParams = useSearchParams();
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const offset = parseInt(searchParams.get('offset') || '0', 10);
  const [query, setQuery] = useState(searchParams.get('busqueda') || '');

  const allSites = projects().sites;

  const filteredSites = allSites.filter(site =>
    site.name.toLowerCase().includes(query.toLowerCase()),
  );

  const paginatedSites = filteredSites.slice(offset, offset + limit);

  return (
    <Box sx={{ mt: 7, minHeight: '80vh' }}>
      <Typography
        sx={{
          mb: 2,
          fontFamily: 'Sans-serif',
          fontWeight: 600,
          fontSize: '22px',
        }}
      >
        Gologin
      </Typography>

      <Box sx={{ bgcolor: '#FFF', width: '100%', borderRadius: '4px' }}>
        <Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '24px',
              pb: '10px',
            }}
          >
            <CustomSearchBar
              query={query}
              setQuery={setQuery}
              label={'Buscar'}
            />
            <ClientButton
              label={'Crear'}
              variant={'text'}
              modal={
                <Dialog
                  open={false}
                  onClose={() => {}}
                  title={'Crear un sitio'}
                  content={<Creation />}
                  SecondTitle='Roles'
                  SecondaryContent={
                    <Box sx={{ padding: '16px 0' }}>
                      <Stack
                        sx={{
                          width: '100%',
                          gap: '0.875rem',
                          flexDirection: 'row',
                        }}
                      >
                        <Chip label='UNEAT' />
                        <Chip label='FUNIBER' />
                      </Stack>
                    </Box>
                  }
                  DialogConfirmation={'Confirmar'}
                  DialogCancel={'Cancelar'}
                />
              }
            />
          </Stack>
          <Box sx={{ p: '24px' }}>
            <SitesTable
              projects={paginatedSites}
              total={filteredSites.length}
              limit={limit}
              currentOffset={offset}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
