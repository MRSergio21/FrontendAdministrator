import { CircularProgress, Typography } from '@mui/material';
import { Suspense } from 'react';
import SitesView from '@/app/views/SitesView';
import { loadSearchParams } from '../../../../searchParams';
import type { SearchParams } from 'nuqs/server';
import AppLayout from '../../../../layouts/AppLayout';
import { getAllDegrees } from '../../../../api/degrees/getAll';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function SitesPage({ searchParams }: PageProps) {
  const { page, rows, searchQuery } = await loadSearchParams(searchParams);

  const sites = await getAllDegrees(
    page,
    rows,
    searchQuery ?? undefined,
  );
  const total = sites.length;

  return (
    <AppLayout
      topContent={
        <Typography
          sx={{ mb: 2, fontWeight: 600, fontSize: '22px', color: '#424242' }}
        >
          Sitios
        </Typography>
      }
    >
      <Suspense fallback={<CircularProgress sx={{ m: 'auto', mt: 4 }} />}>
        <SitesView data={{ total, sites }} />
      </Suspense>
    </AppLayout>
  );
}
