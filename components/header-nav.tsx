'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { Session } from 'next-auth';
import Link from 'next/link';
import { LayoutList, Plus, Users } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { getTabValue } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Props = {
  session: Session | null;
};

const HeaderNav: FC<Props> = ({ session }) => {
  const pathname = usePathname();
  const tabValue = getTabValue(pathname);

  if (!session?.user) {
    return (
      <div className="flex justify-end">
        <Button variant="secondary">
          <Link href="/login">Войти</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <div />
      <div className="flex justify-center">
        <Tabs value={tabValue} className="w-fit">
          <TabsList>
            <TabsTrigger value="dashboard" asChild>
              <Link href="/dashboard">
                <Plus className="h-4 w-4" />
                Создать сборку
              </Link>
            </TabsTrigger>
            <TabsTrigger value="builds" asChild>
              <Link href="/builds">
                <LayoutList className="h-4 w-4" />
                Мои сборки
              </Link>
            </TabsTrigger>
            <TabsTrigger value="explore" asChild>
              <Link href="/builds/explore">
                <Users className="h-4 w-4" />
                Публичные сборки
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default HeaderNav;
