// @ts-check
const { test } = require("@playwright/test");
const moment = require("moment");
import { Components } from "../components";
import { publish } from "../src/publisher";

test.describe("Price check: ", async () => {
  const checkInDate = "03/09/2024";
  const checkOutDate = "03/16/2024";
  const myDate = moment().format("MM-D-YYYY");
  const csvPath = "curent_prices/hilton-price.csv";

  test("1-st room option", async ({ page }) => {
    const component = new Components(page);
    await page.goto(
      "https://be.synxis.com/?adult=3&arrive=2024-03-09&chain=17001&child=1&childages=8&config=PlayaWebsite&configcode=PlayaWebsite&currency=USD&depart=2024-03-16&dsclid=57964578136145920&hotel=5231&level=hotel&local=en-US&locale=en-US&rooms=1&theme=PlayaWebsite&themecode=PlayaWebsite&utm_medium=metasearch&utm_source=tripadvisor&utm_term=US"
    );

    const pricePromo = await component.hilton.dealHeader.innerText();
    const onlineTotal = await component.hilton.pricePerNight.innerText();
    const rewardsTotal = (
      await component.hilton.priceWithRemovedComa(component.hilton.pricePerStay)
    )
      .split(" ", 1)
      .toString();
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
