import * as graph from "./graphBuilder.js";
const any = "ENCLAVE GARDEN VIEW - 2 QUEEN BEDS";
const csvPath = "../curent_prices/hilton-price.csv";
graph.parseData(csvPath, graph.createGraph, "Standard Price", any, "#chart");
graph.lastPrace(csvPath, graph.createGraphSmall, "#chart5");
