import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Service from '@/models/Service';
import User from '@/models/User';
import SiteVisit from '@/models/SiteVisit';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();

    // Get basic counts
    const [blogs, services, users] = await Promise.all([
      Blog.countDocuments(),
      Service.countDocuments(),
      User.countDocuments(),
    ]);

    // Aggregate unique visits per month for the last 12 months
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);

    const activityData = await SiteVisit.aggregate([
      {
        $match: {
          timestamp: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
            visitorId: "$visitorId"
          }
        }
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month"
          },
          uniqueVisits: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    // Format activity data for consumption
    const chartData = activityData.map(item => ({
      year: item._id.year,
      month: item._id.month,
      value: item.uniqueVisits
    }));

    return NextResponse.json({ 
      stats: { blogs, services, users },
      chartData 
    });
  } catch (error: any) {
    return NextResponse.json({ message: error?.message || 'Unable to load admin stats' }, { status: 500 });
  }
}
