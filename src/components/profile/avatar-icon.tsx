
import React from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getInitials } from '@/lib/utils';

const AvatarIcon = ({ name }: { name: string }) => {
    return (
        <Avatar
            className="bg-violet-100 text-violet-700 font-semibold rounded-full border border-violet-300 p-3 shadow-sm w-12 h-12 flex items-center justify-center outline-none focus:ring-2 focus:ring-violet-300 transition"
        >
            <AvatarFallback className="text-sm">{getInitials(name)}</AvatarFallback>
        </Avatar>

    );
}

export default AvatarIcon;

