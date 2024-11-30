import styled from "styled-components";

import WithStaticOverlay from "RESOURCES/HOCS/WithStaticOverlay";
import WithSplashScreen from "RESOURCES/HOCS/WithSplashScreen";
import WithTypeSound from "RESOURCES/HOCS/WithTypeSound";
import WithWindow from "RESOURCES/HOCS/WithWindow";
import CommandCenter from "COMPONENTS/CommandCenter";
import Input from "COMPONENTS/Input";
import ToolTip from "COMPONENTS/ToolTip";
import HoverInfo from "COMPONENTS/HoverInfo";
import Watch from "COMPONENTS/Watch";

const StyledTerminal = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;

  width: 100vw;
  height: 100dvh;
  padding: 1.8rem;
  padding-top: 2rem;

  color: rgb(0, 150, 0);
  text-shadow: 0 0px 5px rgba(190, 160, 0, 0.35),
    0 0px 10px rgba(190, 160, 0, 0.35);
  background: radial-gradient(circle, rgb(10, 15, 1) 0%, rgba(0, 0, 0, 0) 100%);

  line-height: 1.8rem;
  caret-color: green;

  .CommandInput {
    color: lightGray;
  }

  .Alert {
    color: goldenrod;

    span {
      color: goldenrod;
    }
  }

  .UnderLine {
    text-decoration: underline wavy;

    span {
      text-decoration: underline wavy;
    }
  }

  .UpperCase {
    text-transform: uppercase;

    span {
      text-transform: uppercase;
    }
  }

  .Link {
    color: #008ca9;
    text-decoration: underline !important;

    cursor: pointer;

    span {
      color: #008ca9;
      text-decoration: underline !important;

      cursor: pointer;
    }
  }

  @media screen and (max-width: 600px) {
    padding: 1.8rem 1rem;

    font-size: 0.88rem;
    line-height: 1.4rem;
  }
`;

export default function Terminal() {
  return (
    <StyledTerminal id="TERMINAL">
      <HoverInfo />

      <CommandCenter />

      <Input />

      <ToolTip />

      <WithWindow windowKey="WATCH">
        <Watch />
      </WithWindow>
    </StyledTerminal>
  );
}

export const TerminalWithVFX = () => (
  <WithTypeSound>
    <WithStaticOverlay>
      <WithSplashScreen>
        <Terminal />
      </WithSplashScreen>
    </WithStaticOverlay>
  </WithTypeSound>
);
