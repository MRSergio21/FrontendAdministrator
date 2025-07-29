import { CircularProgress, Typography } from '@mui/material';
import DegreesView from '../../../../views/DegreesView';
import { Suspense } from 'react';
import { loadSearchParams } from '@/app/searchParams';
import { SearchParams } from 'nuqs';
import { cookies } from 'next/headers';
import { getAllDegrees } from '../../../../actions/api/degrees/getAll';
import AppLayout from '@/app/layouts/AppLayout';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function DegreesPage({ searchParams }: PageProps) {
  const { page, rows, searchQuery } = await loadSearchParams(searchParams);

  const cookieStore = await cookies();
  const jwtToken = cookieStore.get('auth-token')?.value;
  if (!jwtToken) {
    throw new Error('Unauthorized: auth-token cookie is missing');
  }

  const degrees = await getAllDegrees(
    page,
    rows,
    searchQuery ?? undefined
  );

  return (
    <AppLayout
      topContent={
        <Typography
          sx={{ mb: 2, fontWeight: 600, fontSize: '22px', color: '#424242' }}
        >
          Degrees
        </Typography>
      }
    >
      <Suspense fallback={<CircularProgress sx={{ m: 'auto', mt: 4 }} />}>
        <DegreesView data={{ degrees }} />
      </Suspense>
    </AppLayout>
  );
}
