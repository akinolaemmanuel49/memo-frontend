import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

import { Memo, ProfileData } from "@/Lib/Types";
import { useRouter } from "next/navigation";
import SocialMenu from "../Social/SocialMenu";

export default function MemoCard({ memo }: { memo: Memo }) {
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const [userData, setUserData] = useState<ProfileData | null>(null);
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${memo.owner_id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setUserData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchData();
  }, [memo.owner_id, router]);

  const handlePlay = (
    ref: React.RefObject<HTMLVideoElement | HTMLAudioElement>
  ) => {
    if (ref.current) {
      ref.current.focus();
      ref.current.play();
    }
  };

  const handlePause = (
    ref: React.RefObject<HTMLVideoElement | HTMLAudioElement>
  ) => {
    if (ref.current) {
      ref.current.pause();
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md space-y-2">
      {userData?.username && (
        <>
          <div className="flex flex-row gap-x-2">
            <Image
              height={48}
              width={48}
              alt={`${userData.username} profile picture`}
              className="rounded-full w-8 h-8"
              src={userData.avatarURL}
            />
            <p className="text-gray-800 text-lg font-bold mb-2">
              @{userData.username}
            </p>
          </div>
          <hr />
        </>
      )}
      {memo.memo_type === "text" && (
        <p className="text-gray-800 text-lg font-bold mb-2">{memo.content}</p>
      )}
      {memo.memo_type === "image" && (
        <div className="w-full h-full">
          <p className="text-lg font-bold mb-2">{memo.caption}</p>
          <Image
            width={914}
            height={600}
            src={memo.content}
            alt={memo.caption}
            className="rounded-lg object-fill"
          />
        </div>
      )}
      {memo.memo_type === "audio" && (
        <div>
          <p className="text-lg font-bold mb-2">{memo.caption}</p>
          <audio
            controls
            src={memo.content}
            className="w-full"
            ref={mediaRef}
            onClick={() => handlePlay(mediaRef)}
            onBlur={() => handlePause(mediaRef)}
            tabIndex={0}
          />
        </div>
      )}
      {memo.memo_type === "video" && (
        <div>
          <p className="text-lg font-bold mb-2">{memo.caption}</p>
          <video
            controls
            src={memo.content}
            className="w-full rounded-lg"
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            onClick={() => handlePlay(mediaRef)}
            onBlur={() => handlePause(mediaRef)}
            tabIndex={0}
          />
        </div>
      )}
      <SocialMenu />
    </div>
  );
}
