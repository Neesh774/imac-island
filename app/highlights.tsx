"use client";

import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { PlayCircle } from "lucide-react";
import { ReactNode, useEffect, useRef } from "react";
import { useIslandContext } from "./island-context";

export default function Highlights() {
  const {
    type,
    setType,
    highlights: {
      setCurrentIndex,
      timeLeft,
      currentIndex,
      setPlaying,
      playing,
      setTimeLeft,
    },
  } = useIslandContext();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const { scrollX } = useScroll({
    container: scrollerRef,
  });
  const inView = useInView(scrollerRef, { amount: 0.3 });
  const changingRef = useRef(false); // used to prevent an infinite loop of changing highlights and
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inView && type != "highlights") setType("highlights");
  }, [inView, setType, type]);

  const highlights = [
    {
      caption: (
        <>
          New vibrant colors.
          <br />
          Strikingly thin design.
          <br />
          It’s the world’s best
          <br />
          all-in-one desktop.
        </>
      ),
      video: "/colors.mp4",
    },
    {
      caption: (
        <>
          Built for Apple Intelligence. <br /> Personal, private, powerful.
        </>
      ),
      video: "/apple-intelligence.mp4",
    },
    {
      caption: (
        <>
          M4 chip. <br />
          Zip through tasks <br />
          with flying colors.
        </>
      ),
      image: "/m4.jpg",
    },
    {
      caption: (
        <>
          iPhone Mirroring. <br />
          Use your phone on <br />
          the big screen.
        </>
      ),
      image: "/mirroring.jpg",
    },
  ];

  // scroll event listener to detect which highlight is currently in view
  useMotionValueEvent(scrollX, "change", (v) => {
    if (!scrollerRef.current) return;
    if (changingRef.current) return;
    // loop through the highlights and find the one that is closest to the scroll position
    const highlightElements = Array.from(
      scrollerRef.current.children
    ) as HTMLElement[];
    const closestHighlight = highlightElements.reduce((prev, curr) => {
      return Math.abs(v - prev.offsetLeft) < Math.abs(v - curr.offsetLeft)
        ? prev
        : curr;
    }, highlightElements[0]);

    // if there was a change from the previous closest highlight, set playing to false
    if (closestHighlight !== highlightElements[currentIndex]) {
      setPlaying(false);
    }

    setCurrentIndex(highlightElements.indexOf(closestHighlight));
  });

  // when the time left reaches 0, transition to the next highlight
  useEffect(() => {
    if (timeLeft <= 0) {
      if (!scrollerRef.current) return;
      const highlightElements = Array.from(
        scrollerRef.current.children
      ) as HTMLElement[];
      const newIndex = (currentIndex + 1) % highlightElements.length;
      changingRef.current = true;
      setCurrentIndex(newIndex);
      // scroll it into view
      scrollerRef.current.scrollTo({
        left: highlightElements[newIndex].offsetLeft,
        behavior: "smooth",
      });
      setTimeout(() => {
        changingRef.current = false;
      }, 1000);
    }
  }, [timeLeft, setCurrentIndex, currentIndex]);

  // create a 1 second loop that will decrement timeLeft
  useEffect(() => {
    if (!playing || timeLeft <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => t - 10);
    }, 10);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, timeLeft, setTimeLeft]);

  return (
    <motion.div
      className="flex flex-col mt-48 gap-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        staggerChildren: 0.6,
      }}
    >
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 12,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        transition={{
          duration: 0.7,
        }}
        className="flex flex-row justify-between items-baseline px-24 2xl:px-60"
      >
        <h2 className="text-5xl font-semibold">Get the highlights.</h2>
        <div className="flex flex-row items-baseline gap-8">
          <p className="text-[#06C]">
            Watch the announcement{" "}
            <PlayCircle className="inline-block w-5 h-5 align-text-bottom" />
          </p>
          <p className="text-[#06C]">
            Watch in ASL{" "}
            <PlayCircle className="inline-block w-5 h-5 align-text-bottom" />
          </p>
        </div>
      </motion.div>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 12,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        transition={{
          duration: 0.7,
        }}
        ref={scrollerRef}
        className="flex flex-row mb-12 pb-12 overflow-x-auto gap-8 px-24 2xl:px-60 scroll-pl-24 2xl:scroll-pl-[15rem] snap-x snap-mandatory relative hide-scrollbar"
      >
        {highlights.map((highlight, i) => (
          <Card key={i} {...highlight} index={i} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function Card({
  caption,
  video,
  image,
  index,
}: {
  caption: ReactNode;
  video?: string;
  image?: string;
  index: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const {
    highlights: { currentIndex: active },
  } = useIslandContext();
  const playing = index === active;

  useEffect(() => {
    if (!ref.current) return;
    if (playing) {
      const videoRef = ref.current;
      videoRef.play();
    } else {
      ref.current.currentTime = 0;
      ref.current.pause();
    }
  }, [playing]);

  return (
    <motion.div className="flex flex-col p-12 relative rounded-3xl h-[70vh] 2xl:h-[55vh] min-w-[calc(100vw_-_12rem)] 2xl:min-w-[calc(100vw_-_30rem)] snap-start overflow-hidden">
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center z-[1]"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
      )}
      {video && (
        <video
          ref={ref}
          src={video}
          className="h-full w-full object-cover absolute inset-0 z-[1]"
          muted
          playsInline
          autoPlay={false}
        />
      )}
      <motion.p
        variants={{
          idle: (i) => {
            return {
              x: (active - i) * -80,
              opacity: 0,
            };
          },
          active: () => {
            return {
              x: 0,
              opacity: 1,
            };
          },
        }}
        transition={{
          duration: 0.8,
          type: "spring",
          bounce: 0.05,
        }}
        custom={index}
        animate={playing ? "active" : "idle"}
        initial="idle"
        className="inline-block text-[1.6875rem] leading-[1.2] font-display text-black font-semibold z-[2]"
      >
        {caption}
      </motion.p>
    </motion.div>
  );
}
