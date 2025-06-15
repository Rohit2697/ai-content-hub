'use client';
import React from 'react';

const PreviewArticleSkeleton = () => {
    return (
        <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 bg-white rounded-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 bg-violet-300 animate-pulse h-8 rounded"></h1>

            <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-violet-300 animate-pulse h-6 rounded-full text-xs sm:text-sm font-medium px-3 py-1"></span>
                <span className="bg-violet-300 animate-pulse h-6 rounded-full text-xs sm:text-sm font-medium px-3 py-1"></span>
                <span className="bg-violet-300 animate-pulse h-6 rounded-full text-xs sm:text-sm font-medium px-3 py-1"></span>
            </div>

            <div className="w-full rounded-lg mb-6 bg-violet-300 animate-pulse h-40"></div>

            <p className="text-sm sm:text-base md:text-lg text-violet-700 mb-6 bg-violet-300 animate-pulse p-4 rounded"></p>

            <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-violet-900">
                <div className="bg-violet-300 animate-pulse h-48 rounded"></div>
            </article>

            <div className="mt-8 text-center sm:text-right">
                <button className="w-full sm:w-auto bg-violet-300 animate-pulse text-white px-6 py-2 rounded h-10"></button>
            </div>
        </main>
    );
}

export default PreviewArticleSkeleton;
