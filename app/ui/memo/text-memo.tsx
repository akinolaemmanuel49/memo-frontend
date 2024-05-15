import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { TextMemoForm as FormData, PostTextMemoButtonProps } from "@/app/lib/types";
import { Button } from "@/app/ui/button";

export default function TextMemo() {
    const [formData, setFormData] = useState<FormData>({
        content: "",
    })
    const [error, setError] = useState<string | null>(null);
    const [waiting, setWaiting] = useState(false);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        })
    };

    const handleCreateTextMemo = async () => {
        setWaiting(true);
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setError("Access token not found.");
            router.push("/signin");
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/memo/text`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            setWaiting(false);
        } catch (error) {
            console.error("Failed to create new memo entry:", error);
            throw error;
        }
    }

    return (
        <div className="flex flex-col w-full h-full items-start bg-white">
            <div className="w-full">
                <textarea
                    name="content"
                    className="w-full h-full p-4 border border-gray-600 rounded-lg rounded-tl-none focus:outline-none focus:ring focus:border-blue-500"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="What's on your mind?"
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <PostTextMemoButton onPost={handleCreateTextMemo} waitingStatus={waiting} />
        </div>
    )
}

function PostTextMemoButton({ onPost, waitingStatus }: PostTextMemoButtonProps) {
    return (
        <Button className="flex justify-center mt-4 w-full text-white"
            aria-disabled={waitingStatus}
            onClick={onPost}>
            {waitingStatus ? "Wait..." : "Post"}
        </Button>
    )
}