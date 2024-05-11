import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-row max-h-screen md:flex-col">
      <div className="flex h-screen">
        <div className="relative flex w-1/2 max-h-full">
          <Image
            src="https://th.bing.com/th/id/R.4844312b1079ee0b6bd1cd8f90bfbb60?rik=ApGEZ%2fi7yZDeLA&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fSuper-cool-picture-backgrounds.jpg&ehk=sgEHfm4fVk4HT36alHTZyd8CFpN6JO%2bToNd%2berN5HZE%3d&risl=&pid=ImgRaw&r=0"
            layout="fill"
            objectFit="cover"
            alt="Cool picture"
            className="">
          </Image>
        </div>
        <div className="flex px-4 mt-12 justify-start items-center">
          <main>
            <h1 className="text-black text-wrap text-[50px] font-bold">Welcome to Memo</h1>
            <p className="text-black text-wrap text-[25px] font-bold">Join today.</p>
            <Link href="/signup">
              Signup
            </Link>
            Already have an account?
            <Link href="/signin">
              Signin
            </Link>
          </main>
        </div>
      </div>
    </div>
  )
}