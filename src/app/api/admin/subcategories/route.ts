import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subcategory from '@/models/Subcategory';
import Service from '@/models/Service';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const subcategories = await Subcategory.find({})
      .populate('service', 'name slug')
      .sort({ createdAt: -1 });
    return NextResponse.json({ subcategories });
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

    // Verify that the service exists
    const service = await Service.findById(body.service);
    if (!service) {
      return NextResponse.json({ message: 'Service not found' }, { status: 404 });
    }

    const subcategory = await Subcategory.create(body);
    const populatedSubcategory = await Subcategory.findById(subcategory._id).populate('service', 'name slug');
    return NextResponse.json({ subcategory: populatedSubcategory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}