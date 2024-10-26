import React from "react";
import { render, screen } from "@testing-library/react";
import TagList from "./../../src/components/TagList";

describe("TagList", () => {
  it("should render tag list", async () => {
    render(<TagList />);
    // this is for async components
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(0);
  });
});
