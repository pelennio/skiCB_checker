import * as graph from "../graphBuilder.js";
const pricePromo1 = "ENCLAVE GARDEN VIEW - 2 QUEEN BEDS";
const pricePromo2 = "Flexible Rate";
const pricePromo3 = "Flexible Rate - Amarillo";
const csvPath = "../curent_prices/hilton-price.csv";
//#1
graph.lastPrice(csvPath, graph.createGraphSmall, "#small-chart1", pricePromo1);
graph.parseData(
  csvPath,
  graph.createGraph,
  "Standard Price",
  pricePromo1,
  "#chart1"
);
//#2
graph.lastPrice(csvPath, graph.createGraphSmall, "#small-chart2", pricePromo2);
graph.parseData(csvPath, graph.createGraph, "Houston", pricePromo2, "#chart2");
const details2 = `This hotel we are going to stay in during Houston soccer tournament 01/27-01/28`;
let placeholder2 = document.querySelector("#search-details2");
placeholder2.innerHTML = details2;
//#3
graph.lastPrice(csvPath, graph.createGraphSmall, "#small-chart3", pricePromo3);
graph.parseData(csvPath, graph.createGraph, "Houston", pricePromo3, "#chart3");
const details3 = `This hotel we are going to stay in Amarillo, way back from Crested Butte for 12/26/23 \n Total for stay: $151.53 \n rebooked -> Total for stay: $117.51`;
let placeholder3 = document.querySelector("#search-details3");
placeholder3.innerHTML = details3;
