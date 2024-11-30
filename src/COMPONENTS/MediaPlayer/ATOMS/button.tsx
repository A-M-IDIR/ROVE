import { ComponentPropsWithoutRef, ReactNode } from "react";
import styled from "styled-components";

type Props = { icon: ReactNode } & ComponentPropsWithoutRef<"div">;

const Styled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1.6rem;
  height: 1.6rem;

  background-color: #ae8e0b;
  outline: none;
  border: none;
  border-radius: 0.2rem;

  cursor: pointer;

  transition: 0.1s all;

  &:active {
    transform: scale(0.95);
  }

  svg {
    fill: black;

    transition: 0.1s all;
  }
`;

function Button({ icon, ...rest }: Props) {
  return <Styled {...rest}>{icon}</Styled>;
}

export default Button;
