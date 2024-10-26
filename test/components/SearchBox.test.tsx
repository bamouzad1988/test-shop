import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Correct import
import SearchBox from "./../../src/components/SearchBox";
import { vi } from "vitest";

describe("SearchBox", () => {
  const renderSearchBox = () => {
    const onChange = vi.fn();

    render(<SearchBox onChange={onChange} />);
    return {
      input: screen.queryByPlaceholderText(/search/i),
      user: userEvent.setup(),
      onChange,
    };
  };

  it("should render an input", () => {
    const { input } = renderSearchBox();

    expect(input).toBeInTheDocument();
  });

  it("should call onChange when enter is pressed", async () => {
    const { input, user, onChange } = renderSearchBox();

    const searchTerm = "SearchTerm";

    await user.type(input!, searchTerm + "{enter}");

    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });
});
