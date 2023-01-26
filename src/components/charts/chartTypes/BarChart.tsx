import * as React from "react";
import * as d3 from "d3";

import Chart from "../Chart";
import Axis from "../peripherals/ContinuousAxis";

import { AlphabetData } from "../../../hooks/useAlphabetData";
import { BoundedDimensions, NumberDataMetric } from "../types";
import DiscreteAxis from "../peripherals/DiscreteAxis";

//* Step 2. Create chart dimensions
const width = 600;

const dimensions: BoundedDimensions = {
  width,
  //? Bar Charts are easiest to read when they are wider than they are tall!
  height: width * 0.6,
  margin: {
    top: 30,
    right: 0,
    bottom: 50,
    left: 0,
  },
  boundedWidth: 0,
  boundedHeight: 0,
};

dimensions.boundedWidth =
  dimensions.width - dimensions.margin.left - dimensions.margin.right;
dimensions.boundedHeight =
  dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

const BarChart = ({
  dataset,
  metric,
}: {
  dataset: AlphabetData[];
  metric: NumberDataMetric<AlphabetData>;
}) => {
  //* Step 1b. Access Data
  const xAccessor = (d: AlphabetData) => d.letter;

  //* Step 4. Create scales
  const xScale = d3
    .scaleBand()
    .domain(dataset.map(xAccessor))
    .range([0, dimensions.width]);

  const yAccessor = (bar: AlphabetData) => bar.frequency;

  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...dataset.map(yAccessor))])
    .range([dimensions.boundedHeight, 0]);

  const barPadding = 1;

  return (
    /* Step 3. Draw canvas */
    <Chart dimensions={dimensions}>
      {/* Step 5. Draw data */}
      <g role="list" tabIndex={0} aria-label="bars">
        {dataset.map((letter, i) => (
          <g
            key={`bar-${i}`}
            role="listitem"
            tabIndex={0}
            aria-label={`The letter ${
              letter.letter
            } has a frequency of ${yAccessor(letter)}`}
          >
            <rect
              x={xScale(letter.letter)}
              y={yScale(yAccessor(letter))}
              width={xScale.bandwidth() - barPadding}
              height={dimensions.boundedHeight - yScale(yAccessor(letter))}
              fill="hsl(221deg 98% 67%)"
            />
          </g>
        ))}
      </g>
      {/* Step 6. Draw peripherals */}
      <DiscreteAxis
        dimension="x"
        dataset={dataset}
        scale={xScale}
        label={metric}
      />
    </Chart>
  );
};

export default BarChart;
