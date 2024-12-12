'use client';
import React, { useEffect, useState, useRef } from 'react';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CoachChatStep from '@/components/features/onboarding/CoachChatStep';
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
  const [middlePanelWidth, setMiddlePanelWidth] = useState(0); // Will be set on mount
  const [isResizing, setIsResizing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const resizerRef = useRef<HTMLDivElement>(null);
  const SIDEBAR_WIDTH = 256; // 16rem in pixels

  // Calculate initial and adjusted middle panel widths
  const calculateMiddlePanelWidth = (screenWidth: number) => {
    const availableWidth = screenWidth - SIDEBAR_WIDTH;
    // Target 50% of available space after sidebar
    return Math.floor(availableWidth * 0.5);
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      setWindowWidth(newWindowWidth);
      
      if (isMainExpanded) {
        const newWidth = calculateMiddlePanelWidth(newWindowWidth);
        setMiddlePanelWidth(newWidth);
      }
    };

    // Set initial width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMainExpanded]);

  // Handle manual resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const availableWidth = windowWidth - SIDEBAR_WIDTH;
      const minWidth = Math.max(400, availableWidth * 0.3); // Minimum 30% of available space
      const maxWidth = Math.min(1200, availableWidth * 0.7); // Maximum 70% of available space
      const newWidth = e.clientX - SIDEBAR_WIDTH;
      
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setMiddlePanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, windowWidth]);

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

            {/* Middle Section - Always ~50% when expanded */}
            <div
              style={{ 
                width: isMainExpanded ? middlePanelWidth : 0,
                transition: isResizing ? 'none' : 'width 300ms ease-in-out'
              }}
              className={`relative bg-white border-r
                ${isMainExpanded ? 'opacity-100' : 'opacity-0'} 
                flex-none flex flex-col h-screen overflow-hidden`}
            >
              {selectedCoach && (
                <div className="flex-1 h-full">
                  <CoachChatStep
                    coach={selectedCoach}
                    onNext={() => {}}
                    onBack={() => {}}
                    onGoalSet={handleGoalSet}
                  />
                </div>
              )}
              
              {/* Resizer */}
              <div
                ref={resizerRef}
                className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 hover:opacity-50"
                onMouseDown={() => setIsResizing(true)}
              />
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
                {React.cloneElement(children as React.ReactElement, { 
                  isMainExpanded,
                  windowWidth 
                })}
              </div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}