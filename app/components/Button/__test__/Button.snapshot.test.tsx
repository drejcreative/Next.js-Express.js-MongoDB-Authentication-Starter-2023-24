import React from "react";
import { render } from "@testing-library/react";

import Button from "../Button";

it("renders Button", () => {
  const { container } = render(<Button text="test" />);
  expect(container).toMatchSnapshot();
});

it("renders Button Primary", () => {
  const { container } = render(<Button text="test" primary />);
  expect(container).toMatchSnapshot();
});

it("renders loader", () => {
  const { container } = render(<Button text="test" loading />);
  expect(container).toMatchSnapshot();
});

it("renders icon", () => {
  const { container } = render(<Button text="test" icon={<span>Icon</span>} />);
  expect(container).toMatchSnapshot();
});
