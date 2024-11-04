import { motion } from "framer-motion";
import Image from "next/image";
import { Color, useIslandContext } from "./island-context";

export default function Footer() {
  const {
    images: { color },
  } = useIslandContext();

  const colors = {
    Blue: "#c8daef",
    Purple: "#dcd7f0",
    Pink: "#f1d4db",
    Orange: "#efd2c3",
    Yellow: "#efe6c9",
    Green: "#ccf4da",
    Silver: "#E3E4E5",
  };

  return (
    <motion.div
      className="w-full h-[60vh] bg-gradient-to-b from-white to-sky-50 flex justify-center items-center text-center"
      style={{
        // @ts-ignore
        "--tw-gradient-to": `${colors[color]} var(--tw-gradient-to-position)`,
      }}
    >
      <h2 className="text-xl font-semibold">
        <Image
          src="/neesh.jpeg"
          className="inline-block align-top object-center rounded-md mr-2"
          width={28}
          height={28}
          alt="Neesh"
        />
        <a href="https://neesh.page" className="underline">
          neesh.page
        </a>
      </h2>
    </motion.div>
  );
}
