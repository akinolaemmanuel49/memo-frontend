import { Memo } from "@/app/lib/types";
import { useRef } from "react";

export default function MemoCard({ memo }: { memo: Memo }) {
    const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);

    const handlePlay = (ref: React.RefObject<HTMLVideoElement | HTMLAudioElement>) => {
        if (ref.current) {
            ref.current.focus();
            ref.current.play();
        }
    };

    const handlePause = (ref: React.RefObject<HTMLVideoElement | HTMLAudioElement>) => {
        if (ref.current) {
            ref.current.pause();
        }
    };

    return (
        <div className="border rounded-lg p-4 shadow-md space-y-2">
            {memo.memo_type === "text" && (
                <p className="text-gray-800">{memo.content}</p>
            )}
            {memo.memo_type === "image" && (
                <div className="w-full h-96">
                    <p className="text-lg font-bold mb-2">{memo.caption}</p>
                    <img
                        src={memo.content}
                        alt={memo.caption}
                        className="rounded-lg object-cover w-full h-full"
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
        </div>
    );
}
