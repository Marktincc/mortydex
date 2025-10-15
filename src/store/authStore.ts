import { create } from 'zustand';
import { User } from '@/shared/types/types'; // Updated import path

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  (set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,

    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    setLoading: (loading) => set({ isLoading: loading }),

    updateUser: (userData) =>
      set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null,
      })),
  })
);
