"use client"

import { useRouter } from "next/navigation";
import UploadProfilePictureForm from "@/app/ui/forms/upload-profile-picture-form";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { ArrowLeftCircle } from "@/app/ui/icons";

export default function UploadProfilePicturePage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const handleProfilePictureUploadSuccess = () => {
        router.push("/profile")
    };

    const handleProfilePictureUploadError = (error: string) => {
        setError(error)
    };
    return (
        <main>
            <h1 className='md-4 text-xl md:text-2xl text-center md:text-start'>
                Profile Picture
            </h1>
            <div className="flex justify-end">
                <Link href="/profile/update">
                    <Button className="flex mb-4 w-72 text-white">
                        <ArrowLeftCircle className="mr-auto h-5 w-5 text-gray-50" /> Go back
                    </Button>
                </Link>
            </div>
            <UploadProfilePictureForm onSuccess={handleProfilePictureUploadSuccess} onError={handleProfilePictureUploadError} />
        </main>
    )
}