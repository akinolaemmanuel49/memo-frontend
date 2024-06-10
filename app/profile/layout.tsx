import { Metadata } from "next";

import SideNav from "@/app/Components/Nav/SideNav";

export const metadata: Metadata = {
  title: "Profile",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 pt-0 md:overflow-y-auto md:p-12 md:pt-0">
        {children}
      </div>
    </div>
  );
}
