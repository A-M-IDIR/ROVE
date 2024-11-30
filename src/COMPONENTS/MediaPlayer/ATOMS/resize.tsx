import SvgHandler from "RESOURCES/HANDLERS/SvgHandler";
import Button from "./button";
import React from "react";

function Resize() {
  const [isFullScreen, setIsFullScreen] = React.useState<boolean | null>(null);
  const getMediaContainerElement = (): HTMLDivElement => {
    const mediaContainerElement: HTMLDivElement | null =
      (document.getElementById("MEDIA_PLAYER_CONTAINER") as HTMLDivElement) ??
      null;

    while (!mediaContainerElement) {}

    return mediaContainerElement;
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(Boolean(document.fullscreenElement));
    };

    handleFullscreenChange();

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  React.useEffect(() => {
    if (isFullScreen === null) return;

    if (isFullScreen) {
      document.documentElement.requestFullscreen({ navigationUI: "hide" });
      getMediaContainerElement().style.position = "fixed";
      getMediaContainerElement().style.width = "100dvw";
      getMediaContainerElement().style.height = "100dvh";
      getMediaContainerElement().style.zIndex = "10000";

      return;
    }

    getMediaContainerElement().style.position = "relative";
    getMediaContainerElement().style.width = "100%";
    getMediaContainerElement().style.height = "100%";

    if (document.fullscreenElement) document.exitFullscreen();
  }, [isFullScreen]);

  return (
    <Button
      icon={SvgHandler.FullScreen({ width: "74%" })}
      onClick={() => setIsFullScreen(!isFullScreen)}
    />
  );
}

export default Resize;
