import { useState } from "react";
import { useLocation } from "react-router-dom";

function useHistoryState<T>(key: string, initialValue: T): [T, (t: T) => void] {
  const location = useLocation();

  const [rawState, rawSetState] = useState<T>(() => {
    const value = (history.state as any)?.[key];
    return value ?? initialValue;
  });
  function setState(value: T) {
    history.replaceState(
      {
        ...location.state,
        state: {
          ...location.state,
          [key]: value,
        },
      },
      "test",
      location.pathname,
    );
    rawSetState(value);
  }
  return [rawState, setState];
}

export default useHistoryState;
