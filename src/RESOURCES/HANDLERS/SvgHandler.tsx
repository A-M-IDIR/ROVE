import React, { ComponentPropsWithoutRef, ReactElement } from "react";

const Icon = (content: ReactElement) => {
  return (config?: ComponentPropsWithoutRef<`svg`>) => {
    return React.cloneElement(content, config);
  };
};

const SvgHandler = {
  Logo: Icon(
    <svg
      viewBox="0 0 399 342"
      fill="#0F0F0F"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M362.427 339.66C377.272 348.554 393.348 330.175 382.531 316.678L294.839 207.266C291.124 202.631 294.429 195.762 300.373 195.762C354.5 195.762 398.378 151.939 398.378 97.8806C398.378 43.8228 354.5 0 300.373 0H279.906C278.73 0 277.875 0 276.75 2.36212e-05L276.262 9.58752e-06L276.416 9.59615e-06L105.264 0C91.1113 0 84.341 17.3666 94.7662 26.9242L162.36 88.8903C163.754 90.1685 164.34 92.0894 163.952 93.9389C163.43 96.4287 161.264 98.2744 158.717 98.2744H15.5496C-0.194965 98.2744 -5.93697 118.983 7.5649 127.072L362.427 339.66Z"
      />
      <path d="M133.697 286.848C133.697 317.14 109.14 341.697 78.8483 341.697C48.5564 341.697 24 317.14 24 286.848C24 256.556 48.5564 232 78.8483 232C109.14 232 133.697 256.556 133.697 286.848Z" />
    </svg>
  ),
};

export default SvgHandler;
