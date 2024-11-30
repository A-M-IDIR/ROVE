import core from "./core";

function ToolTip() {
  const { Styled, tip, handleClick } = core();

  if (tip)
    return (
      <Styled
        style={{
          top: tip.position.y - 10 + "px",
          left: tip.position.x + "px",
        }}
        onClick={handleClick}
      >
        {tip?.info && (
          <p style={{ backgroundColor: tip.theme?.background || "#e8bd0d" }}>
            <span
              className="Notch"
              style={{ color: tip.theme?.background || "#e8bd0d" }}
            ></span>

            {tip.info}
          </p>
        )}

        {tip?.bonus && (
          <span
            className="Bonus"
            style={{ backgroundColor: tip.theme?.background || "#e8bd0d" }}
          >
            {tip.bonus}
          </span>
        )}
      </Styled>
    );
}

export default ToolTip;
