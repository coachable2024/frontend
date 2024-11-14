'use client';

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="flex flex-col p-1 sm:ml-64"> 
      <main className="mt-2">{children}</main>
    </div>
  );
}