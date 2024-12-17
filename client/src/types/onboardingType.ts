export interface Coach {
  id: string;
  name: string;
  personality: string;
  specialties: string[];
  avatarUrl: string;
  profileImage: string;
  description: string;
}

export interface GoalData {
  main: string;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timebound: string;
  tasks?: {
    category: string;
    items: Array<{
      title: string;
      timeframe: string;
      start_date: string;
      end_date: string;
      status: string;
    }>;
  }[];
}

export interface HabitData {
  habits: Array<{
    activity: string;
    duration: string;
  }>;
  selfCare: Array<{
    name: string;
    frequency: string;
  }>;
}

export interface OnboardingState {
  currentStep: number;
  selectedCoach: Coach | null;
  goalData: GoalData | null;
  habitsData: HabitData | null;
}