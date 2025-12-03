import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import MenuItem from '@/models/MenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; // Need to export authOptions

export async function GET() {
  await dbConnect();
  try {
    const menuItems = await MenuItem.find({ isAvailable: true });
    return NextResponse.json(menuItems);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  // TODO: Add Admin check
  await dbConnect();
  try {
    const body = await req.json();
    const menuItem = await MenuItem.create(body);
    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
}
