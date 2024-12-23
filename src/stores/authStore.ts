import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: '2024-01-01',
  },
  logout: () => set({ user: null }),
}));