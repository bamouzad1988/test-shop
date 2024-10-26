import React from "react";
import { render, screen } from "@testing-library/react";
import ExpandableText from "./../../src/components/ExpandableText";
import { userEvent } from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const longText = "a".repeat(300);
  const shortText = "short";
  const tuncatedText = longText.substring(0, limit) + "...";

  test("should show the full text if less than 255 charachters", () => {
    render(<ExpandableText text={shortText} />);

    const text = screen.getByText(shortText);
    expect(text).toBeInTheDocument();
  });

  test("should not show the full text if less than 255 charachters", () => {
    render(<ExpandableText text={longText} />);

    const screenText = screen.getByText(tuncatedText);
    expect(screenText).toBeInTheDocument();

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });

  test("should  show the full text when user click on more button", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button");
    const user = userEvent.setup();

    await user.click(button);

    const long = screen.getByText(longText);

    expect(long).toBeInTheDocument();

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  test("should  collapse text when user click on less button", async () => {
    render(<ExpandableText text={longText} />);

    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();

    await user.click(showMoreButton);

    const showLessButton = screen.getByRole("button", { name: /less/i });

    await user.click(showLessButton);
    const truncate = screen.getByText(tuncatedText);
    expect(truncate).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/more/i);
  });
});
