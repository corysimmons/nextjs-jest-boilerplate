import { getPage } from "next-page-tester";
import {
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";

import client from '../apollo-client'
import {BOOK_QUERY} from './index'

const {cache} = client

describe("index page", () => {
  beforeEach(async () => {
    const { render: renderPage } = await getPage({
      route: "/",
    });
    renderPage();
  })

  test("heading is correct and initial gql data is correct", async () => {
    await waitFor(() => screen.getByTestId("heading")); // gql might not have loaded so we should wait for the jsx to render to ensure the gql has returned data
    expect(screen.getByTestId("heading")).toHaveTextContent("index page");

    expect(
      cache.readQuery({
        query: BOOK_QUERY,
      })
    ).toEqual({
      books: [
        {
          __typename: "Book",
          title: "The Awakening",
          author: "Kate Chopin",
        },
        {
          __typename: "Book",
          title: "City of Glass",
          author: "Paul Auster",
        },
      ],
    });
  });

  test('Test mutation', async() => {
    await waitFor(() => screen.getByTestId("heading"));
    fireEvent.change(screen.getByTestId('title'), {target: { value: 'Curious George' }})
    fireEvent.change(screen.getByTestId("author"), { target: { value: "Margret Rey" }});
    fireEvent.submit(screen.getByTestId("form"));
    expect(screen.getByText("Curious George")).toBeInTheDocument(); // FIXME
  })
});