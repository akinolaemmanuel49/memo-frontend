import SignupForm from "@/app/Components/Forms/Auth/SignupForm";
import MemoLogo from "@/app/Components/MemoLogo";

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-center justify-center rounded-lg bg-black p-3 md:h-36">
          <div className="w-64 text-white md:w-64">
            <MemoLogo />
          </div>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
