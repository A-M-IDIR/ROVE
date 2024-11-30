import React, { ReactNode } from "react";

function WithLoadFont({ children }: { children: ReactNode }) {
  const [isFontLoaded, setIsFontLoaded] = React.useState(false);

  React.useEffect(() => {
    const fontLoading = async () => {
      try {
        await document.fonts.ready;
        setIsFontLoaded(true);
      } catch (error) {
        console.error("ERROR LOADING FONT:", error);
      }
    };

    fontLoading();
  }, []);

  if (isFontLoaded) return <>{children}</>;
}

export default WithLoadFont;
