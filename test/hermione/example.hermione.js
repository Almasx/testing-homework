/*
Общие требования:

- вёрстка должна адаптироваться под ширину экрана
- на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"
- при выборе элемента из меню "гамбургера", меню должно закрываться

*/

let bugId = process.env.BUG_ID;

describe("Testing common requirements ⚙", () => {
  [
    ["Extra large", 1200],
    ["Large", 992],
    ["Meduim", 768],
    ["Small", 600],
    ["Extra small", 548],
  ].forEach(([screen, width]) =>
    it(`Application should be responsive on ${screen} screen`, async ({
      browser,
    }) => {
      console.log(screen, width);
      await browser.setWindowSize(width, 1024);
      await browser.url(`#?bug_id=${bugId}`);

      const page = await browser.$(".Application");
      await page.waitForExist();

      await browser.assertView("plain", ".Application", {
        ignoreElements: [".navbar .container"],
      });
    })
  );
});
