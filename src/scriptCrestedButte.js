import * as graph from "./graphBuilder.js";
var checkInDate = "2024-11-19",
  checkOutDate = "2024-11-26";

const any = "The Woodcreek West Retreat - Fireplace, Hot Tub!";
const csvPath = "../curent_prices/cbAirbNB.csv";
const details = `The price for the stay from ${checkInDate} to ${checkOutDate}`;
let placeholder = document.querySelector("#data-output");
placeholder.innerHTML = details;

graph.parseData(
  csvPath,
  graph.createGraph,
  "Price for the stay",
  any,
  "#chart"
);
graph.lastPrice(csvPath, graph.createGraphSmall, "#chart5");
