import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductList from "../src/components/ProductList";

const AllProvider = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <QueryClientProvider client={client}>
      <ProductList />
    </QueryClientProvider>
  );
};

export default AllProvider;
