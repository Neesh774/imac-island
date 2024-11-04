import {
  animate,
  AnimatePresence,
  motion,
  useAnimationFrame,
  Variants,
} from "framer-motion";
import { Color, COLORS, SLIDE_TIME, useIslandContext } from "./island-context";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import usePrevious from "./usePrevious";

export default function Island() {
  const {
    type,
    highlights: { setPlaying, playing },
  } = useIslandContext();
  const lastType = usePrevious(type);

  const springTransition = {
    type: "spring",
    stiffness: 200,
    damping: 15,
    mass: 1.6,
    y: {
      delay: 0.02,
    },
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed bottom-14 left-1/2 -translate-x-1/2 translate-y-1/2 w-fit flex flex-row items-center justify-center z-50">
        <motion.div
          variants={{
            initial: {
              opacity: 0.6,
              x: lastType == "images" ? 0 : 8,
              y: 80,
              marginRight: lastType == "images" ? 0 : 8,
              scale: 0.4,
            },
            "animate-highlights": {
              opacity: 1,
              x: 0,
              y: 0,
              width: 56,
              height: lastType == "images" ? [58, 80, 56] : 56,
              marginRight: 8,
              scale: 1,
              transition: {
                ...springTransition,
                height: {
                  ease: "easeInOut",
                },
                width: {
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                  mass: 1.6,
                },
              },
            },
            "animate-images": {
              opacity: 1,
              x: 0,
              y: 0,
              width: 292,
              height: [56, 28, 58],
              marginRight: 0,
              scale: 1,
              transition: {
                ...springTransition,
                height: {
                  ease: "easeInOut",
                },
                width: {
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                  mass: 1.4,
                },
              },
            },
          }}
          onClick={() => {
            if (type == "highlights") setPlaying(!playing);
          }}
          transition={{
            ...springTransition,
          }}
          initial="initial"
          animate={`animate-${type}`}
          exit="exit"
          className={`p-3.5 rounded-full backdrop-blur-lg bg-gray-200/50 transition-colors overflow-hidden flex flex-row items-center justify-center ${
            type == "highlights" && "hover:bg-gray-300/70"
          }`}
        >
          <motion.div
            variants={{
              initial: {
                opacity: 0,
                width: 0,
              },
              "animate-images": {
                opacity: 1,
                width: 252,
              },
            }}
            transition={{
              staggerChildren: 0.02,
            }}
            className="flex flex-row gap-3.5 items-center justify-center"
          >
            {COLORS.map((color, index) => (
              <ColorDot key={color} color={color} index={index} />
            ))}
          </motion.div>
          <motion.button
            variants={{
              initial: {
                opacity: 0,
                x: 20,
                y: 20,
                width: 24,
                height: 24,
              },
              "animate-highlights": {
                opacity: 1,
                x: 0,
                y: 0,
                width: 24,
                height: 24,
              },
              "animate-images": {
                opacity: 0,
                width: 0,
                height: 0,
                x: 0,
                y: 0,
              },
            }}
            transition={{
              x: {
                type: "spring",
                stiffness: 300,
                damping: 15,
                mass: 1.6,
              },
              y: {
                type: "spring",
                stiffness: 250,
                damping: 20,
                mass: 1.6,
              },
              opacity: {
                delay: 0.1,
              },
            }}
            className="overflow-hidden"
          >
            {playing ? (
              <Pause className="size-6" fill="black" />
            ) : (
              <Play className="size-6" fill="black" />
            )}
          </motion.button>
        </motion.div>
        <motion.div
          variants={{
            initial: {
              opacity: 0.6,
              x: -8,
              y: 80,
              marginLeft: 8,
              scale: 0.4,
            },
            animate: {
              opacity: 1,
              x: 0,
              y: 0,
              marginLeft: 8,
              scale: 1,
            },
            images: {
              x: -8,
              y: 80,
              width: 0,
              marginLeft: 0,
              padding: 0,
            },
            exit: {
              x: -8,
              y: 80,
              marginLeft: 8,
              scale: 0.4,
            },
          }}
          transition={{
            ...springTransition,
            staggerChildren: 0.02,
            delayChildren: 0.1,
          }}
          initial="initial"
          animate={type == "highlights" ? "animate" : "images"}
          exit="exit"
          className="flex flex-row gap-3.5 h-14 rounded-full backdrop-blur-lg bg-gray-200/50 p-4 px-5 items-center justify-center overflow-hidden"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <PlayerDot key={index} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function PlayerDot({ index }: { index: number }) {
  const {
    type,
    highlights: { setTimeLeft, currentIndex, timeLeft, playing },
  } = useIslandContext();

  const active = currentIndex === index;

  const playerDotVariants: Variants = {
    initial: {
      opacity: 0,
      x: -5,
      y: 20,
      width: active ? 48 : 7,
      scale: active ? 1 : 0.9,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      width: active ? 48 : 7,
      scale: 1,
    },
    exit: {
      opacity: 0,
      x: -5,
      y: 20,
      width: active ? 48 : 7,
    },
  };
  const springTransition = {
    x: {
      type: "spring",
      stiffness: 400,
      damping: 10,
      mass: 1.6,
    },
    width: {
      type: "linear",
      duration: 0.8,
    },
    y: {
      type: "spring",
      stiffness: 200,
      damping: 16,
      mass: 1,
    },
    scale: {
      delay: index * 0.1,
      type: "spring",
      bounce: 0.4,
      duration: 0.5,
    },
    opacity: {
      delay: index * 0.1,
    },
  };

  return (
    <motion.div
      variants={playerDotVariants}
      transition={springTransition}
      custom={index}
      className="h-[7px] rounded-full bg-gray-500 relative overflow-hidden"
    >
      {active && (
        <motion.div
          className="absolute inset-0 bg-black rounded-full"
          initial={false}
          animate={{
            width: `${((SLIDE_TIME - timeLeft) / (SLIDE_TIME - 2000)) * 100}%`,
          }}
          transition={{
            ease: "linear",
            duration: 0,
          }}
        />
      )}
    </motion.div>
  );
}

function ColorDot({
  color,
  index,
}: {
  color: Exclude<Color, undefined>;
  index: number;
}) {
  const {
    images: { setColor },
  } = useIslandContext();
  const colors = {
    Blue: ["#557EAE", "#ABBFD7"],
    Purple: ["#827EB2", "#B8B2CF"],
    Pink: ["#DE5F7D", "#F2B4C3"],
    Orange: ["#E4714B", "#F5C1A7"],
    Yellow: ["#EDD142", "#F5E4AE"],
    Green: ["#3E935C", "#A3C2AE"],
    Silver: ["#E3E4E5", "#E3E4E5"],
  };

  return (
    <motion.button
      className="size-6 rounded-full shrink-0 focus:outline-black"
      style={{
        background: `linear-gradient(to right, ${colors[color][0]} 50%, ${colors[color][1]} 50%)`,
        boxShadow: `0 1px 1px 0 #00000054 inset`,
      }}
      onClick={() => {
        setColor(color);
      }}
      variants={{
        initial: {
          scale: 0.4,
          opacity: 0,
          x: -20,
        },
        "animate-images": {
          scale: 1,
          opacity: 1,
          x: 0,
          transition: {
            delay: index * 0.1,
            x: {
              delay: index * 0.05,
              type: "spring",
              stiffness: 200,
              damping: 15,
              mass: 1.6,
            },
            type: "spring",
            stiffness: 200,
            damping: 15,
            mass: 1.6,
          },
        },
        exit: {
          scale: 0,
          opacity: 0,
          x: 0,
        },
      }}
    ></motion.button>
  );
}
