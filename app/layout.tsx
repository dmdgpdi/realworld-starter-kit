import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BootStrapProvider from '@/app/bootStrapProvider';
import { Header } from '@/widgets/header';
import { ToastContainer, toastContext } from '@/entities/toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Conduit',
  description: 'Conduit is a social blogging site (i.e. a Medium.com clone).',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <BootStrapProvider>
          <toastContext.ToastStoreProvider>
            <Header />
            {children}
            <ToastContainer />
          </toastContext.ToastStoreProvider>
        </BootStrapProvider>
      </body>
    </html>
  );
}

//
