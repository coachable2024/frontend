'use client';
import Goals from '../../pages/Goals';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageHeader } from '@/components/layout/PageHeader';

export default function GoalsPage() {
  return (
    <PageWrapper>
      <PageHeader title="Goals" />
      {<Goals />}
    </PageWrapper>
  );
}