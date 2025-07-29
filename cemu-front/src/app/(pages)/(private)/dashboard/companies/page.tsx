import React, { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AppLayout from '../../../../layouts/AppLayout';
import CompaniesView from '../../../../views/CompaniesView';
import type { CompaniesResponseDTO } from '../../../../models/companies.models';
import { Box, Typography } from '@mui/material';

async function fetchCompanies(): Promise<CompaniesResponseDTO[]> {
  const apiUrl = process.env.apiUrl || 'http://localhost:4000';
  const res = await fetch(`${apiUrl}/companies`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch companies');
  return res.json();
}

export default async function CompaniesPage() {
  let companiesList: CompaniesResponseDTO[] = [];
  try {
    companiesList = await fetchCompanies();
  } catch (error) {
    console.error('Error loading companies:', error);
  }

  return (
    <AppLayout topContent={undefined}>
      <Box sx={{ mt: 0, minHeight: '80vh' }}>
        <Typography
          sx={{
            mb: 2,
            fontFamily: 'Sans-serif',
            fontWeight: 600,
            fontSize: '22px',
          }}
        >
          Lista de Empresas
        </Typography>
        <Suspense fallback={<CircularProgress sx={{ m: 'auto', mt: 4 }} />}>
          <CompaniesView allCompanies={companiesList} />
        </Suspense>
      </Box>
    </AppLayout>
  );
}
