import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Using Chakra UI
import { ChakraProvider } from "@chakra-ui/react";

// Using React Query
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider resetCSS={false}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
