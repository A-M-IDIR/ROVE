import React, { ReactNode } from "react";
import { UseRemoteCall } from "RESOURCES/HOOKS/UseRemote";
import { TERMINAL } from "RESOURCES/HANDLERS/RemoteHandler";
import UseResize from "RESOURCES/HOOKS/UseResize";
import styled from "styled-components";
import { motion } from "framer-motion";

const Styled = styled.div`
  position: fixed;
  z-index: 1000;

  width: 100dvw;
  height: 100dvh;
  padding: 1rem;

  user-select: none;

  transition: 200ms opacity;

  .Window {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;

    background-color: rgb(14, 14, 14);
    border-radius: 0.5rem;

    transition: 100ms all;
  }

  .WindowContent {
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    border-radius: 0 0 0.5rem 0.5rem;
  }

  .WindowHandle {
    overflow: hidden;

    position: relative;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 100%;
    min-height: max-content;
    padding: 0.4rem;
    border-radius: 0.5rem 0.5rem 0 0;

    .HitBox {
      position: absolute;
      left: 0;
      top: 0;

      width: 100%;
      height: 100%;

      background-color: rgb(40, 40, 40);
    }

    aside {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.4rem;
    }

    .Button {
      z-index: 2;

      display: flex;
      justify-content: center;
      align-items: center;

      width: 14px;
      height: 14px;

      border-radius: 0.2rem;
      background-color: rgb(5, 5, 5);

      cursor: pointer;

      svg {
        width: 14px;

        color: silver;
        opacity: 0.4;
      }
    }
  }
`;

type Props = { windowKey: string; children: ReactNode };

function WithWindow({ windowKey, children }: Props) {
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(false);
  const [isVideoFullScreen, setIsVideoFullSreen] =
    React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [isDrag, setIsDrag] = React.useState(false);
  const [position, setPosition] = React.useState<{ x: number; y: number }>();
  const [dragOffset, setDragOffset] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const $windowRef = React.useRef<HTMLDivElement>(null);

  const { windowWidth, windowHeight } = UseResize();

  UseRemoteCall(windowKey, () => {
    setIsOpen(true);
  });

  const handleMouseDown = (event: React.MouseEvent) => {
    if ($windowRef.current) {
      const rect = $windowRef.current.getBoundingClientRect();

      setDragOffset({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
      setIsDrag(true);
    }
  };
  const handleMouseMove = (event: MouseEvent) => {
    if (
      !isDrag ||
      !dragOffset ||
      !$windowRef.current ||
      isFullScreen ||
      isVideoFullScreen
    )
      return;

    const windowRect = $windowRef.current.getBoundingClientRect();

    let newX = event.clientX - dragOffset.x;
    let newY = event.clientY - dragOffset.y;

    if (newX < -windowRect.width / 2) {
      newX = -windowRect.width / 2;
    }
    if (newY < 0) newY = 0;
    if (newX + windowRect.width / 2 > windowWidth) {
      newX = windowWidth - windowRect.width / 2;
    }
    if (newY + windowRect.height / 2 > windowHeight) {
      newY = windowHeight - windowRect.height / 2;
    }

    setPosition({ x: newX, y: newY });
  };
  const handleMouseUp = () => {
    if (isDrag) {
      setIsDrag(false);
      setDragOffset(null);
    }
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      // setIsFullScreen(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrag, dragOffset, isFullScreen]);

  React.useEffect(() => {
    if ($windowRef.current && isOpen)
      setPosition({
        x:
          windowWidth / 2 -
          $windowRef.current.getBoundingClientRect().width / 2,
        y: 30,
      });
  }, [isOpen, windowWidth, windowHeight]);

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsVideoFullSreen(Boolean(document.fullscreenElement));
    };

    handleFullscreenChange();

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [position]);

  return (
    <Styled
      ref={$windowRef}
      as={motion.div}
      style={{
        top: isFullScreen || isVideoFullScreen ? "50%" : `${position?.y}px`,
        left: isFullScreen || isVideoFullScreen ? "50%" : `${position?.x}px`,
        transform:
          isFullScreen || isVideoFullScreen ? "translate(-50%,-50%)" : "",
        maxWidth: isFullScreen ? "100dvw" : "800px",
        maxHeight: isFullScreen ? "100dvh" : "500px",
        padding: isVideoFullScreen ? 0 : "1rem",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "all" : "none",
      }}
    >
      <div
        className="Window"
        style={{
          outline:
            isDrag && !isFullScreen
              ? "2px solid rgb(0, 140, 0, 0.4)"
              : "2px solid rgb(0, 0, 0, 0)",
          transform:
            isDrag && !isFullScreen
              ? "scale(0.96) rotate(2deg)"
              : "scale(1) rotate(0)",
        }}
      >
        <div className="WindowHandle">
          <div
            className="HitBox"
            style={{
              cursor: isDrag ? "grabbing" : "grab",
            }}
            onMouseDown={handleMouseDown}
            onDoubleClick={() => setIsFullScreen(!isFullScreen)}
          ></div>

          <aside>
            <div
              className="Button"
              onClick={() => setIsFullScreen(!isFullScreen)}
              style={{ backgroundColor: "#AC7200" }}
            ></div>

            <div
              className="Button"
              onClick={() => {
                setIsOpen(false);
                TERMINAL.closeWindow(windowKey)();
              }}
              style={{ backgroundColor: "#FE484E" }}
            ></div>
          </aside>
        </div>

        <div className="WindowContent">{children}</div>
      </div>
    </Styled>
  );
}

export default WithWindow;
