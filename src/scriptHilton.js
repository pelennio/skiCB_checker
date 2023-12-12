import * as graph from "./graphBuilder.js";
const pricePromo = "ENCLAVE GARDEN VIEW - 2 QUEEN BEDS";
const pricePromo1 = "Flexible Rate";
const csvPath = "../curent_prices/hilton-price.csv";

graph.parseData(
  csvPath,
  graph.createGraph,
  "Standard Price",
  pricePromo,
  "#chart1"
);
graph.lastPrice(csvPath, graph.createGraphSmall, "#chart5", pricePromo);

graph.lastPrice(csvPath, graph.createGraphSmall, "#chart2", pricePromo1);

graph.parseData(csvPath, graph.createGraph, "Houston", pricePromo1, "#chart3");
