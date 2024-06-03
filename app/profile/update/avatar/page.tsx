"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import UploadProfilePictureForm from "@/Components/Forms/Profile/UploadProfilePictureForm";
import { Button } from "@/Components/Button";
import { ArrowLeftCircle } from "@/Components/Icons";

export default function UploadProfilePicturePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleProfilePictureUploadSuccess = () => {
    router.push("/profile");
  };

  const handleProfilePictureUploadError = (error: string) => {
    setError(error);
  };
  return (
    <main>
      <h1 className="sticky top-0 bg-white z-10 md-4 text-xl md:text-2xl text-center md:text-start">
        Profile Picture
      </h1>
      <div className="flex justify-end">
        <Link href="/profile/update">
          <Button className="flex mb-4 w-72 text-white">
            <ArrowLeftCircle className="mr-auto h-5 w-5 text-gray-50" /> Go back
          </Button>
        </Link>
      </div>
      <UploadProfilePictureForm
        onSuccess={handleProfilePictureUploadSuccess}
        onError={handleProfilePictureUploadError}
      />
    </main>
  );
}
