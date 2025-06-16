'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from './ui/button';
import Profile from './profile/profile';
import SearchBox from './SearchBox';
import { useUserStore } from '@/hooks/useUserStore';
import { useHeadingStore } from '@/hooks/useHeadingStore';
import NavbarSkeleton from './skeleton/navbar-skeleton';
import { useFetchStore } from '@/hooks/useFetchStore';

export default function Navbar() {
  const { user, setUser, clearUser } = useUserStore();
  const { clearHeading } = useHeadingStore();
  const router = useRouter();
  const pathname = usePathname();

  const [fetchingUser, setFetchingUser] = useState(false);
  const { resetFetchALL } = useFetchStore()
  const notAllowedPaths = ['/login', '/signup'];
  const shouldHideNavbar = notAllowedPaths.includes(pathname);

  useEffect(() => {
    if (user || shouldHideNavbar) return;

    const fetchUser = async () => {
      setFetchingUser(true);
      try {
        const res = await fetch('/api/user/me');
        if (!res.ok || res.status === 401) {
          clearUser();
          router.push('/login');
        } else {
          const data = await res.json();
          setUser({
            name: data.name,
            email: data.email,
            user_id: data.userId,
          });
        }
      } catch {
        clearUser();
      } finally {
        setFetchingUser(false);
      }
    };

    fetchUser();
  }, [user, pathname, router, setUser, clearUser, shouldHideNavbar]);

  if (shouldHideNavbar) return null;
  if (fetchingUser) return <NavbarSkeleton />;
  if (!user) return null;

  return (
    <nav className="w-full px-4 py-4 bg-white shadow-md border-b border-violet-200">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <Link href="/">
          <h1
            className="text-2xl font-extrabold text-violet-700 hover:text-violet-900 transition-colors duration-200 cursor-pointer text-center sm:text-left"
            onClick={() => {
              clearHeading()
              resetFetchALL()
            }}
          >
            AI-Powered Knowledge Hub
          </h1>
        </Link>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <div className="w-full sm:w-auto">
            <SearchBox />
          </div>

          <Link href="/articles/new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white shadow-md">
              Post Article
            </Button>
          </Link>

          <div className="w-full sm:w-auto">
            <Profile name={user.name} userId={user.user_id} />
          </div>
        </div>
      </div>
    </nav>
  );
}
