import * as d3 from "d3";

import type { BoundedDimensions } from "../types";

import styles from "../styles/Axis.module.css";
import { useDimensionsContext } from "../../../contexts/ChartContext";
import { AlphabetData } from "../../../hooks/useAlphabetData";

const formatNumber = d3.format(",");

type FormatTickFunction =
  | ((string: string) => string)
  | ((date: Date) => string);

interface BaseAxisProps {
  dataset: AlphabetData[];
  dimension: "x" | "y";
  scale: d3.ScaleBand<string>;
  formatTick?: FormatTickFunction;
  label?: string;
  numberOfTicks?: number;
  lineClassName?: string;
  tickClassName?: string;
  labelClassName?: string;
}
function DiscreteAxis({
  dataset,
  dimension = "x",
  scale,
  formatTick = formatNumber,
  label = "",
  numberOfTicks,
  lineClassName = "",
  tickClassName = "",
  labelClassName = "",
  ...props
}: BaseAxisProps) {
  const dimensions = useDimensionsContext() as BoundedDimensions;

  switch (dimension) {
    case "x":
      return (
        <AxisHorizontal
          dataset={dataset}
          scale={scale}
          formatTick={formatTick}
          dimensions={dimensions}
          label={label}
          numberOfTicks={numberOfTicks}
          lineClassName={lineClassName}
          tickClassName={tickClassName}
          labelClassName={labelClassName}
          {...props}
        />
      );
    case "y":
      return (
        <AxisVertical
          dataset={dataset}
          scale={scale}
          formatTick={formatTick}
          dimensions={dimensions}
          label={label}
          numberOfTicks={numberOfTicks}
          lineClassName={lineClassName}
          tickClassName={tickClassName}
          labelClassName={labelClassName}
          {...props}
        />
      );
    default:
      throw new Error("Please specify x or y dimension!");
  }
}

interface AxisProps extends Omit<BaseAxisProps, "dimension"> {
  dataset: AlphabetData[];
  dimensions: BoundedDimensions;
  formatTick: FormatTickFunction;
}

function AxisHorizontal({
  dataset,
  dimensions,
  label,
  formatTick,
  scale,
  numberOfTicks,
  lineClassName,
  tickClassName,
  labelClassName,
  ...props
}: AxisProps) {
  //? Let's aim for one tick per 100 pixels for small screens
  //? and one tick per 250 pixels for wider screens
  // const numberOfTicks =
  //   dimensions.boundedWidth < 600
  //     ? dimensions.boundedWidth / 100
  //     : dimensions.boundedWidth / 250;
  // const ticks = scale.ticks(numberOfTicks);
  const ticks = dataset.map((d) => d.letter);
  const tickOffset = scale.bandwidth() / 2;

  return (
    <g
      className="Axis AxisHorizontal"
      {...props}
      fontSize="10"
      transform={`translate(0, ${dimensions.boundedHeight})`}
    >
      <line
        className={[styles.axisLine, lineClassName].join(" ")}
        x2={innerWidth}
      />
      {ticks.map((tick, i) => (
        <g
          key={i}
          className={[styles.axisTick, tickClassName].join(" ")}
          transform={`translate(${(scale(tick) as number) + tickOffset}, 0)`}
        >
          <line stroke="black" y2={6} />
          <text className={styles.axisTickHorizontal} y={9} dy="0.71em">
            {tick}
            {/* {formatTick(tick as string & Date)} */}
          </text>
        </g>
      ))}
      {label ? (
        <text
          className={[styles.axisLabel, labelClassName].join(" ")}
          transform={`translate(${dimensions.boundedWidth / 2}, ${
            dimensions.margin.bottom - 10
          })`}
          textAnchor="middle"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

function AxisVertical({
  dataset,
  dimensions,
  label,
  formatTick,
  scale,
  numberOfTicks,
  lineClassName,
  tickClassName,
  labelClassName,
  ...props
}: AxisProps) {
  // const numberOfTicks = dimensions.boundedHeight / 70;
  // const ticks = scale.ticks(numberOfTicks);
  const ticks = dataset.map((d) => d.letter);

  return (
    <g className="Axis AxisVertical" {...props} fontSize="10">
      <line
        className={[styles.axisLine, lineClassName].join(" ")}
        y2={dimensions.boundedHeight}
      />
      {ticks.map((tick, i) => (
        <g
          key={i}
          className={tickClassName}
          transform={`translate(0, ${scale(tick)})`}
        >
          <line stroke="black" x2={-6} />
          <text className={styles.axisTickVertical} x={-9}>
            {formatTick(tick as string & Date)}
          </text>
        </g>
      ))}
      {label ? (
        <text
          className={[styles.axisLabel, labelClassName].join(" ")}
          transform={`translate(${-dimensions.margin.left + 10}, ${
            dimensions.boundedHeight / 2
          }) rotate(-90)`}
          textAnchor="middle"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

export default DiscreteAxis;
