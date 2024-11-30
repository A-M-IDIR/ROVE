import React, { ComponentPropsWithoutRef, ReactElement } from "react";
import styled from "styled-components";

import UseTypeAnimate from "RESOURCES/HOOKS/UseTypeAnimate";

type ValidChild = string | ReactElement<HTMLSpanElement>;
export type TypeProps = {
  children?: ValidChild | ValidChild[] | null;
  hideIndent?: boolean;
  isListElement?: boolean;
  animationConfig?: { delay?: number; rate?: number };
  styling?: string;
} & ComponentPropsWithoutRef<"div">;

const Styled = styled.div`
  display: flex;

  user-select: none;

  .Indent {
    margin-right: 0.6rem;
  }

  .Content {
    width: max-content;

    .Letter {
      display: inline-block;
      opacity: 0;
      animation: fadeIn 0.1s forwards;

      @keyframes fadeIn {
        to {
          opacity: 1;
        }
      }
    }
  }
`;

function core({ children = null, animationConfig }: TypeProps) {
  const content = UseTypeAnimate({
    type: children,
    delay: animationConfig?.delay,
    rate: animationConfig?.rate,
  });

  React.useEffect(() => {
    if (content) {
      document.getElementById("TERMINAL")?.scrollTo({
        top: document.getElementById("TERMINAL")?.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [content]);

  return { Styled, content };
}

export default core;
