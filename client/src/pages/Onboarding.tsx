import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingState, Coach } from '../types/onboardingType';
import WelcomeStep from '../components/onboarding/WelcomeStep';
import CoachSelectionStep from '../components/onboarding/CoachSelectionStep';
import GoalDetailsStep from '../components/onboarding/GoalDetailsStep';
import SuccessStep from '../components/onboarding/SuccessStep';
import ProgressBar from '../components/common/ProgressBar';
import CoachChatStep from '../components/onboarding/CoachChatStep';


const Onboarding: React.FC = () => {
  console.log('Rendering Onboarding component');
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    currentStep: 1,
    selectedGoalType: null,
    selectedCoach: null,
    initialGoal: {
      title: '',
      description: '',
      targetDate: null,
    },
  });

  const nextStep = () => {
    setOnboardingState((prev: OnboardingState) => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  const previousStep = () => {
    setOnboardingState((prev: OnboardingState) => ({
      ...prev,
      currentStep: prev.currentStep - 1,
    }));
  };

  const renderStep = () => {
    console.log('Current step:', onboardingState.currentStep);
    console.log('Selected coach:', onboardingState.selectedCoach);
    
    switch (onboardingState.currentStep) {
      case 1:
        return <WelcomeStep onNext={nextStep} />;
      case 2:
        return (
          <CoachSelectionStep
            onNext={nextStep}
            onBack={previousStep}
            onSelect={(coach: Coach) => setOnboardingState((prev: OnboardingState) => ({
              ...prev,
              selectedCoach: coach,
            }))}
          />
        );
      case 3:
        if (!onboardingState.selectedCoach) {
          console.error('No coach selected');
          return null;
        }
        return (
          <CoachChatStep
            coach={onboardingState.selectedCoach}
            onNext={nextStep}
            onBack={previousStep}
            onGoalSet={(goal: string) => setOnboardingState((prev: OnboardingState) => ({
              ...prev,
              initialGoal: {
                ...prev.initialGoal,
                description: goal,
              },
            }))}
          />
        );
      case 4:
        return (
          <GoalDetailsStep
            onNext={nextStep}
            onBack={previousStep}
            onSubmit={(goalDetails) => 
              setOnboardingState((prev: OnboardingState) => ({
                ...prev,
                initialGoal: goalDetails,
              }))}
          />
        );
      case 5:
        return <SuccessStep />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProgressBar currentStep={onboardingState.currentStep} totalSteps={5} />
        <AnimatePresence mode="wait">
          <motion.div
            key={onboardingState.currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding; 