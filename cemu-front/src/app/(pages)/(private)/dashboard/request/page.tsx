import React, { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AppLayout from '../../../../layouts/AppLayout';
import RequestView from '../../../../views/RequestView';
import type { RequestResponseDTO } from '../../../../models/request.model';
import { Box, Typography } from '@mui/material';

async function fetchRequest(): Promise<RequestResponseDTO[]> {
  const apiUrl = process.env.apiUrl;
  const res = await fetch(`${apiUrl}/requests`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch requests');
  return res.json();
}

export default async function RequestPage() {
  let requestList: RequestResponseDTO[] = [];
  try {
    requestList = await fetchRequest();
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
          Lista de Solicitudes para las Prácticas Profesionales
        </Typography>
        <Suspense fallback={<CircularProgress sx={{ m: 'auto', mt: 4 }} />}>
          <RequestView allRequest={requestList} />
        </Suspense>
      </Box>
    </AppLayout>
  );
}
