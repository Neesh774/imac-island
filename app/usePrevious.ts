import { useEffect } from "react";
import { useRef } from "react";

const usePrevious = (value: any) => {
  const ref = useRef();
  const prev = useRef(value);

  useEffect(() => {
    if (value !== prev.current) {
      ref.current = prev.current;
      prev.current = value;
    }
  });

  return ref.current;
};

export default usePrevious;