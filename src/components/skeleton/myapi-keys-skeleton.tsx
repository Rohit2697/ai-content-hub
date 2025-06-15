'use client';

import React from 'react';

const MyapiKeysSkeleton = () => {
    return (
        <main className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 bg-white">
            <div className="animate-pulse">
                <div className="h-8 sm:h-12 bg-violet-300 rounded mb-6 sm:mb-10"></div>
                <div className="my-4 flex justify-center">
                    <div className="h-12 w-48 bg-violet-300 rounded"></div>
                </div>
                <div className="space-y-4">
                    <div className="relative border border-violet-400 p-4 rounded-lg bg-violet-200">
                        <div className="absolute top-2 right-2 flex gap-2">
                            <button className="h-8 w-8 bg-violet-300 rounded-full"></button>
                            <button className="h-8 w-8 bg-violet-300 rounded-full"></button>
                        </div>
                        <div className="h-6 bg-violet-300 rounded mb-2"></div>
                        <div className="h-6 bg-violet-300 rounded"></div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MyapiKeysSkeleton;
