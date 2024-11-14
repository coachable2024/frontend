'use client';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { Sidebar } from '../components/layout/Sidebar';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const isHomePage = pathname === '/';
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        {/* <Sidebar />
        {children} */}

{isHomePage ? (
          <main>{children}</main>
        ) : (
          <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-8 mx-auto max-w-7xl">
              <div className="container mx-auto">
                {children}
              </div>
            </main>
          </div>
        )}
      </body>
    </html>
  );
}