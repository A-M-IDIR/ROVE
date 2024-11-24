import { ReactNode } from "react";
import styled from "styled-components";

const StyledOverlay = styled.div<{ opacity: number }>`
  position: fixed;
  z-index: 100;

  inset: -200%;
  background-image: url(../public/IMAGES/NOISE.png);
  opacity: ${(props) => props.opacity};

  pointer-events: none;

  animation: shift 0.1s linear infinite both;

  @keyframes shift {
    0% {
      transform: translateX(5%) translateY(5%);
    }

    100% {
      transform: translateX(-5%) translateY(-5%);
    }
  }
`;

/**
 * Higher-Order Component: `WithStaticOverlay`
 *
 * A wrapper component that applies a subtle animated static overlay effect while rendering its children.
 * It enhances the visual appeal of the UI by adding a styled overlay with a customizable opacity.
 *
 * @param {number} [props.opacity=0.05] - The opacity of the overlay. A lower value makes it more transparent.
 * @param {ReactNode} props.children - The child components to be rendered within the overlay.
 *
 * @returns {JSX.Element} - A React component that renders the children alongside the overlay.
 *
 **/
function WithStaticOverlay({
  opacity = 0.06,
  children,
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
