import type { WeatherData } from "../hooks/useWeatherData";
import type { NumberDataMetric } from "../components/charts/types";

import styles from "./styles/Scatterplot.module.css";
import Histogram from "../components/charts/chartTypes/Histogram";

const metrics: NumberDataMetric<WeatherData>[] = [
  "windSpeed",
  "moonPhase",
  "dewPoint",
  "humidity",
  "uvIndex",
  "windBearing",
  "temperatureMin",
  "temperatureMax",
];

function HistogramPage({ dataset }: { dataset: WeatherData[] }) {
  return (
    <div className={styles.wrapper}>
      {/* Add a div to copy the structure from the original example */}
      <div>
        {metrics.map((metric) => (
          <Histogram key={metric} dataset={dataset} metric={metric} />
        ))}
      </div>
    </div>
  );
}

export default HistogramPage;
