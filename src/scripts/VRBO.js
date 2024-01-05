import { setGraphsPerStay } from "../graphBuilder1.js";
import { Dates } from "../../components/dates.js";

const dates = new Dates();
const checkInDate = dates.checkInDate;
const checkOutDate = dates.checkOutDate;
const csvPath = "../curent_prices/vrbo.csv";
const details = `The price for the stay from ${checkInDate} to ${checkOutDate}`;
let placeholder = document.querySelector(".search-details");
placeholder.innerHTML = details;
async function getLink(propertyID) {
  let link = `https://www.vrbo.com/3686334ha?chkin=${checkInDate}&chkout=${checkOutDate}&adults=2&children=1_9%2C1_15&expediaPropertyId=${propertyID}`;
  return link;
}

const package1 = {
  name: "Comfortable Condo close to Slopes with a Hot Tub!",
  link: await getLink("53818517"),
  imgSource:
    "https://a0.muscache.com/im/pictures/02bf1e62-3345-4b6d-9109-1e13c44f4b1e.jpg",
  address: "address to be checked",
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

setGraphsPerStay(".option_1", package1, csvPath);
setGraphsPerStay(".option_2", package2, csvPath);
