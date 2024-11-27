'use client';
import Goals from '@/components/features/goals/GoalCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { GoalCategory, GoalStatus } from '@/types/goalsType';

export default function GoalsPage() {
  const exampleGoal = {
    id: '1',
    title: 'Example Goal',
    motivation: 'To improve skills',
    status: 'in-progress' as GoalStatus, 
    category: 'Personal Development' as GoalCategory, // Added category
    targetDate: new Date('2023-12-31'), // Added targetDate
    createdAt: new Date(), // Added createdAt
    updatedAt: new Date(), // Added updatedAt
    reward: 'A new book', // Added reward
  };

  return (
    <>
      <PageHeader title="Goals" />
      <Goals goal={exampleGoal} />
    </>
  );
}