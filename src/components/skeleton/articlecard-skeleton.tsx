'use client';

import React from 'react';

const ArticlecardSkeleton = () => {
    return (
        <div className="bg-white w-full h-auto sm:h-[300px] border border-violet-300 rounded-lg p-4 sm:p-5 flex flex-col justify-between animate-pulse">

            <h2 className="bg-violet-300 h-6 sm:h-8 rounded mb-2"></h2>

            <div className="bg-violet-300 h-16 sm:h-16 rounded mb-3"></div>

            <div className="flex gap-2 flex-wrap mb-3 sm:mb-4">
                <span className="bg-violet-300 h-8 rounded-full px-3"></span>
                <span className="bg-violet-300 h-8 rounded-full px-3"></span>
                <span className="bg-violet-300 h-8 rounded-full px-3"></span>
                <span className="bg-violet-300 h-8 rounded-full px-3"></span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-violet-500 font-medium mt-auto pt-2 border-t border-violet-100 gap-1 sm:gap-0">
                <span className="bg-violet-300 h-4 w-24 rounded"></span>
                <span className="bg-violet-300 h-4 w-24 rounded"></span>
            </div>
        </div>
    );
}

export default ArticlecardSkeleton;
