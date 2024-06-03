"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { ProfileData } from "@/Lib/Types";

export default function Greetings() {
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
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <h1 className="md-4 text-xl md:text-2xl mb-4">
      Hi, {profileData?.username}
    </h1>
  );
}
