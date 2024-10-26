import React from "react";
import { render, screen } from "@testing-library/react";
import TermsAndConditions from "./../../src/components/TermsAndConditions";
import { userEvent } from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      heading: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button"),
    };
  };
  it("should render with correct text and initial state", () => {
    const { heading, checkbox, button } = renderComponent();

    expect(heading).toHaveTextContent("Terms & Conditions");
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  it("should endable the button when the checkbox is checked", async () => {
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(checkbox);

    expect(button).toBeEnabled();
  });
});
