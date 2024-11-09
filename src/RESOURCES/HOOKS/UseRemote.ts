import React from "react";

type Props = {
  key: string;
  action?: (data: any) => void;
  reset?: boolean;
};

function UseRemote<T = string>({ key, action, reset = true }: Props) {
  const [received, setReceived] = React.useState<string | null>(null);

  const emit = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event(key));
  };

  const clear = () => {
    localStorage.removeItem(key);
  };

  const receive = () => {
    if (action) action(JSON.parse(localStorage.getItem(key) as string));

    setReceived(
      localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key) as string)
        : null
    );
  };

  React.useEffect(() => {
    if (reset) localStorage.removeItem(key);

    window.addEventListener(key, receive);

    return () => {
      window.removeEventListener(key, receive);
    };
  }, []);

  return { emit, clear, received };
}

export default UseRemote;
