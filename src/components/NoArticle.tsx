'use client';
import React from 'react';
import { TfiFaceSad } from "react-icons/tfi";
const NoArticle = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center text-violet-600 text-lg sm:text-xl font-semibold py-10 px-4 text-center gap-3">
            <TfiFaceSad size={40} className="mx-auto sm:mx-0" />
            <span>Oops! No article found.</span>
        </div>

    );
}

export default NoArticle;
