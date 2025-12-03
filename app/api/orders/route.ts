import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // console.log('GET /api/orders Session:', JSON.stringify(session.user, null, 2));

  try {
    let query = {};
    // Explicitly check for admin role
    if (session.user.role !== 'admin') {
      // Ensure we are filtering by the session user's ID
      if (!session.user.id) {
        return NextResponse.json(
          { error: 'User ID missing in session' },
          { status: 400 }
        );
      }
      query = { userId: session.user.id };
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { items, totalAmount } = body;

    const order = await Order.create({
      userId: session.user.id,
      items,
      totalAmount,
      status: 'Pending',
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
