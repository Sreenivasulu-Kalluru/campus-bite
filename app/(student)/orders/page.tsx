import { Metadata } from 'next';
import OrdersClient from './OrdersClient';

export const metadata: Metadata = {
  title: 'My Orders | Campus Bite',
  description: 'Track your current orders and view your order history.',
};

export default function OrdersPage() {
  return <OrdersClient />;
}
