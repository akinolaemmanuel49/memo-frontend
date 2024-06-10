"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import MemoLogo from "@/app/Components/MemoLogo";
import Greetings from "@/app/Components/Cards/Greetings";
import { ArrowRightCircle } from "@/app/Components/Icons";

export default function LandingPage() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  return (
    <div className="flex flex-col h-screen md:flex-row md:w-screen">
      <div className="relative w-full h-32 md:w-1/4 md:h-screen">
        <div className="flex flex-col justify-center items-center h-32 md:justify-center md:items-end bg-black md:h-full">
          <MemoLogo />
        </div>
      </div>
      <div className="flex flex-col px-4 mt-12 justify-center items-center md:flex-row md:justify-center md:items-center">
        {accessToken ? (
          <main>
            <Greetings />
            <div className="flex flex-col w-full items-center">
              <div className="mb-6 mt-6 w-full">
                <Link
                  href="/home"
                  className="flex h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-white p-3 text-md text-black font-medium hover:bg-black hover:text-white outline-blue-500"
                >
                  Go Home{" "}
                  <ArrowRightCircle className="ml-auto h-5 w-5" />
                </Link>
              </div>
            </div>
          </main>
        ) : (
          <main>
            <h1 className="text-black text-wrap text-[50px] font-bold p-4">
              Welcome to Memo
            </h1>
            <p className="text-black text-wrap text-[25px] font-bold p-4">
              Join today.
            </p>
            <div className="flex flex-col w-full items-center">
              <div className="mb-6">
                <Link
                  href="/signup"
                  className="flex h-[48px] w-64 items-center justify-center gap-2 rounded-lg bg-blue-500 p-3 text-md text-white font-medium hover:bg-gray-600 hover:text-white outline-blue-500"
                >
                  Create account
                </Link>
              </div>
              <p className="p-6">Already have an account?</p>
              <div>
                <Link
                  href="/signin"
                  className="flex h-[48px] w-64 items-center justify-center gap-2 rounded-lg bg-white p-3 text-md font-medium hover:bg-gray-600 hover:text-white outline-gray-600"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
