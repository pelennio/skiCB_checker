import * as graph from "./graphBuilder.js";
const csvPath = "../curent_prices/skicb-price.csv";

graph.parseData(
  csvPath,
  graph.createGraph,
  "Standard Price",
  "STANDARD ROOM RATE",
  "#chart"
);
graph.parseData(
  csvPath,
  graph.createGraph,
  "EARLY SKI",
  "EARLY SKI SEASON OFFER",
  "#chart6"
);
graph.parseData(
  csvPath,
  graph.createGraph,
  "Book early deal",
  "BWE",
  "#chart2"
);
graph.parseData(
  csvPath,
  graph.createGraph,
  "PASS HOLDER EXCLUSIVE CYBER SALE",
  "PASS HOLDER EXCLUSIVE CYBER SALE",
  "#chart3"
);
graph.parseData(
  csvPath,
  graph.createGraph,
  "EXTENDED SNOWCATION",
  "EXTENDED SNOWCATION",
  "#chart4"
);
graph.lastPrace(csvPath, graph.createGraphSmall, "#chart5");
