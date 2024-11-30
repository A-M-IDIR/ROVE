import React, { ReactNode } from "react";

import { TERMINAL } from "RESOURCES/HANDLERS/RemoteHandler";
import WithHideInput from "RESOURCES/HOCS/WithHideInput";
import Welcome from "COMPONENTS/CommandCenter/ATOMS/welcome";
import Movies from "COMPONENTS/CommandCenter/ATOMS/movies";
import Shows from "COMPONENTS/CommandCenter/ATOMS/shows";
import ShowResult from "COMPONENTS/CommandCenter/ATOMS/showResult";
import MovieResult from "COMPONENTS/CommandCenter/ATOMS/movieResult";

type TypeCommand = {
  path: string;
  prevPath: string;
  command: string;
  isParam: boolean;
  duration: number;
};

function Command({ Element, config }: { Element: any; config: TypeCommand }) {
  return (key: string, props: { param: string } | null) => (
    <MakeCommand
      key={key}
      config={{ ...config, command: props?.param ?? config.command }}
    >
      <Element {...props} />
    </MakeCommand>
  );
}
const MakeCommand = ({
  children,
  config: { path, prevPath, command, isParam, duration = 0 },
}: {
  children: ReactNode;
  config: TypeCommand;
}) => {
  const { write: setPath } = TERMINAL.path();
  const { write: setIsParam } = TERMINAL.isParam();

  React.useEffect(() => {
    setPath(path);

    if (isParam) {
      return setIsParam(true);
    }
    setIsParam(false);
  }, []);

  return (
    <WithHideInput duration={duration}>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          textWrap: "nowrap",
        }}
      >
        <span>$ {`${prevPath} >`}</span>

        <span
          style={{
            color: "silver",
            textTransform: "uppercase",
            textWrap: "wrap",
          }}
        >
          {command}
        </span>
      </div>

      <div className="SpaceM" />

      <>{children}</>

      <div className="SpaceM" />
    </WithHideInput>
  );
};

const CommandHandler: Record<
  string,
  (key: string, props: { param: string } | null) => ReactNode
> = {
  welcome: Welcome,
  movies: Command({
    Element: Movies,
    config: {
      path: "MOVIES",
      prevPath: "",
      command: "MOVIES",
      isParam: false,
      duration: 1.2,
    },
  }),
  movies_search: Command({
    Element: () => <></>,
    config: {
      path: "MOVIES SEARCH",
      prevPath: "MOVIES",
      command: "SEARCH",
      isParam: true,
      duration: 0,
    },
  }),
  movies_search_param: Command({
    Element: MovieResult,
    config: {
      path: "MOVIES SEARCH",
      prevPath: "MOVIES SEARCH",
      command: "",
      isParam: true,
      duration: 1.8,
    },
  }),
  shows: Command({
    Element: Shows,
    config: {
      path: "SHOWS",
      prevPath: "",
      command: "SHOWS",
      isParam: false,
      duration: 1.2,
    },
  }),
  shows_search: Command({
    Element: () => <></>,
    config: {
      path: "SHOWS SEARCH",
      prevPath: "SHOWS",
      command: "SEARCH",
      isParam: true,
      duration: 0,
    },
  }),
  shows_search_param: Command({
    Element: ShowResult,
    config: {
      path: "SHOWS SEARCH",
      prevPath: "SHOWS SEARCH",
      command: "",
      isParam: true,
      duration: 1.8,
    },
  }),
};

export default CommandHandler;
