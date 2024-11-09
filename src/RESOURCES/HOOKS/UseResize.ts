import { useState, useEffect } from "react";

export default function UseResize() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);

  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    setWindowDimensions();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);

    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, [windowWidth, windowHeight]);

  return { windowWidth, windowHeight };
}
