import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();

    // 🔹 Eliminar cookies estableciendo maxAge = 0
    const cookieNames = ['sessionId', 'userId', 'userRole', 'userEmail', 'userName'];
    cookieNames.forEach((name) => {
      cookieStore.set(name, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/', // Asegura que se eliminen en todo el dominio
      });
    });

    return NextResponse.json({
      success: true,
      message: 'Sesión cerrada correctamente',
    });
  } catch (error) {
    console.error('Error cerrando sesión:', error);
    return NextResponse.json(
      { error: 'Error al cerrar sesión' },
      { status: 500 }
    );
  }
}
