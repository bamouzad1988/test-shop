import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { vi } from "vitest";
import AllProvider from "./../../AllProvider";
import ProductForm from "./../../../src/components/ProductForm";
import { Product } from "../../../src/entities";

describe("ProductForm", () => {
  const renderComponent = (product?: Product) => {
    render(<ProductForm onSubmit={vi.fn()} product={product} />, {
      wrapper: AllProvider,
    });
  };

  it("should render form feilds", async () => {
    renderComponent();

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const name = screen.getByPlaceholderText(/name/i);
    const price = screen.getByPlaceholderText(/price/i);
    const placeholder = screen.getByRole("combobox", { name: /Placeholder/i });

    expect(name).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
  });
  it("should populate form fields when editing a product", async () => {
    const category = { id: 1, name: "bijan" };
    const product: Product = {
      id: 1,
      name: "Bread",
      price: 10,
      categoryId: category.id,
    };

    renderComponent(product);

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const name = screen.getByPlaceholderText(/name/i);
    const price = screen.getByPlaceholderText(/price/i);
    const placeholder = screen.getByRole("combobox", { name: /Placeholder/i });

    expect(name).toHaveValue(product.name);
    expect(price).toHaveValue(product.price.toString());
    expect(placeholder).toHaveTextContent(category.name);
  });
});
