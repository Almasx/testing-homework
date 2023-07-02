/*
Общие требования:

- вёрстка должна адаптироваться под ширину экрана
- на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"
- при выборе элемента из меню "гамбургера", меню должно закрываться

*/

import { expect, test } from "@playwright/test";

import { bugId } from "./setup";

test.describe("Testing catalog requirements ⚙", () => {
  test("Each item from catalog should have respective name, price and link", async ({
    page,
    request,
  }) => {
    await page.goto(`/hw/store/catalog`);
    const products = await request.get(
      `/hw/store/api/products?bug_id=${bugId}`
    );
    expect(products.ok()).toBeTruthy();
    const productsData = await products.json();

    productsData.forEach(async (value) => {
      const item = page.getByTestId(`${value.id}`);

      const name = item.locator(".ProductItem-Name");
      const price = item.locator(".ProductItem-Price");
      const link = item.locator(".ProductItem-DetailsLink");

      expect(value.name).toBe(await name.textContent());
      expect(`$${value.price}`).toBe(await price.textContent());
      expect(`/hw/store/catalog/${value.id}`).toBe(
        await link.getAttribute("href")
      );
    });
  });
  test("Product should have normal id", async ({ request }) => {
    const product = await request.get(
      `/hw/store/api/products/1?bug_id=${bugId}`
    );

    const productData = await product.json();
    expect(productData.id).toBe(1);
  });
});
