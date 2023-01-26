import * as React from "react";
import * as d3 from "d3";

import Chart from "../Chart";
import Axis from "../peripherals/ContinuousAxis";

import { WeatherData } from "../../../hooks/useWeatherData";
import { BoundedDimensions, NumberDataMetric } from "../types";

//* Step 2. Create chart dimensions
const width = 600;

const dimensions: BoundedDimensions = {
  width,
  //? Histograms are easiest to read when they are wider than they are tall!
  height: width * 0.6,
  margin: {
    top: 30,
    right: 10,
    bottom: 50,
    left: 50,
  },
  boundedWidth: 0,
  boundedHeight: 0,
};

dimensions.boundedWidth =
  dimensions.width - dimensions.margin.left - dimensions.margin.right;
dimensions.boundedHeight =
  dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

const Histogram = ({
  dataset,
  metric,
}: {
  dataset: WeatherData[];
  metric: NumberDataMetric<WeatherData>;
}) => {
  //* Step 1b. Access Data
  const xAccessor = (d: WeatherData) => d[metric];

  //* Step 4. Create scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor) as [number, number])
    .range([0, dimensions.boundedWidth])
    .nice();

  const binGenerator = d3
    .bin<WeatherData, number>()
    .domain(xScale.domain() as [number, number])
    .value(xAccessor)
    .thresholds(12);

  const bins = binGenerator(dataset);
  type WeatherDataBin = (typeof bins)[number];

  const yAccessor = (bin: WeatherDataBin) => bin.length;

  const yScale = d3
    .scaleLinear()
    //? For histograms, we want the y axis to always start at 0
    .domain([0, d3.max(bins, yAccessor)] as [0, number])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const barPadding = 1;
  const xAccessorScaled = (d: WeatherDataBin) =>
    xScale(d.x0 as number) + barPadding;
  const yAccessorScaled = (bin: WeatherDataBin) => yScale(yAccessor(bin));

  const widthAccessorScaled = (d: WeatherDataBin) =>
    xScale(d.x1 as number) - xScale(d.x0 as number) - barPadding;
  const heightAccessorScaled = (d: WeatherDataBin) =>
    dimensions.boundedHeight - yScale(yAccessor(d));

  const midpointAccessorScaled = (d: WeatherDataBin) =>
    xScale(d.x0 as number) +
    (xScale(d.x1 as number) - xScale(d.x0 as number)) / 2;

  const mean = d3.mean(dataset, xAccessor) as number;

  return (
    /* Step 3. Draw canvas */
    <Chart dimensions={dimensions}>
      {/* Step 5. Draw data */}
      <g role="list" tabIndex={0} aria-label="histogram bars">
        {bins.map((bin, i) => (
          <g
            key={`histogram-bin-${i}`}
            role="listitem"
            tabIndex={0}
            aria-label={`There were ${yAccessor(
              bin
            )} days with ${metric} between ${bin.x0} and ${bin.x1}`}
          >
            <rect
              x={xAccessorScaled(bin)}
              y={yAccessorScaled(bin)}
              width={widthAccessorScaled(bin)}
              height={heightAccessorScaled(bin)}
              fill="hsl(221deg 98% 67%)"
            />
            <text
              x={midpointAccessorScaled(bin)}
              y={yAccessorScaled(bin) - 5}
              textAnchor="middle"
              fill="hsl(0deg 0% 40%)"
              fontSize="12px"
            >
              {yAccessor(bin)}
            </text>
          </g>
        ))}
      </g>
      {/* Step 6. Draw peripherals */}
      <line
        x1={xScale(mean)}
        x2={xScale(mean)}
        y1={-15}
        y2={dimensions.boundedHeight}
        stroke="maroon"
        strokeDasharray="2px 4px"
      />
      <text
        role="presentation"
        aria-hidden={true}
        x={xScale(mean)}
        y={-20}
        textAnchor="middle"
        fill="maroon"
        fontSize="12px"
      >
        mean
      </text>
      <Axis dimension="x" scale={xScale} label={metric} />
    </Chart>
  );
};

export default Histogram;
