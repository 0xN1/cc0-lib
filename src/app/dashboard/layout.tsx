import ConnectButton from "@/components/web3/connect-button";
import { Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex h-auto w-full min-w-min max-w-7xl flex-col border-2 border-zinc-700">
      <header className="flex w-full flex-row items-center justify-between border-b-2 border-zinc-700 bg-zinc-900">
        <Link
          href="/dashboard"
          className="flex h-full flex-row items-center justify-start gap-8 border-r-2 border-zinc-700 px-16 py-8"
        >
          <Image src="/cc0lib.svg" alt="logo" width={60} height={60} />
          <h1 className="mr-12 font-jetbrains text-xl uppercase">dashboard</h1>
        </Link>
        <div className="flex flex-row items-center justify-end gap-4 p-4">
          <Marquee className="font-jetbrains uppercase">
            <div className="mr-2">
              Super massive long text that will scroll for a while. Very long
              text for you to read. This is a test. A yayaya. A test again.
            </div>
          </Marquee>
          <div className="px-4">
            <ConnectButton />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};
export default DashboardLayout;