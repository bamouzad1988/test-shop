import React from "react";

import { getByRole, render, screen } from "@testing-library/react";
import ToastDemo from "./../../src/components/ToastDemo";
import { Toaster } from "react-hot-toast";
import userEvent from "@testing-library/user-event";

describe("ToastDemo", () => {
  it("should show a toast ", async () => {
    render(
      <>
        <ToastDemo />
        <Toaster />
      </>
    );

    const user = userEvent.setup();
    const button = screen.getByRole("button");

    await user.click(button);
    const toast = await screen.findByText(/success/i);
    expect(toast).toBeInTheDocument();
  });
});
