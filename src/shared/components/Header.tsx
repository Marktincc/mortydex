'use client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { logout } from '@/app/(auth)/_actions/auth-actions';

interface HeaderProps {
  user: { name: string } | null;
}

export default function Header({ user }: HeaderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

 const handleLogout = async () => {
    startTransition(async () => {
      const result = await logout(); // Call the server action
      if (result.success) {
        toast.success('Sesión cerrada correctamente.');
        router.replace('/login'); // Client-side redirect
      } else {
        toast.error(result.message || 'Error al cerrar sesión.');
      }
    });
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/20 bg-background-light px-2 py-3 dark:bg-background-dark sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 sm:gap-3">
        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
        </svg>
        <h1 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white max-w-[150px] truncate sm:max-w-none sm:whitespace-normal sm:overflow-visible">Explorador de Personajes</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 dark:text-white">
        {user ? (
          <>
            <span className="hidden sm:inline">Welcome,</span> <span className="max-w-[100px] truncate">{user.name}</span>
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="btn-click-effect flex items-center gap-1 sm:gap-2 rounded-full bg-red-500/10 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-red-500 hover:bg-red-500/20 dark:bg-red-500/20 dark:hover:bg-red-500/30"
            >
              <span className="material-symbols-outlined text-base">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1-.5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
              </span>
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => window.open('https://rickandmortyapi.com/', '_blank')}
            className="btn-click-effect flex items-center gap-1 sm:gap-2 rounded-full bg-primary/10 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30"
          >
            <span className="material-symbols-outlined text-base">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94" />
              </svg>
            </span>
            <span className="hidden sm:inline">Ayuda</span>
          </button>
        )}
      </div>
    </header>
  );
}