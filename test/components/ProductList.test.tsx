import React from "react";

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { delay, http, HttpResponse } from "msw";
import ProductList from "../../src/components/ProductList";
import { server } from "../mocks/server";
import AllProvider from "./../AllProvider";

describe("ProductList", () => {
  // const renderComponent = () => {
  //   const client = new QueryClient({
  //     defaultOptions: { queries: { retry: false } },
  //   });

  //   render(
  //     <QueryClientProvider client={client}>
  //       <ProductList />
  //     </QueryClientProvider>
  //   );
  // };

  it("should render the list of products", async () => {
    render(<ProductList />, { wrapper: AllProvider });

    const items = await screen.findAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
  });

  it("should render no product found when the list is empty", async () => {
    server.use(
      http.get("/products", () => {
        return HttpResponse.json([]); 
      })
    );

    render(<ProductList />, { wrapper: AllProvider });

    const message = await screen.findByText(/no products/i);

    expect(message).toBeInTheDocument();
  });

  it("should render an error message when there is an error", async () => {
    server.use(
      http.get("/products", () => {
        return HttpResponse.error();
      })
    );

    render(<ProductList />, { wrapper: AllProvider });

    const message = await screen.findByText(/error/i);

    expect(message).toBeInTheDocument();
  });

  it("should render loading before showing data", async () => {
    server.use(
      http.get("/products", async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    render(<ProductList />, { wrapper: AllProvider });

    const message = await screen.findByText(/loading/i);

    expect(message).toBeInTheDocument();
  });

  it("should remove loading after data is fetched", async () => {
    render(<ProductList />, { wrapper: AllProvider });

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });

  it("should remove loading if data fetching fails", async () => {
    server.use(
      http.get("/products", () => {
        return HttpResponse.error();
      })
    );

    render(<ProductList />, { wrapper: AllProvider });

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });
});
