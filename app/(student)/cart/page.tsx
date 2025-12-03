import { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata: Metadata = {
  title: 'Your Cart | Campus Bite',
  description: 'Review your selected food items and proceed to checkout.',
};

export default function CartPage() {
  return <CartClient />;
}
