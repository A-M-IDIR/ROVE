import { ReactNode } from "react";
import { message } from "antd";
import { UseRemoteCall, makeRemote } from "RESOURCES/HOOKS/UseRemote";

/**
 * Higher-Order Component: `WithAlert`
 *
 * A wrapper component that provides a global alert system.
 * It listens for custom events to trigger alerts and ensures a controlled maximum number of simultaneous alerts.
 *
 * @param {number} [props.maxAlert=3] - The maximum number of alerts that can appear at once.
 * @param {ReactNode} props.children - The child components wrapped by `WithAlert`.
 *
 * @returns {JSX.Element} - A React component that wraps its children and includes the alert system.
 *
 *
 **/
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

  UseRemoteCall<any>("ALERT_HANDLE_ALERT", (config: any) => {
    messageApi.open({
      type: config.type ?? "",
      content: config.message ?? "",
      duration: config.duration ?? 2,
    });
  });

  return (
    <>
      <>{children}</>

      <>{contextHolder}</>
    </>
  );
}

/**
 * Utility Function: `alert`
 *
 * Triggers an alert event to display a notification via the `WithAlert` component.
 *
 **/
export const alert = makeRemote<{
  type?: "message" | "error" | "warnning" | "success";
  message?: string;
  duration?: number;
}>("ALERT_HANDLE_ALERT");

export default WithAlert;
