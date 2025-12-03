import { Metadata } from 'next';
import dbConnect from '@/lib/db';
import MenuItem from '@/models/MenuItem';
import MenuClient from '@/components/menu/MenuClient';

export const metadata: Metadata = {
  title: 'Menu | Campus Bite',
  description:
    'Explore our delicious menu and order food online from your college canteen.',
};

async function getMenuItems() {
  await dbConnect();
  // Serialize the data to plain objects to pass to client component
  const items = await MenuItem.find({}).sort({ category: 1 }).lean();

  // Convert _id and other non-serializable fields to strings
  return items.map((item) => ({
    _id: item._id.toString(),
    name: item.name,
    category: item.category,
    price: item.price,
    image: item.image,
    description: item.description,
    isAvailable: item.isAvailable,
  }));
}

export default async function MenuPage() {
  const menuItems = await getMenuItems();

  return <MenuClient initialMenuItems={menuItems} />;
}
