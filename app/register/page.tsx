import { Metadata } from 'next';
import RegisterClient from './RegisterClient';

export const metadata: Metadata = {
  title: 'Register | Campus Bite',
  description:
    'Create a new account on Campus Bite to start ordering delicious food from your college canteen.',
};

export default function RegisterPage() {
  return <RegisterClient />;
}
