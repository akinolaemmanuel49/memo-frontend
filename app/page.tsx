import Link from 'next/link';
import Image from 'next/image';
import MemoLogo from './ui/memo-logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col h-screen md:flex-row md:w-screen">
      <div className="relative w-full h-32 md:w-1/4 sm:h-1/2-sm">
        <div className="flex flex-col justify-center items-center h-32 md:justify-center md:items-end bg-black md:h-screen">
          <MemoLogo />
        </div>
      </div>
      <div className="flex flex-row px-4 mt-12 justify-center items-center">
        <main>
          <h1 className="text-black text-wrap text-[50px] font-bold p-4">Welcome to Memo</h1>
          <p className="text-black text-wrap text-[25px] font-bold p-4">Join today.</p>
          <div className="flex flex-col w-full items-center">
            <div>
              <Link href="/signup" className="flex flex-col h-[48px] w-64 grow items-center justify-center gap-2 rounded-lg bg-blue-500 p-3 text-md text-white font-medium hover:bg-gray-600 hover:text-white outline-blue-500 md:flex-none md:justify-start md:p-2 md:px-3">
                Create account
              </Link>
            </div>
            <p className="p-6">Already have an account?</p>
            <div>
              <Link href="/signin" className="flex flex-col h-[48px] w-64 grow items-center justify-center gap-2 rounded-lg bg-white p-3 text-md font-medium hover:bg-gray-600 hover:text-white outline-gray-600 md:flex-none md:justify-start md:p-2 md:px-3">
                Sign in
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
