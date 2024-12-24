import { create } from 'zustand';

export type UserRole = 'admin' | 'student';
interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: {
    id: '1',
    username: 'admin',
    displayName: 'Admin User',
    email: 'admin@example.com',
    role: 'student' as UserRole,
    createdAt: new Date().toISOString()
  },
  logout: () => set({ user: null }),
}));