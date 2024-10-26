import React from "react";

import { render, screen } from "@testing-library/react";
import UserList from "./../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
  it("should render no users when the users array is empty", () => {
    render(<UserList users={[]} />);

    const text = screen.getByText(/no user/i);
    expect(text).toBeInTheDocument();
  });
  it("should render  users when the users array is not empty", () => {
    const users: User[] = [
      { id: 1, name: "Bijan" },
      { id: 2, name: "Amouzad" },
    ];
    render(<UserList users={users} />);

    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
