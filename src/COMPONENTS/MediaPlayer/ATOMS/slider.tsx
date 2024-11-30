import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Styled = styled.div`
  width: 100%;
  padding: 1rem 0;

  pointer-events: all;
  cursor: pointer;

  .Slider {
    position: relative;

    width: 100%;
    height: 5px;

    background-color: rgba(255, 255, 255, 0.1);

    .ProgressBar {
      position: absolute;
      left: 0;
      top: 0;

      height: 100%;

      background-color: rgba(255, 255, 255, 0.2);
    }

    .Handle {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 5;

      width: 16px;
      height: 12px;

      border-radius: 0.2rem;
      background-color: silver;

      cursor: pointer;
    }

    .Progress {
      position: absolute;
      top: -1rem;
      transform: translate(-50%, -100%);
      z-index: 1;

      display: flex;
      justify-content: center;
      align-items: center;

      height: 18px;
      padding: 0 0.2rem;

      border-radius: 0.2rem;
      background-color: #e8bd0d;
      color: black;

      font-size: 0.76rem;
      pointer-events: none;

      transition: opacity 0.1s;

      &::after {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);

        width: 0;
        height: 0;

        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #e8bd0d;
      }
    }
  }
`;

function Slider() {
  const [duration, setDuration] = React.useState<number | null>(null);
  const [progress, setProgress] = React.useState<number>(0);
  const [isSkip, setIsSkip] = React.useState<boolean>(false);
  const [hoverPosition, setHoverPosition] = React.useState<number>(0);
  const [hover, setHover] = React.useState<boolean>(false);

  const $sliderRef = React.useRef<HTMLDivElement>(null);

  const getMediaElement = (): HTMLVideoElement => {
    const mediaElement: HTMLVideoElement | null =
      (document.getElementById("MEDIA_PLAYER") as HTMLVideoElement) ?? null;

    while (!mediaElement) {}

    return mediaElement;
  };
  const updateProgress = (clientX: number) => {
    if (!$sliderRef.current || duration === 0) return;

    const sliderRect = $sliderRef.current.getBoundingClientRect();
    const offsetX = clientX - sliderRect.left;
    const newProgress = Math.min(
      Math.max((offsetX / sliderRect.width) * 100, 0),
      100
    );

    setProgress(newProgress);
  };
  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsSkip(true);
    updateProgress(event.clientX);

    const handleMouseMove = (moveEvent: any) => {
      updateProgress(moveEvent.clientX);
      setIsSkip(true);
    };

    const handleMouseUp = () => {
      setIsSkip(false);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleTouchStart = (event: React.TouchEvent) => {
    event.preventDefault();
    setIsSkip(true);
    updateProgress(event.touches[0].clientX);

    const handleTouchMove = (moveEvent: TouchEvent) => {
      updateProgress(moveEvent.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      setIsSkip(false);

      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };

    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  };
  const formatTime = (time: number | null): string => {
    if (time === null || isNaN(time)) return "0:00:00";

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return hours > 0
      ? `${hours}:${formattedMinutes}:${formattedSeconds}`
      : `${formattedMinutes}:${formattedSeconds}`;
  };

  React.useEffect(() => {
    const mediaElement: HTMLVideoElement = getMediaElement();

    setProgress((mediaElement.currentTime / mediaElement.duration) * 100);
    setDuration(mediaElement.duration);
  }, []);
  React.useEffect(() => {
    const mediaElement: HTMLVideoElement = getMediaElement();

    if (!duration) return;

    mediaElement.addEventListener("timeupdate", () => {
      if (isSkip) return;
      setProgress((mediaElement.currentTime / duration) * 100);
    });
    window.addEventListener("mousemove", (MouseEvent: any) => {
      const sliderRect = $sliderRef.current?.getBoundingClientRect();

      if (!sliderRect) return;

      const offsetX = MouseEvent.clientX - sliderRect.left;
      setHoverPosition(
        Math.min(Math.max((offsetX / sliderRect.width) * 100, 0), 100)
      );
    });

    return () => {
      mediaElement.removeEventListener("timeupdate", () => {
        if (isSkip) return;
        setProgress((mediaElement.currentTime / duration) * 100);
      });
      window.removeEventListener("mousemove", (MouseEvent: any) => {
        const sliderRect = $sliderRef.current?.getBoundingClientRect();

        if (!sliderRect) return;

        const offsetX = MouseEvent.clientX - sliderRect.left;
        setHoverPosition(
          Math.min(Math.max((offsetX / sliderRect.width) * 100, 0), 100)
        );
      });
    };
  }, [duration]);
  React.useEffect(() => {
    if (isSkip && duration) {
      getMediaElement().currentTime = (progress * duration) / 100;
    }
  }, [progress, isSkip]);

  if (duration)
    return (
      <Styled
        ref={$sliderRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="Slider">
          <div className="ProgressBar" style={{ width: `${progress}%` }} />

          <motion.div
            className="Handle"
            style={{ left: `${progress}%` }}
            animate={{
              width: hover ? "16px" : "8px",
              height: hover ? "12px" : "6px",
            }}
            transition={{ duration: 0.2 }}
          />

          <div
            className="Progress"
            style={{
              left: `${hoverPosition}%`,
              opacity: hover ? 1 : 0,
            }}
          >
            {formatTime(Math.floor((hoverPosition * duration) / 100))}
          </div>
        </div>
      </Styled>
    );
}

export default Slider;
