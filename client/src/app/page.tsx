'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Onboarding from '@/components/features/onboarding/Onboarding';

export default function OnboardingPage() {
  // const router = useRouter();

  // useEffect(() => {
  //   const onboardingComplete = localStorage.getItem('onboardingComplete');
  //   const selectedCoach = localStorage.getItem('selectedCoach');
  //   if (onboardingComplete && selectedCoach) {
  //     router.push('/dashboard');
  //   }
  // }, [router]);

  return <Onboarding />;
} 