import { useState, useEffect } from "react";

/**
 * Custom React Hook: `UseResize`
 *
 * A hook that provides the current dimensions of the browser window (width and height).
 * It automatically updates when the window is resized, ensuring the values stay in sync with the viewport.
 *
 * @returns {Object} - Returns an object containing the current window dimensions:
 * - `windowWidth`: The width of the window in pixels.
 * - `windowHeight`: The height of the window in pixels.
 *
 **/
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
