import { ReactNode } from "react";
import styled from "styled-components";

const StyledOverlay = styled.div<{ opacity: number }>`
  position: fixed;
  z-index: 1000;

  inset: -250%;
  background-image: url(../public/IMAGES/NOISE.png);
  opacity: ${(props) => props.opacity};

  pointer-events: none;

  animation: shift 0.2s linear infinite both;

  @keyframes shift {
    0% {
      transform: translateX(5%) translateY(5%);
    }

    100% {
      transform: translateX(-5%) translateY(-5%);
    }
  }
`;

function WithStaticOverlay({
  children,
  opacity = 0.05,
}: {
  children: ReactNode;
  opacity?: number;
}) {
  return (
    <>
      <>{children}</>

      <StyledOverlay opacity={opacity} />
    </>
  );
}

export default WithStaticOverlay;
