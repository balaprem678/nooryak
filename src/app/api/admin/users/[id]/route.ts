import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { getSession } from '@/lib/auth-check';
import { logActivity } from '@/lib/activity';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const { name, role } = await req.json();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.name = name || user.name;
    user.role = role || user.role;
    await user.save();

    // Log Activity
    await logActivity({
      userId: session.id,
      userName: session.name,
      userEmail: session.email,
      action: 'Updated User',
      targetType: 'User',
      targetId: id,
      details: `Updated user info for: ${user.email}`
    });

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'Admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.email === session.email) {
      return NextResponse.json({ message: 'You cannot delete yourself' }, { status: 400 });
    }

    await User.findByIdAndDelete(id);

    // Log Activity
    await logActivity({
      userId: session.id,
      userName: session.name,
      userEmail: session.email,
      action: 'Deleted User',
      targetType: 'User',
      targetId: id,
      details: `Deleted user: ${user.email}`
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
