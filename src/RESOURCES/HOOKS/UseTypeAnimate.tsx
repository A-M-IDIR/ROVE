import React, { ReactElement } from "react";

type ValidChild = string | ReactElement<HTMLSpanElement>;
type Props = {
  type: ValidChild | ValidChild[] | null;
  delay?: number;
  rate?: number;
  volume?: number;
};

/**
 * Custom React Hook: `UseTypeAnimate`
 *
 * This hook provides a typewriter-style animation for text or React elements.
 * Characters appear one by one with sound effects.
 *
 * @param {Props} props - Configuration for the animation, including content, delay, rate, and volume.
 * @returns {JSX.Element[] | null} The animated content as an array of React elements or `null` if no content is provided.
 */
function UseTypeAnimate({ type, delay = 0, rate = 0.01, volume = 0.3 }: Props) {
  const [animatedContent, setAnimatedContent] = React.useState<
    JSX.Element[] | null
  >(null);
  const [skip, setSkip] = React.useState(false);

  const typingSound = new Audio("/SOUNDS/KEY_4.wav");
  const playSound = () => {
    typingSound.currentTime = 0;
    typingSound.volume = volume;
    typingSound.play();
  };

  const generateElements = (
    content: ValidChild | ValidChild[]
  ): { text: string; props?: string }[] => {
    const elements: { text: string; props?: string }[] = [];

    const processElement = (el: ValidChild) => {
      if (typeof el === "string") {
        el.match(/\S+\s*/g)?.forEach((char) => elements.push({ text: char }));
      } else {
        elements.push({
          text: el.props.children as unknown as string,
          props: el.props.className,
        });
      }
    };

    Array.isArray(content)
      ? content.forEach(processElement)
      : processElement(content);

    return elements;
  };

  const renderChildren = (
    elements: { text: string; props?: string }[],
    rate: number = 0
  ) => {
    let totalDelay = 0;

    return elements.map((el, i) => {
      if (i > 0 && elements[i - 1].text !== " ") {
        totalDelay += elements[i - 1].text.length * rate;
      }

      return handleAnimate({
        ...el,
        rate: skip ? 0 : rate,
        initialDelay: skip ? 0 : totalDelay,
        key: `${el.text}-${i}`,
      });
    });
  };

  const handleAnimate = ({
    text,
    props,
    rate = 0,
    initialDelay,
    key,
  }: {
    text: string;
    props?: string;
    rate: number;
    initialDelay: number;
    key: string;
  }) => (
    <span
      key={key}
      style={{ whiteSpace: "nowrap" }}
      onAnimationEnd={rate != 0 ? playSound : () => {}}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`Letter ${props ?? ""}`}
          style={{ animationDelay: `${i * rate + initialDelay}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );

  const timeOut = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (type && !skip) {
      timeOut.current = setTimeout(() => {
        setAnimatedContent(renderChildren(generateElements(type), rate));
      }, delay * 1000);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (timeOut.current) clearTimeout(timeOut.current);
        setSkip(true);
        setAnimatedContent(renderChildren(generateElements(type ?? ""), 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (timeOut.current) clearTimeout(timeOut.current);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [type, delay, skip]);

  return animatedContent;
}

export default UseTypeAnimate;
