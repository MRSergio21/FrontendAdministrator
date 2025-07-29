import GlobalModal from '@/app/components/Modal/GlobalModal';
import ReactQueryProvider from '@/app/providers/ReactQueryProvider';
import { UserProvider } from '@/app/providers/UserProvider';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { getUserFromToken } from '@/app/api/auth/getUserFromToken';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Eliminamos la verificación de token y usuario

  return (
    <ReactQueryProvider>
      <UserProvider user={null}>
        {children}
        <GlobalModal open={false} onClose={function (): void {
          throw new Error('Function not implemented.');
        }} title={''} content={''} DialogConfirmation={''} DialogCancel={''} />
      </UserProvider>
    </ReactQueryProvider>
  );
}
