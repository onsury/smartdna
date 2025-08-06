'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 hover:text-gray-900"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-50">
          <div className="px-4 py-2 space-y-2">
            <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/corepersonadna" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              CorePersonaDNA™
            </Link>
            <Link href="/platform" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Platform
            </Link>
            <Link href="/assessment-tool" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
              Assessment
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}