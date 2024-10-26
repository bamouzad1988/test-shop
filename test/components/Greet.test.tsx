import React from "react";
import { render, screen } from "@testing-library/react";
import Greet from "./../../src/components/Greet";

describe("Greet", () => {
  it("should render name", () => {
    render(<Greet name="Bijan" />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();

    expect(heading).toHaveTextContent(/hello bijan/i);
  });

  it("should render login button when name is not provided", () => {
    render(<Greet name="" />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    expect(button).toHaveTextContent(/login/i);
  });
});
