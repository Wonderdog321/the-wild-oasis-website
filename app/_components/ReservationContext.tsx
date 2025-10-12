"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

interface ReservationContextType {
  range: DateRange;
  setRange: Dispatch<SetStateAction<DateRange>>;
  resetRange: () => void;
}

const ReservationContext = createContext<ReservationContextType | null>(null);

const initialState: DateRange = { from: undefined, to: undefined };

export default function ReservationProvider({ children }: PropsWithChildren) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("Context was used outside provider.");
  }
  return context;
}

export { ReservationProvider, useReservation };
