import CommandHandler from "RESOURCES/HANDLERS/CommandHandler";
import core from "./core";

function CommandCenter() {
  const { Styled, render } = core();

  return (
    <Styled>
      {render.map((command, i) =>
        CommandHandler[command.key](i.toString(), command.props || null)
      )}
    </Styled>
  );
}

export default CommandCenter;
