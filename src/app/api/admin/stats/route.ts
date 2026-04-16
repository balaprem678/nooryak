import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Service from '@/models/Service';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();

    const [blogs, services, users] = await Promise.all([
      Blog.countDocuments(),
      Service.countDocuments(),
      User.countDocuments(),
    ]);

    return NextResponse.json({ stats: { blogs, services, users } });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message || 'Unable to load admin stats' }, { status: 500 });
  }
}
