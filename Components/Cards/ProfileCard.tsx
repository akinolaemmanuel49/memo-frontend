"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ProfileData } from "@/Lib/Types";

export default function ProfileCard() {
  const [profileData, setProfileData] = useState<ProfileData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Access token not found.");
        router.push("/signin");
      }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setProfileData(response.data);
      } catch (error) {
        setError("Failed to fetch user profile.");
        console.error(error);
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col text-xl">
      <div className="flex flex-row gap-4 mt-4 w-full justify-center md:justify-start">
        <div className="w-64 md:w-full">
          <Image
            src={profileData?.avatarURL || "/avatar/default.jpeg"}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        <div className="mt-[60px] w-64 md:w-full">
          <p className="text-md underline text-black text-right">Status</p>
          <p className="text-md text-black text-right">{profileData?.status}</p>
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-4 w-full justify-center md:justify-start">
        <div className="w-64 md:w-full">
          <p className="text-md underline text-black">First Name</p>
          <p className="text-md text-black"> {profileData?.firstName}</p>
        </div>
        <div className="w-64 md:w-full">
          <p className="text-md underline text-black text-right">Last Name</p>
          <p className="text-md text-black text-right">
            {profileData?.lastName}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-4 w-full justify-center md:justify-start">
        <div className="w-64 md:w-full">
          <p className="text-md underline text-black">Username</p>
          <p className="text-md text-black"> {profileData?.username}</p>
        </div>
        <div className="w-64 md:w-full">
          <p className="text-md underline text-black text-right">Email</p>
          <p className="text-md text-black text-right">{profileData?.email}</p>
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-4 w-full justify-center md:justify-start">
        <div className="w-64 md:w-full">
          <p className="text-md underline text-black">Followers</p>
          <p className="text-md text-black"> {profileData?.followerCount}</p>
        </div>
        <div className="w-64 md:w-full">
          <p className="text-md underline text-black text-right">Following</p>
          <p className="text-md text-black text-right">
            {profileData?.followingCount}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-4 w-full justify-center md:justify-start">
        <div className="w-64 md:w-full">
          <p className="text-md underline text-black text-center md:text-left">
            Bio
          </p>
          <p className="text-md text-black text-center md:text-left">
            {profileData?.about}
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full items-center">
        <Link
          href="/profile/update"
          className="flex flex-col mt-4 text-center h-[48px] w-64 grow items-center justify-center gap-2 rounded-lg bg-blue-500 p-3 text-md text-white font-medium hover:bg-gray-600 hover:text-white outline-blue-500 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          Update profile
        </Link>
      </div>
    </div>
  );
}
