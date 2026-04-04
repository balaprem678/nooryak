import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await dbConnect();
    const { slug } = await params;
    const service = await Service.findOne({ slug });
    
    if (!service) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }
    
    return NextResponse.json({ service });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
