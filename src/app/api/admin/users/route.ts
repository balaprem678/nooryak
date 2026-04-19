import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { getSession } from '@/lib/auth-check';
import { logActivity } from '@/lib/activity';
import { sendWelcomeEmail, checkSMTPConfig } from '@/lib/mail';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const users = await User.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { name, email, password, role } = await req.json();

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Check SMTP config before creating user
    const hasSMTP = await checkSMTPConfig();
    if (!hasSMTP) {
      return NextResponse.json({ 
        message: 'SMTP is not configured. Please set up SMTP in Settings before inviting users.',
        smtpError: true 
      }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'Editor'
    });

    // Send welcome email
    try {
      await sendWelcomeEmail(email, password, name);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // We don't return error here because user is already created, but we should log it
    }

    // Log Activity
    await logActivity({
      userId: session.id,
      userName: session.name,
      userEmail: session.email,
      action: 'Created User',
      targetType: 'User',
      targetId: newUser._id.toString(),
      details: `Created new ${newUser.role}: ${newUser.email}`
    });

    return NextResponse.json({ 
      message: 'User created successfully and invitation email sent.',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
