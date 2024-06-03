import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/app/Components/Button";
import { PostMemoButtonProps } from "@/Lib/Types";

export default function AudioMemo() {
  const [audio, setAudio] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setAudio(uploadedFile);
    }
  };

  const handleCreateAudioMemo = async () => {
    setWaiting(true);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("Access token not found.");
      router.push("/signin");
      setWaiting(false);
      return;
    }
    if (!audio) {
      setError("Image required for image memos.");
      setWaiting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("memoFile", audio);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/memo/audio`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      setError("Failed to post memo");
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
          placeholder="What's this audio about?"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="memoFile"
          className="cursor-pointer inline-flex items-center justify-center px-4 py-2 rounded-tl-none rounded-tr-none bg-gray-900 text-gray-50 border border-transparent
  rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none 
  focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
        >
          Select audio
          <input
            id="memoFile"
            accept="audio/*"
            className="hidden"
            type="file"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="flex flex-col w-full">
        {error && <p className="text-red-500">{error}</p>}
        <PostAudioMemoButton
          onPost={handleCreateAudioMemo}
          waitingStatus={waiting}
        />
      </div>
    </div>
  );
}

function PostAudioMemoButton({ onPost, waitingStatus }: PostMemoButtonProps) {
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
