'use client';
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
}