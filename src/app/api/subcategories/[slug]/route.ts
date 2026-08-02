import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subcategory from '@/models/Subcategory';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();
    const subcategory = await Subcategory.findOne({ slug: params.slug })
      .populate('service', 'name slug description');

    if (!subcategory) {
      return NextResponse.json({ message: 'Subcategory not found' }, { status: 404 });
    }

    return NextResponse.json({ subcategory });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}