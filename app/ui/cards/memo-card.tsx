import { Memo } from "@/app/lib/types";
import Image from "next/image";

export default function MemoCard({ memo }: { memo: Memo }) {
    return (
        <div className="border rounded-lg p-4 shadow-md space-y-2">
            {memo.memo_type === "text" && (
                <p className="text-gray-800">{memo.content}</p>
            )}
            {memo.memo_type === "image" && (
                <div className="w-full h-96"> {/* Adjust the height as needed */}
                    <p className="text-lg font-bold mb-2">{memo.caption}</p>
                    <div className="relative w-full h-[320px]">
                        <Image
                            src={memo.content}
                            alt={memo.caption}
                            fill={true}
                            className="rounded-lg object-cover aspect-auto"
                        />
                    </div>
                </div>
            )}
            {memo.memo_type === "audio" && (
                <div>
                    <p className="text-lg font-bold mb-2">{memo.caption}</p>
                    <audio controls src={memo.content} className="w-full" />
                </div>
            )}
            {memo.memo_type === "video" && (
                <div>
                    <p className="text-lg font-bold mb-2">{memo.caption}</p>
                    <video controls src={memo.content} className="w-full rounded-lg" />
                </div>
            )}
        </div>
    );
}