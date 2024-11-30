import React from "react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";

import SvgHandler from "RESOURCES/HANDLERS/SvgHandler";
import UseIsMobile from "RESOURCES/HOOKS/UseIsMobile";

import C from "./style.module.scss";

function HoverInfo() {
  const [info, setInfo] = React.useState<Record<string, any> | null>(null);
  const [showInfo, setShowInfo] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<{
    x: "right" | "left";
    y: "top" | "bottom";
  }>({
    x: "right",
    y: "top",
  });

  const isMobile = UseIsMobile();

  const $infoBox = React.useRef<HTMLDivElement | null>(null);
  let showTimeOut: any = null;

  const handleHoverInfo = () => {
    const hoverInfo = localStorage.getItem("hoverInfo");

    if (!hoverInfo) {
      setInfo(null);
      setShowInfo(false);

      return;
    }

    setInfo(JSON.parse(hoverInfo));
  };
  const handlePosition = (
    x: number,
    y: number,
    containerWidth: number,
    containerHeight: number,
    animationDuration?: number
  ) => {
    const windowWidth = window.innerWidth;
    // const windowHeight = window.innerHeight;

    let positions: {
      x: Record<string, number>;
      y: Record<string, number>;
    } = {
      x: {
        left: x - containerWidth,
        right: x,
      },
      y: {
        top: y - containerHeight,
        bottom: y,
      },
    };

    if (x + containerWidth > windowWidth + 50) {
      setPosition({ x: "left", y: position.y });
    }

    if (x - containerWidth + 50 < 0) {
      setPosition({ x: "right", y: position.y });
    }

    // if (y + containerHeight > windowHeight + 50) {
    //   setPosition({ x: position.x, y: "top" });
    // }

    // if (y - containerHeight + 50 < 0) {
    //   setPosition({ x: position.x, y: "bottom" });
    // }

    gsap.to($infoBox.current, {
      x: positions.x[position.x],
      y: positions.y[position.y],
      duration: animationDuration || 1,
      ease: "elastic.out(1, 0.8)",
    });

    // if ($infoBox.current) {
    //   $infoBox.current.style.left = `${positions.x[position.x]}px`;
    //   $infoBox.current.style.top = `${positions.y[position.y]}px`;
    // }
  };
  const handleMouseMove = (e: MouseEvent) => {
    if ($infoBox && $infoBox.current)
      handlePosition(
        e.clientX,
        e.clientY,
        $infoBox.current.offsetWidth,
        $infoBox.current.offsetHeight
      );
  };

  React.useEffect(() => {
    window.addEventListener("hoverInfo", handleHoverInfo);

    return () => {
      window.removeEventListener("hoverInfo", handleHoverInfo);
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [position]);

  React.useEffect(() => {
    if (!info) {
      setShowInfo(false);
      return;
    }

    if ($infoBox && $infoBox.current) {
      handlePosition(
        info.x,
        info.y,
        $infoBox.current.offsetWidth,
        $infoBox.current.offsetHeight
      );
    }

    setShowInfo(false);

    clearTimeout(showTimeOut);
    showTimeOut = null;

    showTimeOut = setTimeout(() => {
      setShowInfo(true);
    }, 400);

    return () => {
      clearTimeout(showTimeOut);
      showTimeOut = null;
    };
  }, [info]);

  return (
    <AnimatePresence>
      {info && !isMobile && (
        <motion.div
          className={C.HoverInfo}
          ref={$infoBox}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.4 },
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            ease: [0.8, 0, 0, 1],
            duration: 0.1,
          }}
        >
          <div className={C.Info}>
            <header>
              <AnimatePresence>
                {showInfo && (
                  <>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: "100%",
                      }}
                      exit={{
                        height: 0,
                      }}
                      transition={{
                        ease: [0.8, 0, 0, 1],
                        duration: 0.3,
                      }}
                      style={{
                        backgroundColor: "rgb(0,0,0)",
                        backgroundImage: `url(https://www.themoviedb.org/t/p/w342/${info?.media.poster})`,
                      }}
                      className={C.Banner}
                    ></motion.div>

                    <motion.div
                      className={C.Rating}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                    >
                      <>{SvgHandler.Star()}</>

                      <span>{info?.media.rating?.toFixed(1)}</span>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </header>

            <aside>
              <AnimatePresence>
                {showInfo && (
                  <sub>
                    <motion.h4
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: 0.2 },
                      }}
                      exit={{
                        opacity: 0,
                      }}
                    >
                      {info?.media.title}
                    </motion.h4>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: 0.4 },
                      }}
                      exit={{
                        opacity: 0,
                      }}
                    >
                      {info?.media.overview}
                    </motion.p>
                  </sub>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showInfo && (
                  <ul>
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.4 },
                      }}
                      exit={{
                        opacity: 0,
                        x: -4,
                      }}
                    >
                      {info?.media.type.toUpperCase()}
                    </motion.span>

                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.45 },
                      }}
                      exit={{
                        opacity: 0,
                        x: -4,
                      }}
                    >
                      {info?.media.year}
                    </motion.span>
                  </ul>
                )}
              </AnimatePresence>
            </aside>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default HoverInfo;
