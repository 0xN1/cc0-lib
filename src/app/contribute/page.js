import Container from "@/components/ui/container";
import { Dot } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async () => {
  const title = `Contribute | CC0-LIB`;
  const description = "How to contribute to CC0-LIB";
  const image = `https://cc0-lib.wtf/og.png`;
  const url = `https://cc0-lib.wtf/contribute`;

  return {
    title: title,
    description: description,
    image: image,
    url: url,
    type: "website",
    openGraph: {
      title: title,
      description: description,
      url: url,
      type: "website",
      images: [
        {
          url: image,
          width: 800,
          height: 400,
          alt: title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [image],
    },
  };
};

const ContributePage = () => {
  return (
    <Container>
      <div className="duration-250 peer flex w-full flex-col gap-8 bg-transparent px-4 py-16 text-prim drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-zinc-800 focus:bg-opacity-50 focus:outline-none focus:backdrop-blur-md sm:p-16">
        <span className="font-rubik text-4xl sm:text-6xl">contribute</span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          got more cc0 content? want to contribute?
        </span>

        <Link
          href="/submit"
          className="-mt-4 w-full max-w-prose text-lg text-white sm:w-1/2"
        >
          <div className="group flex flex-row items-center gap-2 hover:text-prim">
            <span className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800">
              submit here
            </span>
          </div>
        </Link>

        <span className="font-rubik text-4xl sm:text-6xl">bulk submission</span>
        <span className=" w-full max-w-prose text-lg text-white sm:w-1/2">
          download the csv{" "}
          <Link
            href="http://arweave.net/MmkebGQjN6kxcW8Hl84w7hXtBsa57QG4T3Mrhe4jLgU"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            here
          </Link>
          , edit and send it to us
        </span>
        <ul className="-mt-4 w-full max-w-prose text-base text-white sm:w-1/2">
          <li>
            <Dot className="inline-block h-8 w-8" />
            use direct link for images and files
          </li>
          <li>
            <Dot className="inline-block h-8 w-8" />
            imgur is okay for thumbnail image
          </li>
          <li>
            <Dot className="inline-block h-8 w-8" />
            s3/drive/dropbox/ipfs/arweave link for file
          </li>
          <li>
            <Dot className="inline-block h-8 w-8" />
            alternatively, upload to arweave using{" "}
            <Link
              href="https://uploadr.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
            >
              uploadr.app
            </Link>{" "}
            on polygon network
          </li>
        </ul>
        <span className="font-rubik text-4xl sm:text-6xl">mail us</span>
        <span className="w-full max-w-prose text-lg text-white sm:w-1/2">
          mail us: cc0-lib[at]archives.wtf
        </span>
      </div>
    </Container>
  );
};
export default ContributePage;
