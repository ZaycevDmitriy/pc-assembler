'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

import { prisma } from '@/lib/db';

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignupState = {
  error?: string;
};

export async function signupAction(
  _prevState: SignupState | null,
  formData: FormData,
): Promise<SignupState> {
  const name = formData.get('name') as string | undefined;
  const email = formData.get('email') as string | undefined;
  const password = formData.get('password') as string | undefined;

  if (!email) {
    return { error: 'Введите email' };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: 'Некорректный формат email' };
  }

  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    return { error: `Пароль должен содержать не менее ${MIN_PASSWORD_LENGTH} символов` };
  }

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return { error: 'Пользователь с таким email уже существует' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  redirect('/login');
}
