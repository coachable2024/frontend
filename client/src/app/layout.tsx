'use client';

import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import CoachChatStep from '@/components/features/onboarding/CoachChatStep';
import { useEffect, useState } from 'react';
import { Coach } from '@/types/onboardingType';
import { Goal } from '@/types/goalsType';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboardingPage = pathname === '/' || pathname === '/onboarding';
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  const handleGoalSet = (goal: Goal) => {
    const existingGoals = JSON.parse(localStorage.getItem('goals') || '[]');
    localStorage.setItem('goals', JSON.stringify([...existingGoals, goal]));
  };

  useEffect(() => {
    const savedCoach = localStorage.getItem('selectedCoach');
    if (savedCoach) {
      setSelectedCoach(JSON.parse(savedCoach));
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className={inter.className}>
        {isOnboardingPage ? (
          <main>{children}</main>
        ) : (
          <div className="flex h-screen bg-gray-50">
            <div className="w-64 border-r bg-white">
              <Sidebar />
            </div>
            {selectedCoach && (
              <div className="w-[600px] bg-white border-r">
                <CoachChatStep
                  coach={selectedCoach}
                  onNext={() => {}}
                  onBack={() => {}}
                  onGoalSet={handleGoalSet}
                />
              </div>
            )}
            <div className="flex-1">
              {children}
            </div>
          </div>
        )}
      </body>
    </html>
  );
}