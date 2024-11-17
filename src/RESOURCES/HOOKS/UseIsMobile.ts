import React from "react";

/**
 * Custom React Hook: `UseIsMobile`
 *
 * This hook determines whether the current device is a mobile device based on the user agent string.
 *
 * @returns {boolean} `true` if the user is on a mobile device, otherwise `false`.
 */
const UseIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const userAgent =
      navigator.userAgent || navigator.vendor || (window as any).opera;

    const mobileCheck =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      );

    setIsMobile(mobileCheck);
  }, []);

  return isMobile;
};

export default UseIsMobile;
