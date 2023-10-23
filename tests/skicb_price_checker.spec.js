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
  // const d = new Date();
  let day = weekday[moment().weekday()];

  /**
   * @param {string} promo the name of Promo, can be BWE or ES
   * @param {string} subtotal
   * @param {string} taxesFees
   * @param {string} onlineTotal
   * @param {string} [rewardsTotal]
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
        .parseFile("test-results/price.csv", { headers: true })
        .on("data", (data) => {
          myObj.push(data);
        })
        .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`))
        .on("finish", () => {
          resolve(myObj);
        });
    });

    let output = await myList;
    await output.push({
      Date: `${myDate}`,
      DayOfWeek: `${day}`,
      Package: `${promo}`,
      Subtotal: `${subtotal}`,
      "Taxes&Fees": `${taxesFees}`,
      OnlineTotal: `${onlineTotal}`,
      RewardsTotal: `${rewardsTotal}`,
    });

    const lastPriceData =
      output[Object.keys(output)[Object.keys(output).length - 1]];
    const lastTotalPrice = Number(lastPriceData.RewardsTotal.split("$")[1]);
    console.log("New values added to the list: *******\n", lastPriceData);

    /**
     * @returns {Number} returns pre last price
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
    // console.log(
    //   "lastTotalPrice",
    //   lastTotalPrice,
    //   typeof lastTotalPrice,
    //   " preLastTotalPrice",
    //   preLastTotalPrice(),
    //   typeof preLastTotalPrice()
    // );
    if (lastTotalPrice > preLastTotalPrice()) {
      console.log(
        `${promo}:*** 😤 The price is increasing by😤 ***`,
        lastTotalPrice - preLastTotalPrice()
      );
    } else if (lastTotalPrice == preLastTotalPrice()) {
      console.log(`${promo}:*** 💅🏻 The price is stable 💅🏻 ***`);
    } else {
      console.log(
        `${promo}:*** 👀 The price is dropping by: 👀 ***`,
        preLastTotalPrice() - lastTotalPrice
      );
    }

    ///WRITING
    writeToPath("test-results/price.csv", output, { headers: true });
  }

  test("Price check: Book Winter Early & Save: Non-Refundable", async ({
    page,
  }) => {
    const component = new Components(page);
    await page.goto(
      "https://www.skicb.com/Plan-Your-Trip/stay/details/The-Grand-Lodge-Crested-Butte-Hotel-and-Suites?location=50422320"
    );
    await component.skibd.checkInDate.fill("12/19/2023");
    await component.skibd.checkOutDate.click();
    await component.skibd.checkOutDate.fill("12/26/2023");
    await component.skibd.peopleCount.fill("4");
    await component.skibd.searchButton.click();
    await component.skibd.bweOption.click();
    await component.skibd.addToCartButton.click();
    await page.waitForURL("**/cart.aspx");
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

    writeTheResults("BWE", subtotal, taxesFees, onlineTotal, rewardsTotal);
    await page.screenshot({ path: `test-results/BWE:${myDate}.png` });
  });

  test("Extended Snowcation", async ({ page }) => {
    const component = new Components(page);
    //filling the form
    await page.goto(
      "https://www.skicb.com/Plan-Your-Trip/stay/details/The-Grand-Lodge-Crested-Butte-Hotel-and-Suites?location=50422320"
    );
    await component.skibd.checkInDate.fill("12/19/2023");
    await component.skibd.checkOutDate.click();
    await component.skibd.checkOutDate.fill("12/26/2023");
    await component.skibd.peopleCount.fill("4");
    await component.skibd.searchButton.click();
    await component.skibd.esOption.click();
    await component.skibd.addToCartButton.click();
    await page.waitForURL("**/cart.aspx");
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

    writeTheResults("ES", subtotal, taxesFees, onlineTotal, rewardsTotal);
    await page.screenshot({ path: `test-results/ES:${myDate}.png` });
  });

  test("Standard room option", async ({ page }) => {
    const component = new Components(page);
    //filling the form
    await page.goto(
      "https://www.skicb.com/Plan-Your-Trip/stay/details/The-Grand-Lodge-Crested-Butte-Hotel-and-Suites?location=50422320"
    );
    await component.skibd.checkInDate.fill("12/19/2023");
    await component.skibd.checkOutDate.click();
    await component.skibd.checkOutDate.fill("12/26/2023");
    await component.skibd.peopleCount.fill("4");
    await component.skibd.searchButton.click();
    await component.skibd.standardOption.click();
    await component.skibd.addToCartButton.click();
    await page.waitForURL("**/cart.aspx");
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

    writeTheResults("STANDARD", subtotal, taxesFees, onlineTotal, rewardsTotal);
    await page.screenshot({ path: `test-results/STANDARD:${myDate}.png` });
  });
});
