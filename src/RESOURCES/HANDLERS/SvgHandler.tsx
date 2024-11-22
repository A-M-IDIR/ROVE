import React, { ComponentPropsWithoutRef, ReactElement } from "react";

const Icon = (content: ReactElement) => {
  return (config?: ComponentPropsWithoutRef<`svg`>) => {
    return React.cloneElement(content, config);
  };
};

const SvgHandler = {
  Logo: Icon(
    <svg
      width="302"
      height="255"
      viewBox="0 0 302 255"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0L7.10761 255H97.5681V180.437L116.306 175.272L184.475 255H292.704V146L136.983 138.152L135.368 129.759L292.704 103.937C309.181 69.2911 315.384 0 208.382 0H0ZM214.162 67.8411C216.153 54.2162 203.532 43.0125 190.239 46.6053L88.7907 74.0257C84.4966 75.1864 81.7977 79.432 82.5692 83.8129C83.3925 88.4874 87.8493 91.6095 92.5238 90.7862L212.377 69.6782C213.306 69.5147 214.025 68.7741 214.162 67.8411Z"
        fill="#D92026"
      />
    </svg>
  ),
  Info: Icon(
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
    </svg>
  ),
  GlobeSearch: Icon(
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M19.3 16.9c.4-.7.7-1.5.7-2.4 0-2.5-2-4.5-4.5-4.5S11 12 11 14.5s2 4.5 4.5 4.5c.9 0 1.7-.3 2.4-.7l3.2 3.2 1.4-1.4-3.2-3.2zm-3.8.1c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5zM12 20v2C6.48 22 2 17.52 2 12S6.48 2 12 2c4.84 0 8.87 3.44 9.8 8h-2.07A8 8 0 0 0 15 4.59V5c0 1.1-.9 2-2 2h-2v2c0 .55-.45 1-1 1H8v2h2v3H9l-4.79-4.79C4.08 10.79 4 11.38 4 12c0 4.41 3.59 8 8 8z"></path>
    </svg>
  ),
  WindowMax: Icon(
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M464 0H144c-26.5 0-48 21.5-48 48v48H48c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-96 464H48V256h320v208zm96-96h-48V144c0-26.5-21.5-48-48-48H144V48h320v320z"></path>
    </svg>
  ),
  Close: Icon(
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" strokeWidth="3" d="M3,3 L21,21 M3,21 L21,3"></path>
    </svg>
  ),
};

export default SvgHandler;
