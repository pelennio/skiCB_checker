const { test } = require("@playwright/test");
import { Dates } from "../components/dates.js";
import { Components } from "../components";
import { publish } from "../src/publisher.js";
import { removeDuplicatesFromResults } from "../src/duplicate-remover.js";

test.describe("Price check: ", async () => {
  const csvPath = "curent_prices/cbAirbNB.csv";

  test.afterAll("Teardown", async () => {
    console.log("csvPath: ", csvPath, `\n`, "**********");
    await removeDuplicatesFromResults(csvPath);
  });

  test("1-st room option", async ({ page }) => {
    const component = new Components(page);
    const dates = new Dates();
    const checkInDate = dates.checkInDate;
    const checkOutDate = dates.checkOutDate;
    console.log("checkInDate: ", checkInDate);
    console.log("checkOutDate: ", checkOutDate);
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
