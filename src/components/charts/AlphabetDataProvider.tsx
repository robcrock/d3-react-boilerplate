import * as React from "react";

import { useAlphabetData } from "../../hooks/useAlphabetData";

import type { AlphabetData } from "../../hooks/useAlphabetData";

function AlphabetDataProvider({
  Consumer,
}: {
  Consumer: React.FC<{ dataset: AlphabetData[] }>;
}) {
  //* Step 1a. Fetch Data
  const { dataset, status, error } = useAlphabetData();

  switch (status) {
    case "idle":
      return <span>Waiting for data...</span>;
    case "pending":
      return <div>Loading data...</div>;
    case "rejected":
      throw error;
    case "resolved":
      return <Consumer dataset={dataset as AlphabetData[]} />;
  }
}

export default AlphabetDataProvider;
