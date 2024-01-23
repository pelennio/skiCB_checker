const { test } = require("@playwright/test");
import { Dates } from "../components/dates.js";
import { Components } from "../components/index.js";
import { publish } from "../src/publisher1.js";
import { expect } from "@playwright/test";

test.describe("Price check: ", async () => {
  const csvPath = "curent_prices/vrbo.csv";
  const dates = new Dates();
  const checkInDate = dates.checkInDate;
  const checkOutDate = dates.checkOutDate;

  async function testPrice(option, { page }) {
    const component = new Components(page);
    await page.goto(
      `https://www.vrbo.com/3686334ha?chkin=${checkInDate}&chkout=${checkOutDate}&adults=2&children=1_9%2C1_15&expediaPropertyId=${option}`
    );
    try {
      const pricePromo = await component.vrbo.dealHeader.innerText();
      console.log("pricePromo: ", pricePromo);
      const pricePerNight = await component.vrbo.pricePerNight.innerText({
        timeout: 3000,
      });
      console.log("pricePerNight: ", pricePerNight);
      await component.vrbo.detailsButton.click();
      const taxesFees = await component.vrbo.taxesTotal.innerText();
      console.log("taxesFees: ", taxesFees);
      const stayTotal = (
        await component.vrbo.priceWithRemovedComa(component.vrbo.stayTotalPrice)
      )
        .split(" ", 1)
        .toString();
      console.log("stayTotal: ", stayTotal);
      publish(csvPath, pricePromo, pricePerNight, taxesFees, stayTotal);
    } catch (error) {
      await expect(component.vrbo.errorShown).toBeVisible();
      // "This property is not available for check-in on this day"
      console.log("The price for this dates are not available");
    }
  }

  test("1-st room option", async ({ page }) => {
    await testPrice("53818517", { page });
  });

  test("2-st room option", async ({ page }) => {
    await testPrice("63108931", { page });
  });

  test("3-st room option", async ({ page }) => {
    await testPrice("34142270", { page });
  });

  test("4-st room option", async ({ page }) => {
    await testPrice("60368466", { page });
  });

  test("5-st room option", async ({ page }) => {
    await testPrice("55427397", { page });
  });

  test("6-st room option", async ({ page }) => {
    await testPrice("32054818", { page });
  });

  test("7-st room option", async ({ page }) => {
    await testPrice("71736392", { page });
  });

  test("8-st room option", async ({ page }) => {
    await testPrice("71736392", { page });
  });

  test("9-st room option", async ({ page }) => {
    await testPrice("84011550", { page });
  });
});
