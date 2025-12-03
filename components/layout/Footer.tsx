'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Linkedin,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  const { data: session } = useSession();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                C
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-600">
                Campus Bite
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Revolutionizing the campus dining experience. Order your favorite
              food, skip the lines, and enjoy your break.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                >
                  Cart
                </Link>
              </li>
              <li>
                {session?.user?.role === 'admin' ? (
                  <Link
                    href="/admin/dashboard"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    href="/orders"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                  >
                    My Orders
                  </Link>
                )}
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/?category=Breakfast"
                  className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                >
                  Breakfast
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Lunch"
                  className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                >
                  Lunch
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Snacks"
                  className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                >
                  Snacks
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Drinks"
                  className="text-gray-500 hover:text-indigo-600 transition-colors text-sm"
                >
                  Drinks
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-500">
                <MapPin className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>Sri Venkateswara University Campus, Tirupati</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <Phone className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <Mail className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>support@campusbitesvu.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Campus Bite. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link
              href="/privacy-policy"
              className="hover:text-indigo-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-indigo-600 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
