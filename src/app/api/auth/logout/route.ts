import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    (await cookies()).set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    return NextResponse.json({
      success: true,
      message: 'Session closed successfully',
    });
  } catch (error) {
    console.error('Error closing session:', error);
    return NextResponse.json(
      { error: 'Error closing session' },
      { status: 500 }
    );
  }
}