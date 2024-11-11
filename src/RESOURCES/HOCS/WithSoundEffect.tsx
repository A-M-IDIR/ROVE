import React, { ReactNode } from "react";

function WithSoundEffect({ children }: { children: ReactNode }) {
  const soundLocation = "../../../public/SOUNDS/";
  const typingSounds = [];

  const enterSound = React.useRef(new Audio(`${soundLocation}/ENTER.wav`));

  const spaceSound = React.useRef(new Audio(`${soundLocation}/SPACE.wav`));
  const deleteSound = React.useRef(new Audio(`${soundLocation}/DELETE.wav`));

  for (let i = 1; i <= 4; i++) {
    const audio = new Audio(`${soundLocation}/KEY_${i}.wav`);
    audio.volume = 0.4;
    typingSounds.push(React.useRef(audio));
  }

  let lastSoundIndex = -1;

  const getRandomTypingSound = () => {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * typingSounds.length);
    } while (randomIndex === lastSoundIndex);

    lastSoundIndex = randomIndex;
    return typingSounds[randomIndex].current;
  };

  const handleKeyUp = (event) => {
    let soundToPlay = null;

    if (event.key === " ") {
      spaceSound.current.volume = 0.4;
      soundToPlay = spaceSound.current;
    } else if (event.key === "Enter") {
      enterSound.current.volume = 0.4;
      soundToPlay = enterSound.current;
    } else if (event.key === "Backspace") {
      deleteSound.current.volume = 0.4;
      soundToPlay = deleteSound.current;
    } else if (/^[a-zA-Z0-9 ]$/.test(event.key)) {
      soundToPlay = getRandomTypingSound();
    }

    if (soundToPlay) {
      soundToPlay.currentTime = 0;
      soundToPlay.play();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, []);

  return <>{children}</>;
}

export default WithSoundEffect;
