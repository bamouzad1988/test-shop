import React from "react";
import { render, screen } from "@testing-library/react";
import ProductDetail from "./../../src/components/ProductDetail";
import { products } from "./../mocks/data";
import { server } from "../mocks/server";
import { http, HttpResponse } from "msw";
import AllProvider from "./../AllProvider";

describe("ProductDetail", () => {
  it("should render the product details", async () => {
    render(<ProductDetail productId={1} />);

    const name = await screen.findByText(new RegExp(products[0].name));
    const price = await screen.findByText(
      new RegExp(products[0].price.toString())
    );
    expect(name).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  it("should render message if not found", async () => {
    server.use(http.get("products/1", () => HttpResponse.json(null)));

    render(<ProductDetail productId={1} />);

    const message = await screen.findByText(/not found/i);

    expect(message).toBeInTheDocument();
  });
  it("should render error when network has peoblem", async () => {
    server.use(http.get("products/1", () => HttpResponse.error()));

    render(<ProductDetail productId={1} />);

    const message = await screen.findByText(/error/i);

    expect(message).toBeInTheDocument();
  });

  it("should render an error for invalid productId", async () => {
    render(<ProductDetail productId={0} />);

    const message = await screen.findByText(/invalid/i);

    expect(message).toBeInTheDocument();
  });
});
