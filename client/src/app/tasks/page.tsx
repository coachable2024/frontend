'use client';
import Tasks from '../../pages/Task';

// export default function TasksPage() {
//   return <Tasks/>;
// }


import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageHeader } from '@/components/layout/PageHeader';

export default function TasksPage() {
  return (
    <PageWrapper>
      <PageHeader title="Tasks" />
      {<Tasks />}
    </PageWrapper>
  );
}