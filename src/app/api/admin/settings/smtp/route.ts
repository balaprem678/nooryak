import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Setting from '@/models/Setting';
import { getSession } from '@/lib/auth-check';
import { logActivity } from '@/lib/activity';

const KEY = 'smtp_config';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const setting = await Setting.findOne({ key: KEY });
    
    if (!setting) {
      return NextResponse.json({ config: null });
    }

    // Obfuscate password in GET
    const config = { ...setting.value };
    if (config.pass) config.pass = '********';

    return NextResponse.json({ config });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const config = await req.json();

    let setting = await Setting.findOne({ key: KEY });
    
    if (setting) {
      // If password is still obfuscated, keep existing password
      if (config.pass === '********') {
        config.pass = setting.value.pass;
      }
      setting.value = config;
      await setting.save();
    } else {
      setting = await Setting.create({ key: KEY, value: config });
    }

    // Log Activity
    await logActivity({
      userId: session.id,
      userName: session.name,
      userEmail: session.email,
      action: 'Updated SMTP Settings',
      targetType: 'Settings',
      details: 'Updated global SMTP configuration'
    });

    return NextResponse.json({ message: 'SMTP settings updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
