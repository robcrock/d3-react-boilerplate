import { createContext, useContext } from "react";
import { BoundedDimensions } from "../components/charts/types";

export const ChartContext = createContext<BoundedDimensions>({
  width: 0,
  height: 0,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  boundedWidth: 0,
  boundedHeight: 0,
});

export function useDimensionsContext() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error("useDimensionsContext must be used within a <Chart />");
  }
  return context;
}
