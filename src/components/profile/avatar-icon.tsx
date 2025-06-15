
import React from 'react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getInitials } from '@/lib/utils';

const AvatarIcon = ({ name }: { name: string }) => {
    return (
<Avatar
  className="bg-violet-100 text-violet-700 font-semibold rounded-full border border-violet-300 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-sm p-2 sm:p-3 outline-none focus:ring-2 focus:ring-violet-300 transition duration-200"
>
  <AvatarFallback className="text-xs sm:text-sm">
    {getInitials(name)}
  </AvatarFallback>
</Avatar>


    );
}

export default AvatarIcon;

