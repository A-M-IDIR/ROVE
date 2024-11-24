import React, { ReactNode } from "react";

/**
 * Higher-Order Component: `WithNoContexMenu`
 *
 * A wrapper component that disables the context menu (right-click menu) for its children.
 * It prevents the default browser behavior when the user attempts to open the context menu anywhere in the document.
 *
 * @param {ReactNode} props.children - The child components wrapped by `WithNoContexMenu`.
 *
 * @returns {JSX.Element}
 *
 **/
function WithNoContexMenu({ children }: { children: ReactNode }) {
  React.useEffect(() => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    document.addEventListener("keydown", (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        (event.key === "i" || event.key === "s")
      ) {
        event.preventDefault();
      }
    });

    return () => {
      document.removeEventListener("contextmenu", (event) =>
        event.preventDefault()
      );
      document.removeEventListener("keydown", (event) => {
        if (
          (event.ctrlKey || event.metaKey) &&
          (event.key === "i" || event.key === "s")
        ) {
          event.preventDefault();
        }
      });
    };
  }, []);

  return <>{children}</>;
}

export default WithNoContexMenu;
