import * as graph from "../graphBuilder.js";
const any1 = "2 Queen Room Fridge and Microwave first";
const any2 = "2 Queen Room Fridge and Microwave second";
const csvPath = "../curent_prices/hampton-price.csv";

graph.lastPrice(csvPath, graph.createGraphSmall, "#last-chart1");
graph.parseData(
  csvPath,
  graph.createGraph,
  "Honor Price: 12-18",
  any1,
  "#chart1"
);

graph.parseData(
  csvPath,
  graph.createGraph,
  "Honor Price: 12-26",
  any2,
  "#chart2"
);

const details = `This hotel we are going to stay during trip to Crested BUte`;
let placeholder = document.querySelector("#search-details");
placeholder.innerHTML = details;
