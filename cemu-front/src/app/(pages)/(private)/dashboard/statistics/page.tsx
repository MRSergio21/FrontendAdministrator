import React, { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AppLayout from '../../../../layouts/AppLayout';
import { Box, Typography } from '@mui/material';
import StatisticsView from '../../../../components/Charts/StatisticsView';
import type { RequestResponseDTO } from '../../../../models/request.model';

async function fetchRequests(): Promise<RequestResponseDTO[]> {
  const apiUrl = process.env.apiUrl || 'http://localhost:4000';
  const res = await fetch(`${apiUrl}/requests`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch requests');
  return res.json();
}

async function fetchInternships(): Promise<any[]> {
  const apiUrl = process.env.apiUrl || 'http://localhost:4000';
  const res = await fetch(`${apiUrl}/internships`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch internships');
  return res.json();
}

export default async function StatisticsPage() {
  let requestsList: RequestResponseDTO[] = [];
  let internshipsList: any[] = [];
  try {
    requestsList = await fetchRequests();
    internshipsList = await fetchInternships();
  } catch (error) {
    console.error('Error loading statistics:', error);
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
          Estadísticas de Solicitudes y Prácticas
        </Typography>
        <Suspense fallback={<CircularProgress sx={{ m: 'auto', mt: 4 }} />}>
          <StatisticsView requests={requestsList} internships={internshipsList} />
        </Suspense>
      </Box>
    </AppLayout>
  );
}
