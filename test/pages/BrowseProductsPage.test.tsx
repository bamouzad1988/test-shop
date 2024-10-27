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

describe("BrowseProductsPage", () => {
  const renderComponent = () => {
    render(
      <Theme>
        <BrowseProducts />
      </Theme>
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
});
