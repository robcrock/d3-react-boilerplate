import type { AlphabetData } from "../hooks/useAlphabetData";

import styles from "./styles/Scatterplot.module.css";
import BarChart from "../components/charts/chartTypes/BarChart";

function HistogramPage({ dataset }: { dataset: AlphabetData[] }) {
  return (
    <div className={styles.wrapper}>
      {/* Add a div to copy the structure from the original example */}
      <div>
        <BarChart dataset={dataset} metric={"frequency"} />
      </div>
    </div>
  );
}

export default HistogramPage;
