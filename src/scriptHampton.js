import * as graph from "./graphBuilder.js";
const any = "2 Queen Room Fridge and Microwave";
const csvPath = "../curent_prices/hampton-price.csv";

graph.parseData(csvPath, graph.createGraph, "Honor Price", any, "#chart");
graph.lastPrace(csvPath, graph.createGraphSmall, "#chart5");
