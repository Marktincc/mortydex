'use client';

import { useState, useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { login } from '@/app/(auth)/_actions/auth-actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-click-effect w-full bg-gradient-to-r from-primary to-green-400 text-white font-bold py-3 px-4 rounded-lg hover:from-primary/90 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition duration-200"
    >
      {pending ? "Iniciando sesión..." : "Iniciar sesión"}
    </button>
  );
}

export default function LoginForm() {
  const [errorMessage, formAction] = useActionState(login, undefined);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (errorMessage?.message) {
      toast.error(errorMessage.message);
    }
  }, [errorMessage]);

  return (
    <div className='relative bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-8 rounded-lg shadow-lg border border-primary/20 dark:border-primary/30 transition-all duration-300 hover:shadow-xl'>
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">Iniciar sesión</h2>
      <form className='space-y-6' action={formAction}>
        <div>
          <label className="block text-sm font-medium mb-2 ">Username</label>
          <input
            type="text"
            placeholder="Usuario"
            name="username"
            className="w-full px-4 py-3 rounded-lg bg-background-light/60 dark:bg-background-dark/60 border border-primary/20 dark:border-primary/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition duration-200 placeholder:text-subtle-light dark:placeholder:text-subtle-dark focus:animate-input-glow"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            className="w-full px-4 py-3 rounded-lg bg-background-light/60 dark:bg-background-dark/60 border border-primary/20 dark:border-primary/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition duration-200 placeholder:text-subtle-light dark:placeholder:text-subtle-dark focus:animate-input-glow"
            required
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
          
        </div>

        <div>
          <div className="min-h-[1.5rem] mb-4 text-center">
            <p className={`text-sm transition-all duration-200 ${errorMessage ? "text-red-500 opacity-100" : "opacity-0"}`}>
              {errorMessage?.message || "•"}
            </p>
          </div>

          <SubmitButton />
        </div>
      </form>
    </div>
  );
}