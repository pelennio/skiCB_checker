const csv = require("@fast-csv/parse");
const moment = require("moment");
const { writeToPath } = require("fast-csv");
/**
 * @param {string} filePath the path to the CSV file
 * @param {string} promo the name of Promo, can be BWE, ES or Standard
 * @param {string} subtotal full price per trip without discount
 * @param {string} taxesFees taxes and fees
 * @param {string} onlineTotal full price per trip with online discount
 * @param {string} rewardsTotal full price per trip with REWORDS discount (-20%)
 */
export async function publish(
  filePath,
  promo,
  subtotal,
  taxesFees,
  onlineTotal,
  rewardsTotal
) {
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

  async function writeTheResults() {
    let myList = new Promise((resolve) => {
      let myObj = [];
      csv
        .parseFile(filePath, { headers: true })
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
    console.log(
      "New values added to the list: ",
      filePath,
      "\n",
      lastPriceData
    );

    ///WRITING results to the .csv file
    writeToPath(filePath, output, { headers: true });
  }
  await writeTheResults();
  return;
}
