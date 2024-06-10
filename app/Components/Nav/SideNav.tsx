import Link from "next/link";
import { clsx } from "clsx";
// import { signOut } from '@/auth';

import NavLinks from "@/app/Components/Nav/NavLinks";
import MemoLogo from "@/app/Components/MemoLogo";
import { Power, Settings } from "@/app/Components/Icons";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-black p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-black md:w-full">
          <MemoLogo />
        </div>
      </Link>
      <div className="flex justify-items-end grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block" />
        <form
          action={async () => {
            "use server";
            // await signOut();
          }}
        >
          <div className="flex-col w-full grow items-center justify-center">
            <button className="h-[48px] w-full rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 md:flex md:p-2 md:px-3 md:gap-2 md:items-center">
              <Power className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
