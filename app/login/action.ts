'use server';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';

export type LoginState = { error?: string };

export const loginAction = async (
  _prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> => {
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();

  if (!email || !password) {
    return { error: 'Введите email или пароль' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    });
    redirect(`/dashboard`);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Неверный email или пароль' };
      }
      return { error: 'Ошибка авторизации' };
    }
    throw error;
  }
};
