import React from 'react';

const ArticleFormGenerateSkeleton = () => {
    return (
        <>
            <div className="bg-white space-y-6">
                <div>
                    <label className="block text-base sm:text-lg font-semibold mb-2 bg-violet-300 animate-pulse h-6 w-1/2 rounded"></label>
                    <input className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 text-violet-500 bg-violet-200 animate-pulse rounded-full" type="file" />
                </div>

                <div className="w-full max-h-[300px] bg-violet-200 animate-pulse rounded-lg"></div>

                <div>
                    <label className="block text-base sm:text-lg font-semibold mb-1 bg-violet-300 animate-pulse h-6 w-1/3 rounded"></label>
                    <input className="w-full h-10 bg-violet-200 animate-pulse rounded" />
                </div>

                <div>
                    <label className="block text-base sm:text-lg font-semibold mb-1 bg-violet-300 animate-pulse h-6 w-1/3 rounded"></label>
                    <input className="w-full h-10 bg-violet-200 animate-pulse rounded" required />
                </div>

                <div>
                    <label className="block text-base sm:text-lg font-semibold mb-1 bg-violet-300 animate-pulse h-6 w-1/3 rounded"></label>
                    <textarea className="w-full h-24 bg-violet-200 animate-pulse rounded" required></textarea>
                </div>

                <div>
                    <label className="block text-base sm:text-lg font-semibold mb-1 bg-violet-300 animate-pulse h-6 w-1/3 rounded"></label>
                    <div className="rounded border border-violet-300 p-2 bg-violet-200 animate-pulse">
                        <div className="mb-6">
                            <div className="rounded-t-md border border-b-0 border-violet-300 bg-violet-300 animate-pulse p-2 sm:p-3"></div>
                            <div className="rounded-b-md border border-violet-300 p-2 sm:p-4 min-h-[200px] bg-violet-200 animate-pulse"></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-end w-full">
                    <button className="w-full sm:w-auto bg-violet-300 animate-pulse h-10 rounded px-6"></button>
                    <button className="w-full sm:w-auto bg-violet-300 animate-pulse h-10 rounded px-6"></button>
                </div>
            </div>
        </>
    );
}

export default ArticleFormGenerateSkeleton;
