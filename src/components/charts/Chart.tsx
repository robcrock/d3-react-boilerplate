import * as React from "react";
import { ChartContext } from "../../contexts/ChartContext";

import type { BoundedDimensions } from "./types";

interface ChartProps {
  dimensions: BoundedDimensions;
  className?: string;
  children?: React.ReactNode;
}

//* Step 3. Draw canvas
function Chart({ dimensions, className, children }: ChartProps) {
  return (
    <ChartContext.Provider value={dimensions}>
      <svg
        className={`Chart ${className ?? ""}`}
        width={dimensions.boundedWidth}
        height={dimensions.height}
      >
        <g
          transform={`translate(${dimensions.margin.left}, ${dimensions.margin.top})`}
        >
          {children}
        </g>
      </svg>
    </ChartContext.Provider>
  );
}

export default Chart;
