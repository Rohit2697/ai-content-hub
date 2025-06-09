'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import Profile from './profile/profile';
import SearchBox from './SearchBox';
import { useUserStore } from '@/hooks/useUserStore';
import { useHeadingStore } from '@/hooks/useHeadingStore';
import { useRouter } from 'next/navigation';


export default function Navbar() {
  const { user, setUser } = useUserStore()
  const { clearHeading } = useHeadingStore()
  const router = useRouter()
  useEffect(() => {
    if (user) return
    const fetchUser = async () => {
      const res = await fetch('/api/user/me')
      if (res.status == 401 || !res.ok) {
        router.push('/login')
      }
      const data = await res.json()
      const updateUser = {
        name: data.name,
        email: data.email,
        user_id: data.userId
      }
      setUser(updateUser)
    }
    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 bg-white shadow-md border-b border-violet-200">
      <Link href={'/'}>
        <h1 className="text-2xl font-extrabold text-violet-700 hover:text-violet-900 cursor-pointer transition-colors duration-200"
          onClick={clearHeading}
        >
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
        {user && <Profile name={user.name} userId={user.user_id} />}
      </div>
    </nav>
  );
}
