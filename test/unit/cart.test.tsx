/*
Корзина:

- в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней
- в корзине должна отображаться таблица с добавленными в нее товарами
- для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа
- в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться
- если корзина пустая, должна отображаться ссылка на каталог товаров
*/

import { cleanup, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "redux";
import { ExampleApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";
import mockCart from "../helpers/mocks/mockCart";
import mockProducts from "../helpers/mocks/mockProducts";
import renderWithRouter from "../helpers/renderWithRouter";

describe("Testing cart requirements ⚙", () => {
  test("Navigation bar should include number in the cart", () => {
    renderWithRouter({
      initialRoute: "/",
      store: createStore(() => ({
        cart: mockCart.data,
        products: mockProducts.data,
        details: {},
      })),
    });
    const { getByRole } = screen;

    const link = getByRole("link", {
      name: /cart \(.*\)/i,
    });

    // const query = new RegExp( `cart (${Object.keys(mockCart.data).length})`, "i");
    expect(link).toHaveTextContent(/cart \(2\)/i);
  });

  test("Cart should display table of products", () => {
    renderWithRouter({
      initialRoute: "/cart",
      store: createStore(() => ({
        cart: mockCart.data,
        products: mockProducts.data,
        details: {},
      })),
    });
    Object.keys(mockCart.data).forEach((item_id) => {
      const item = screen.getByTestId(`${item_id}`);

      expect(item).toBeInTheDocument();
    });
  });

  test("Each products data should be in a table", () => {
    renderWithRouter({
      initialRoute: "/cart",
      store: createStore(() => ({
        cart: mockCart.data,
        products: mockProducts.data,
        details: {},
      })),
    });
    const { getByTestId } = screen;

    Object.values(mockCart.data).forEach((mock_item, item_id) => {
      const item = getByTestId(`${item_id + 1}`);
      const { name, price, count } = mock_item;
      const texts = [name, price, count, price * count];
      const classNames = [
        ".Cart-Name",
        ".Cart-Price",
        ".Cart-Count",
        ".Cart-Total",
      ];

      classNames.forEach((className, index) => {
        const textContain = texts[index];
        const feature = item.querySelector(className);
        expect(feature).toHaveTextContent(`${textContain}`);
      });
    });
  });

  test("Products should be cleared by clicking on button", async () => {
    const cart = { getState: () => mockCart.data, setState: () => {} };
    const api = new ExampleApi("/");
    const store = initStore(api, cart);

    const user = userEvent.setup();
    renderWithRouter({
      initialRoute: "/cart",
      store: store,
    });

    const { queryByRole, getByRole } = screen;
    await user.click(getByRole("button", { name: /clear shopping cart/i }));
    expect(queryByRole("table")).not.toBeInTheDocument();
  });

  test("Link to catalog should be shown in case of empty cart", () => {
    renderWithRouter({ initialRoute: "/cart" });
    const view = screen.getAllByText(
      /cart is empty\. please select products in the \./i
    )[0];
    const link = within(view).getByRole("link", { name: /catalog/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/catalog");
  });

  afterEach(cleanup);
});
