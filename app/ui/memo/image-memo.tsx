import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Button } from "@/app/ui/button";
import { ArrowRightCircle } from "@/app/ui/icons";
import { PostMemoButtonProps } from "@/app/lib/types";

export default function ImageMemo() {
    const [image, setImage] = useState<File | null>(null);
    const [caption, setCaption] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [waiting, setWaiting] = useState(false);

    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCaption(e.target.value)
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) {
            setImage(uploadedFile);
        }
    };

    const handleCreateImageMemo = async () => {
        setWaiting(true);
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            setError("Access token not found.");
            router.push("/signin");
            setWaiting(false);
            return;
        }
        if (!image) {
            setError("Image required for image memos.");
            setWaiting(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("caption", caption);
            formData.append("memoFile", image);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/memo/image`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
        } catch (error) {
            // Check if the error is net::ERR_EMPTY_RESPONSE
            if ((error as any).code === "ECONNABORTED" && (error as any).message === "Network Error") {
                console.error("Request aborted due to net::ERR_EMPTY_RESPONSE");
                // Continue execution without setting error or showing any message
            } else {
                setError("Failed to post memo");
            }
        } finally {
            setWaiting(false);
        }
    };


    return (
        <div className="flex flex-col justify-start items-start min-h-48 bg-white">
            <div className="w-full">
                <textarea
                    name="content"
                    className="w-full h-full p-4 border border-gray-600 rounded-lg rounded-tl-none rounded-bl-none rounded-br-none focus:outline-none focus:ring focus:border-blue-500"
                    value={caption}
                    onChange={handleInputChange}
                    rows={2}
                    placeholder="What's this image about?"
                />
            </div>
            <div className="w-full md:w-full relative grid grid-cols-1 md:grid-cols-3 border border-gray-300 bg-gray-100 rounded-lg  rounded-tl-none rounded-tr-none">
                <div className="rounded-l-lg p-4 h-32 bg-gray-200 flex flex-col justify-center items-center border-0 border-r border-gray-300">
                    <label
                        htmlFor="memoFile"
                        className="cursor-pointer inline-flex items-center justify-center w-48 px-4 py-2 bg-gray-900 text-gray-50 border border-transparent
  rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none 
  focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                    >
                        Select image
                        <input
                            id="memoFile"
                            accept="image/*"
                            className="hidden"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <div
                    className="relative order-first md:order-last h-28 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover"
                    style={{
                        backgroundImage: image ? `url(${URL.createObjectURL(image)})` : "",
                    }}
                >
                    {image ? null : (
                        <span className="text-gray-400 opacity-75">
                            <svg
                                className="w-14 h-14"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="0.7"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                            </svg>
                        </span>
                    )}
                </div>
            </div>
            <div className="flex flex-col w-full">
                {error && <p className="text-red-500">{error}</p>}
                <PostImageMemoButton onPost={handleCreateImageMemo} waitingStatus={waiting} />
            </div>
        </div>
    );
}

function PostImageMemoButton({ onPost, waitingStatus }: PostMemoButtonProps) {
    return (
        <Button
            className="flex justify-center mt-4 w-full text-white"
            aria-disabled={waitingStatus}
            onClick={onPost}
        >
            {waitingStatus ? "Wait..." : "Post"}
        </Button>
    );
}