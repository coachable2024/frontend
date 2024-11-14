'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  Target, 
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    path: '/calendar',
    label: 'Calendar',
    icon: <Calendar className="h-5 w-5" />
  },
  {
    path: '/goals',
    label: 'Goals',
    icon: <Target className="h-5 w-5" />
  },
  {
    path: '/tasks',
    label: 'Tasks',
    icon: <CheckSquare className="h-5 w-5" />
  }
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Helper function to determine if a nav item is active
  const isActiveRoute = (path: string) => pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isExpanded ? 'w-64' : 'w-20'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out
          md:translate-x-0 z-50
        `}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4">
          {isExpanded && <h1 className="text-xl font-bold">MyApp</h1>}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden md:block p-2 hover:bg-gray-800 rounded"
          >
            {isExpanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-8 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`
                flex items-center gap-4 px-4 py-3 mb-2 rounded-lg transition-colors
                ${isActiveRoute(item.path)
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
                }
              `}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              {isExpanded && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </aside>

    </>
  );
}