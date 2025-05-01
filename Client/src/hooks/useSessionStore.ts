import { Dispatch, SetStateAction, useEffect, useState } from "react";

function useStickyState<T>(
  defaultValue: T,
  key: string,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const stickyValue = window.sessionStorage.getItem(key);

    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useStickyState;
