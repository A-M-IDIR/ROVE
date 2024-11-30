import React from "react";
import styled from "styled-components";

import { exe } from "COMPONENTS/CommandCenter/core";
import { TERMINAL } from "RESOURCES/HANDLERS/RemoteHandler";
import UseIsMobile from "RESOURCES/HOOKS/UseIsMobile";
import { UseRemoteCall, makeRemoteCall } from "RESOURCES/HOOKS/UseRemote";

const Styled = styled.div`
  display: flex;
  gap: 0.5rem;

  span {
    min-width: max-content;

    user-select: none;
  }

  p {
    overflow-x: hidden;

    width: 100%;

    outline: none;

    text-transform: uppercase;
  }
`;

function core() {
  const $inputRef = React.useRef<HTMLParagraphElement>(null);

  const content = TERMINAL.inputContent();
  const show = TERMINAL.inputShow();
  const path = TERMINAL.path("");
  const isParam = TERMINAL.isParam(false);

  const isMobile = UseIsMobile();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!$inputRef.current) return;

    if (event.key === "Enter") {
      event.preventDefault();

      if ($inputRef.current.innerText.trim() === "") return;

      exe({
        path: path.read,
        content: $inputRef.current.innerText.toLowerCase().trim(),
        isParam: isParam.read,
      });

      $inputRef.current.innerText = "";
      content.write("");
    }

    if (event.key === "Shift") {
      $inputRef.current.focus();
    }
  };
  const handleInput = () => {
    if (!$inputRef.current) return;

    content.write($inputRef.current.innerText.trim().toLocaleLowerCase());
  };
  UseRemoteCall("INPUT_UPDATE_CONTENT", (value: string) => {
    $inputRef.current!.innerText = value;

    const range = document.createRange();
    const selection = window.getSelection();

    if ($inputRef.current && selection) {
      range.setStart(
        $inputRef.current.childNodes[0] || $inputRef.current,
        value.length
      );
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });

  React.useEffect(() => {
    if (!$inputRef.current) return;

    $inputRef.current?.addEventListener("input", handleInput);
    $inputRef.current?.addEventListener("keydown", handleKeyDown);

    return () => {
      $inputRef.current?.removeEventListener("input", handleInput);
      $inputRef.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleInput]);
  React.useEffect(() => {
    if (!show.read) return;

    if (!isMobile) $inputRef.current?.focus();

    window.addEventListener("visibilitychange", () =>
      $inputRef.current?.focus()
    );

    return () => {
      window.removeEventListener("visibilitychange", () =>
        $inputRef.current?.focus()
      );
    };
  }, [show.read]);

  return { Styled, show: show.read, path: path.read, $inputRef };
}

export const updateInputValue = makeRemoteCall("INPUT_UPDATE_CONTENT");

export default core;
