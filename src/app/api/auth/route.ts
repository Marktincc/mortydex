import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// ATENTION: Hardcoded users for demonstration purposes. 
// In a real application, you should fetch users from a database and use a secure password hashing mechanism.
const USERS = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as const,
    name: 'Administrador'
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    password: 'user123',
    role: 'user' as const,
    name: 'Usuario Normal'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    const session = {
      ...userWithoutPassword,
    };

    const response = NextResponse.json({ success: true, user: userWithoutPassword });

    response.cookies.set('session', JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = JSON.parse(sessionCookie);

    return NextResponse.json({ success: true, user });

  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
