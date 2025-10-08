'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = login(username, password);
      console.log('Intento de login:', { success, username });

      if (success) {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Cookies establecidas correctamente');
          router.push('/');
          router.refresh();
        } else {
          throw new Error(data.error || 'Error al establecer la sesión');
        }
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error: any) {
      setError(error.message || 'Error al intentar iniciar sesión');
      console.error('Error en login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-background-light dark:bg-background-dark/50 p-8 rounded-lg shadow-md border border-border-light dark:border-border-dark'>
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">Iniciar sesión</h2>
      <form className='space-y-6' onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-2 ">Username</label>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none transition duration-200 placeholder:text-subtle-light dark:placeholder:text-subtle-dark"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none transition duration-200 placeholder:text-subtle-light dark:placeholder:text-subtle-dark"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <div className="min-h-[1.5rem] mb-4 text-center">
            <p className={`text-sm transition-all duration-200 ${error ? "text-red-500 opacity-100" : "opacity-0"}`}>
              {error || "•"}
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition duration-200"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </div>
      </form>
    </div>
  );
}
