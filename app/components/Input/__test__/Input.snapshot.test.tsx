import { render } from "@testing-library/react";

import Input from "../Input";

it("renders Input", () => {
  const { container } = render(<Input name="test" onChange={(f) => f} />);
  expect(container).toMatchSnapshot();
});

it("renders Input Label", () => {
  const { container } = render(<Input name="test" label="label" onChange={(f) => f} />);
  expect(container).toMatchSnapshot();
});

it("renders Input Placeholder", () => {
  const { container } = render(<Input name="test" placeholder="placeholder" onChange={(f) => f} />);
  expect(container).toMatchSnapshot();
});

it("renders disabled Input", () => {
  const { container } = render(
    <Input name="test" placeholder="placeholder" disabled onChange={(f) => f} />
  );
  expect(container).toMatchSnapshot();
});
