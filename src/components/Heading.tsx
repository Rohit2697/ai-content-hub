'use client';

import { useHeadingStore } from "@/hooks/useHeadingStore";

export default function Heading() {
    const { heading } = useHeadingStore()
    return (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-8 md:mb-10 text-violet-700 border-b-2 sm:border-b-4 border-violet-300 pb-2">
            {heading}
        </h1>

    )
}

