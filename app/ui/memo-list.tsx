"use client";

import { Memo } from "@/app/lib/types";
import MemoCard from "@/app/ui/cards/memo-card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MemoList() {
    const [memos, setMemos] = useState<Memo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const router = useRouter();

    const fetchData = async (pageNumber: number) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            setError("Access token not found.");
            setLoading(false);
            router.push("/signin");
            return null;
        }
        try {
            const response = await axios.get<Memo[]>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/memo/feed?page=${pageNumber}&pageSize=5`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            );
            return response.data;
        } catch (error) {
            setError("Failed to fetch user profile.");
            console.error(error);
            router.push("/signin");
            return null;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchData(page).then(data => {
            if (data) {
                if (page === 1) {
                    setMemos(data); // Set memos directly for the first page
                } else {
                    setMemos(prevMemos => [...prevMemos, ...data]); // Append data for subsequent pages
                }
                setHasMore(!!data.length); // Set hasMore based on whether data.length is truthy
            } else {
                setHasMore(false); // Set hasMore to false if data is null
            }
        });
    }, [page, router]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    if (loading && memos.length === 0) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-600">{error}</div>;
    }

    return (
        <div className="space-y-4 mt-4">
            {memos.map(memo => (
                <MemoCard key={memo.id} memo={memo} />
            ))}
            <div className="flex justify-center">
                <button
                    className="px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                    onClick={loadMore}
                    disabled={!hasMore}
                >
                    {hasMore ? "Load More" : "No more entries"}
                </button>
            </div>
        </div>
    );
}
