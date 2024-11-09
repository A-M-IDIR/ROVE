import { ReactNode } from "react";
import { message } from "antd";
import UseRemote from "RESOURCES/HOOKS/UseRemote";

function WithAlert({
  maxAlert = 3,
  children,
}: {
  maxAlert?: number;
  children: ReactNode;
}) {
  const [messageApi, contextHolder] = message.useMessage({
    maxCount: maxAlert,
  });

  const handleAlert = (config: any) => {
    messageApi.open({
      ...config,
      content: config.message,
    });
  };

  UseRemote({ key: "alert", action: handleAlert });

  return (
    <>
      <>{children}</>

      <>{contextHolder}</>
    </>
  );
}

export const alert = (config: {
  type: string;
  message: string;
  duration: number;
}) => {
  localStorage.setItem("alert", JSON.stringify(config));
  window.dispatchEvent(new Event("alert"));
};

export default WithAlert;
