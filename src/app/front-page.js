"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronsUp,
  Heart,
  HelpingHand,
  Info,
  LayoutDashboard,
  Sparkles,
  XCircle,
} from "lucide-react";
import { shuffle, slugify } from "@/lib/utils";
import useLocalStorage from "@/hooks/use-local-storage";
import va from "@vercel/analytics";
import Cursor from "@/components/cursor";
import Ticker from "@/components/ui/ticker";
import ConnectButton from "@/components/connect-button";

export default function FrontPage({ initialData }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const tagSearch = searchParams.get("tag");
  const formatSearch = searchParams.get("format");
  const typeSearch = searchParams.get("type");

  const [data, setData] = useState(null);
  const [trimmedData, setTrimmedData] = useState(null);
  const [types, setTypes] = useState(null);
  const [query, setQuery] = useLocalStorage("query", "");

  const filterPanelRef = useRef(null);
  const inputRef = useRef(null);

  const [page, setPage] = useState(1);
  const limit = 6;
  const loadingRef = useRef(false);

  useEffect(() => {
    setTrimmedData(null);
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (data) {
      const shuffledData = shuffle(data);
      setTrimmedData(shuffledData.slice(0, limit));
    }
  }, [data]);

  const loadMoreData = () => {
    if (trimmedData) {
      const nextPageData = data.slice(page * limit, (page + 1) * limit);
      setTrimmedData((trimmedData) => [...trimmedData, ...nextPageData]);
      if (trimmedData.length === data.length) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleIntersect = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      loadMoreData();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [loadingRef, trimmedData]);

  const handleKeyPress = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      inputRef.current.focus();
    }
  };

  const handleSearch = useCallback(
    (e) => {
      const searchQuery = e.target.value;
      if (initialData) {
        const filteredData = initialData.filter((item) => {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          if (lowerCaseSearchQuery.length < 2) return false;
          return (
            item.Title?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Type?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Filetype?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Description?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.ENS?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Tags?.map((e) => e.toLowerCase()).includes(
              lowerCaseSearchQuery
            )
          );
        });
        setQuery(searchQuery);

        if (searchQuery === "cc0") {
          const finalData = shuffle(initialData);
          setData(finalData);
        } else {
          const finalData = shuffle(filteredData);
          setData(finalData);
        }
      }
    },
    [setQuery, initialData]
  );

  const handleSearchBar = useCallback(
    (searchQuery) => {
      if (initialData && inputRef) {
        const filteredData = initialData?.filter((item) => {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          if (lowerCaseSearchQuery.length < 2) return false;
          return (
            item.Title?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Type?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Filetype?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Description?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.ENS?.toLowerCase().includes(lowerCaseSearchQuery) ||
            item.Tags?.map((e) => e.toLowerCase()).includes(
              lowerCaseSearchQuery
            )
          );
        });
        setQuery(searchQuery);
        if (inputRef.current) {
          inputRef.current.value = searchQuery.toLowerCase();
        }

        if (searchQuery === "cc0") {
          const finalData = shuffle(initialData);
          setData(finalData);
        } else {
          const finalData = shuffle(filteredData);
          setData(finalData);
        }
      }
    },
    [setQuery, initialData]
  );

  const handleTagSearch = useCallback(
    (searchQuery) => {
      if (initialData) {
        const filteredData = initialData?.filter((item) => {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          if (lowerCaseSearchQuery.length < 2) return false;
          return item.Tags?.map((e) => e.toLowerCase()).includes(
            lowerCaseSearchQuery
          );
        });
        setQuery(searchQuery);
        inputRef.current.value = searchQuery.toLowerCase();

        if (searchQuery === "cc0") {
          const finalData = shuffle(initialData);
          setData(finalData);
        } else {
          const finalData = shuffle(filteredData);
          setData(finalData);
        }
      }
    },
    [setQuery, initialData]
  );

  const handleFormatSearch = useCallback(
    (searchQuery) => {
      if (initialData) {
        const filteredData = initialData?.filter((item) => {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          if (lowerCaseSearchQuery.length < 2) return false;
          return item.Filetype?.toLowerCase().includes(lowerCaseSearchQuery);
        });
        setQuery(searchQuery);
        inputRef.current.value = searchQuery.toLowerCase();

        if (searchQuery === "cc0") {
          const finalData = shuffle(initialData);
          setData(finalData);
        } else {
          const finalData = shuffle(filteredData);
          setData(finalData);
        }
      }
    },
    [setQuery, initialData]
  );

  const handleTypeSearch = useCallback(
    (searchQuery) => {
      if (initialData) {
        const filteredData = initialData?.filter((item) => {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          if (lowerCaseSearchQuery.length < 2) return false;
          return item.Type?.toLowerCase().includes(lowerCaseSearchQuery);
        });
        setQuery(searchQuery);
        inputRef.current.value = searchQuery.toLowerCase();

        if (searchQuery === "cc0" || searchQuery === "all") {
          const finalData = shuffle(initialData);
          setData(finalData);
        } else {
          const finalData = shuffle(filteredData);
          setData(finalData);
        }
      }
    },
    [setQuery, initialData]
  );

  const handleRandomData = () => {
    va.track("random-data");
    if (initialData) {
      const tagsList = Array.from(
        new Set(
          initialData
            .map((item) => {
              if (!item.Tags) return null;
              return item.Tags;
            })
            .flat()
            .filter((e) => e)
        )
      );

      const randomTag = tagsList[Math.floor(Math.random() * tagsList.length)];

      const randomTagData = initialData.filter((item) => {
        if (!item.Tags) return false;
        return item.Tags.includes(randomTag);
      });
      setQuery(randomTag.toLowerCase());
      inputRef.current.value = randomTag.toLowerCase();

      if (randomTag === "cc0") {
        const finalData = shuffle(randomTagData);
        setData(finalData);
      } else {
        const finalData = shuffle(randomTagData);
        setData(finalData);
      }
    }
  };

  useEffect(() => {
    if (initialData) {
      const typesList = Array.from(
        new Set(
          initialData
            .map((item) => {
              return item.Type;
            })
            .filter((e) => e)
        )
      );
      typesList.push("all");
      setTypes(typesList);
    }
  }, [initialData]);

  useEffect(() => {
    if (initialData) {
      handleSearchBar("cc0");
    }
  }, [initialData, handleSearchBar]);

  useEffect(() => {
    if (initialData && query && !typeSearch && !formatSearch && !tagSearch) {
      handleSearchBar(query);
    }
  }, [initialData, query, handleSearchBar]);

  useEffect(() => {
    if (initialData && search) {
      handleSearchBar(search);
    }
  }, [initialData, search, handleSearchBar]);

  useEffect(() => {
    if (initialData && tagSearch) {
      handleTagSearch(tagSearch);
    }
  }, [initialData, tagSearch, handleTagSearch]);

  useEffect(() => {
    if (initialData && formatSearch) {
      handleFormatSearch(formatSearch);
    }
  }, [initialData, formatSearch, handleFormatSearch]);

  useEffect(() => {
    if (initialData && typeSearch) {
      handleTypeSearch(typeSearch);
    }
  }, [initialData, typeSearch, handleTypeSearch]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!search || !tagSearch || !formatSearch || !typeSearch) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [search, tagSearch, formatSearch, typeSearch]);

  return (
    <>
      <header className="fixed z-10 flex w-full flex-row items-center justify-between px-8 sm:px-20">
        <Link href="/" className="flex gap-2">
          <img src="./cc0lib.svg" alt="cc0lib" className="block sm:hidden" />
          <img
            src="./cc0lib-h.svg"
            alt="cc0lib"
            className="hidden w-40 sm:block"
          />
        </Link>
        <ul className="flex items-center gap-4">
          <li>
            <Link
              href="/fav"
              className="group flex flex-row items-center gap-2"
            >
              <span className=" duration-250 hidden opacity-0 transition-all ease-linear group-hover:opacity-100 sm:block">
                fav
              </span>
              <Heart className="h-8 w-8 group-hover:stroke-prim" />
            </Link>
          </li>
          <li>
            <Link
              href="/info"
              className="group flex flex-row items-center gap-2"
            >
              <span className="duration-250 hidden opacity-0 transition-all ease-linear group-hover:opacity-100 sm:block">
                info
              </span>
              <Info className="h-8 w-8 group-hover:stroke-prim" />
            </Link>
          </li>
          <span className="sm:ml-8">
            <ConnectButton />
          </span>
        </ul>
      </header>

      <div className="mt-16">
        {data && data.length > 0 && data.length < 2 && (
          <p className="bg-zinc-800 px-4 py-2 text-center font-chakra text-sm uppercase">
            {data?.length} result
          </p>
        )}
        {data && data.length > 1 && (
          <p className="bg-zinc-800 px-4 py-2 text-center font-chakra text-sm uppercase">
            {data?.length} results
          </p>
        )}
      </div>

      <Cursor name={query} optional={true} />

      {trimmedData && (
        <div
          className={`masonry ${trimmedData.length < 2 && "w-full max-w-xl"}  ${
            trimmedData.length == 2 && "sm:masonry-sm w-full max-w-4xl"
          } ${
            trimmedData.length > 2 &&
            "md:masonry-md 2xl:masonry-lg my-16  max-w-none"
          } my-16 space-y-6 `}
        >
          {trimmedData.map((item) => {
            return (
              <Link
                key={item.id}
                href={`/${slugify(item.Title)}`}
                className="group relative flex h-auto w-full break-inside-avoid"
              >
                <img
                  src={item.Thumbnails?.[0].url}
                  alt={item.Title}
                  loading="lazy"
                  className="h-auto w-full rounded-sm opacity-80 transition-all duration-100 ease-in-out hover:opacity-100 hover:ring-2 hover:ring-prim hover:ring-offset-1 hover:ring-offset-zinc-900"
                />
                <h1 className="absolute right-4 top-4 hidden bg-zinc-800 bg-opacity-50 px-3 py-1 font-chakra uppercase text-white backdrop-blur-sm group-hover:block">
                  {item.Filetype}
                </h1>
              </Link>
            );
          })}
        </div>
      )}
      <div ref={loadingRef} />

      <div className=" fixed bottom-0 left-0 z-10 mb-60 flex flex-col">
        <input
          onChange={handleSearch}
          ref={inputRef}
          value={query}
          id="search"
          type="text"
          autoComplete="off"
          autoCorrect="off"
          className="duration-250 focus:ring-none peer pointer-events-auto mx-4 h-20 w-full bg-transparent px-6 font-rubik text-4xl text-white drop-shadow-md transition-all ease-linear selection:bg-zinc-800 selection:text-sec placeholder:text-zinc-600 focus:rounded-sm focus:bg-zinc-800 focus:bg-opacity-50 focus:outline-none focus:backdrop-blur-md sm:mx-20 sm:h-40 sm:max-w-xl sm:text-8xl"
          placeholder="search here"
        />
        <span className="duration-250 z-20 mx-20 -mt-6 hidden w-max bg-zinc-900 text-zinc-700 opacity-0 transition-all ease-linear peer-placeholder-shown:opacity-100 peer-focus:opacity-0 sm:block sm:px-8 sm:py-2">
          ctrl+k / cmd+k to search
        </span>
      </div>
      <footer className="fixed bottom-0 mb-12 flex w-full flex-row items-center justify-between px-12 sm:px-20">
        <div
          className="group flex cursor-pointer flex-col items-center gap-2 sm:hidden"
          id="filterMobile"
          onClick={() => {
            filterPanelRef.current.classList.remove("hidden");
          }}
        >
          <LayoutDashboard className="h-8 w-8 group-hover:stroke-prim" />
        </div>
        <div
          className="group hidden cursor-pointer flex-row items-center gap-2 sm:flex"
          id="filter"
        >
          <LayoutDashboard className="h-8 w-8 group-hover:stroke-prim" />

          <div className="absolute ml-12">
            {types && (
              <ul className="group hidden flex-col items-center gap-1 lowercase sm:flex sm:flex-row">
                {types.map((type) => {
                  return (
                    <Link
                      key={type}
                      href={`/?type=${type.toLowerCase()}`}
                      className="opacity-0 hover:text-prim group-hover:opacity-100"
                    >
                      {type}
                    </Link>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div onClick={handleRandomData}>
          <div
            className="group flex cursor-pointer flex-row items-center gap-2"
            id="random"
          >
            <Sparkles className="h-8 w-8 group-hover:stroke-prim" />
            <div className="absolute ml-12">
              <span className="duration-250 hidden opacity-0 transition-all ease-linear group-hover:opacity-100 sm:block">
                random
              </span>
            </div>
          </div>
        </div>
        <Link href="/contribute">
          <div
            className="group relative flex flex-row items-center gap-2"
            id="contribute"
          >
            <span className="duration-250 absolute right-12 hidden opacity-0 transition-all ease-linear group-hover:opacity-100 sm:block">
              contribute
            </span>

            <HelpingHand className="h-8 w-8 group-hover:stroke-prim" />
          </div>
        </Link>
      </footer>

      {trimmedData && data && page > 1 && (
        <div className="fixed bottom-0 z-10 mb-24">
          <div
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex cursor-pointer flex-row items-center gap-2"
          >
            {process.env.NODE_ENV === "development" && (
              <>{`${trimmedData.length}/${data.length} - page:${page}`}</>
            )}
            <ChevronsUp className="h-8 w-8 text-zinc-500 group-hover:stroke-prim" />
          </div>
        </div>
      )}

      <div
        ref={filterPanelRef}
        className="fixed inset-0 left-0 top-0 z-30 hidden h-full w-screen flex-col bg-zinc-800/90 backdrop-blur-sm sm:hidden"
      >
        <div className="h-screen max-w-full ">
          {types && (
            <ul className="flex h-screen w-full flex-col items-center justify-center gap-4 ">
              {types.map((type) => {
                return (
                  <Link
                    key={type}
                    onClick={() => {
                      filterPanelRef.current.classList.add("hidden");
                    }}
                    href={`/?type=${type.toLowerCase()}`}
                    className=" text-4xl lowercase hover:text-prim"
                  >
                    {type}
                  </Link>
                );
              })}
            </ul>
          )}

          <div
            onClick={() => {
              filterPanelRef.current.classList.add("hidden");
            }}
            className="absolute right-10 top-12 cursor-pointer"
          >
            <XCircle className="h-10 w-10 justify-center" />
          </div>
        </div>
      </div>

      <FrontPageTicker />
    </>
  );
}

const FrontPageTicker = () => {
  return (
    <Ticker position="bottom">
      <div className="flex flex-row gap-96">
        <div className="flex flex-row gap-1">
          Seeking funding for cc0-lib. Check out{" "}
          <Link
            href="https://nouns.wtf/vote/343"
            target="_blank"
            rel="noreferrer noopener"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            proposal 343
          </Link>{" "}
          on Nouns DAO and help us make it a reality.
        </div>
        <div className="flex flex-row gap-1">
          submit your cc0 content{" "}
          <Link
            href="/contribute"
            rel="noreferrer noopener"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            now
          </Link>
        </div>
        <div className="flex flex-row gap-1">
          Seeking funding for cc0-lib. Check out{" "}
          <Link
            href="https://nouns.wtf/vote/343"
            target="_blank"
            rel="noreferrer noopener"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            proposal 343
          </Link>{" "}
          on Nouns DAO and help us make it a reality.
        </div>
        <div className="flex flex-row gap-1">
          submit your cc0 content{" "}
          <Link
            href="/contribute"
            rel="noreferrer noopener"
            className="bg-zinc-800 text-prim underline hover:bg-prim hover:text-zinc-800"
          >
            now
          </Link>
        </div>
      </div>
    </Ticker>
  );
};
