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
  pricePerNight,
  taxesFees,
  stayTotal
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
    //parse CSV file
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
    //adding test results data
    await output.push({
      Date: `${myDate}`,
      DayOfWeek: `${day}`,
      Package: `${promo}`,
      PricePerNight: `${pricePerNight}`,
      "Taxes&Fees": `${taxesFees}`,
      StayTotal: `${stayTotal}`,
      ChangeVector: changeVector,
    });

    const lastPriceData =
      output[Object.keys(output)[Object.keys(output).length - 1]];
    const lastTotalPrice = Number(lastPriceData.StayTotal.split("$")[1]);

    /**
     * @returns {Number} returns pre-last price
     */
    const preLastTotalPrice = () => {
      for (let i = Object.keys(output).length - 2; i > 0; i--) {
        if (output[Object.keys(output)[i]].Package == `${promo}`) {
          const preLastTotalPrice = Number(
            output[Object.keys(output)[i]].StayTotal.split("$")[1]
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
    console.log("Initial array contains :", output.length);

    async function removeDuplicates() {
      let jsonObject = output.map(JSON.stringify);
      let uniqueSet = new Set(jsonObject);
      let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      console.log("De-dup array contains :", Object.keys(uniqueArray).length);
      return uniqueArray;
    }
    output = await removeDuplicates();

    ///WRITING deuplicated  results to the CSV file
    writeToPath(filePath, output, { headers: true });
  }
  await writeTheResults();
  return;
}
