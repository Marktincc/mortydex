import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

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

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (userData: Partial<User>) => void;
  setUser: (user: User) => void;
}


export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,


      login: (username, password) => {
        const foundUser = USERS.find(
          (u) => u.username === username && u.password === password
        );

        if (foundUser) {
          const { password: _, ...userWithoutPassword } = foundUser;

          set({
            user: userWithoutPassword,
            isAuthenticated: true,
            isLoading: false,
          });


          document.cookie = `sessionId=${foundUser.id}; path=/;`;

          return true;
        }

        return false;
      },

      logout: async () => {
        try {
          const response = await fetch('/api/auth/logout', {
            method: 'POST',
            cache: 'no-store',
          });

          if (!response.ok) {
            console.error('Error al cerrar sesión en el servidor');
          }
        } catch (error) {
          console.error('Error en logout:', error);
        } finally {
          // 🔹 Limpia el estado local inmediatamente
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },



      setLoading: (loading) => set({ isLoading: loading }),

      setUser: (user) => set({ user, isAuthenticated: true, isLoading: false }),

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'auth-storage', // nombre de la clave en localStorage
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
