import { render as renderComponent } from "@testing-library/react";

import Blurb from "../components/Blurb";

test("Blurb component compliments snack food", async () => {
  const { getByText } = renderComponent(
    <Blurb quote="I like goldfishes cause they're so delicious" />
  );
  expect(
    getByText("I like goldfishes cause they're so delicious")
  ).toBeInTheDocument();
});
