'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const { items } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = items.reduce((acc: number, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed w-full z-50 top-0 transition-all duration-300 ${
          scrolled || isMobileMenuOpen ? 'glass shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 z-50">
              <Link
                href="/"
                className="shrink-0 flex items-center gap-3 group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform shadow-lg shadow-indigo-200">
                  C
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-600">
                  Campus Bite
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/cart"
                className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors group"
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full ring-2 ring-white animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>

              {session ? (
                <div className="flex items-center space-x-6">
                  {session.user?.role === 'admin' ? (
                    <Link
                      href="/admin/dashboard"
                      className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      href="/orders"
                      className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      My Orders
                    </Link>
                  )}
                  <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-bold text-gray-900">
                        {session.user?.name}
                      </span>
                      <span className="text-xs text-gray-500 capitalize font-medium">
                        {session.user?.role}
                      </span>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border-2 border-indigo-100">
                      {session.user?.name?.[0]?.toUpperCase() || (
                        <User className="h-5 w-5" />
                      )}
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                      title="Sign Out"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-indigo-600 transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <Link
                href="/cart"
                className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full ring-2 ring-white">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors z-50"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-xl z-40 transition-all duration-500 md:hidden flex flex-col pt-24 px-6 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-6">
          {session ? (
            <>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl border-2 border-indigo-200">
                  {session.user?.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">
                    {session.user?.name}
                  </div>
                  <div className="text-sm text-gray-500 capitalize">
                    {session.user?.role}
                  </div>
                </div>
              </div>

              {session.user?.role === 'admin' ? (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-4 text-lg font-bold text-gray-900 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100"
                >
                  <span>Admin Dashboard</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              ) : (
                <Link
                  href="/orders"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-4 text-lg font-bold text-gray-900 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100"
                >
                  <span>My Orders</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              )}

              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-between p-4 text-lg font-bold text-red-600 hover:bg-red-50 rounded-2xl transition-colors border border-transparent hover:border-red-100"
              >
                <span>Sign Out</span>
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 text-center text-lg font-bold text-gray-900 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-4 text-center text-lg font-bold text-white bg-indigo-600 rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
