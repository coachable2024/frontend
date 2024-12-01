'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingState, Coach } from '@/types/onboardingType';
import WelcomeStep from './WelcomeStep';
import CoachSelectionStep from './CoachSelectionStep';
import { useRouter } from 'next/navigation';

const Onboarding: React.FC = () => {
  const router = useRouter();
  const [onboardingState, setOnboardingState] = useState<OnboardingState>({
    currentStep: 1,
    selectedCoach: null,
  });

  const nextStep = () => {
    if (onboardingState.currentStep === 2 && onboardingState.selectedCoach) {
      // Save selected coach and completion status
      localStorage.setItem('selectedCoach', JSON.stringify(onboardingState.selectedCoach));
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

  const handleCoachSelect = (coach: Coach) => {
    setOnboardingState((prev) => ({
      ...prev,
      selectedCoach: coach,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AnimatePresence mode="wait">
        {onboardingState.currentStep === 1 && (
          <WelcomeStep onNext={nextStep} />
        )}
        {onboardingState.currentStep === 2 && (
          <CoachSelectionStep
            onNext={nextStep}
            onBack={previousStep}
            onSelect={handleCoachSelect}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding; 