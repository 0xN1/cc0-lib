import { HelpingHand, Info, MoveLeft } from "lucide-react";
import Link from "next/link";

const LoadingPage = () => {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between bg-zinc-900 bg-grid p-12
font-spline selection:bg-zinc-800 selection:text-prim"
    >
      <header className="z-10 flex w-full flex-row items-center justify-between px-8">
        <Link href="/" className="flex gap-2">
          {/* <img src="./cc0lib.svg" alt="cc0lib" /> */}
          <img src="./cc0lib-h.svg" alt="cc0lib" className="w-40" />
        </Link>
        <ul className="flex items-center gap-4">
          <li>
            <Link
              href="/info"
              className="group flex flex-row items-center gap-2"
            >
              <span className="duration-250 opacity-0 transition-all ease-linear group-hover:opacity-100">
                info
              </span>
              <Info className="h-8 w-8 group-hover:stroke-prim" />
            </Link>
          </li>
        </ul>
      </header>

      <h1 className="bg-zinc-800 px-6 py-4 font-chakra text-5xl uppercase text-sec sm:text-9xl">
        LOADING
      </h1>

      <footer className="flex w-full flex-row items-center justify-between px-8">
        <Link href="/">
          <div className="group flex flex-row items-center gap-2" id="back">
            <MoveLeft className="h-8 w-8 group-hover:stroke-prim" />
            <span className="duration-250 opacity-0 transition-all ease-linear group-hover:opacity-100">
              back
            </span>
          </div>
        </Link>
        <Link href="/contribute">
          <div
            className="group flex flex-row items-center gap-2"
            id="contribute"
          >
            <span className="duration-250 opacity-0 transition-all ease-linear group-hover:opacity-100">
              contribute
            </span>
            <HelpingHand className="h-8 w-8 group-hover:stroke-prim" />
          </div>
        </Link>
      </footer>
    </main>
  );
};
export default LoadingPage;
