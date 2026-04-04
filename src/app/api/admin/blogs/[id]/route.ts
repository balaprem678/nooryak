import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!blog) return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

