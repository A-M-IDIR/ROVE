import React, { ReactNode } from "react";
import UseIsMobile from "RESOURCES/HOOKS/UseIsMobile";

/**
 * Higher-Order Component: `WithTypeSound`
 *
 * A wrapper component that plays typing sound effects when specific keyboard keys are pressed.
 * It enhances the user experience by simulating typing feedback using sound effects.
 *
 * @param {number} [props.volume=0.4] - The volume level for the sound effects (value between 0 and 1).
 * @param {ReactNode} props.children - The child components to be rendered within the sound-enabled context.
 *
 * @returns {JSX.Element} - A React component that renders its children while enabling typing sound effects.
 *
 **/
function WithTypeSound({
  volume = 0.4,
  children,
}: {
  volume?: number;
  children: ReactNode;
}) {
  const isMobile = UseIsMobile();

  const soundLocation = "/SOUNDS/";

  const typingSounds: any = [];
  const enterSound = React.useRef(new Audio(`${soundLocation}/ENTER.wav`));
  const spaceSound = React.useRef(new Audio(`${soundLocation}/SPACE.wav`));
  const deleteSound = React.useRef(new Audio(`${soundLocation}/DELETE.wav`));

  for (let i = 1; i <= 4; i++) {
    const audio = new Audio(`${soundLocation}/KEY_${i}.wav`);
    audio.volume = volume;
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

  const handleKeyUp = (event: KeyboardEvent) => {
    let soundToPlay = null;

    if (event.key === " ") {
      spaceSound.current.volume = volume;
      soundToPlay = spaceSound.current;
    } else if (event.key === "Enter") {
      enterSound.current.volume = volume - 0.2;
      soundToPlay = enterSound.current;
    } else if (event.key === "Backspace") {
      deleteSound.current.volume = volume;
      soundToPlay = deleteSound.current;
    } else {
      soundToPlay = getRandomTypingSound();
    }

    if (soundToPlay) {
      soundToPlay.currentTime = 0;
      soundToPlay.play();
    }
  };

  React.useEffect(() => {
    if (isMobile) return;

    window.addEventListener("keydown", handleKeyUp);

    return () => window.removeEventListener("keydown", handleKeyUp);
  }, [isMobile]);

  return <>{children}</>;
}

export default WithTypeSound;
