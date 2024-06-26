"use client";

import { useState } from "react";

import AllMemosList from "@/app/Components/Lists/AllMemosList";
import FollowingMemosList from "@/app/Components/Lists/FollowingMemosList";
import MemoContainer from "@/app/Components/Forms/Memo/MemoContainer";
import Memo from "../Forms/Memo/Forms/MemoCreateForm";

const HomeTabs = () => {
  const [activeTab, setActiveTab] = useState<"all" | "following">("all");

  const handleTabClick = (tab: "all" | "following") => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="sticky z-10 bg-white top-0 flex space-x-4 w-full justify-around">
        <button
          className={`tab-btn flex-1 px-4 py-2 rounded-lg ${
            activeTab === "all"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={() => handleTabClick("all")}
        >
          All
        </button>
        <button
          className={`tab-btn flex-1 px-4 py-2 rounded-lg ${
            activeTab === "following"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={() => handleTabClick("following")}
        >
          Following
        </button>
      </div>
      <div className="mt-4 w-full">
        <Memo />
      </div>
      <div className="w-full">
        {activeTab === "all" && <AllMemosList />}
        {activeTab === "following" && <FollowingMemosList />}
      </div>
    </div>
  );
};

export default HomeTabs;
