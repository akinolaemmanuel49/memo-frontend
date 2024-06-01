"use client";

import { Memo } from "@/app/lib/types";
import MemoCard from "@/app/ui/cards/memo-card";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MemoList() {
    const [memos, setMemos] = useState<Memo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                setError("Access token not found.");
                setLoading(false);
                router.push("/signin");
                return;
            }
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/memo/feed?page&pageSize=100`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                setMemos(response.data);
            } catch (error) {
                setError("Failed to fetch user profile.");
                console.error(error);
                router.push("/signin");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    if (loading) {
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
        </div>
    );
}
