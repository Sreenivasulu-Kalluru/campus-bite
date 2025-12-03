import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Login | Campus Bite',
  description:
    'Sign in to your Campus Bite account to order food and track your orders.',
};

export default function LoginPage() {
  return <LoginClient />;
}
