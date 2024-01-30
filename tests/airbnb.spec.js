const { test } = require("@playwright/test");
import { Dates } from "../components/dates.js";
import { Components } from "../components/index.js";
import { publish } from "../src/publisher1.js";
import { expect } from "@playwright/test";

test.describe("Price check: ", async () => {
  const csvPath = "curent_prices/cbAirbNB.csv";
  const dates = new Dates();
  const checkInDate = dates.checkInDate;
  const checkOutDate = dates.checkOutDate;

  async function testPrice(option, { page }) {
    const component = new Components(page);
    await page.goto(
      `https://www.airbnb.com/rooms/${option}?adults=2&children=2&check_in=${checkInDate}&check_out=${checkOutDate}`
    );
    try {
      const pricePromo = await component.cbAirbNB.dealHeader.innerText();
      const pricePerNight = await component.cbAirbNB.pricePerNight
        .first()
        .innerText({ timeout: 3000 });
      await component.cbAirbNB.reserveButton.click();
      const taxesFees = await component.cbAirbNB.taxesTotal.innerText();
      const stayTotal = (
        await component.cbAirbNB.priceWithRemovedComa(
          component.cbAirbNB.stayTotalPrice
        )
      )
        .split(" ", 1)
        .toString();
      publish(csvPath, pricePromo, pricePerNight, taxesFees, stayTotal);
    } catch (error) {
      await expect(component.cbAirbNB.errorShown).toBeVisible();
      console.log("The price for this dates are not available");
    }
  }

  test("1-st room option", async ({ page }) => {
    await testPrice("42709896", { page });
  });

  test("2-st room option", async ({ page }) => {
    await testPrice("738343714490717816", { page });
  });

  test("3-st room option", async ({ page }) => {
    await testPrice("45972067", { page });
  });

  test("4-st room option", async ({ page }) => {
    await testPrice("717384652646959728", { page });
  });

  test("5-st room option", async ({ page }) => {
    await testPrice("976942999049228298", { page });
  });

  test("6-st room option", async ({ page }) => {
    await testPrice("962961861588262265", { page });
  });
  test("7-st room option", async ({ page }) => {
    await testPrice("623251683275207962", { page });
  });
  test("8-st room option", async ({ page }) => {
    await testPrice("570325193548210419", { page });
  });
  test("9-st room option", async ({ page }) => {
    await testPrice("708259216851565596", { page });
  });
  test("10-st room option", async ({ page }) => {
    await testPrice("47799836", { page });
  });
  test("11-st room option", async ({ page }) => {
    await testPrice("51168487", { page });
  });
});
