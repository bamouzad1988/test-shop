import React from "react";
import { render, screen } from "@testing-library/react";
import { Theme } from "@radix-ui/themes";
import OrderStatusSelector from "./../../src/components/OrderStatusSelector";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  const renderComponent = () => {
    const onChange = vi.fn();
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );

    return {
      button: screen.getByRole("combobox"),
      user: userEvent.setup(),
      labelList: ["New", "Processed", "Fulfilled"],
      getOptions: () => screen.findAllByRole("option"),
      getOption: (label: RegExp) =>
        screen.findByRole("option", { name: label }),
      onChange,
    };
  };

  it("should render New as default item", async () => {
    const { button } = renderComponent();

    expect(button).toHaveTextContent(/new/i);
  });

  it("should have 3 item in list", async () => {
    const { button, user, labelList, getOptions } = renderComponent();

    await user.click(button);

    const options = await getOptions();
    const labels = options.map((option) => option.textContent);

    expect(button).toHaveTextContent(/new/i);
    expect(options).toHaveLength(3);
    expect(labels).toEqual(labelList);
  });

  it.each([
    { label: /processed/i, value: "processed" },
    { label: /fulfilled/i, value: "fulfilled" },
  ])(
    "should call onchange with $value when the $label option is selected",
    async ({ label, value }) => {
      const { button, user, onChange, getOption } = renderComponent();

      await user.click(button);

      const option = await getOption(label);
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith(value);
    }
  );

  it("should call onchange with new when the newl option is selected", async () => {
    const { button, user, onChange, getOption } = renderComponent();

    await user.click(button);

    const processedOption = await getOption(/processed/i);
    await user.click(processedOption);

    await user.click(button);

    const newOption = await getOption(/new/i);
    await user.click(newOption);

    expect(onChange).toHaveBeenCalledWith("new");
  });
});
