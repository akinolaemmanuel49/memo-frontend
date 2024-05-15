import { Button } from "@/app/ui/button";
import ProfileForm from "@/app/ui/forms/profile-form";
import { ArrowRightCircle } from "@/app/ui/icons";
import Link from "next/link";

export default function UpdateProfilePage() {
    return (
        <main>
            <h1 className='md-4 text-xl md:text-2xl text-center md:text-start'>
                Profile
            </h1>
            <div className="flex justify-start">
                <Link href="/profile/update/avatar">
                    <Button className="flex mb-4 w-72 text-white">
                        Upload profile picture<ArrowRightCircle className="ml-auto h-5 w-5 text-gray-50" />
                    </Button>
                </Link>
            </div>
            <ProfileForm />
        </main>
    )
}