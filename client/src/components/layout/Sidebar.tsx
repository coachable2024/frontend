import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  CheckSquare, 
  Heart, 
  Calendar 
} from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();
  
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Goals', path: '/goals', icon: <Target size={20} /> },
    { label: 'Tasks', path: '/tasks', icon: <CheckSquare size={20} /> },
    { label: 'Habits & Self-Care', path: '/habits', icon: <Heart size={20} /> },
    { label: 'Calendar', path: '/calendar', icon: <Calendar size={20} /> }
  ];

  return (
    <nav className="h-full py-6 bg-white border-r">
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Coachable
        </h1>
      </div>
      
      <div className="px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200 ease-in-out
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <span className={`${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
