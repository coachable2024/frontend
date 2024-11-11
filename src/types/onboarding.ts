export interface OnboardingState {
  currentStep: number;
  selectedGoalType: string | null;
  selectedCoach: Coach | null;
  initialGoal: {
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