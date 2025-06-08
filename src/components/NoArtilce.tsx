'use client';
import React from 'react';
import { TfiFaceSad } from "react-icons/tfi";
const NoArtilce = () => {
    return (
        <div className="flex justify-center items-center  text-violet-600 text-xl font-semibold">
            <span className='mx-2'> <TfiFaceSad size={40} /></span> Oops No Article found!
        </div>
    );
}

export default NoArtilce;
