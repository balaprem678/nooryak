import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const services = await Service.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ services });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const service = await Service.create(body);
    return NextResponse.json({ service }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
