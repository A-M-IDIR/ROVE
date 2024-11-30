import React, { ComponentPropsWithoutRef } from "react";
import Hls from "hls.js";
import styled from "styled-components";

type TypeSource = {
  url: string;
  type: "hls" | "mp4";
};

type TypeSources = {
  UHD?: TypeSource;
  FHD?: TypeSource;
  HD?: TypeSource;
  SD?: TypeSource;
  AUTO?: TypeSource;
};

export type Props = {
  media: { sources: TypeSources } | null;
} & ComponentPropsWithoutRef<`video`>;

const Styled = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: black;
  text-shadow: none;

  user-select: none;

  video {
    width: 99.9%;
    height: 100%;

    outline: none;
    border: none;

    pointer-events: none;
  }

  .OverLay {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 100%;
    padding: 1rem;

    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 100%
    );

    transition: 200ms all;

    pointer-events: none;

    .Hidden {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;

      width: 100%;
      height: 100%;

      pointer-events: all;
    }

    .Controlls {
      position: relative;
      z-index: 10;

      pointer-events: all;

      .Keys {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;

        aside {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
      }
    }
  }
`;

function core({ media, ...rest }: Props) {
  const [_qualities, setQualities] = React.useState<TypeSources | null>(null);
  const [currentQuality, setCurrentQuality] = React.useState<TypeSource | null>(
    null
  );
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(true);
  const [canHide, setCanHide] = React.useState<boolean>(true);

  let hideTimeOut: any = null;

  const $videoRef = React.useRef<HTMLVideoElement>(null);

  const videoActions = {
    playPause: () => {
      if ($videoRef?.current) {
        $videoRef.current.paused
          ? $videoRef.current.play()
          : $videoRef.current.pause();
      }
    },
    skipTo: (time: number) => {
      if ($videoRef?.current) {
        $videoRef.current.currentTime = time;
      }
    },
    skip: () => {
      if ($videoRef?.current) {
        $videoRef.current.currentTime = Math.min(
          $videoRef.current.currentTime + 10,
          $videoRef.current.duration
        );
      }
    },
    reverse: () => {
      if ($videoRef?.current) {
        $videoRef.current.currentTime = Math.max(
          $videoRef.current.currentTime - 10,
          0
        );
      }
    },
    mute: () => {
      if (!$videoRef?.current) {
        return;
      }

      if ($videoRef.current.muted) {
        $videoRef.current.muted = false;
      } else {
        $videoRef.current.muted = true;
      }
    },
    fullScreen: () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen({ navigationUI: "hide" });
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    },
    pictureInPicture: async () => {
      if ($videoRef?.current) {
        try {
          await $videoRef.current.requestPictureInPicture();
        } catch (error) {
          console.error("Failed to enter Picture-in-Picture mode:", error);
        }
      }
    },
    showControls: (timeOut: number) => {
      if (hideTimeOut) {
        clearTimeout(hideTimeOut);
        hideTimeOut = null;
      }

      setIsVisible(true);

      hideTimeOut = setTimeout(() => {
        setIsVisible(false);
      }, timeOut);
    },
  };

  React.useEffect(() => {
    if (!media) {
      setQualities(null);
      setCurrentQuality(null);
      setLoaded(false);

      return;
    }

    setQualities(media.sources);

    const priority: ("UHD" | "FHD" | "HD" | "SD" | "AUTO")[] = [
      "FHD",
      "HD",
      "SD",
      "AUTO",
    ];
    for (const i in ["FHD", "HD", "SD", "AUTO"]) {
      if (
        media.sources[priority[i]] &&
        media.sources[priority[i]]?.url.trim() != ""
      ) {
        setCurrentQuality(media.sources[priority[i]] ?? null);
        break;
      }
    }
  }, [media]);
  React.useEffect(() => {
    if (!$videoRef.current || !currentQuality) return;

    const hls = new Hls();
    hls.loadSource(currentQuality.url);
    hls.attachMedia($videoRef.current);

    $videoRef.current.addEventListener("loadedmetadata", () => setLoaded(true));

    const handleKeyDown = (event: any) => {
      switch (event.code) {
        case "Space":
          if (!isVisible) videoActions.showControls(2000);
          videoActions.playPause();
          break;
        case "ArrowRight":
          videoActions.showControls(2000);
          videoActions.skip();
          break;
        case "ArrowLeft":
          videoActions.showControls(2000);
          videoActions.reverse();
          break;
        case "KeyF":
          videoActions.showControls(2000);
          videoActions.fullScreen();
          break;
        default:
          break;
      }
    };

    const handleMouseMove = () => {
      videoActions.showControls(3000);
    };

    window.addEventListener("keydown", handleKeyDown);
    document
      .getElementById("MEDIA_PLAYER_CONTAINER")
      ?.addEventListener("mousemove", handleMouseMove);
    document
      .getElementById("MEDIA_PLAYER_CONTAINER")
      ?.addEventListener("click", handleMouseMove);

    return () => {
      hls.destroy();
      $videoRef.current?.removeEventListener("loadedmetadata", () => {
        setLoaded(true);
      });

      window.removeEventListener("keydown", handleKeyDown);
      document
        .getElementById("MEDIA_PLAYER_CONTAINER")
        ?.removeEventListener("mousemove", handleMouseMove);
      document
        .getElementById("MEDIA_PLAYER_CONTAINER")
        ?.removeEventListener("click", handleMouseMove);
    };
  }, [$videoRef, currentQuality]);

  return { Styled, loaded, isVisible, canHide, setCanHide, $videoRef, ...rest };
}

export default core;
