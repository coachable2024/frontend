'use client';
<<<<<<< HEAD
import Dashboard from '../../pages/Dashboard';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageHeader } from '@/components/layout/PageHeader';

export default function DashboardPage() {
  return (
    <PageWrapper>
      <PageHeader title="Dashboard" />
      {<Dashboard />}
    </PageWrapper>
  );
=======
import Dashboard from '@/components/features/dashboard/Dashboard';

export default function DashboardPage() {
  return <Dashboard />;
>>>>>>> c743d4388327f7530b39bd74d4582a7326165df2
}