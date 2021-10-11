import { getPage } from "next-page-tester";
import { screen, waitFor } from "@testing-library/react";

import client from '../apollo-client'
import {BOOK_QUERY} from './index'

describe("index page", () => {
  beforeAll(async () => {
    const { render } = await getPage({
      route: "/",
    });
    render();
  })
  
  test("heading is correct", async () => {
    await waitFor(() => screen.getByTestId("heading")); // gql might not have loaded so we should wait for the jsx to render to ensure the gql has returned data
    expect(screen.getByTestId("heading")).toHaveTextContent("index page");
  });

  test("2 books in gql cache", async () => {
    expect(
      client.cache.readQuery({
        query: BOOK_QUERY,
      })
    ).toEqual({
      books: [
        {
          __typename: "Book",
          title: "The Awakening",
        },
        {
          __typename: "Book",
          title: "City of Glass",
        },
      ],
    });
  });
});