import React from "react";
import styled from "styled-components";

import CommandHandler from "RESOURCES/HANDLERS/CommandHandler";
import { TERMINAL } from "RESOURCES/HANDLERS/RemoteHandler";
import { makeRemoteCall, UseRemoteCall } from "RESOURCES/HOOKS/UseRemote";

const Styled = styled.div`
  max-width: 700px;

  .SpaceS {
    margin: 0.6rem 0;
  }
  .SpaceM {
    margin: 1.4rem 0;
  }
  .SpaceL {
    margin: 2rem 0;
  }
  .SpaceG {
    margin: 3rem 0;
  }

  @media screen and (max-width: 600px) {
    .SpaceL {
      margin: 1.8rem 0;
    }
    .SpaceG {
      margin: 2.4rem 0;
    }
  }
`;

type TypeCommand = { key: string; props?: { param: string } };
type TypeExe = { path: string; content: string; isParam: boolean };

function core() {
  const [render, setRender] = React.useState<TypeCommand[]>([
    { key: "welcome" },
  ]);
  const path = TERMINAL.path();
  const isParam = TERMINAL.isParam();
  const systemCommands: Record<string, Function> = {
    clear: () => {
      setRender([render[0]]);
    },
    back: (data: TypeExe) => {
      if (data.path != "")
        path.write(data.path.split(" ").slice(0, -1).join(" "));
      isParam.write(false);
    },
    cancel: () => {
      path.write("");
      isParam.write(false);
    },
    discover: (data: TypeExe) => {
      if (data.path != "")
        setRender((prev) => [
          ...prev,
          { key: data.path?.toLowerCase().split(" ").join("_") },
        ]);
    },
  };

  UseRemoteCall<TypeExe>("COMMAND_CENTER_EXE", (data: TypeExe) => {
    if (systemCommands[data.content]) return systemCommands[data.content](data);

    let command: TypeCommand = {
      key: `${
        data.path != ""
          ? data.path?.toLowerCase().split(" ").join("_") + "_"
          : ""
      }${data.isParam ? "param" : data.content}`,
    };
    if (data.isParam) command["props"] = { param: data.content };

    if (CommandHandler[command.key]) setRender((prev) => [...prev, command]);
  });

  return { Styled, render };
}

export const exe = makeRemoteCall<TypeExe>("COMMAND_CENTER_EXE");

export default core;
