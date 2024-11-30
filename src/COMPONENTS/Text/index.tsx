import core, { TypeProps } from "./core";

function Text(props: TypeProps) {
  const { Styled, content } = core(props);

  return (
    <Styled onClick={props.onClick} style={props.style}>
      {content && (
        <>
          <>
            {props.isListElement ? (
              <span className="Indent">{"*"}</span>
            ) : (
              <>{!props.hideIndent && <span className="Indent">{">"}</span>}</>
            )}
          </>

          <p
            className={`Content ${props.styling}`}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
          >
            {content}
          </p>
        </>
      )}
    </Styled>
  );
}

export default Text;
