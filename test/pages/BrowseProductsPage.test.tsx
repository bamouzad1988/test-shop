import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { server } from "../mocks/server";
import { delay, http, HttpResponse } from "msw";
import { Theme } from "@radix-ui/themes";
import BrowseProducts from "./../../src/pages/BrowseProductsPage";
import { userEvent } from "@testing-library/user-event";
import { CartProvider } from "../../src/providers/CartProvider";
import { categories, products } from "../mocks/data";

describe("BrowseProductsPage", () => {
  const renderComponent = () => {
    render(
      <CartProvider>
        <Theme>
          <BrowseProducts />
        </Theme>
      </CartProvider>
    );
  };

  it("should show a loading slkeleton after fetching categories ", () => {
    server.use(
      http.get("/categories", async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    renderComponent();

    const skeleton = screen.getByRole("progressbar", { name: /categories/i });
    expect(skeleton).toBeInTheDocument();
  });

  it("should hide loading slkeleton after fetching categories ", () => {
    renderComponent();

    const skeleton = screen.getByRole("progressbar", { name: /categories/i });
    waitForElementToBeRemoved(skeleton);
  });

  it("should show a loading slkeleton after fetching products ", () => {
    server.use(
      http.get("/products", async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    renderComponent();

    const skeleton = screen.getByRole("progressbar", { name: /products/i });
    expect(skeleton).toBeInTheDocument();
  });

  it("should hide loading slkeleton when fetching products ", () => {
    renderComponent();

    const skeleton = screen.getByRole("progressbar", { name: /products/i });
    waitForElementToBeRemoved(skeleton);
  });

  it("should not render error if categories can not fetch", async () => {
    server.use(
      http.get("/products", async () => {
        await delay();
        return HttpResponse.error();
      })
    );

    renderComponent();

    const skeleton = screen.getByRole("progressbar", { name: /categories/i });

    await waitForElementToBeRemoved(skeleton);

    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("combobox", { name: /category/i })
    ).not.toBeInTheDocument();
  });

  it("should render an error if products cannot be fetched", async () => {
    server.use(
      http.get("/products", async () => {
        await delay();
        return HttpResponse.error();
      })
    );

    renderComponent();

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it("should render ctegories", async () => {
    server.use(
      http.get("/categories", async () => {
        await delay();
        return HttpResponse.json([]);
      })
    );

    renderComponent();

    const combobox = await screen.findByRole("combobox");

    const user = userEvent.setup();
    await user.click(combobox);

    expect(combobox).toBeInTheDocument();

    const all = screen.getByRole("option", { name: /all/i });
    expect(all).toBeInTheDocument();

    categories.forEach(async (category) => {
      const option = await screen.findAllByRole("option", {
        name: category.name,
      });
      expect(option).toBeInTheDocument();
    });
  });

  it("should render products", async () => {
    server.use(
      http.get("/products", async () => {
        await delay();
        return HttpResponse.json(products);
      })
    );

    renderComponent();

    await waitForElementToBeRemoved(() =>
      screen.getByRole("progressbar", { name: /products/i })
    );

    products.forEach((product) => {
      const productName = screen.queryByText(product.name);
      
      expect(productName).toBeInTheDocument();
    });
  });
});
