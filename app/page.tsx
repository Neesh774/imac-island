"use client";

import { useEffect, useRef, useState } from "react";
import Highlights from "./highlights";
import { IslandContext, SLIDE_TIME, Color } from "./island-context";
import Island from "./island";
import Images from "./images";
import { useInView } from "framer-motion";
import Footer from "./footer";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SLIDE_TIME);
  const [type, setType] = useState<"highlights" | "images" | undefined>(
    undefined
  );
  const [playing, setPlaying] = useState(false);
  const [color, setColor] = useState<Color>("Blue");
  const islandContainerRef = useRef<HTMLDivElement>(null);
  const islandContainerInView = useInView(islandContainerRef, {
    amount: 0.3,
  });
  const noIslandRef = useRef<boolean>(false);

  useEffect(() => {
    if (!islandContainerInView) {
      setType(undefined);
      noIslandRef.current = true;
      setTimeout(() => {
        // general smoothness, don't want to hide and show the island too quickly
        noIslandRef.current = false;
      }, 1000);
    }
  }, [islandContainerInView]);

  return (
    <IslandContext.Provider
      value={{
        type,
        setType: (t) => {
          if (noIslandRef.current) return;
          // only change playing state if we're transitioning *to* highlights
          if (t == "highlights" && type != "highlights") setPlaying(true);
          setType(t);
        },
        highlights: {
          currentIndex,
          timeLeft,
          setCurrentIndex: (t) => {
            setTimeLeft(SLIDE_TIME);
            setCurrentIndex(t);
          },
          setTimeLeft: (t) => {
            setTimeLeft(t);
          },
          playing,
          setPlaying,
        },
        images: {
          color,
          setColor,
        },
      }}
    >
      <>
        <div className="flex flex-col w-full px-52 pt-14">
          <div
            className="relative w-full aspect-[1.7]"
            style={{
              backgroundImage: "url(/hero.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "top",
            }}
          ></div>
          <div className="flex flex-col items-center justify-center mt-8 gap-4 text-center">
            <p
              className="text-2xl text-transparent bg-clip-text font-semibold bg-contain font-display"
              style={{
                backgroundImage: "url(/ai-mask.png)",
              }}
            >
              Hello, Apple Intelligence.
            </p>
            <button className="px-4 h-10 bg-[#0171E3] rounded-full text-white">
              Pre-order
            </button>
            <div className="flex flex-col items-center">
              <p className="text-black font-semibold text-base">
                From $1299 or $108.25/mo. for 12 mo.*
              </p>
              <p>Available starting 11.8</p>
            </div>
          </div>
        </div>
        <div ref={islandContainerRef}>
          <Highlights />
          <Images />
        </div>
        <Footer />
        <Island />
      </>
    </IslandContext.Provider>
  );
}
