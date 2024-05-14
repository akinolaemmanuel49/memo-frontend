"use client";

import ProfileCard from "@/app/ui/cards/profile-card";

export default function ProfilePage() {
    
    return (
        <main>
            <h1 className='md-4 text-xl md:text-2xl text-center md:text-start'>
                Profile
            </h1>
            <ProfileCard />
        </main>
    );
}
