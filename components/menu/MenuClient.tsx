'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';
import Image from 'next/image';

type MenuItem = {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  isAvailable: boolean;
};

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Snacks', 'Drinks'];

export default function MenuClient({
  initialMenuItems,
}: {
  initialMenuItems: MenuItem[];
}) {
  const [menuItems] = useState<MenuItem[]>(initialMenuItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

  const filteredItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-12 pt-8 pb-20">
      {/* Hero Section */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-gray-900 text-white shadow-2xl transform transition-all hover:scale-[1.01] duration-500 min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-linear-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>

        <div className="relative p-12 sm:p-20 w-full">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-bold mb-6 border border-indigo-500/30 backdrop-blur-sm">
              🚀 Fastest Delivery on Campus
            </span>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 leading-tight">
              Delicious Food <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-400">
                Straight to You.
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-xl font-medium leading-relaxed mb-8">
              Order from the canteen directly from your phone. Skip the long
              lines and enjoy your break.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById('menu-section')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div id="menu-section" className="space-y-10 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-gray-100 pb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
              Explore Menu
            </h2>
            <p className="text-gray-500 text-lg">
              Choose from our wide range of delicious options
            </p>
          </div>
          <div className="w-full md:w-auto -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto pb-6 pt-2 no-scrollbar">
            <div className="flex gap-4 min-w-max px-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap shadow-sm border ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white shadow-xl scale-105 border-gray-900 ring-4 ring-gray-100'
                      : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
            >
              <div className="aspect-4/3 relative overflow-hidden bg-gray-100">
                <Image
                  src={
                    item.image || 'https://placehold.co/600x400?text=No+Image'
                  }
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {!item.isAvailable && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                    <span className="text-white font-bold px-4 py-2 bg-red-600/90 rounded-full text-sm shadow-lg transform -rotate-6 border border-white/20">
                      Out of Stock
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-bold text-gray-900 shadow-sm z-10">
                  ₹{item.price}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {item.description || 'Delicious and freshly prepared.'}
                  </p>
                </div>

                <button
                  onClick={() => addToCart({ ...item, quantity: 1 })}
                  disabled={!item.isAvailable}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900 shadow-sm hover:shadow-indigo-200"
                >
                  <Plus className="w-5 h-5" />
                  {item.isAvailable ? 'Add to Cart' : 'Unavailable'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
              <Plus className="w-8 h-8 text-gray-400 rotate-45" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              No items found
            </h3>
            <p className="text-gray-500">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
