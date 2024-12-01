export interface OnboardingState {
  currentStep: number;
  selectedCoach: Coach | null;
  selectedGoalType?: string;
  initialGoal?: {
    title: string;
    description: string;
    targetDate: Date | null;
  };
}

export interface Coach {
  id: string;
  name: string;
  personality: string;
  specialties: string[];
  avatarUrl: string;
  profileImage: string;
  description: string;
} 