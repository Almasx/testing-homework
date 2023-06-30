/*
Каталог:

- в каталоге должны отображаться товары, список которых приходит с сервера
- для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре
- на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"
- если товар уже добавлен в корзину, в каталоге и на странице товара должно отображаться сообщение об этом
- если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество
- содержимое корзины должно сохраняться между перезагрузками страницы
*/
import axios from "axios";
import mockDetails from "../helpers/mocks/mockDetails";
import mockProducts from "../helpers/mocks/mockProducts";
import renderTestApp from "../helpers/renderTestApp";
import renderWithRouter from "../helpers/renderWithRouter";
import mockCart from "../helpers/mocks/mockCart";
import { cleanup } from "@testing-library/react";
import { createStore } from "redux";
import { screen } from "@testing-library/react";

jest.mock("axios");
describe("Testing catalog requirements ⚙", () => {
  test("Catalog should display data from server", () => {
    const response = mockProducts;

    (axios.get as jest.Mock).mockResolvedValue(response);
    const { findByTestId } = renderTestApp({ initialRoute: "/catalog" });

    response.data.forEach(async (value) => {
      const item = await findByTestId(`${value.id}`);
      expect(item).toBeInTheDocument();
    });
  });

  test("Each item from catalog should have respective name, price and link", () => {
    const response = mockProducts;

    (axios.get as jest.Mock).mockResolvedValue(response);
    const { findByTestId } = renderTestApp({ initialRoute: "/catalog" });

    response.data.forEach(async (value) => {
      const item = await findByTestId(`${value.id}`);
      expect(item).toBeInTheDocument();

      const name = item.querySelector(".ProductItem-Name");
      const price = item.querySelector(".ProductItem-Price");
      const link = item.querySelector(".ProductItem-DetailsLink");

      expect(name).toHaveTextContent(value.name);
      expect(price).toHaveTextContent(`${value.price}`);
      expect(link).toHaveAttribute("href", `/catalog/${value.id}`);
    });
  });

  test("Items page name, decription, price, color, material and button 'Add to Cart'", async () => {
    const { findByTestId } = renderWithRouter({
      initialRoute: "/catalog/1",
      store: createStore(() => ({
        cart: {},
        products: {},
        details: mockDetails.data,
      })),
    });

    const details = await findByTestId("product");
    expect(details).toBeInTheDocument();

    const { name, description, price, color, material } = mockDetails.data[1];
    const texts = [name, description, price, color, material, "Add to Cart"];
    const classNames = [
      ".ProductDetails-Name",
      ".ProductDetails-Description",
      ".ProductDetails-Price",
      ".ProductDetails-Color",
      ".ProductDetails-Material",
      ".ProductDetails-AddToCart",
    ];

    classNames.forEach((className, index) => {
      const textContain = texts[index];
      const feature = details.querySelector(className);
      expect(feature).toHaveTextContent(textContain);
    });
  });

  test("Hint in catalog if item in a bag", () => {
    const { getAllByText } = renderWithRouter({
      initialRoute: "/catalog",
      store: createStore(() => ({
        cart: mockCart.data,
        products: mockProducts.data,
        details: {},
      })),
    });
  });

  test("Hint in details if item in a bag", () => {
    const { getByText } = renderWithRouter({
      initialRoute: "/catalog/1",
      store: createStore(() => ({
        cart: mockCart.data,
        products: mockProducts.data,
        details: mockDetails.data,
      })),
    });
    const message = getByText(/item in cart/i);
    expect(message).toBeInTheDocument();
  });

  afterAll(() => {
    jest.clearAllMocks();
    cleanup();
  });
});
