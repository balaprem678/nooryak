import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ date: -1 });
    return NextResponse.json({ blogs });
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
    const blog = await Blog.create(body);
    return NextResponse.json({ blog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
