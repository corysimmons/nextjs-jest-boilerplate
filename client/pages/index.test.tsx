import { getPage } from "next-page-tester";
import { screen } from "@testing-library/react";

test("index page heading says index page", async () => {
  const { render } = await getPage({
    route: "/",
  });
  render();
  
  expect(screen.getByRole("heading")).toHaveTextContent("index page");
});
