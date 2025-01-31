'use client';

import { Role } from '@/types/role';
import type { User, UserWithToken } from '@/types/user';
import { api } from '@/lib/api';
import type { JSX } from 'react';
import { useState, useEffect, useContext, createContext } from 'react';

type AuthResponse =
  | {
      data: User;
      error: null;
    }
  | { error: string };

interface AuthContextState {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin?: boolean;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const LOCAL_STORAGE_USER_KEY = 'user';

const AuthContext = createContext<AuthContextState | undefined>(undefined);

function updateCookieUser(user: User): void {
  document.cookie = `user=${JSON.stringify(user)}; path=/; secure`;
}

function removeCookieUser(): void {
  document.cookie = `user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}

function getLocalStorageUser(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

  return storedUser ? JSON.parse(storedUser) : null;
}

function updateLocalStorageUser(user: User): void {
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
}

function removeLocalStorageUser(): void {
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
}

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const login = async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    try {
      const response = await api.get(
        `/users?email=${email}&password=${password}`,
      );

      const users = response.data;

      if (users?.length === 0) {
        return { error: 'Invalid credentials' };
      }

      const user = users[0];

      // TODO: Replace with real token behavior
      const fakeToken = `fake-token-${user.id}`;

      const userData: UserWithToken = { ...user, token: fakeToken };

      updateLocalStorageUser(userData);
      updateCookieUser(userData);

      setUser(userData);

      return { data: userData, error: null };
    } catch (error) {
      // TODO: Improve error handling
      console.error('Login error', error);
      return { error: 'An error occurred' };
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    try {
      const role = Role.User;

      const response = await api.post('/users', {
        name,
        email,
        password,
        role,
      });

      const user = response.data;

      return { data: user, error: null };
    } catch (error) {
      console.error('Register error', error);
      return { error: 'An error occurred' };
    }
  };

  const logout = (): void => {
    removeLocalStorageUser();
    removeCookieUser();
    setUser(null);
  };

  const isAuthenticated = Boolean(user);

  const isAdmin = user?.role === Role.Admin;

  useEffect(function getStoredUser() {
    const storedUser = getLocalStorageUser();

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }

  return context;
}
