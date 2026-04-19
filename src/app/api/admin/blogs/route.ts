import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { getSession } from '@/lib/auth-check';
import { logActivity } from '@/lib/activity';

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
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const blog = await Blog.create(body);

    // Log Activity
    await logActivity({
      userId: session.id,
      userName: session.name,
      userEmail: session.email,
      action: 'Created Blog Post',
      targetType: 'Blog',
      targetId: blog._id.toString(),
      details: `Created blog: ${blog.title}`
    });

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
