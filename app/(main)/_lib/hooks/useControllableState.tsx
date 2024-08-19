import * as React from "react";

type UseControllableStateParams<T> = {
  prop?: T;
  defaultProp?: T;
  onChange?: (state: T) => void;
};

export function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = React.useState<T | undefined>(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;

  const handleChange = React.useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setUncontrolledProp(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange]
  );

  React.useEffect(() => {
    if (isControlled && prop !== value) {
      handleChange(prop as T);
    }
  }, [isControlled, prop, value, handleChange]);

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> = React.useCallback(
    (nextValue) => {
      const resolvedNextValue =
        typeof nextValue === "function"
          ? (nextValue as (prevState: T | undefined) => T)(value)
          : nextValue;

      handleChange(resolvedNextValue as T);
    },
    [value, handleChange]
  );

  return [value, setValue] as const;
}
