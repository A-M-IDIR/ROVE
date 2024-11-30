import { TypeTarget } from "RESOURCES/HOOKS/UseExplore";
import { makeRemote, makeRemoteCall } from "RESOURCES/HOOKS/UseRemote";

export const TERMINAL = {
  path: makeRemote<string>("PATH"),
  isParam: makeRemote<boolean>("IS_PARAM"),
  inputShow: makeRemote<boolean>("INPUT_SHOW"),
  inputContent: makeRemote<string>("INPUT_CONTENT"),
  target: makeRemote<TypeTarget | null>("WATCH_TARGET"),
  closeWindow: (key: string) => makeRemoteCall<void>(`${key}_CLOSED`),
  openWindow: (key: string) => makeRemoteCall<boolean>(key),
};

export default {
  TERMINAL,
};
