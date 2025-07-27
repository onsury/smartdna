import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import MobileMenu from './components/MobileMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SmartDNA - CorePersonaDNA™ Platform',
  description: 'The Inside-Out Content Revolution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Global Navigation */}
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold">
                  <span className="text-blue-600">Smart</span>
                  <span className="text-orange-500">DNA</span>
                </span>
              </Link>
              
              {/* Main Navigation - Desktop */}
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                  Home
                </Link>
                <Link href="/corepersonadna" className="text-gray-700 hover:text-blue-600 transition">
                  CorePersonaDNA™
                </Link>
                <Link href="/functionpersonadna" className="text-gray-700 hover:text-blue-600 transition">
                  FunctionPersonaDNA
                </Link>
                <Link href="/platform" className="text-gray-700 hover:text-blue-600 transition">
                  Platform
                </Link>
                <Link href="/assessment-selection" className="text-gray-700 hover:text-blue-600 transition">
                  Assessment
                </Link>
              </div>
              
              {/* CTA Button - Desktop */}
              <div className="hidden md:block">
                <Link 
                  href="/auth/login" 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Get Started
                </Link>
              </div>

              {/* Mobile Menu */}
              <MobileMenu />
            </div>
          </div>
        </nav>
        
        {/* Main Content */}
        {children}
        
        {/* Global Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <h3 className="text-xl font-bold mb-4">
                  <span className="text-blue-400">Smart</span>
                  <span className="text-orange-400">DNA</span>
                </h3>
                <p className="text-gray-400">
                  Revolutionizing organizational content with AI that understands your DNA.
                </p>
              </div>
              
              {/* Our Technology */}
              <div>
                <h4 className="font-bold mb-4">Our Technology</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/corepersonadna" className="hover:text-white transition">
                      CorePersonaDNA™
                    </Link>
                  </li>
                  <li>
                    <Link href="/functionpersonadna" className="hover:text-white transition">
                      FunctionPersonaDNA
                    </Link>
                  </li>
                  <li>
                    <Link href="/platform" className="hover:text-white transition">
                      6 Functional Hubs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white transition">
                      Intelligent AI Engine
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Solutions */}
              <div>
                <h4 className="font-bold mb-4">Solutions</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/platform/hrhub" className="hover:text-white transition">
                      HR & Talent
                    </Link>
                  </li>
                  <li>
                    <Link href="/platform/finhub" className="hover:text-white transition">
                      Finance & Operations
                    </Link>
                  </li>
                  <li>
                    <Link href="/platform/saleshub" className="hover:text-white transition">
                      Sales & Growth
                    </Link>
                  </li>
                  <li>
                    <Link href="/platform/marketinghub" className="hover:text-white transition">
                      Marketing & Brand
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Contact */}
              <div>
                <h4 className="font-bold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Email: hello@starthub.media</li>
                  <li>Phone: +91 98765 43210</li>
                  <li>
                    <Link href="/book-demo" className="hover:text-white transition">
                      Book a Demo
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Copyright - Only Once */}
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>© 2025 StartHub Media AI Pvt. Ltd. All rights reserved.</p>
              <p className="mt-2">Revolutionizing organizational content with CorePersonaDNA™</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}