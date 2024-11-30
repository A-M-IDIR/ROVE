import React from "react";
import SvgHandler from "RESOURCES/HANDLERS/SvgHandler";
import Button from "./button";

function Play() {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  const getMediaElement = (): HTMLVideoElement => {
    const mediaElement: HTMLVideoElement | null =
      (document.getElementById("MEDIA_PLAYER") as HTMLVideoElement) ?? null;

    while (!mediaElement) {}

    return mediaElement;
  };
  const handleClick = () => {
    if (getMediaElement().paused) {
      getMediaElement().play();

      return;
    }

    getMediaElement().pause();
  };

  React.useEffect(() => {
    const mediaElement = getMediaElement();

    setIsPlaying(!mediaElement.paused);

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    mediaElement.addEventListener("playing", onPlay);
    mediaElement.addEventListener("pause", onPause);

    return () => {
      mediaElement.removeEventListener("playing", onPlay);
      mediaElement.removeEventListener("pause", onPause);
    };
  }, []);

  return (
    <Button
      icon={
        isPlaying
          ? SvgHandler.Pause({ width: "74%" })
          : SvgHandler.Play({ width: "74%" })
      }
      onClick={handleClick}
    />
  );
}

export default Play;
