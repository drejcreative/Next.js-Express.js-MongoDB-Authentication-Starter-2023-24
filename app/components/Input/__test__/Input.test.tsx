import { render, screen, fireEvent } from "@testing-library/react";

import Input from "../Input";

describe("Input test", () => {
  test("Input to be in the document", () => {
    render(<Input name="test" onChange={(f) => f} />);
    const selectedinput = screen.getByTestId("input-test");
    expect(selectedinput).toBeInTheDocument();
  });

  test("Input can be clicked", () => {
    render(<Input name="test" onChange={(f) => f} />);
    fireEvent.click(screen.getByTestId("input-test"));
  });

  test("Input to have label", () => {
    render(<Input name="test" onChange={(f) => f} label="label" />);
    const selectedinput = screen.getByText("label");
    expect(selectedinput).toBeInTheDocument();
  });

  test("Checks that callback is called on button click", () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} name="test" />);
    const selectInput = screen.getByTestId("input-test");

    fireEvent.change(selectInput, { target: { value: "23" } });
    expect(selectInput.value).toBe("23");
  });

  test("Checks onRemove", () => {
    const onClick = jest.fn();
    render(
      <Input
        onChange={(f) => f}
        name="test"
        remove
        value="123"
        onRemove={onClick}
      />
    );
    const selectInput = screen.getByTestId("input-remove-icon-test");

    fireEvent.click(selectInput);
    expect(onClick.mock.calls.length).toBe(1);
  });
});
