import Image from "next/image";
import { useIslandContext } from "./island-context";
import { useEffect, useRef } from "react";
import { AnimatePresence, inView, motion, useInView } from "framer-motion";

export default function Images() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    type,
    setType,
    images: { color },
  } = useIslandContext();
  const inView = useInView(containerRef, { amount: 0.8 });

  useEffect(() => {
    if (inView && type != "images") setType("images");
  }, [inView, setType, type]);

  return (
    <motion.div
      className="flex flex-col my-24 gap-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        staggerChildren: 0.6,
      }}
    >
      <motion.h2
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
        className="inline-block text-5xl font-semibold px-24 2xl:px-60"
      >
        Take a closer look.
      </motion.h2>
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
        ref={containerRef}
        className="flex flex-row gap-8 px-24 2xl:px-60 snap-mandatory snap-x overflow-x-auto hide-scrollbar w-[calc(100vw_-_1rem)]"
      >
        <div className="flex flex-row w-fit gap-8">
          <div className="w-[calc(100vw-12rem)] 2xl:w-[calc(100vw-30rem)] h-[70vh] rounded-2xl overflow-hidden relative snap-center">
            <DisplayImage number={1} />
          </div>
          <div className="w-[calc(100vw-12rem)] 2xl:w-[calc(100vw-30rem)] h-[70vh] flex flex-row gap-8 snap-center">
            <div className="w-1/3 h-full relative rounded-2xl overflow-hidden">
              <DisplayImage number={2} />
            </div>
            <div className="w-2/3 h-full relative rounded-2xl overflow-hidden">
              <DisplayImage number={3} />
            </div>
          </div>
          <div className="w-[calc(100vw-12rem)] 2xl:w-[calc(100vw-30rem)] h-[70vh] rounded-2xl overflow-hidden relative snap-center">
            <DisplayImage number={4} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DisplayImage({ number }: { number: number }) {
  const {
    images: { color },
  } = useIslandContext();

  return (
    <AnimatePresence>
      <motion.div
        key={color}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={`/images/${color}/${number}.jpg`}
          alt={color}
          fill
          className="object-cover"
        />
      </motion.div>
    </AnimatePresence>
  );
}
