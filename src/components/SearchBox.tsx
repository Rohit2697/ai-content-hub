'use client';
import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
//import { useDebounce } from '@/hooks/useDebounce';
import { usePostStore } from '@/hooks/usePostStore';
//import { useHeadingStore } from '@/hooks/useHeadingStore';
const SearchBox = () => {
    const [searchValue, setSearchValue] = useState('')
    const [debounceValue, setDebounceValue] = useState('')
    //const { setHeading } = useHeadingStore()
    const { setPosts } = usePostStore()
    useEffect(() => {
        console.log(searchValue);
        const timer = setTimeout(() => {
            setDebounceValue(searchValue)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchValue, setPosts])

    useEffect(() => {

        const searchArticles = async (value: string) => {
            const api = `/api/article`
            const searchQuery = '?search='
            let searchString = ''

            try {
                if (!value)
                    searchString = api;
                else searchString += api + searchQuery + value

                const res = await fetch(searchString)
                if (!res.ok) {
                    return setPosts([])
                }
                const data = await res.json()
                return setPosts(data)
            } catch {
                return setPosts([])
            }


        }
        searchArticles(debounceValue)
    }, [debounceValue, setPosts])
    return (
        <div className="relative w-full max-w-xs md:max-w-md">
            <Input
                type="text"
                value={searchValue}
                placeholder="Search articles..."
                onChange={(e) => {
                  //  setHeading('Search Results')
                    setSearchValue(e.target.value)
                }}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
            <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                />
            </svg>
        </div>
    );
}

export default SearchBox;
