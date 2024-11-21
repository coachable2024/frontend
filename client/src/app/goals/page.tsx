'use client';
import Goals from '@/components/features/goals/Goals';
import { PageHeader } from '@/components/layout/PageHeader';

export default function GoalsPage() {
  return (
    <>
      <PageHeader title="Goals" />
      <Goals />
    </>
  );
}