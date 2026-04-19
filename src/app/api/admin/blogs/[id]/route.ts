import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { getSession } from '@/lib/auth-check';
import { logActivity } from '@/lib/activity';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const user = session; // for activity logging

    const blog = await Blog.findByIdAndDelete(id);
    if (blog) {
      await logActivity({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        action: 'Deleted Blog Post',
        targetType: 'Blog',
        targetId: id,
        details: `Deleted blog: ${blog.title}`
      });
    }

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
    console.log(blog, "blog");

    if (!blog) return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    console.log(params, "boddyyy");
    const body = await req.json();

    const blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!blog) return NextResponse.json({ message: 'Blog not found' }, { status: 404 });

    // Log Activity
    await logActivity({
      userId: session.id,
      userName: session.name,
      userEmail: session.email,
      action: 'Updated Blog Post',
      targetType: 'Blog',
      targetId: id,
      details: `Updated blog: ${blog.title}`
    });

    return NextResponse.json({ blog });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

