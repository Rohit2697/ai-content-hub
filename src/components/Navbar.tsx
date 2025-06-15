'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import Profile from './profile/profile';
import SearchBox from './SearchBox';
import { useUserStore } from '@/hooks/useUserStore';
import { useHeadingStore } from '@/hooks/useHeadingStore';
import { useRouter } from 'next/navigation';
import { usePostStore } from '@/hooks/usePostStore';


export default function Navbar() {
  const { user, setUser } = useUserStore()
  const { clearHeading } = useHeadingStore()
  const { clearPosts } = usePostStore()
  const [initializing, setInitializing] = useState(false)

  const router = useRouter()

  const notAllowedPath = ['/login', '/signup']

  useEffect(() => {
    setInitializing(true)
  }, [])
  useEffect(() => {

    if (user) return
    const fetchUser = async () => {
      const res = await fetch('/api/user/me')
      if (res.status == 401 || !res.ok) {
        router.push('/login')
        return
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
  }, [user, router])
  if (!initializing) return null
  if (typeof window !== "undefined") {
    if (notAllowedPath.includes(window.location.pathname)) {
      return null
    }
  }

  if (!user) return null
  return (
    <nav className="w-full px-4 py-4 bg-white shadow-md border-b border-violet-200">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <Link href="/">
          <h1
            className="text-2xl font-extrabold text-violet-700 hover:text-violet-900 transition-colors duration-200 cursor-pointer text-center sm:text-left"
            onClick={clearHeading}
          >
            AI-Powered Knowledge Hub
          </h1>
        </Link>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <div className="w-full sm:w-auto">
            <SearchBox />
          </div>

          <Link href="/articles/new" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white shadow-md" onClick={clearPosts}>
              Post Article
            </Button>
          </Link>

          {user && (
            <div className="w-full sm:w-auto">
              <Profile name={user.name} userId={user.user_id} />
            </div>
          )}
        </div>
      </div>
    </nav>

  );
}
