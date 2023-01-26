import * as React from "react";
import * as d3 from "d3";

import { useAsync } from "./useAsync";

export interface AlphabetData {
  letter: string;
  frequency: number;
}

export type ScaledAccessorFunction = (d: AlphabetData) => number;

export function useAlphabetData() {
  //* Step 1a. Fetch Data
  const { data: dataset, status, error, run } = useAsync<Array<AlphabetData>>();

  React.useEffect(() => {
    const abortController = new AbortController();
    const datasetPromise = d3.json("/data/alphabet.json", {
      signal: abortController.signal,
    }) as Promise<Array<AlphabetData>>;

    run(datasetPromise);

    return () => {
      abortController.abort();
    };
  }, [run]);

  return { dataset, status, error };
}
