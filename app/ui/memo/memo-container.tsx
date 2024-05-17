"use client";

import { useState } from "react";
import { Button } from "@/app/ui/button";
import TextMemo from "@/app/ui/memo/text-memo";
import ImageMemo from "@/app/ui/memo/image-memo";
import AudioMemo from "@/app/ui/memo/audio-memo";
import VideoMemo from "@/app/ui/memo/video-memo";

export default function MemoContainer() {
    const [contentType, setContentType] = useState<"text" | "image" | "audio" | "video">("text");

    const renderComponent = () => {
        switch (contentType) {
            case "text":
                return <TextMemo />
            case "image":
                return <ImageMemo />
            case "audio":
                return <AudioMemo />
            case "video":
                return <VideoMemo />
            default:
                return null;
        }
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-start space-x-2">
                <Button className={`rounded-b-none hover:bg-gray-950 hover:text-white ${contentType === "text" ? "bg-gray-950 text-white" : "bg-white text-black"}`} onClick={() => setContentType("text")}>
                    Text
                </Button>
                <Button className={`rounded-b-none hover:bg-gray-950 hover:text-white ${contentType === "image" ? "bg-gray-950 text-white" : "bg-white text-black"}`} onClick={() => setContentType("image")}>
                    Image
                </Button>
                <Button className={`rounded-b-none hover:bg-gray-950 hover:text-white ${contentType === "audio" ? "bg-gray-950 text-white" : "bg-white text-black"}`} onClick={() => setContentType("audio")}>
                    Audio
                </Button>
                <Button className={`rounded-b-none hover:bg-gray-950 hover:text-white ${contentType === "video" ? "bg-gray-950 text-white" : "bg-white text-black"}`} onClick={() => setContentType("video")}>
                    Video
                </Button>
            </div>
            <div>{renderComponent()}</div>
        </div>
    )
}
