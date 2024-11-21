export interface Goal {
  title: string;
  why: string;
  actions: {
    name: string;
    time: {
      hours: number;
      minutes: number;
    };
    completed: boolean;
  }[];
  reward: string;
} 