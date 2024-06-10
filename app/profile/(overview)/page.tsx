"use client";

import ProfileCard from "@/app/Components/Cards/ProfileCard";

export default function ProfilePage() {
  return (
    <main>
      <h1 className="sticky top-0 bg-white z-10 md-4 text-xl md:text-2xl text-center md:text-start">
        Profile
      </h1>
      <ProfileCard />
    </main>
  );
}
