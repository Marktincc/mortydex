'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(username, password);

    if (success) {
      toast.success('Inicio de sesión exitoso!');
      router.push('/');
    } else {
      setError('Usuario o contraseña incorrectos');
      toast.error('Credenciales inválidas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className='relative bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-8 rounded-lg shadow-lg border border-primary/20 dark:border-primary/30 transition-all duration-300 hover:shadow-xl'>
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">Iniciar sesión</h2>
      <form className='space-y-6' onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-2 ">Username</label>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-background-light/60 dark:bg-background-dark/60 border border-primary/20 dark:border-primary/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition duration-200 placeholder:text-subtle-light dark:placeholder:text-subtle-dark focus:animate-input-glow"
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
            className="w-full px-4 py-3 rounded-lg bg-background-light/60 dark:bg-background-dark/60 border border-primary/20 dark:border-primary/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition duration-200 placeholder:text-subtle-light dark:placeholder:text-subtle-dark focus:animate-input-glow"
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Recordarme
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-primary hover:text-primary/80">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
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
            className="btn-click-effect w-full bg-gradient-to-r from-primary to-green-400 text-white font-bold py-3 px-4 rounded-lg hover:from-primary/90 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition duration-200"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </div>
      </form>
    </div>
  );
}
