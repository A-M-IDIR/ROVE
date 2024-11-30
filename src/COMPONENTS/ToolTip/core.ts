import React from "react";
import styled from "styled-components";

import { updateInputValue } from "COMPONENTS/Input/core";
import { TERMINAL } from "RESOURCES/HANDLERS/RemoteHandler";
import UseResize from "RESOURCES/HOOKS/UseResize";
import RequestHandler from "RESOURCES/HANDLERS/RquestHandler";

const Styled = styled.div`
  position: fixed;
  z-index: 50;

  display: flex;
  align-items: flex-end;
  gap: 0.3rem;

  transform: translateY(-100%);

  color: black;
  text-shadow: none;
  line-height: initial;

  user-select: none;

  cursor: pointer;

  p {
    position: relative;

    min-width: max-content.read;
    padding: 0.1rem 0.3rem;

    background-color: #e8bd0d;
    border-radius: 0.1rem 0.1rem 0.1rem 0;

    text-transform: uppercase;
    font-size: 0.8rem;
    text-warp: no-wrap;

    .Notch {
      position: absolute;
      bottom: -4px;
      left: 0px;

      width: 0;
      height: 0;

      border-right: 5px solid transparent;
      border-top: 5px solid;
    }
  }

  .Bonus {
    padding: 0rem 0.2rem;

    background-color: #e8bd0d;
    color: black;
    border-radius: 0.1rem;

    font-size: 0.7rem !important;
  }

  @media screen and (max-width: 600px) {
    p {
      font-size: 0.7rem;
    }

    span {
      font-size: 0.6rem;
    }
  }
`;

function core() {
  const [tip, setTip] = React.useState<{
    position: {
      x: number;
      y: number;
    };
    theme?: {
      background?: string;
      textColor?: string;
    };
    info: string | null;
    bonus?: string | null;
  } | null>(null);

  const content = TERMINAL.inputContent();
  const path = TERMINAL.path();

  const commands = {
    general: ["clear"],
    base: ["movies", "shows"],
    navigate: ["back", "cancel"],
    explore: ["search", "discover"],
  };

  const { windowWidth, windowHeight } = UseResize();

  const getCaretCoordinates = () => {
    let x = 0;
    let y = 0;

    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0).cloneRange();

      range.collapse(true);

      const rect = range.getBoundingClientRect();
      x = rect.left;
      y = rect.top;
    }

    return { x, y };
  };
  const handleClick = () => {
    if (tip?.info) {
      updateInputValue(tip.info);
      setTip(null);
    }
  };
  const getInfo: Record<string, () => void> = {
    general: () => {
      setTip({
        position: getCaretCoordinates(),
        theme: {
          background: "#4874BF",
        },
        info:
          [...commands.general, ...commands.base].find((command) =>
            command.includes(content.read)
          ) || null,
      });
    },
    movies: () => {
      setTip({
        position: getCaretCoordinates(),
        theme: {
          background: "#4874BF",
        },
        info:
          [...commands.general, ...commands.navigate, ...commands.explore].find(
            (command) => command.includes(content.read)
          ) || null,
      });
    },
    shows: () => {
      setTip({
        position: getCaretCoordinates(),
        theme: {
          background: "#4874BF",
        },
        info:
          [...commands.general, ...commands.navigate, ...commands.explore].find(
            (command) => command.includes(content.read)
          ) || null,
      });
    },
    movies_search: async () => {
      const search = await RequestHandler({
        key: "TOOL_TIP_SEARCH",
        config: {
          url: `https://api.themoviedb.org/3/search/movie?query=${content.read}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWNkMmE1YWE0YmMwMzAyZjNhZmRlYTIwZGQ2YWRhZSIsInN1YiI6IjY1OTEyNjU1NjUxZmNmNWYxMzhlMWRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5boG-w-nlk-SWB8hvFeWq_DNRbrU6n5XEXleVQ1L1Sg"}`,
          },
        },
      });

      if ([...commands.general, ...commands.navigate].includes(content.read)) {
        setTip({
          position: getCaretCoordinates(),
          theme: {
            background: "#4874BF",
          },
          info: content.read,
        });

        return;
      }

      const popularityThreshold = 100;
      const popularResults = search.data?.results
        .filter(
          (media: any) =>
            media.vote_count >= popularityThreshold && media.vote_average >= 3
        )
        .sort((a: any, b: any) => b.vote_count - a.vote_count);

      if (!popularResults[0]) {
        return setTip(null);
      }

      setTip({
        position: getCaretCoordinates(),
        info: popularResults[0]!.title,
        bonus: popularResults[0]!.release_date.split("-")[0],
      });
    },
    shows_search: async () => {
      const search = await RequestHandler({
        key: "TOOL_TIP_SEARCH",
        config: {
          url: `https://api.themoviedb.org/3/search/tv?query=${content.read}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWNkMmE1YWE0YmMwMzAyZjNhZmRlYTIwZGQ2YWRhZSIsInN1YiI6IjY1OTEyNjU1NjUxZmNmNWYxMzhlMWRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5boG-w-nlk-SWB8hvFeWq_DNRbrU6n5XEXleVQ1L1Sg"}`,
          },
        },
      });

      if ([...commands.general, ...commands.navigate].includes(content.read)) {
        setTip({
          position: getCaretCoordinates(),
          theme: {
            background: "#4874BF",
          },
          info: content.read,
        });

        return;
      }

      const popularityThreshold = 100;
      const popularResults = search.data.results
        .filter(
          (media: any) =>
            media.vote_count >= popularityThreshold && media.vote_average >= 3
        )
        .sort((a: any, b: any) => b.vote_count - a.vote_count);

      if (!popularResults[0]) {
        return setTip(null);
      }

      setTip({
        position: getCaretCoordinates(),
        info: popularResults[0]!.name,
        bonus: popularResults[0]!.first_air_date.split("-")[0],
      });
    },
  };

  React.useEffect(() => {
    if (path.read === undefined || content.read === "") {
      setTip(null);
      return;
    }

    const func =
      getInfo[path.read.toLocaleLowerCase().split(" ").join("_")] ||
      getInfo["general"];
    func();
  }, [path.read, content.read]);

  React.useEffect(() => {
    const updatePosition = () => {
      if (!tip) return;

      let updatedTip = tip;
      updatedTip["position"] = getCaretCoordinates();

      setTip(updatedTip);
    };

    updatePosition();

    document
      .getElementById("TERMINAL")
      ?.addEventListener("scroll", () => setTip(null));

    return () =>
      document
        .getElementById("TERMINAL")
        ?.removeEventListener("scroll", () => setTip(null));
  }, [windowWidth, windowHeight]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && tip?.info) {
        updateInputValue(tip.info);
        setTip(null);
      }
    };

    document
      .getElementById("TERMINAL_INPUT")
      ?.addEventListener("keydown", handleKeyDown);

    return () =>
      document
        .getElementById("TERMINAL_INPUT")
        ?.removeEventListener("keydown", handleKeyDown);
  }, [tip]);

  return { Styled, tip, handleClick };
}

export default core;
