'use client';
import React from 'react';
import { ArticleCardProps } from '@/app/articles/article-type';
import Link from 'next/link';
import { timestampToDateTimeString } from '@/lib/utils';

export default function ArticleCard({
  id,
  title,
  description,
  tags,
  author,
  date,
}: ArticleCardProps) {

  return (
    <Link href={`/articles/${id}`} className="block">
      <div className="w-full h-auto sm:h-[300px] border border-violet-300 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white hover:bg-violet-50 flex flex-col justify-between">

        {/* Title */}
        <h2 className="text-base sm:text-lg font-bold text-violet-700 mb-2 hover:text-violet-900 transition-colors duration-200 line-clamp-2 min-h-[44px] sm:min-h-[48px]">
          {title}
        </h2>

        {/* Description */}
        <div className="text-sm text-gray-700 mb-3 sm:mb-4 relative min-h-[60px] sm:min-h-[64px]">
          <p className="line-clamp-3">
            {description}
          </p>
          {description.length > 200 && (
            <span className="text-violet-700 font-semibold">
              ...Read More
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-3 sm:mb-4 min-h-[36px] sm:min-h-[40px] items-start">
          {tags && tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="bg-violet-100 text-violet-700 text-xs px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-violet-500 font-medium mt-auto pt-2 border-t border-violet-100 gap-1 sm:gap-0">
          <span>by {author}</span>
          <span>{timestampToDateTimeString(parseInt(date))}</span>
        </div>
      </div>
    </Link>



  );
}
