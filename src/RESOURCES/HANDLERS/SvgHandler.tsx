import React, { ComponentPropsWithoutRef, ReactElement } from "react";

const Icon = (content: ReactElement) => {
  return (config?: ComponentPropsWithoutRef<`svg`>) => {
    return React.cloneElement(content, config);
  };
};

const SvgHandler = {
  Logo: Icon(
    <svg
      viewBox="0 0 448 460"
      fill="#E50914"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.2032 0H136L122.967 74.5184L61.8786 86.3887L76.2032 0ZM55.4594 125.101L40.9637 212.521L100.868 200.881L116.184 113.302L55.4594 125.101ZM34.5446 251.234L18.69 346.849L77.3321 335.454L94.0848 239.664L34.5446 251.234ZM0 459.564L12.2708 385.562L70.5493 374.237L55.6265 459.564H0ZM225.868 0L90.4384 459.564H103.167L200.473 362.258L297.779 459.564H447.84L328.26 286.055L400.946 236.816L417.359 219.231L417.659 218.252C436.522 195.209 447.84 165.751 447.84 133.649C447.84 129.517 447.653 125.429 447.286 121.393L447.84 119.58L447.031 118.856C439.67 52.005 383.004 0 314.192 0H225.868Z"
      />
    </svg>
  ),
  Play: Icon(
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 20.1957V3.80421C6 3.01878 6.86395 2.53993 7.53 2.95621L20.6432 11.152C21.2699 11.5436 21.2699 12.4563 20.6432 12.848L7.53 21.0437C6.86395 21.46 6 20.9812 6 20.1957Z"></path>
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
  CornerBottomLeft: Icon(
    <svg
      viewBox="0 0 154 154"
      stroke="currentColor"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M143.667 143.667L18.6667 143.667C16.4566 143.667 14.337 142.789 12.7742 141.226C11.2113 139.663 10.3334 137.543 10.3334 135.333L10.3334 10.3333"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default SvgHandler;
