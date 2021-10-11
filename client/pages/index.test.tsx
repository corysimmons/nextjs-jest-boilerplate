import { getPage } from "next-page-tester";
import { screen, waitFor, render as renderComponent } from "@testing-library/react";

import client from '../apollo-client'
import {BOOK_QUERY} from './index'
import Blurb from '../components/Blurb'

describe("index page", () => {
  beforeAll(async () => {
    const { render: renderPage } = await getPage({
      route: "/",
    });
    renderPage();
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

  test('Blurb component compliments snack food', async () => {
    const { getByText } = renderComponent(<Blurb quote="I like goldfishes cause they're so delicious" />)
    expect(
      getByText("I like goldfishes cause they're so delicious")
    ).toBeInTheDocument();
  })
});