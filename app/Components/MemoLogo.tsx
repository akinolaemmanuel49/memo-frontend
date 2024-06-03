import { Bookmark } from "@/app/Components/Icons"

export default function MemoLogo() {
  return (
    <div className="flex flex-row items-center leading-none text-white">
      <Bookmark width={64} height={64} fill="white" />
      <p className="text-[44px]">Memo</p>
    </div>
  );
}
