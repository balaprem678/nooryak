import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/utils/auth';

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return null;

  return verifyToken(token) as any;
}

export async function isAdmin() {
  const session = await getSession();
  return session && session.role === 'Admin';
}
