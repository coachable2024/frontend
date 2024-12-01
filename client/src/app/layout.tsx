// 'use client';

// import React from 'react'; // Added import for React
// import '../styles/globals.css';
// import { Inter } from 'next/font/google';
// import { usePathname } from 'next/navigation';
// import { Sidebar } from '@/components/layout/Sidebar';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import CoachChatStep from '@/components/features/onboarding/CoachChatStep';
// import { useEffect, useState } from 'react';
// import { Coach } from '@/types/onboardingType';
// import { Goal } from '@/types/goalsType';

// const inter = Inter({ subsets: ['latin'] });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const isOnboardingPage = pathname === '/' || pathname === '/onboarding';
//   const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
//   const [isMainExpanded, setIsMainExpanded] = useState(true);
  
//   const handleGoalSet = (goal: Goal) => {
//     const existingGoals = JSON.parse(localStorage.getItem('goals') || '[]');
//     localStorage.setItem('goals', JSON.stringify([...existingGoals, goal]));
//   };

//   useEffect(() => {
//     const savedCoach = localStorage.getItem('selectedCoach');
//     if (savedCoach) {
//       setSelectedCoach(JSON.parse(savedCoach));
//     }
//   }, [pathname]);

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {isOnboardingPage ? (
//           <main>{children}</main>
//         ) : (
//           <div className="flex h-screen bg-gray-50">
//             {/* Left Sidebar - Fixed width */}
//             <div className="w-64 min-w-[16rem] flex-none border-r bg-white">
//               <Sidebar />
//             </div>
      

//            {/* Middle Section - Expandable */}
//                     <div
//                       className={`bg-white border-r transition-all duration-300 ${
//                         isMainExpanded ? 'w-[600px] min-w-[600px]' : 'w-0 min-w-0'
//                       } flex-none flex flex-col h-screen overflow-hidden`} // Added overflow-hidden
//                     >
//                       {selectedCoach && (
//                         <div className={`flex-1 min-h-0 ${
//                           isMainExpanded ? 'opacity-100' : 'opacity-0'
//                         } transition-opacity duration-300`}> 
//                           <CoachChatStep
//                             coach={selectedCoach}
//                             onNext={() => {}}
//                             onBack={() => {}}
//                             onGoalSet={handleGoalSet}
//                           />
//                         </div>
//                       )}
//                     </div>


//             {/* Main Content Area - Flexible width */}
//             <div className="relative flex-1">
//               <button
//                 onClick={() => setIsMainExpanded(!isMainExpanded)}
//                 className="absolute left-0 top-4 z-10 p-2 bg-white rounded-r shadow hover:bg-gray-50"
//                 aria-label={isMainExpanded ? "Collapse panel" : "Expand panel"}
//               >
//                 {isMainExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//               </button>
//               <div className="h-full p-4 overflow-auto">
//                 {React.cloneElement(children as React.ReactElement, { isMainExpanded })}
//               </div>
//             </div>


//           </div>
//         )}
//       </body>
//     </html>
//   );
// }

// version 2
// 'use client';
// import React, { useEffect, useState, useRef } from 'react';
// import '../styles/globals.css';
// import { Inter } from 'next/font/google';
// import { usePathname } from 'next/navigation';
// import { Sidebar } from '@/components/layout/Sidebar';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import CoachChatStep from '@/components/features/onboarding/CoachChatStep';
// import { Coach } from '@/types/onboardingType';
// import { Goal } from '@/types/goalsType';

// const inter = Inter({ subsets: ['latin'] });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const isOnboardingPage = pathname === '/' || pathname === '/onboarding';
//   const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
//   const [isMainExpanded, setIsMainExpanded] = useState(true);
//   const [middlePanelWidth, setMiddlePanelWidth] = useState(600);
//   const [isResizing, setIsResizing] = useState(false);
//   const resizerRef = useRef<HTMLDivElement>(null);

//   const handleGoalSet = (goal: Goal) => {
//     const existingGoals = JSON.parse(localStorage.getItem('goals') || '[]');
//     localStorage.setItem('goals', JSON.stringify([...existingGoals, goal]));
//   };

//   useEffect(() => {
//     const savedCoach = localStorage.getItem('selectedCoach');
//     if (savedCoach) {
//       setSelectedCoach(JSON.parse(savedCoach));
//     }
//   }, [pathname]);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!isResizing) return;
      
//       const newWidth = e.clientX - 256; // 256px is sidebar width (16rem)
//       if (newWidth >= 300 && newWidth <= 800) {
//         setMiddlePanelWidth(newWidth);
//       }
//     };

//     const handleMouseUp = () => {
//       setIsResizing(false);
//     };

//     if (isResizing) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isResizing]);

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {isOnboardingPage ? (
//           <main>{children}</main>
//         ) : (
//           <div className="flex h-screen bg-gray-50">
//             {/* Left Sidebar - Fixed width */}
//             <div className="w-64 min-w-[16rem] flex-none border-r bg-white">
//               <Sidebar />
//             </div>

//             {/* Middle Section - Resizable */}
//             <div
//               style={{ width: isMainExpanded ? middlePanelWidth : 0 }}
//               className={`relative bg-white border-r transition-all duration-300 
//                 ${isMainExpanded ? 'opacity-100' : 'opacity-0'} 
//                 flex-none flex flex-col h-screen overflow-hidden`}
//             >
//               {selectedCoach && (
//                 <div className="flex-1 h-full">
//                   <CoachChatStep
//                     coach={selectedCoach}
//                     onNext={() => {}}
//                     onBack={() => {}}
//                     onGoalSet={handleGoalSet}
//                   />
//                 </div>
//               )}
              
//               {/* Resizer */}
//               <div
//                 ref={resizerRef}
//                 className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 hover:opacity-50"
//                 onMouseDown={() => setIsResizing(true)}
//               />
//             </div>

//             {/* Main Content Area - Flexible */}
//             <div className="relative flex-1">
//               <button
//                 onClick={() => setIsMainExpanded(!isMainExpanded)}
//                 className="absolute left-0 top-4 z-10 p-2 bg-white rounded-r shadow hover:bg-gray-50"
//                 aria-label={isMainExpanded ? "Collapse panel" : "Expand panel"}
//               >
//                 {isMainExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//               </button>
//               <div className="h-full p-4 overflow-auto">
//                 {React.cloneElement(children as React.ReactElement, { isMainExpanded })}
//               </div>
//             </div>
//           </div>
//         )}
//       </body>
//     </html>
//   );
// }



// version 3
// 'use client';
// import React, { useEffect, useState, useRef } from 'react';
// import '../styles/globals.css';
// import { Inter } from 'next/font/google';
// import { usePathname } from 'next/navigation';
// import { Sidebar } from '@/components/layout/Sidebar';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import CoachChatStep from '@/components/features/onboarding/CoachChatStep';
// import { Coach } from '@/types/onboardingType';
// import { Goal } from '@/types/goalsType';

// const inter = Inter({ subsets: ['latin'] });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const isOnboardingPage = pathname === '/' || pathname === '/onboarding';
//   const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
//   const [isMainExpanded, setIsMainExpanded] = useState(true);
//   const [middlePanelWidth, setMiddlePanelWidth] = useState(1200);
//   const [isResizing, setIsResizing] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 800);
//   const resizerRef = useRef<HTMLDivElement>(null);

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       const newWindowWidth = window.innerWidth;
//       setWindowWidth(newWindowWidth);

//       // Adjust middle panel width based on window size
//       if (newWindowWidth < 1200) {
//         // For smaller screens, make middle panel narrower
//         const newMiddlePanelWidth = Math.min(400, (newWindowWidth - 256) * 0.4);
//         setMiddlePanelWidth(Math.max(300, newMiddlePanelWidth));
//       } else {
//         // For larger screens, allow more space
//         setMiddlePanelWidth(Math.min(1200, (newWindowWidth - 256) * 0.3));
//       }

//       // Auto-collapse middle panel on very small screens
//       if (newWindowWidth < 768) {
//         setIsMainExpanded(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initial adjustment
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Handle manual resizing
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!isResizing) return;
      
//       const minWidth = Math.max(300, windowWidth * 0.2); // Minimum 20% of window width or 300px
//       const maxWidth = Math.min(800, windowWidth * 0.5); // Maximum 50% of window width or 800px
//       const newWidth = e.clientX - 256;
      
//       if (newWidth >= minWidth && newWidth <= maxWidth) {
//         setMiddlePanelWidth(newWidth);
//       }
//     };

//     const handleMouseUp = () => {
//       setIsResizing(false);
//     };

//     if (isResizing) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isResizing, windowWidth]);

//   const handleGoalSet = (goal: Goal) => {
//     const existingGoals = JSON.parse(localStorage.getItem('goals') || '[]');
//     localStorage.setItem('goals', JSON.stringify([...existingGoals, goal]));
//   };

//   useEffect(() => {
//     const savedCoach = localStorage.getItem('selectedCoach');
//     if (savedCoach) {
//       setSelectedCoach(JSON.parse(savedCoach));
//     }
//   }, [pathname]);

//   // Determine layout class based on window width
//   const getLayoutClass = () => {
//     if (windowWidth < 640) return 'flex-col';
//     return 'flex';
//   };

//   // Determine sidebar class based on window width
//   const getSidebarClass = () => {
//     if (windowWidth < 640) return 'w-full h-16';
//     return 'w-64 min-w-[16rem] h-screen';
//   };

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {isOnboardingPage ? (
//           <main>{children}</main>
//         ) : (
//           <div className={`${getLayoutClass()} h-screen bg-gray-50`}>
//             {/* Left Sidebar - Responsive */}
//             <div className={`${getSidebarClass()} flex-none border-r bg-white`}>
//               <Sidebar />
//             </div>

//             {/* Middle Section - Responsive & Resizable */}
//             <div
//               style={{ 
//                 width: isMainExpanded ? 
//                   windowWidth < 640 ? '100%' : middlePanelWidth : 0 
//               }}
//               className={`relative bg-white border-r transition-all duration-300 
//                 ${isMainExpanded ? 'opacity-100' : 'opacity-0'} 
//                 flex-none flex flex-col overflow-hidden
//                 ${windowWidth < 640 ? 'h-[calc(100vh-4rem)]' : 'h-screen'}`}
//             >
//               {selectedCoach && (
//                 <div className="flex-1 h-full">
//                   <CoachChatStep
//                     coach={selectedCoach}
//                     onNext={() => {}}
//                     onBack={() => {}}
//                     onGoalSet={handleGoalSet}
//                   />
//                 </div>
//               )}
              
//               {/* Resizer - Hide on small screens */}
//               {windowWidth >= 640 && (
//                 <div
//                   ref={resizerRef}
//                   className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 hover:opacity-50"
//                   onMouseDown={() => setIsResizing(true)}
//                 />
//               )}
//             </div>

//             {/* Main Content Area - Responsive */}
//             <div className={`relative flex-1 ${windowWidth < 640 ? 'h-[calc(100vh-4rem)]' : 'h-screen'}`}>
//               <button
//                 onClick={() => setIsMainExpanded(!isMainExpanded)}
//                 className={`
//                   ${windowWidth < 640 ? 'hidden' : ''}
//                   absolute left-0 top-4 z-10 p-2 bg-white rounded-r shadow hover:bg-gray-50
//                 `}
//                 aria-label={isMainExpanded ? "Collapse panel" : "Expand panel"}
//               >
//                 {isMainExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//               </button>
//               <div className="h-full p-4 overflow-auto">
//                 {React.cloneElement(children as React.ReactElement, { 
//                   isMainExpanded,
//                   windowWidth 
//                 })}
//               </div>
//             </div>
//           </div>
//         )}
//       </body>
//     </html>
//   );
// }

// // 1/3
// 'use client';
// import React, { useEffect, useState, useRef } from 'react';
// import '../styles/globals.css';
// import { Inter } from 'next/font/google';
// import { usePathname } from 'next/navigation';
// import { Sidebar } from '@/components/layout/Sidebar';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import CoachChatStep from '@/components/features/onboarding/CoachChatStep';
// import { Coach } from '@/types/onboardingType';
// import { Goal } from '@/types/goalsType';

// const inter = Inter({ subsets: ['latin'] });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const isOnboardingPage = pathname === '/' || pathname === '/onboarding';
//   const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
//   const [isMainExpanded, setIsMainExpanded] = useState(true);
//   const [middlePanelWidth, setMiddlePanelWidth] = useState(0);
//   const [isResizing, setIsResizing] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
//   const resizerRef = useRef<HTMLDivElement>(null);
//   const sidebarWidth = 256; // 16rem = 256px

//   // Calculate initial and default widths
//   const calculateDefaultWidth = (totalWidth: number) => {
//     const availableWidth = totalWidth - sidebarWidth;
//     return Math.floor(availableWidth / 3);
//   };

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       const newWindowWidth = window.innerWidth;
//       setWindowWidth(newWindowWidth);
      
//       // Set middle panel to 1/3 of available space
//       const newWidth = calculateDefaultWidth(newWindowWidth);
//       setMiddlePanelWidth(newWidth);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initial setup
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Handle manual resizing
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!isResizing) return;
      
//       const availableWidth = windowWidth - sidebarWidth;
//       const minWidth = Math.max(300, availableWidth * 0.25); // Minimum 25% of available space
//       const maxWidth = Math.min(Math.floor(availableWidth * 0.45), 1000); // Maximum 45% or 1000px
//       const newWidth = e.clientX - sidebarWidth;
      
//       if (newWidth >= minWidth && newWidth <= maxWidth) {
//         setMiddlePanelWidth(newWidth);
//       }
//     };

//     const handleMouseUp = () => {
//       setIsResizing(false);
//     };

//     if (isResizing) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isResizing, windowWidth]);

//   const handleGoalSet = (goal: Goal) => {
//     const existingGoals = JSON.parse(localStorage.getItem('goals') || '[]');
//     localStorage.setItem('goals', JSON.stringify([...existingGoals, goal]));
//   };

//   useEffect(() => {
//     const savedCoach = localStorage.getItem('selectedCoach');
//     if (savedCoach) {
//       setSelectedCoach(JSON.parse(savedCoach));
//     }
//   }, [pathname]);

//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {isOnboardingPage ? (
//           <main>{children}</main>
//         ) : (
//           <div className="flex h-screen bg-gray-50">
//             {/* Left Sidebar - Fixed width */}
//             <div className="w-64 min-w-[16rem] flex-none border-r bg-white">
//               <Sidebar />
//             </div>

//             {/* Middle Section - 1/3 width by default */}
//             <div
//               style={{ 
//                 width: isMainExpanded ? `${middlePanelWidth}px` : 0,
//               }}
//               className={`relative bg-white border-r transition-all duration-300 
//                 ${isMainExpanded ? 'opacity-100' : 'opacity-0'} 
//                 flex-none flex flex-col h-screen overflow-hidden`}
//             >
//               {selectedCoach && (
//                 <div className="flex-1 h-full">
//                   <CoachChatStep
//                     coach={selectedCoach}
//                     onNext={() => {}}
//                     onBack={() => {}}
//                     onGoalSet={handleGoalSet}
//                   />
//                 </div>
//               )}
              
//               {/* Resizer */}
//               <div
//                 ref={resizerRef}
//                 className="absolute right-0 top-0 w-1 h-full cursor-col-resize hover:bg-blue-500 hover:opacity-50"
//                 onMouseDown={() => setIsResizing(true)}
//               />
//             </div>

//             {/* Main Content Area - Remaining space */}
//             <div className="relative flex-1">
//               <button
//                 onClick={() => {
//                   setIsMainExpanded(!isMainExpanded);
//                   if (!isMainExpanded) {
//                     setMiddlePanelWidth(calculateDefaultWidth(windowWidth));
//                   }
//                 }}
//                 className="absolute left-0 top-4 z-10 p-2 bg-white rounded-r shadow hover:bg-gray-50"
//                 aria-label={isMainExpanded ? "Collapse panel" : "Expand panel"}
//               >
//                 {isMainExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//               </button>
//               <div className="h-full p-4 overflow-auto">
//                 {React.cloneElement(children as React.ReactElement, { 
//                   isMainExpanded,
//                   windowWidth 
//                 })}
//               </div>
//             </div>
//           </div>
//         )}
//       </body>
//     </html>
//   );
// }

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