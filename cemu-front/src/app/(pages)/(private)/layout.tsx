'use client';
import DashboardLayout from '@/app/components/Dashboard/Dashboard';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </AppRouterCacheProvider>
  );
}
