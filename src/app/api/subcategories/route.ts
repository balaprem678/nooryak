import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Subcategory from '@/models/Subcategory';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const subcategories = await Subcategory.find({})
      .populate('service', 'name slug')
      .sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ subcategories });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}