import React, { ReactNode } from "react";
import { TERMINAL } from "RESOURCES/HANDLERS/RemoteHandler";

function WithHideInput({
  duration = 0,
  children,
}: {
  duration: number;
  children: ReactNode;
}) {
  const show = TERMINAL.inputShow();

  const timeOut = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    show.write(false);

    timeOut.current = setTimeout(() => {
      show.write(true);
    }, duration * 1000);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (timeOut.current) {
          clearTimeout(timeOut.current);
          show.write(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (timeOut.current) clearTimeout(timeOut.current);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}

export default WithHideInput;
