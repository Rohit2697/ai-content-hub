import React from 'react';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';
import AvatarIcon from './avatar-icon';
import ProfileMenu from './profile-menu';

const Profile = ({ name }: { name: string, userId: string }) => {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="rounded-full focus:outline-none focus:ring-2 focus:ring-violet-400 transition-shadow hover:shadow-md p-1 sm:p-0"
                    aria-label="Open profile menu"
                >
                    <AvatarIcon name={name} />
                </button>
            </DropdownMenuTrigger>
            <ProfileMenu />
        </DropdownMenu>

    );
}

export default Profile;
