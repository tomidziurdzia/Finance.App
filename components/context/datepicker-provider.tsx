"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { addDays, startOfMonth } from "date-fns";

const DatePickerContext = createContext(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DatePickerProvider = (props: any) => {
  const [date, setDate] = useState({
    from: startOfMonth(new Date()),
    to: addDays(new Date(), 0),
    selected: "m",
  });
  const { children, ...others } = props;

  const onChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => {
      setDate({
        ...(state == undefined && { ...date }),
        ...state,
        selected: state?.selected ?? "none",
      });
    },
    [date]
  );

  const value = useMemo(() => {
    return { date, onChange };
  }, [date, onChange]);

  return (
    <DatePickerContext.Provider value={value} {...others}>
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDate = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context = useContext<any>(DatePickerContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a DatePickerContext.`);
  }
  return context;
};
