import core from "./core";

function Input() {
  const { Styled, show, path, $inputRef } = core();

  if (show)
    return (
      <Styled>
        <span>
          $ {path} {" >"}
        </span>

        <p
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          ref={$inputRef}
          id="TERMINAL_INPUT"
          className="CommandInput"
        />
      </Styled>
    );
}

export default Input;
