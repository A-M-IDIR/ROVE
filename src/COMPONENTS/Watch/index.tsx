import { AnimatePresence, motion } from "framer-motion";
import { BarLoader } from "react-spinners";

import core from "./core";
import MediaPlayer from "COMPONENTS/MediaPlayer";
import SvgHandler from "RESOURCES/HANDLERS/SvgHandler";

function Watch() {
  const { Styled, media } = core();

  return (
    <Styled>
      <AnimatePresence mode="wait">
        {media ? (
          <motion.div
            className="Video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MediaPlayer media={media} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="Loading"
            key={"LOADING"}
          >
            <>{SvgHandler.Logo()}</>

            <BarLoader color="#D92026" />
          </motion.div>
        )}
      </AnimatePresence>
    </Styled>
  );
}

export default Watch;
