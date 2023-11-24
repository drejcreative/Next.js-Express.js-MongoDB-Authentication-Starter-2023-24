import React from "react";
import { render } from "@testing-library/react";

import Checkbox from "../Checkbox";

it("Checkbox", () => {
  const { container } = render(
    <Checkbox label="test" name="checkbox" value="true" onChange={() => {}} />
  );
  expect(container).toMatchSnapshot();
});

it("Checkbox with empty value", () => {
  const { container } = render(
    <Checkbox label="test" name="checkbox" value="" onChange={() => {}} />
  );
  expect(container).toMatchSnapshot();
});
