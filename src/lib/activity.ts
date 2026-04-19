import dbConnect from '@/lib/mongodb';
import ActivityLog from '@/models/ActivityLog';

interface LogOptions {
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  targetType: string;
  targetId?: string;
  details?: string;
}

export async function logActivity(options: LogOptions) {
  try {
    await dbConnect();
    await ActivityLog.create(options);
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
}
