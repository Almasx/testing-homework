/*
Общие требования:

- в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину
- название магазина в шапке должно быть ссылкой на главную страницу

Страницы:

- в магазине должны быть страницы: главная, каталог, условия доставки, контакты
- страницы главная, условия доставки, контакты должны иметь статическое содержимое
*/

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "redux";
import mockProducts from "../helpers/mocks/mockProducts";
import renderWithRouter from "../helpers/renderWithRouter";

describe("Testing common requirements ⚙", () => {
  test.each`
    route          | navigation_link     | querySelector
    ${"/"}         | ${/example store/i} | ${".Home"}
    ${"/catalog"}  | ${/catalog/i}       | ${".Catalog"}
    ${"/delivery"} | ${/delivery/i}      | ${".Delivery"}
    ${"/contacts"} | ${/contacts/i}      | ${".Contacts"}
    ${"/cart"}     | ${/cart/i}          | ${".Cart"}
  `(
    "Testing $route page ⚙",
    async ({ route, navigation_link, querySelector }) => {
      const user = userEvent.setup();
      const { container } = renderWithRouter({
        store: createStore(() => ({
          cart: {},
          products: mockProducts.data,
          details: {},
        })),
      });

      const link = screen.getByRole("link", { name: navigation_link });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", route);

      await user.click(link);
      const pageWrapper = container.querySelector(querySelector);
      expect(pageWrapper).toBeInTheDocument();
    }
  );
});
