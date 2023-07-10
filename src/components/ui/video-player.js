"use client";

import { Maximize, Pause, Play, Square } from "lucide-react";
import { useEffect, useState } from "react";

const VideoPlayer = ({ data, src, className }) => {
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    setPlaying(!playing ? true : false);
    !playing
      ? document.getElementById("video-player").play()
      : document.getElementById("video-player").pause();
  };

  const handleStop = () => {
    setPlaying(false);
    document.getElementById("video-player").pause();
    document.getElementById("video-player").currentTime = 0;
    document.getElementById("video-player").play();
    setPlaying(true);
  };

  const toggleFullScreen = () => {
    const video = document.getElementById("video-player");
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      /* Safari */
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      /* IE11 */
      video.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const video = document.getElementById("video-player");
    video.addEventListener("play", () => {
      setPlaying(true);
    });
    video.addEventListener("pause", () => {
      setPlaying(false);
    });
    return () => {
      video.removeEventListener("play", () => {
        setPlaying(true);
      });
      video.removeEventListener("pause", () => {
        setPlaying(false);
      });
    };
  }, []);

  return (
    <div className="relative w-full px-2 py-16 text-sm sm:p-16 sm:text-lg">
      <video
        src={src}
        alt="video"
        className={`${className} peer hidden h-auto w-full object-cover drop-shadow-md sm:block`}
        id="video-player"
        onClick={togglePlay}
      />
      <video
        src={src}
        alt="video"
        className={`${className} peer block h-auto w-full object-cover drop-shadow-md sm:hidden`}
        id="video-player-mobile"
        onClick={togglePlay}
        controls={true}
      />
      <div
        onClick={togglePlay}
        className="absolute inset-0 left-0 top-0 hidden h-full w-full flex-col items-center justify-between bg-zinc-900 bg-opacity-50 px-2 py-10 font-chakra uppercase opacity-0 transition-all duration-150 ease-in-out hover:opacity-100 sm:flex sm:px-16 sm:py-12 "
      >
        <div className="flex w-full flex-row items-center justify-between p-8">
          <img
            src="/cc0lib.svg"
            alt="cc0lib-logo"
            className="h-8 w-8 sm:h-16 sm:w-16"
          />
          <Maximize
            id="maximize-icon"
            className="h-4 w-4 hover:cursor-pointer hover:stroke-prim sm:h-8 sm:w-8"
            onClick={toggleFullScreen}
          />
          {/* <span>{data.Filetype}</span> */}
        </div>
        {playing ? (
          <Pause
            id="pause-icon"
            className="-mt-6 h-8 w-8 hover:cursor-pointer hover:stroke-prim sm:-mt-0 sm:h-16 sm:w-16"
            onClick={togglePlay}
          />
        ) : (
          <Play
            id="play-icon"
            className="-mt-6 h-8 w-8 hover:cursor-pointer hover:stroke-prim sm:-mt-0 sm:h-16 sm:w-16"
            onClick={togglePlay}
          />
        )}
        <div className="flex w-full flex-row items-center justify-between p-8">
          <span>{data.Title}</span>
          <span
            id="replay"
            className="hover:cursor-pointer hover:text-prim"
            onClick={handleStop}
          >
            replay
          </span>
        </div>
      </div>
    </div>
  );
};
export default VideoPlayer;