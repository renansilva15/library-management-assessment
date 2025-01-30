'use client';

import { useState, type JSX } from 'react';
import { Card, CardContent, CardTitle } from './ui/card';
import { useForm } from 'react-hook-form';
import type { LoginSchema } from '@/validations/login';
import { loginSchema } from '@/validations/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';

import type { RegisterSchema } from '@/validations/register';
import { registerSchema } from '@/validations/register';
import { useAuth } from '@/contexts/auth-context';

interface LoginProps {
  onRegisterClick: () => void;
}

interface RegisterProps {
  onLoginClick: () => void;
}

export interface AuthWrapperProps {
  children: JSX.Element;
}
// TODO: Avoid DRY with the login and register components
function Login({ onRegisterClick }: LoginProps): JSX.Element {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginSchema): Promise<void> => {
    setError(null);

    const response = await login(data.email, data.password);

    if (response.error) {
      setError(response.error);
    }
  };

  return (
    <Card className="flex w-80 flex-col gap-4 bg-secondary pt-5">
      <CardTitle className="text-center">Login</CardTitle>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-medium">Email</label>

            <Input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>

            <Input
              {...register('password')}
              type="password"
              placeholder="Enter your password"
            />

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div>
            <Button
              type="submit"
              className="w-full bg-primary text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Login'
              )}
            </Button>

            <Button
              type="button"
              className="w-full bg-secondary text-xs text-primary hover:bg-secondary hover:underline"
              onClick={onRegisterClick}
            >
              Don&apos;t have an account? Register
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Register({ onLoginClick }: RegisterProps): JSX.Element {
  const { register: registerAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterSchema): Promise<void> => {
    setError(null);

    const response = await registerAuth(data.email, data.password);

    if (response.error) {
      setError(response.error);
    }

    onLoginClick();
  };

  return (
    <Card className="flex w-80 flex-col gap-4 bg-secondary pt-5">
      <CardTitle className="text-center">Register</CardTitle>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-medium">Email</label>

            <Input
              type="email"
              placeholder="Enter your email"
              {...register('email')}
            />

            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>

            <Input
              type="password"
              placeholder="Enter your password"
              {...register('password')}
            />

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Confirm Password</label>

            <Input
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword')}
            />

            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div>
            <Button
              className="w-full bg-primary text-white"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Register'
              )}
            </Button>

            <Button
              type="button"
              className="w-full bg-secondary text-xs text-primary hover:bg-secondary hover:underline"
              onClick={onLoginClick}
            >
              Already have an account? Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function AuthWrapper({ children }: AuthWrapperProps): JSX.Element {
  const { isAuthenticated } = useAuth();
  const [isRegistered, setIsRegistered] = useState<boolean>(true);

  const toggleRegister = (): void => {
    setIsRegistered((prev) => !prev);
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      {isRegistered ? (
        <Login onRegisterClick={toggleRegister} />
      ) : (
        <Register onLoginClick={toggleRegister} />
      )}
    </div>
  );
}
