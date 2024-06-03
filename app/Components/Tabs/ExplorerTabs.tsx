"use client";

import { useState } from "react";

import FindMemosList from "@/app/Components/Lists/FindMemosList";
import FindPeopleList from "@/app/Components/Lists/FindPeopleList";
import FindFollowingList from "@/app/Components/Lists/FindFollowingList";

const ExplorerTabs = () => {
  const [activeTab, setActiveTab] = useState<"memos" | "people" | "following">(
    "memos"
  );

  const handleTabClick = (tab: "memos" | "people" | "following") => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="sticky z-10 bg-white top-0 flex space-x-4 w-full justify-around">
        <button
          className={`tab-btn flex-1 px-4 py-2 rounded-lg ${
            activeTab === "memos"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={() => handleTabClick("memos")}
        >
          Memos
        </button>
        <button
          className={`tab-btn flex-1 px-4 py-2 rounded-lg ${
            activeTab === "people"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          }`}
          onClick={() => handleTabClick("people")}
        >
          People
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
      <div className="mt-4">
        {activeTab === "memos" && <FindMemosList />}
        {activeTab === "people" && <FindPeopleList />}
        {activeTab === "following" && <FindFollowingList />}
      </div>
    </div>
  );
};

export default ExplorerTabs;
