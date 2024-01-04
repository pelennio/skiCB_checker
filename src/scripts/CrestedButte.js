import * as graph from "../graphBuilder1.js";
import { Dates } from "../../components/dates.js";

const dates = new Dates();
const checkInDate = dates.checkInDate;
const checkOutDate = dates.checkOutDate;
const csvPath = "../curent_prices/cbAirbNB.csv";
const details = `The price for the stay from ${checkInDate} to ${checkOutDate}`;
let placeholder = document.querySelector(".search-details");
placeholder.innerHTML = details;
async function getLink(propertyID) {
  let link = `https://www.airbnb.com/rooms/${propertyID}?adults=2&children=2&check_in=${checkInDate}&check_out=${checkOutDate}`;
  console.log("Link: ", link);
  return link;
}

async function setGraphsPerStay(option, packageDetails) {
  const title = document.querySelector(`${option} .propertyName`);
  title.innerHTML = packageDetails.name;
  title.setAttribute("href", packageDetails.link);
  const image = document.querySelector(`${option}  .image`);
  image.setAttribute("src", packageDetails.imgSource);
  const map = document.querySelector(`${option} .map`);
  map.innerHTML = packageDetails.address;
  map.setAttribute("href", packageDetails.addressMap);

  graph.parseData(
    csvPath,
    graph.createGraph,
    "Price for the stay",
    packageDetails.name,
    `${option} .chart`
  );

  graph.lastPrice(
    csvPath,
    graph.createGraphSmall,
    `${option} .small-chart`,
    `${option} .nightPrice`,
    packageDetails.name
  );
}

const package1 = {
  name: "The Woodcreek West Retreat - Fireplace, Hot Tub!",
  link: await getLink("42709896"),
  imgSource:
    "https://a0.muscache.com/im/pictures/02bf1e62-3345-4b6d-9109-1e13c44f4b1e.jpg",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package2 = {
  name: "Ski in/out,50Ft from Lift,Sleeps 7.Luxury Remodel!",
  link: await getLink("738343714490717816"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-738343714490717816/original/f6f21996-3b72-4fa1-9dcf-67a4aef99d65.jpeg?im_w=720",
  address: "12 Snowmass Rd, Crested Butte, CO 81224",
  addressMap: "https://maps.app.goo.gl/pCwnYjQRV9hZYGWV7",
};

const package3 = {
  name: "Easy Mountain",
  link: await getLink("738343714490717816"),
  imgSource:
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45972067/original/a2e38200-b96f-4c84-9b09-1fe783f62fbd.jpeg?im_w=720",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package4 = {
  name: "The Ruby at Woodcreek - Walk to Slopes, Hot Tub",
  link: await getLink("717384652646959728"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-717384652646959728/original/b85ac0f7-9bd6-4a80-9539-0dde7a265710.jpeg?im_w=720",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package5 = {
  name: "Crested Butte Mountain Retreat",
  link: await getLink("976942999049228298"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-976942999049228298/original/7e2cc637-6617-45b9-b3c7-6c784f6c129d.png?im_w=720",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package6 = {
  name: "Ski-In Ski-Out 2 bedroom Condo",
  link: await getLink("962961861588262265"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-962961861588262265/original/f6eb8ad4-83f4-4644-a8c2-fa7219bb7061.jpeg?im_w=720",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package7 = {
  name: "Ski-In Ski-Out 2 bedroom Condo",
  link: await getLink("623251683275207962"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-623251683275207962/original/f663bf1b-8bc5-4b30-a043-d7f8b4a009f9.jpeg?im_w=720",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

setGraphsPerStay(".option_1", package1);
setGraphsPerStay(".option_2", package2);
setGraphsPerStay(".option_3", package3);
setGraphsPerStay(".option_4", package4);
setGraphsPerStay(".option_5", package5);
setGraphsPerStay(".option_6", package6);
setGraphsPerStay(".option_7", package7);
