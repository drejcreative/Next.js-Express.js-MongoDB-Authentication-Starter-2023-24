import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Button from "../Button";

describe("Button test", () => {
  test("Button to be in the document", () => {
    render(<Button text="test" />);
    const buttonText = screen.getByText("test");
    expect(buttonText).toBeInTheDocument();
  });

  test("Button can be clicked", () => {
    render(<Button text="test" />);
    fireEvent.click(screen.getByRole("button"));
  });

  test("Checks that callback is called on button click", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button primary onClick={onClick} text="Demo" />);

    fireEvent.click(getByText(/Demo/i));
    expect(onClick.mock.calls.length).toBe(1);
  });
});
