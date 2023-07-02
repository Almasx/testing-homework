import { expect, test } from "@playwright/test";

import { bugId } from "./setup";

test.describe("Testing cart requirements ⚙", () => {
  test("Product should be in cart after clicking button", async ({ page }) => {
    await page.goto(`/hw/store/catalog/0?bug_id=${bugId}`);

    await page.getByRole("button", { name: /add to cart/i }).click();
    expect(page.getByText(/item in cart/i)).toBeVisible();
  });

  test("There has to be green status after checking out", async ({ page }) => {
    await page.goto(`/hw/store/catalog/0`);

    await page.getByRole("button", { name: /add to cart/i }).click();

    await page.goto(`/hw/store/cart?bug_id=${bugId}`);

    await page.getByLabel("Name").fill("Almas");
    await page.getByLabel("Phone").fill("+77777777777");
    await page.getByLabel("Address").fill("Some adress");

    await page.getByRole("button", { name: "Checkout" }).click();

    expect(
      await page
        .locator(".Cart-SuccessMessage")
        .evaluate((el) => el.classList.contains("alert-success"))
    ).toBeTruthy();
  });

  test("Clear Cart", async ({ page }) => {
    await page.goto(`/hw/store/catalog/0`);

    await page.getByRole("button", { name: /add to cart/i }).click();

    await page.goto(`/hw/store/cart?bug_id=${bugId}`);

    await page.getByRole("button", { name: /clear shopping cart/i }).click();

    await page.goto(`/hw/store/cart?bug_id=${bugId}`);

    expect(page.getByRole("table")).toBeHidden();
  });

  test("Order ID", async ({ request }) => {
    const response = await request.post(
      `/hw/store/api/checkout?bug_id=${bugId}`,
      {
        data: {
          form: {
            name: "almas",
            phone: "almas",
            address: "almas",
          },
          cart: {},
        },
      }
    );
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(typeof data.id).toBe("number");
    expect(data.id).toBeLessThan(1_000_000);
  });
});
