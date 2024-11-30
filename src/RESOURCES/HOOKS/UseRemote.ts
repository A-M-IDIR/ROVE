import React from "react";

/**
 * Custom React Hook: `UseRemoteState`
 *
 * A React hook that creates a state synchronized across multiple components via custom events.
 * It enables one component to update the state and propagate the changes to others using the same key.
 *
 * @template T - The type of the state value.
 *
 * @param {string} key - A unique key to identify the custom event used for state synchronization.
 * @param {T} [init] - An optional initial value for the state. If not provided, the state will be read from localStorage if available.
 * @param {number} timeOutBeforeCleanUp - The timeout in seconds before deleting the localStorage init value. Defaults to 2 seconds.
 *
 * @returns {{ read: T | undefined, write: (value: T | ((prevState: T) => T)) => void }} - Returns an object with:
 * - `read`: The current state value.
 * - `write`: A function to update the state and propagate the changes via a custom event.
 *
 **/
export function UseRemoteState<T = any>(
  key: string,
  init?: T,
  timeOutBeforeCleanUp: number = 2
): {
  read: T;
  write: (value: T | ((prevState: T) => T)) => void;
} {
  const [state, setState] = React.useState<T>();

  const initialize = (value: T | undefined) => {
    const initKey = `${key}_INIT`;
    const storedItem = localStorage.getItem(initKey);

    if (storedItem) {
      try {
        const { value: storedValue, t } = JSON.parse(storedItem);

        if (Date.now() - t > timeOutBeforeCleanUp * 1000) {
          localStorage.removeItem(initKey);
        } else {
          setState(storedValue as T);
        }
      } catch {
        console.error("FAILED TO PARSE STORED VALUE FOR KEY ::", initKey);
        localStorage.removeItem(initKey);
      }
    }

    if (value !== undefined) {
      write(value);
      localStorage.setItem(initKey, JSON.stringify({ value, t: Date.now() }));

      setTimeout(
        () => localStorage.removeItem(initKey),
        timeOutBeforeCleanUp * 1000
      );
    }
  };

  const read = (event: Event) => {
    event instanceof CustomEvent && setState(event.detail);
  };
  const write = (value: T | ((prevState: T) => T)) => {
    if (typeof value === "function") {
      return setState((prevState) => {
        const updatedValue = (value as (prevState: T) => T)(prevState as T);
        window.dispatchEvent(new CustomEvent<T>(key, { detail: updatedValue }));
        return updatedValue;
      });
    }

    setState(value);
    window.dispatchEvent(new CustomEvent<T>(key, { detail: value }));
  };

  React.useEffect(() => {
    initialize(init);

    window.addEventListener(key, read);

    return () => {
      window.removeEventListener(key, read);
    };
  }, []);

  return { read: state as T, write };
}

/**
 * Custom React Hook: `UseRemoteCall`
 *
 * This hook facilitates inter-component communication via custom events.
 * It allows emitting and receiving events with a specific key, carrying
 * payloads of a generic type `T`. Ideal for scenarios where components
 * need to communicate without direct parent-child relationships.
 *
 * @template T - The type of the payload data used in the event.
 *
 * @param {string} key - A unique key to identify the custom event.
 * @param {(params: T) => any} action - An optional callback function
 * that will be invoked when an event with the specified key is received.
 *
 * @returns {Function} emit - A function to emit a custom event with the specified key and payload.
 **/
export function UseRemoteCall<T = string>(
  key: string,
  action?: (params: T) => any
) {
  const receive = (event: Event) => {
    if (event instanceof CustomEvent && action) {
      action(event.detail);
    }
  };

  const emit = (params: T) => {
    window.dispatchEvent(new CustomEvent<T>(key, { detail: params }));
  };

  React.useEffect(() => {
    if (!action) return;

    window.addEventListener(key, receive);

    return () => {
      window.removeEventListener(key, receive);
    };
  }, []);

  return { emit };
}

/**
 * Utility Function: `makeRemoteCall`
 *
 * Creates a reusable function to update the state across components by dispatching a custom event.
 * This utility complements `UseRemoteState` by providing an external mechanism to trigger updates.
 *
 * @template T - The type of the state value.
 *
 * @param {string} key - A unique key to identify the custom event used for state synchronization.
 *
 * @returns {(params: T) => void} - A function to dispatch a custom event with the specified key and state value.
 *
 **/
export function makeRemoteCall<T>(key: string) {
  return (params: T) =>
    window.dispatchEvent(new CustomEvent<T>(key, { detail: params }));
}

/**
 * Utility Function: `makeRemote`
 *
 * @template T - The type of the state value.
 *
 * @param {string} key - A unique key to identify the custom event used for state synchronization.
 * @param {T} [init] - An optional initial value for the state. If not provided, the state will be read from localStorage if available.
 *
 **/
export function makeRemote<T>(key: string) {
  return (init?: T) => UseRemoteState<T>(key, init);
}

export default {
  State: UseRemoteState,
  Call: UseRemoteCall,
};
