import React, { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AppLayout from '../../../../layouts/AppLayout'; // Ajusta import según tu estructura
import DegreesView from '../../../../views/DegreesView';
import type { DegreesResponseDTO } from '../../../../models/degrees.model';
import { Box, Typography } from '@mui/material';

async function fetchDegrees(): Promise<DegreesResponseDTO[]> {
  const apiUrl = process.env.apiUrl || 'http://localhost:4000';
  const res = await fetch(`${apiUrl}/degrees`, { cache: 'no-store' }); // evitar cache en dev
  if (!res.ok) throw new Error('Failed to fetch degrees');
  return res.json();
}

export default async function DegreesPage() {
  let degreesList: DegreesResponseDTO[] = [];
  try {
    degreesList = await fetchDegrees();
  } catch (error) {
    console.error('Error loading degrees:', error);
  }

  return (
    <AppLayout topContent={undefined}>
      <Box sx={{ mt: 0, minHeight: "80vh" }}>
        <Typography
          sx={{
            mb: 2,
            fontFamily: "Sans-serif",
            fontWeight: 600,
            fontSize: "22px",
          }}
        >
          Lista de Grados
        </Typography>
        <Suspense fallback={<CircularProgress sx={{ m: 'auto', mt: 4 }} />}>
          <DegreesView allDegrees={degreesList} />
        </Suspense>
      </Box>
    </AppLayout>
  );
}
