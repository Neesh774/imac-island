import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const SLIDE_TIME = 5000;
export type Color = "Blue" | "Purple" | "Pink" | "Orange" | "Yellow" | "Green" | "Silver";
export const COLORS = ["Blue", "Purple", "Pink", "Orange", "Yellow", "Green", "Silver"] as const;

export type IslandContextType = {
  type: "highlights" | "images" | undefined;
  setType: (type: "highlights" | "images" | undefined) => void;
  highlights: {
    currentIndex: number;
    timeLeft: number;
    setCurrentIndex: (index: number) => void;
    setTimeLeft: Dispatch<SetStateAction<number>>;
    playing: boolean;
    setPlaying: (playing: boolean) => void;
  };
  images: {
    color: Color;
    setColor: (color: Color) => void;
  };
};

export const IslandContext = createContext<IslandContextType>({
  type: undefined,
  setType: () => { },
  highlights: {
    currentIndex: 0,
    timeLeft: 0,
    setCurrentIndex: () => { },
    setTimeLeft: () => { },
    playing: false,
    setPlaying: () => { },
  },
  images: {
    color: "Blue",
    setColor: () => { },
  },
});

export const useIslandContext = () => {
  return useContext(IslandContext);
};
