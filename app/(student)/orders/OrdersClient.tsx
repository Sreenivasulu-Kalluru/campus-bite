'use client';

import { CheckCircle, ChefHat, Clock, Package, XCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Order = {
  _id: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: string;
  createdAt: string;
};

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OrdersClient() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: orders = [], isLoading } = useSWR<Order[]>(
    status === 'authenticated' ? '/api/orders' : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Pending':
        return {
          color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          icon: Clock,
          label: 'Waiting for confirmation',
        };
      case 'Accepted':
        return {
          color: 'bg-blue-100 text-blue-700 border-blue-200',
          icon: CheckCircle,
          label: 'Order accepted',
        };
      case 'Cooking':
        return {
          color: 'bg-orange-100 text-orange-700 border-orange-200',
          icon: ChefHat,
          label: 'Preparing your food',
        };
      case 'Ready':
        return {
          color: 'bg-green-100 text-green-700 border-green-200',
          icon: Package,
          label: 'Ready for pickup',
        };
      case 'Completed':
        return {
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: CheckCircle,
          label: 'Order completed',
        };
      case 'Cancelled':
        return {
          color: 'bg-red-100 text-red-700 border-red-200',
          icon: XCircle,
          label: 'Order cancelled',
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-700',
          icon: Clock,
          label: status,
        };
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pt-8 pb-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="text-gray-500">Your order history will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-gray-900">
                          Order #{order._id.slice(-6)}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border ${statusConfig.color}`}
                    >
                      <StatusIcon className="w-4 h-4" />
                      {order.status}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <ul className="space-y-3">
                      {order.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between text-sm items-center"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold text-gray-500 border border-gray-200">
                              {item.quantity}x
                            </span>
                            <span className="text-gray-700 font-medium">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-gray-900 font-semibold">
                            ₹{item.price * item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {order.items.length} items
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 font-medium">Total</span>
                      <span className="text-2xl font-bold text-indigo-600">
                        ₹{order.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar for Active Orders */}
                {['Pending', 'Accepted', 'Cooking', 'Ready'].includes(
                  order.status
                ) && (
                  <div className="h-1 w-full bg-gray-100">
                    <div
                      className="h-full bg-indigo-600 transition-all duration-1000 ease-out"
                      style={{
                        width:
                          order.status === 'Pending'
                            ? '25%'
                            : order.status === 'Accepted'
                            ? '50%'
                            : order.status === 'Cooking'
                            ? '75%'
                            : order.status === 'Ready'
                            ? '100%'
                            : '0%',
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
