'use client';

import React from 'react'; // Added import for React
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [isMainExpanded, setIsMainExpanded] = useState(true);
  
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
            {/* Left Sidebar - Fixed width */}
            <div className="w-64 min-w-[16rem] flex-none border-r bg-white">
              <Sidebar />
            </div>
      

           {/* Middle Section - Expandable */}
                    <div
                      className={`bg-white border-r transition-all duration-300 ${
                        isMainExpanded ? 'w-[600px] min-w-[600px]' : 'w-0 min-w-0'
                      } flex-none flex flex-col h-screen overflow-hidden`} // Added overflow-hidden
                    >
                      {selectedCoach && (
                        <div className={`flex-1 min-h-0 ${
                          isMainExpanded ? 'opacity-100' : 'opacity-0'
                        } transition-opacity duration-300`}> 
                          <CoachChatStep
                            coach={selectedCoach}
                            onNext={() => {}}
                            onBack={() => {}}
                            onGoalSet={handleGoalSet}
                          />
                        </div>
                      )}
                    </div>


            {/* Main Content Area - Flexible width */}
            <div className="relative flex-1">
              <button
                onClick={() => setIsMainExpanded(!isMainExpanded)}
                className="absolute left-0 top-4 z-10 p-2 bg-white rounded-r shadow hover:bg-gray-50"
                aria-label={isMainExpanded ? "Collapse panel" : "Expand panel"}
              >
                {isMainExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
              <div className="h-full p-4 overflow-auto">
                {React.cloneElement(children as React.ReactElement, { isMainExpanded })}
              </div>
            </div>


          </div>
        )}
      </body>
    </html>
  );
}


