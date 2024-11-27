'use client';
<<<<<<< HEAD
import Goals from '../../pages/Goals';
import { PageWrapper } from '@/components/layout/PageWrapper';
=======
import Goals from '@/components/features/goals/Goals';
>>>>>>> c743d4388327f7530b39bd74d4582a7326165df2
import { PageHeader } from '@/components/layout/PageHeader';

export default function GoalsPage() {
  return (
<<<<<<< HEAD
    <PageWrapper>
      <PageHeader title="Goals" />
      {<Goals />}
    </PageWrapper>
=======
    <>
      <PageHeader title="Goals" />
      <Goals />
    </>
>>>>>>> c743d4388327f7530b39bd74d4582a7326165df2
  );
}