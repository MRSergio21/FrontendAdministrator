import React, { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AppLayout from '../../../../layouts/AppLayout';
import InternshipsView from '../../../../views/InternshipsView';
import type { InternshipResponseDTO } from '../../../../models/interneships.model';
import { Box, Typography } from '@mui/material';

async function fetchInternships(): Promise<InternshipResponseDTO[]> {
  const apiUrl = process.env.apiUrl || 'http://localhost:4000';
  const res = await fetch(`${apiUrl}/internships`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch internships');

  const data = await res.json();

  return data.map((intern: any) => ({
    ...intern,
    startDate: intern.startDate ? new Date(intern.startDate) : null,
  }));
}

export default async function InternshipsPage() {
  let internshipsList: InternshipResponseDTO[] = [];
  try {
    internshipsList = await fetchInternships();
  } catch (error) {
    console.error('Error loading internships:', error);
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
          Lista de Prácticas Profesionales
        </Typography>
        <Suspense fallback={<CircularProgress sx={{ m: 'auto', mt: 4 }} />}>
          <InternshipsView allInternships={internshipsList} />
        </Suspense>
      </Box>
    </AppLayout>
  );
}
