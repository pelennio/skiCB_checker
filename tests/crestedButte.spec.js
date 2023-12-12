var checkInDate = "2024-11-19",
  checkOutDate = "2024-11-26";
const { test } = require("@playwright/test");

import { Components } from "../components";
import { publish } from "../src/publisher.js";

test.describe("Price check: ", async () => {
  const csvPath = "curent_prices/cbAirbNB.csv";

  test("1-st room option", async ({ page }) => {
    const component = new Components(page);

    // checkOutDate = checkOutDate;
    await page.goto(
      `https://www.airbnb.com/rooms/42709896?adults=2&children=2&check_in=${checkInDate}&check_out=${checkOutDate}`
    );

    const pricePromo = await component.cbAirbNB.dealHeader.innerText();

    console.log("pricePromo: ", pricePromo);
    const onlineTotal = await component.cbAirbNB.pricePerNight
      .first()
      .innerText();
    console.log("onlineTotal: ", onlineTotal);
    const rewardsTotal = (
      await component.cbAirbNB.priceWithRemovedComa(
        component.cbAirbNB.pricePerStay
      )
    )
      .split(" ", 1)
      .toString();
    console.log("rewardsTotal: ", rewardsTotal);
    const subtotal = "n/a";
    const taxesFees = "n/a";

    publish(
      csvPath,
      pricePromo,
      subtotal,
      taxesFees,
      onlineTotal,
      rewardsTotal
    );
  });
});
