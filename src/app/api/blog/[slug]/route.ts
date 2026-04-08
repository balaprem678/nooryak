import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const blog = await Blog.findOneAndUpdate({ slug }, { $inc: { views: 1 } }, { new: true });
    
    if (!blog) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }
    
    return NextResponse.json({ blog });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
