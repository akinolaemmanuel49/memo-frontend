"use client";

import { useState } from "react";
import { Button } from "@/app/Components/Button";
import TextMemo from "@/app/Components/Forms/Memo/Forms/TextMemoCreateForm";
import ImageMemo from "@/app/Components/Forms/Memo/Forms/ImageMemoCreateForm";
import AudioMemo from "@/app/Components/Forms/Memo/Forms/AudioMemoCreateForm";
import VideoMemo from "@/app/Components/Forms/Memo/Forms/VideoMemoCreateForm";
import { AudioIcon, ImageIcon, TextIcon, VideoIcon } from "@/app/Components/Icons";

export default function MemoContainer() {
  const [contentType, setContentType] = useState<
    "text" | "image" | "audio" | "video"
  >("text");

  const renderComponent = () => {
    switch (contentType) {
      case "text":
        return <TextMemo />;
      case "image":
        return <ImageMemo />;
      case "audio":
        return <AudioMemo />;
      case "video":
        return <VideoMemo />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-start space-x-2">
        <Button
          className={`rounded-b-none hover:bg-gray-950 hover:text-white ${
            contentType === "text"
              ? "bg-gray-950 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setContentType("text")}
        >
          <span className="hidden md:inline">Text</span>
          <TextIcon className="inline md:hidden" />
        </Button>
        <Button
          className={`rounded-b-none hover:bg-gray-950 hover:text-white ${
            contentType === "image"
              ? "bg-gray-950 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setContentType("image")}
        >
          <span className="hidden md:inline">Image</span>
          <ImageIcon className="inline md:hidden" />
        </Button>
        <Button
          className={`rounded-b-none hover:bg-gray-950 hover:text-white ${
            contentType === "audio"
              ? "bg-gray-950 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setContentType("audio")}
        >
          <span className="hidden md:inline">Audio</span>
          <AudioIcon className="inline md:hidden" />
        </Button>
        <Button
          className={`rounded-b-none hover:bg-gray-950 hover:text-white ${
            contentType === "video"
              ? "bg-gray-950 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setContentType("video")}
        >
          <span className="hidden md:inline">Video</span>
          <VideoIcon className="inline md:hidden" />
        </Button>
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
}
