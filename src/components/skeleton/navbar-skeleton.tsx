import React from 'react';

const NavbarSkeleton = () => {
    return (
        <>
            <nav className="w-full px-4 py-4 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                    <div className="h-10 w-48 bg-violet-300 animate-pulse rounded"></div>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                        <div className="relative w-full max-w-[250px] sm:max-w-xs md:max-w-md">
                            <input disabled={true} className=" bg-violet-300 animate-pulse w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-full shadow-sm focus:outline-none  focus:ring-violet-500 focus:border-transparent"></input>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"

                                stroke="currentColor" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-violet-400 pointer-events-none">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                                />
                            </svg>
                        </div>
                        <div className="w-full sm:w-auto">
                            <div className="md:w-25 h-10 bg-violet-600 animate-pulse rounded"></div>
                        </div>
                        <div className="w-full sm:w-auto">
                            <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-violet-400 transition-shadow hover:shadow-md p-1 sm:p-0 h-10 w-10 bg-violet-300 animate-pulse" aria-label="Open profile menu"></button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavbarSkeleton;
