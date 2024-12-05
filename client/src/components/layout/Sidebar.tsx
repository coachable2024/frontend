'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Goals', path: '/goals' },
    { label: 'Tasks', path: '/tasks' },
    { label: 'Calendar', path: '/calendar' }
  ];

  return (
    <nav className="h-full py-6">
      <div className="px-4 mb-6">
        <h1 className="text-xl font-bold">Coachable</h1>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                pathname === item.path ? 'bg-gray-100 font-medium' : ''
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};