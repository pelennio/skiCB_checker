// @ts-check
const { test } = require("@playwright/test");
const moment = require("moment");
const csv = require("@fast-csv/parse");
const { writeToPath } = require("fast-csv");
import { Components } from "../components";

test.describe("Price check: ", async () => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const myDate = moment().format("MM-D-YYYY");
  const day = weekday[moment().weekday()];

  /**
   * @param {string} promo the name of Promo, can be BWE, ES or Standard
   * @param {string} subtotal full price per trip without discount
   * @param {string} taxesFees taxes and fees
   * @param {string} onlineTotal full price per trip with online discount
   * @param {string} rewardsTotal full price per trip with REWORDS discount (-20%0
   * @param {string} changeVector demonstrate price change vector comparing to last price
   */
  async function writeTheResults(
    promo,
    subtotal,
    taxesFees,
    onlineTotal,
    rewardsTotal
  ) {
    let myList = new Promise((resolve) => {
      let myObj = [];
      csv
        .parseFile("curent_prices/price.csv", { headers: true })
        .on("data", (data) => {
          myObj.push(data);
        })
        .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`))
        .on("finish", () => {
          resolve(myObj);
        });
    });

    let output = await myList;
    let changeVector = "";
    await output.push({
      Date: `${myDate}`,
      DayOfWeek: `${day}`,
      Package: `${promo}`,
      Subtotal: `${subtotal}`,
      "Taxes&Fees": `${taxesFees}`,
      OnlineTotal: `${onlineTotal}`,
      RewardsTotal: `${rewardsTotal}`,
      ChangeVector: changeVector,
    });

    const lastPriceData =
      output[Object.keys(output)[Object.keys(output).length - 1]];
    const lastTotalPrice = Number(lastPriceData.RewardsTotal.split("$")[1]);

    /**
     * @returns {Number} returns pre-last price
     */
    const preLastTotalPrice = () => {
      for (let i = Object.keys(output).length - 2; i > 0; i--) {
        if (output[Object.keys(output)[i]].Package == `${promo}`) {
          const preLastTotalPrice = Number(
            output[Object.keys(output)[i]].RewardsTotal.split("$")[1]
          );
          return preLastTotalPrice;
        }
      }
      return 0;
    };
    const diff = Math.round(lastTotalPrice - preLastTotalPrice());
    if (diff > 0) {
      console.log(`${promo}:*** 😤 The price is increasing by😤 ***`, diff);
      changeVector = `⬆︎ (${diff})`;
    } else if (diff == 0) {
      console.log(`${promo}:*** 💅🏻 The price is stable 💅🏻 ***`);
      changeVector = "🟰";
    } else {
      console.log(`${promo}:*** 👀 The price is dropping by: 👀 ***`, -diff);
      changeVector = `⬇︎ (${diff})`;
    }
    output[Object.keys(output)[Object.keys(output).length - 1]].ChangeVector =
      changeVector;
    console.log("New values added to the list: *******\n", lastPriceData);

    ///WRITING results to the .csv file
    writeToPath("curent_prices/price.csv", output, { headers: true });
  }

  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://www.skicb.com/Plan-Your-Trip/stay/details/The-Grand-Lodge-Crested-Butte-Hotel-and-Suites?location=50422320"
    );
  });

  test("Price check: Book Winter Early & Save: Non-Refundable", async ({
    page,
  }) => {
    const component = new Components(page);
    await component.skibd.checkInDate.fill("12/19/2023");
    await component.skibd.checkOutDate.click();
    await component.skibd.checkOutDate.fill("12/26/2023");
    await component.skibd.peopleCount.fill("4");
    await component.skibd.searchButton.click();
    await component.skibd.bweOption.click();
    await component.skibd.addToCartButton.click();
    const subtotal = await component.skibd.priceWithRemovedComa(
      component.skibd.subtotal
    );
    const taxesFees = await component.skibd.priceWithRemovedComa(
      component.skibd.taxesFees
    );
    const onlineTotal = (
      await component.skibd.priceWithRemovedComa(component.skibd.onlineTotal)
    ).split("\n")[0];
    const rewardsTotal = await component.skibd.priceWithRemovedComa(
      component.skibd.rewardsTotal
    );

    const pricePromo = "BWE";
    writeTheResults(
      `${pricePromo}`,
      subtotal,
      taxesFees,
      onlineTotal,
      rewardsTotal
    );
    await page.screenshot({
      path: `curent_prices/${pricePromo}:${myDate}.png`,
    });
  });

  test("Extended Snowcation", async ({ page }) => {
    const component = new Components(page);
    await component.skibd.checkInDate.fill("12/19/2023");
    await component.skibd.checkOutDate.click();
    await component.skibd.checkOutDate.fill("12/26/2023");
    await component.skibd.peopleCount.fill("4");
    await component.skibd.searchButton.click();
    await component.skibd.esOption.click();
    await component.skibd.addToCartButton.click();
    const subtotal = await component.skibd.priceWithRemovedComa(
      component.skibd.subtotal
    );
    const taxesFees = await component.skibd.priceWithRemovedComa(
      component.skibd.taxesFees
    );
    const onlineTotal = (
      await component.skibd.priceWithRemovedComa(component.skibd.onlineTotal)
    ).split("\n")[0];
    const rewardsTotal = await component.skibd.priceWithRemovedComa(
      component.skibd.rewardsTotal
    );
    const pricePromo = "ES";
    writeTheResults(
      `${pricePromo}`,
      subtotal,
      taxesFees,
      onlineTotal,
      rewardsTotal
    );
    await page.screenshot({
      path: `curent_prices/${pricePromo}:${myDate}.png`,
    });
  });

  test("Standard room option", async ({ page }) => {
    const component = new Components(page);
    await component.skibd.checkInDate.fill("12/19/2023");
    await component.skibd.checkOutDate.click();
    await component.skibd.checkOutDate.fill("12/26/2023");
    await component.skibd.peopleCount.fill("4");
    await component.skibd.searchButton.click();
    await component.skibd.standardOption.click();
    await component.skibd.addToCartButton.click();
    const subtotal = await component.skibd.priceWithRemovedComa(
      component.skibd.subtotal
    );
    const taxesFees = await component.skibd.priceWithRemovedComa(
      component.skibd.taxesFees
    );
    const onlineTotal = (
      await component.skibd.priceWithRemovedComa(component.skibd.onlineTotal)
    ).split("\n")[0];
    const rewardsTotal = await component.skibd.priceWithRemovedComa(
      component.skibd.rewardsTotal
    );
    const pricePromo = "STANDARD";
    writeTheResults(
      `${pricePromo}`,
      subtotal,
      taxesFees,
      onlineTotal,
      rewardsTotal
    );
    await page.screenshot({
      path: `curent_prices/${pricePromo}:${myDate}.png`,
    });
  });
});
