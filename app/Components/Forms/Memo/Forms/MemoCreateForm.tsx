import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { ArrowRightCircle } from "@/app/Components/Icons";
import { Button } from "@/app/Components/Button";
import { PostMemoButtonProps } from "@/Lib/Types";

function Memo() {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [memoType, setMemoType] = useState<
    "text" | "image" | "audio" | "video"
  >("text");
  const [error, setError] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const fileType = uploadedFile.type.split("/")[0];
      switch (fileType) {
        case "image":
          setMemoType("image");
          break;
        case "audio":
          setMemoType("audio");
          break;
        case "video":
          setMemoType("video");
          break;
        default:
          setMemoType("text");
      }
    } else {
      setMemoType("text");
    }
  };

  const handleCreateMemo = async () => {
    setWaiting(true);
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("Access token not found.");
      router.push("/signin");
      setWaiting(false);
      return;
    }

    if (!file) {
      setWaiting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("resourceFile", file);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/memo/${memoType}`,
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
    <div className="flex flex-col justify-start items-start bg-white">
      <div className="w-full">
        <textarea
          name="content"
          className="w-full h-full p-4 border border-gray-600 rounded-lg rounded-bl-none rounded-br-none focus:outline-none focus:ring focus:border-blue-500"
          value={content}
          onChange={handleInputChange}
          rows={2}
          placeholder="What's on your mind?"
        />
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex mb-2 w-24 h-8">
          <label
            htmlFor="resourceFile"
            className="cursor-pointer inline-flex items-center justify-center px-4 py-2 rounded-tl-none rounded-tr-none bg-gray-900 text-gray-50 border border-transparent
  rounded-md font-semibold text-xs text-nowrap uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none 
  focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
          >
            Select Media
            <input
              id="resourceFile"
              accept="image/*,audio/*,video/*"
              className="hidden"
              type="file"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="flex justify-end">
          <PostMemoButton onPost={handleCreateMemo} waitingStatus={waiting} />
        </div>
      </div>

      <div className="flex flex-col w-full">
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

function PostMemoButton({ onPost, waitingStatus }: PostMemoButtonProps) {
  return (
    <Button
      className="flex justify-center w-[136.2px] h-8 rounded-tr-none rounded-tl-none text-white"
      aria-disabled={waitingStatus}
      onClick={onPost}
    >
      {waitingStatus ? "Wait..." : "Post"}
    </Button>
  );
}

export default Memo;
