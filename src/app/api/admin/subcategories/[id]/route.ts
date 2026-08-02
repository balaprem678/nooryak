import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subcategory from '@/models/Subcategory';
import Service from '@/models/Service';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const subcategory = await Subcategory.findById(params.id).populate('service', 'name slug');
    if (!subcategory) {
      return NextResponse.json({ message: 'Subcategory not found' }, { status: 404 });
    }
    return NextResponse.json({ subcategory });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    // If service is being updated, verify it exists
    if (body.service) {
      const service = await Service.findById(body.service);
      if (!service) {
        return NextResponse.json({ message: 'Service not found' }, { status: 404 });
      }
    }

    const subcategory = await Subcategory.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    ).populate('service', 'name slug');

    if (!subcategory) {
      return NextResponse.json({ message: 'Subcategory not found' }, { status: 404 });
    }

    return NextResponse.json({ subcategory });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const subcategory = await Subcategory.findByIdAndDelete(params.id);

    if (!subcategory) {
      return NextResponse.json({ message: 'Subcategory not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Subcategory deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}