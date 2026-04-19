import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SiteVisit from '@/models/SiteVisit';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { path, visitorId } = await req.json();

    if (!path || !visitorId) {
      return NextResponse.json({ message: 'Missing tracking data' }, { status: 400 });
    }

    const userAgent = req.headers.get('user-agent') || 'Unknown';

    await SiteVisit.create({
      path,
      visitorId,
      userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Fail silently to not disrupt the user experience on the public site
    console.error('Tracking failed:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
