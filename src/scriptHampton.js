import * as graph from "./graphBuilder.js";
const any1 = "2 Queen Room Fridge and Microwave first";
const any2 = "2 Queen Room Fridge and Microwave second";
const csvPath = "../curent_prices/hampton-price.csv";

graph.parseData(
  csvPath,
  graph.createGraph,
  "Honor Price: 12-18",
  any1,
  "#chart"
);
graph.lastPrice(csvPath, graph.createGraphSmall, "#chart5");

graph.parseData(
  csvPath,
  graph.createGraph,
  "Honor Price: 12-26",
  any2,
  "#chart1"
);
