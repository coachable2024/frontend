import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import WelcomeStep from './WelcomeStep';
import CoachSelectionStep from './CoachSelectionStep';
import GoalSettingStep from './GoalSettingStep';
import HabitsCollectionStep from './HabitsCollectionStep';
import SchedulePreviewStep from './SchedulePreviewStep';
import SuccessStep from './SuccessStep';
import { OnboardingState } from '@/types/onboardingTypes';

const Onboarding: React.FC = () => {
  const router = useRouter();
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    currentStep: 1,
    selectedCoach: null,
    goalData: null,
    habitsData: null,
    scheduleData: null
  });

  const nextStep = () => {
    if (onboardingState.currentStep === 6) {
      // Save all data and complete onboarding
      localStorage.setItem('selectedCoach', JSON.stringify(onboardingState.selectedCoach));
      localStorage.setItem('goalData', JSON.stringify(onboardingState.goalData));
      localStorage.setItem('habitsData', JSON.stringify(onboardingState.habitsData));
      localStorage.setItem('scheduleData', JSON.stringify(onboardingState.scheduleData));
      localStorage.setItem('onboardingComplete', 'true');
      router.push('/dashboard');
    } else {
      setOnboardingState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    }
  };

  const previousStep = () => {
    setOnboardingState((prev) => ({
      ...prev,
      currentStep: prev.currentStep - 1,
    }));
  };

  const handleCoachSelect = (coach: any) => {
    setOnboardingState((prev) => ({
      ...prev,
      selectedCoach: coach,
    }));
  };

  const handleGoalSave = (goalData: any) => {
    setOnboardingState((prev) => ({
      ...prev,
      goalData: goalData,
    }));
  };

  const handleHabitsSave = (habitsData: any) => {
    setOnboardingState((prev) => ({
      ...prev,
      habitsData: habitsData,
    }));
  };

  const handleScheduleSave = (scheduleData: any) => {
    setOnboardingState((prev) => ({
      ...prev,
      scheduleData: scheduleData,
    }));
  };

  const renderStep = () => {
    switch (onboardingState.currentStep) {
      case 1:
        return <WelcomeStep onNext={nextStep} />;
      
      case 2:
        return (
          <CoachSelectionStep
            onNext={nextStep}
            onBack={previousStep}
            onSelect={handleCoachSelect}
          />
        );
      
      // case 3:
      //   return (
      //     <GoalSettingStep
      //       onNext={nextStep}
      //       onBack={previousStep}
      //       selectedCoach={onboardingState.selectedCoach}
      //       onGoalSave={handleGoalSave}
      //     />
      //   );
      
      // case 4:
      //   return (
      //     <HabitsCollectionStep
      //       onNext={nextStep}
      //       onBack={previousStep}
      //       selectedCoach={onboardingState.selectedCoach}
      //       onHabitsSave={handleHabitsSave}
      //     />
      //   );
      
      // case 5:
      //   return (
      //     <SchedulePreviewStep
      //       onNext={nextStep}
      //       onBack={previousStep}
      //       selectedCoach={onboardingState.selectedCoach}
      //       onScheduleSave={handleScheduleSave}
      //     />
      //   );
      
      case 3:
        return <SuccessStep />;
      
      default:
        return null;
    }
  };

  // Progress indicator calculation
  const totalSteps = 6;
  const progress = (onboardingState.currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Progress bar */}
      <div className="w-full h-1 bg-gray-200">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;