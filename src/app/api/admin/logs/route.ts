import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ActivityLog from '@/models/ActivityLog';
import { getSession } from '@/lib/auth-check';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const logs = await ActivityLog.find({}).sort({ createdAt: -1 }).limit(100);
    return NextResponse.json({ logs });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
