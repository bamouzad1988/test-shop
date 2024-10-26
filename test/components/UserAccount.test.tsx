import React from "react";
import { render, screen } from "@testing-library/react";
import { User } from "../../src/entities";
import UserAccount from "./../../src/components/UserAccount";

describe("userAcount", () => {
  it("should user name", () => {
    const user: User = { id: 1, name: "Bijan", isAdmin: false };

    render(<UserAccount user={user} />);
    const text = screen.getByText(user.name);
    expect(text).toBeInTheDocument();
  });

  it("should render edit button if user is admin", () => {
    const user: User = { id: 1, name: "Bijan", isAdmin: true };

    render(<UserAccount user={user} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should not render edit button if user is not admin", () => {
    const user: User = { id: 1, name: "Bijan", isAdmin: false };

    render(<UserAccount user={user} />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
