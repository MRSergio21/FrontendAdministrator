import GlobalModal from '../../components/Modal/GlobalModal';
import ReactQueryProvider from '../../providers/ReactQueryProvider';
import { UserProvider } from '../../providers/UserProvider';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '../../actions/auth/verifyToken';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) redirect('/login');

  const user = await verifyToken(token);
  if (!user) redirect('/login');

  return (
    <ReactQueryProvider>
      <UserProvider user={user}>
        {children}
        <GlobalModal />
      </UserProvider>
    </ReactQueryProvider>
  );
}
