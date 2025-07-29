import React, { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AppLayout from '../../../../layouts/AppLayout'; // Ajusta import según tu estructura
import DegreesView from '../../../../views/DegreesView';
import type { DegreesResponseDTO } from '../../../../models/degrees.model';

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
    <AppLayout title="Grados Académicos">
      <Suspense fallback={<CircularProgress sx={{ m: 'auto', mt: 4 }} />}>
        <DegreesView allDegrees={degreesList} />
      </Suspense>
    </AppLayout>
  );
}
