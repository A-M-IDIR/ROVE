import SvgHandler from "RESOURCES/HANDLERS/SvgHandler";
import Button from "./button";

function Skip() {
  const getMediaElement = (): HTMLVideoElement => {
    const mediaElement: HTMLVideoElement | null =
      (document.getElementById("MEDIA_PLAYER") as HTMLVideoElement) ?? null;

    while (!mediaElement) {}

    return mediaElement;
  };
  const handleSkip = (rate: number = 5) => {
    return {
      forward: () =>
        (getMediaElement().currentTime = getMediaElement().currentTime + rate),
      backward: () =>
        (getMediaElement().currentTime = getMediaElement().currentTime - rate),
    };
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Button
        icon={SvgHandler.Backward({ width: "78%" })}
        onClick={handleSkip().backward}
      />

      <Button
        icon={SvgHandler.Forward({ width: "78%" })}
        onClick={handleSkip().forward}
      />
    </div>
  );
}

export default Skip;
