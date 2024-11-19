export interface SmartGoal {
  id: string;
  statement: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timeBound: string;
  tasks: {
    id: string;
    description: string;
    completed: boolean;
  }[];
  status: 'draft' | 'confirmed';
} 