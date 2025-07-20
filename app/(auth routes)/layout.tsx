'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../lib/store/authStore';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      // Якщо користувач не авторизований, перенаправляємо на логін
      router.push('/sign-in');
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
