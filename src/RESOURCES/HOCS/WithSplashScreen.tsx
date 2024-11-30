import React, { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

import UseIsMobile from "RESOURCES/HOOKS/UseIsMobile";

import styled from "styled-components";

const StyledSplashScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100dvw;
  height: 100dvh;

  background: radial-gradient(circle, rgb(10, 15, 1) 0%, rgba(0, 0, 0, 0) 100%);

  .Hover {
    display: inline-block;

    color: rgb(0, 150, 0);
    text-shadow: 0 0px 5px rgba(190, 160, 0, 0.3),
      0 0px 10px rgba(190, 160, 0, 0.3);

    animation: hoverAndSlightRock 2s ease-in-out infinite;

    @keyframes hoverAndSlightRock {
      0%,
      100% {
        transform: translateY(0) rotate(0deg);
      }
      25% {
        transform: translateY(-8px) rotate(-2deg);
      }
      50% {
        transform: translateY(0) rotate(0deg);
      }
      75% {
        transform: translateY(-8px) rotate(2deg);
      }
    }
  }
`;

function WithSplashScreen({ children }: { children: ReactNode[] | ReactNode }) {
  const [enter, setEnter] = React.useState<boolean>(false);

  const isMobile = UseIsMobile();

  React.useEffect(() => {
    window.addEventListener("click", () => setEnter(true));
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") setEnter(true);
    });

    return () => {
      window.removeEventListener("click", () => setEnter(true));
      window.removeEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter") setEnter(true);
      });
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {enter ? (
        <>{children}</>
      ) : (
        <StyledSplashScreen
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6 } }}
          key={"SPLASH_SCREEN"}
        >
          <motion.p
            className="Hover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6 } }}
            exit={{ opacity: 0 }}
          >
            {isMobile ? "TAP THE SCREEN TO LAUNCH" : "PRESS [ENTER] TO LAUNCH"}
          </motion.p>
        </StyledSplashScreen>
      )}
    </AnimatePresence>
  );
}

export default WithSplashScreen;
