'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Input } from './ui/input';
//import { useDebounce } from '@/hooks/useDebounce';
import { usePostStore } from '@/hooks/usePostStore';
import { useHeadingStore } from '@/hooks/useHeadingStore';
const SearchBox = () => {

    const hasTyped = useRef(false)
    const [searchValue, setSearchValue] = useState('')
    const [debounceValue, setDebounceValue] = useState('')

    const { clearHeading, setHeading } = useHeadingStore()
    const { setPosts } = usePostStore()
    useEffect(() => {

        const timer = setTimeout(() => {
            setDebounceValue(searchValue)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchValue, setPosts])

    const onSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.value) {
            clearHeading()
        }
        else {
            setHeading('Search Results')
        }
        hasTyped.current = true
        setSearchValue(e.target.value)

    }
    useEffect(() => {
        if (!hasTyped.current) return
        const searchArticles = async (value: string) => {
            const api = `/api/article`
            const searchQuery = '?search='
            let searchString = ''

            try {
                if (!value)
                    searchString = api;
                else searchString += api + searchQuery + encodeURIComponent(value)
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
<div className="relative w-full max-w-[250px] sm:max-w-xs md:max-w-md">
  <Input
    type="text"
    value={searchValue}
    placeholder="Search articles..."
    onChange={onSearchBoxChange}
    className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
  />
  <svg
    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none"
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
