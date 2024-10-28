import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductList from "../src/components/ProductList";
import { CartProvider } from "../src/providers/CartProvider";

const AllProvider = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <QueryClientProvider client={client}>
      <CartProvider>
        <ProductList />
      </CartProvider>
    </QueryClientProvider>
  );
};

export default AllProvider;
