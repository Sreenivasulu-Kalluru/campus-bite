'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Order = {
  _id: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
};

const STATUSES = [
  'Pending',
  'Accepted',
  'Cooking',
  'Ready',
  'Completed',
  'Cancelled',
];

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState('All');

  const {
    data: orders = [],
    isLoading,
    mutate,
  } = useSWR<Order[]>(
    status === 'authenticated' ? '/api/orders' : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      // router.push('/'); // Uncomment in production
    }
  }, [status, session, router]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        mutate(); // Re-fetch orders immediately
      }
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Accepted':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Cooking':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Ready':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Completed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredOrders =
    filterStatus === 'All'
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Orders</h1>
          <p className="text-gray-500 mt-1">
            Manage and track incoming orders in real-time
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-gray-200 shadow-sm md:overflow-x-hidden no-scrollbar overflow-x-auto max-w-full">
          <button
            onClick={() => setFilterStatus('All')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              filterStatus === 'All'
                ? 'bg-gray-900 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          {STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">
                      #{order._id.slice(-4)}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    {order.user?.name || 'Guest'}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 mb-4 space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      <span className="font-bold text-gray-900 mr-2">
                        {item.quantity}x
                      </span>
                      {item.name}
                    </span>
                    <span className="text-gray-500">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {order.status !== 'Completed' &&
                  order.status !== 'Cancelled' && (
                    <>
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => updateStatus(order._id, 'Accepted')}
                          className="col-span-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Accept Order
                        </button>
                      )}
                      {order.status === 'Accepted' && (
                        <button
                          onClick={() => updateStatus(order._id, 'Cooking')}
                          className="col-span-2 bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                        >
                          Start Cooking
                        </button>
                      )}
                      {order.status === 'Cooking' && (
                        <button
                          onClick={() => updateStatus(order._id, 'Ready')}
                          className="col-span-2 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                        >
                          Mark Ready
                        </button>
                      )}
                      {order.status === 'Ready' && (
                        <button
                          onClick={() => updateStatus(order._id, 'Completed')}
                          className="col-span-2 bg-gray-900 text-white py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => updateStatus(order._id, 'Cancelled')}
                        className="col-span-2 border border-red-200 text-red-600 py-2 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
