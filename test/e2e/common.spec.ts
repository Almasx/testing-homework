/*
Общие требования:

- вёрстка должна адаптироваться под ширину экрана
- на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"
- при выборе элемента из меню "гамбургера", меню должно закрываться

*/

import { expect, test } from "@playwright/test";

import { bugId } from "./setup";

test.describe("Testing common requirements ⚙", () => {
  test("Nav menu should hide behind hamburger on small screens and close after selection", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 575, height: 1024 });
    await page.goto(`/hw/store/?bug_id=${bugId}`);

    const hamburgerMenu = page.locator(".Application-Toggler");
    await hamburgerMenu.click();

    await page.getByRole("link", { name: "Catalog" }).click();
    const menuClass = await page.$eval(
      ".Application-Menu",
      (el) => el.className
    );
    expect(menuClass).toContain(" collapse ");
  });
});
