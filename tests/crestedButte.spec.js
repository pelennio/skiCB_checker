const { test } = require("@playwright/test");
import { Dates } from "../components/dates.js";
import { Components } from "../components";
import { publish } from "../src/publisher1.js";

test.describe("Price check: ", async () => {
  const csvPath = "curent_prices/cbAirbNB.csv";
  const dates = new Dates();
  const checkInDate = dates.checkInDate;
  const checkOutDate = dates.checkOutDate;

  test("1-st room option", async ({ page }) => {
    const component = new Components(page);
    const propertyID = "42709896";
    await page.goto(
      `https://www.airbnb.com/rooms/${propertyID}?adults=2&children=2&check_in=${checkInDate}&check_out=${checkOutDate}`
    );
    const pricePromo = await component.cbAirbNB.dealHeader.innerText();
    const pricePerNight = await component.cbAirbNB.pricePerNight
      .first()
      .innerText();
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
  });

  test("2-st room option", async ({ page }) => {
    const component = new Components(page);
    const propertyID = "738343714490717816";
    await page.goto(
      `https://www.airbnb.com/rooms/${propertyID}?adults=2&children=2&check_in=${checkInDate}&check_out=${checkOutDate}`
    );
    const pricePromo = await component.cbAirbNB.dealHeader.innerText();
    const pricePerNight = await component.cbAirbNB.pricePerNight
      .first()
      .innerText();
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
  });

  test("3-st room option", async ({ page }) => {
    const component = new Components(page);
    const propertyID = "45972067";
    await page.goto(
      `https://www.airbnb.com/rooms/${propertyID}?adults=2&children=2&check_in=${checkInDate}&check_out=${checkOutDate}`
    );
    const pricePromo = await component.cbAirbNB.dealHeader.innerText();
    const pricePerNight = await component.cbAirbNB.pricePerNight
      .first()
      .innerText();
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
  });
});
