// @ts-check
const { test } = require("@playwright/test");
import { Components } from "../components";
import { publish } from "../src/publisher";

test.describe("Price check: ", async () => {
  const csvPath = "curent_prices/hampton-price.csv";

  test("1-st room option", async ({ page }) => {
    const component = new Components(page);
    await page.goto(
      "https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=AMADHHX&arrivalDate=2023-12-18&departureDate=2023-12-19&room1NumAdults=1"
    );
    const roomType = await component.hampton.roomType.innerText();
    await component.hampton.moreRatesButton.click();
    await component.hampton.flexRateHonor.click();

    const onlineTotal = await component.hampton.priceDetail(
      component.hampton.totalRoomChargeAmount
    );
    const taxTotal = await component.hampton.priceDetail(
      component.hampton.totalTaxesAmount
    );
    const rewardsTotal = await component.hampton.priceDetail(
      component.hampton.totalForStayAmount
    );

    publish(csvPath, roomType, "n/a", taxTotal, onlineTotal, rewardsTotal);
  });
});
