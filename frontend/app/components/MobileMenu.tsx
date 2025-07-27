'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      
      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50 animate-slide-down">
            <div className="flex flex-col p-4 space-y-4">
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition"
              >
                Home
              </Link>
              <Link 
                href="/corepersonadna" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition"
              >
                CorePersonaDNA™
              </Link>
              <Link 
                href="/functionpersonadna" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-purple-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition"
              >
                FunctionPersonaDNA
              </Link>
              <Link 
                href="/platform" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition"
              >
                Platform
              </Link>
              <Link 
                href="/video-assessment" 
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition"
              >
                Assessment
              </Link>
              <div className="border-t pt-4">
                <Link 
                  href="/auth/login" 
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}