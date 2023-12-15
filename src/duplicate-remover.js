const csv = require("@fast-csv/parse");
const { writeToPath } = require("fast-csv");
/**
 * @param {string} filePath the path to the CSV file
 */
export async function removeDuplicatesFromResults(filePath) {
  async function getFileData() {
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
    return myList;
  }

  let output = await getFileData();
  console.log("Initial array contains :", output.length);

  async function removeDuplicates() {
    let jsonObject = output.map(JSON.stringify);
    let uniqueSet = new Set(jsonObject);
    let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    console.log("De-dup array contains :", Object.keys(uniqueArray).length);
    writeToPath(filePath, uniqueArray, { headers: true });
  }
  await removeDuplicates();
}
