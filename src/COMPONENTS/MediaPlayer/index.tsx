import core, { Props } from "./core";

import Slider from "./ATOMS/slider";
import Progress from "./ATOMS/progress";
import Play from "./ATOMS/play";
import Skip from "./ATOMS/skip";
import Resize from "./ATOMS/resize";
import ShortCuts from "./ATOMS/shortCuts";
import Episodes from "./ATOMS/episodes";

function MediaPlayer(Props: Props) {
  const { Styled, loaded, $videoRef, isVisible, canHide, setCanHide, ...rest } =
    core(Props);

  return (
    <Styled id="MEDIA_PLAYER_CONTAINER">
      <video ref={$videoRef} autoPlay {...rest} id="MEDIA_PLAYER" />

      {loaded && (
        <div
          className="OverLay"
          key="MEDIA_OVERLAY"
          style={{
            opacity: isVisible || !canHide ? 1 : 0,
            transform:
              isVisible || !canHide
                ? "translate(-50%, 1px)"
                : "translate(-50%, 5px)",
            pointerEvents: isVisible || !canHide ? "all" : "none",
          }}
        >
          <aside></aside>

          <div className="Hidden">
            <ShortCuts />
          </div>

          <div className="Controlls">
            <Slider />

            <div className="Keys">
              <aside>
                <Play />

                <Skip />

                <Progress />
              </aside>

              <aside>
                <Episodes
                  onMouseEnter={() => setCanHide(false)}
                  onMouseLeave={() => setCanHide(true)}
                />

                <Resize />
              </aside>
            </div>
          </div>
        </div>
      )}
    </Styled>
  );
}

export default MediaPlayer;
