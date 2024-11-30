import React from "react";
import styled from "styled-components";

const Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;

  width: max-content;

  font-size: 0.74rem;

  span {
    color: silver;
  }

  p {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 18px;
    padding: 0 0.2rem;

    background-color: #4874bf;
    color: black;
    border-radius: 0.2rem;
  }
`;

function Progress() {
  const [duration, setDuration] = React.useState<number | null>(null);
  const [progress, setProgress] = React.useState<number>(0);

  const getMediaElement = (): HTMLVideoElement => {
    const mediaElement: HTMLVideoElement | null =
      (document.getElementById("MEDIA_PLAYER") as HTMLVideoElement) ?? null;

    while (!mediaElement) {}

    return mediaElement;
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

    setDuration(mediaElement.duration);
    setProgress(mediaElement.currentTime);

    mediaElement.addEventListener("timeupdate", () => {
      setProgress(mediaElement.currentTime);
    });

    return () => {
      mediaElement.removeEventListener("loadedmetadata", () =>
        setDuration(mediaElement.duration)
      );
      mediaElement.removeEventListener("timeupdate", () => {
        setProgress(mediaElement.currentTime);
      });
    };
  }, []);

  if (duration)
    return (
      <Styled>
        <p>{formatTime(progress)}</p>

        <span>/</span>

        <p>{formatTime(duration)}</p>
      </Styled>
    );
}

export default Progress;
