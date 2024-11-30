import styled from "styled-components";

const Styled = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  .VideoShortCutHitBox {
    width: 100%;
    height: 100%;
  }
`;

function ShortCuts() {
  const getMediaElement = (): HTMLVideoElement => {
    const mediaElement: HTMLVideoElement | null =
      (document.getElementById("MEDIA_PLAYER") as HTMLVideoElement) ?? null;

    while (!mediaElement) {}

    return mediaElement;
  };
  const getMediaContainerElement = (): HTMLDivElement => {
    const mediaContainerElement: HTMLDivElement | null =
      (document.getElementById("MEDIA_PLAYER_CONTAINER") as HTMLDivElement) ??
      null;

    while (!mediaContainerElement) {}

    return mediaContainerElement;
  };

  const handlePause = () => {
    if (getMediaElement().paused) {
      getMediaElement().play();

      return;
    }

    getMediaElement().pause();
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen({ navigationUI: "hide" });
      getMediaContainerElement().style.position = "fixed";
      getMediaContainerElement().style.width = "100dvw";
      getMediaContainerElement().style.height = "100dvh";

      return;
    }

    getMediaContainerElement().style.position = "relative";
    getMediaContainerElement().style.width = "100%";
    getMediaContainerElement().style.height = "100%";
    document.exitFullscreen();
  };

  return (
    <Styled>
      <div
        className="VideoShortCutHitBox"
        onClick={handlePause}
        onDoubleClick={handleFullScreen}
      ></div>
    </Styled>
  );
}

export default ShortCuts;
