'use client';
import React from 'react';
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '../ui/dropdown-menu';
import { usePostStore } from '@/hooks/usePostStore';

import Link from 'next/link';
import { useUserStore } from '@/hooks/useUserStore';
import { useArticleFormStore } from '@/hooks/useArticleFormStore';
import { useHeadingStore } from '@/hooks/useHeadingStore';
import { useRouter } from 'next/navigation';

const ProfileMenu = () => {
    const { clearUser } = useUserStore()
    const { clearArticleData } = useArticleFormStore()
    const { clearPosts } = usePostStore()
    const { setHeading } = useHeadingStore()
    const { setPosts } = usePostStore()
    const router = useRouter()
    const handleLogout = async () => {
        await fetch('/api/logout');
        clearUser()
        clearArticleData()
        clearPosts()
        //setHeading('Latest Articles')
        router.push('/login');
    }

    const handleMyArticle = async () => {
        setHeading('My Articles')
        try {
            const res = await fetch('/api/user/articles')
            if (!res.ok) return setPosts([])
            setPosts(await res.json())
        } catch {
            setPosts([])
        }
        router.push('/')
    }
    return (
        <DropdownMenuContent
            className="mt-2 w-40 rounded-lg border border-gray-200 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2"
            align="end"
        >
            <DropdownMenuGroup>
                <DropdownMenuItem className="hover:bg-violet-100 text-sm font-medium cursor-pointer transition-colors" onClick={handleLogout}>
                    Logout
                </DropdownMenuItem>

                <DropdownMenuItem className="hover:bg-violet-100 text-sm font-medium cursor-pointer transition-colors" onClick={handleMyArticle}>
                    My Article
                </DropdownMenuItem>
                <Link href="/apikeys">
                    <DropdownMenuItem className="hover:bg-violet-100 text-sm font-medium cursor-pointer transition-colors" >
                        API Keys
                    </DropdownMenuItem>
                </Link>


            </DropdownMenuGroup>
        </DropdownMenuContent>
    );
}

export default ProfileMenu;
