'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import Profile from './profile/profile';
import SearchBox from './SearchBox';
import { useUserStore } from '@/hooks/useUserStore';

export default function Navbar({ name, userId, email }: { name: string, userId: string, email: string }) {
  const { setUser } = useUserStore()
  useEffect(() => {
    setUser({
      name,
      user_id: userId,
      email
    })
  }, [])

  const profilePropsValue = { name, userId }
  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 bg-white shadow-md border-b border-violet-200">
      <Link href={'/'}>
        <h1 className="text-2xl font-extrabold text-violet-700 hover:text-violet-900 cursor-pointer transition-colors duration-200">
          AI-Powered Knowledge Hub
        </h1>
      </Link>
      <div className="flex items-center gap-8 text-violet-600 font-medium">
        <SearchBox />

        <Link href="/articles/new">
          <Button
            className="bg-violet-600 hover:bg-violet-700 text-white shadow-md"
            variant="default"
          >
            Post Article
          </Button>
        </Link>
        <Profile {...profilePropsValue} />
      </div>
    </nav>
  );
}
