import { describe, expect, test } from "vitest";

import { screen } from "@testing-library/react";
import { legacy_createStore as createStore } from "redux";
import mockDetails from "../helpers/mocks/mockDetails";
import mockProducts from "../helpers/mocks/mockProducts";
import renderWithRouter from "../helpers/renderWithRouter";

describe("Testing cart requirements ⚙", () => {
  test("Product should have normal button", async () => {
    const store = createStore(() => ({
      cart: {},
      products: mockProducts.data,
      details: mockDetails.data,
    }));

    renderWithRouter({
      initialRoute: `/catalog/1`,
      store,
    });
    const { getByRole } = screen;

    expect(
      getByRole("button", {
        name: /add to cart/i,
      })
    ).toHaveClass("btn-lg");
  });
});

//99
