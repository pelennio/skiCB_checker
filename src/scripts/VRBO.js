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
    "https://images.trvl-media.com/lodging/54000000/53820000/53818600/53818517/143ea216.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  address: "address to be checked",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package2 = {
  name: "Easy Mountain - Mt Crested Butte",
  link: await getLink("63108931"),
  imgSource:
    "https://images.trvl-media.com/lodging/64000000/63110000/63109000/63108931/3bb9e95d.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package3 = {
  name: "Hot Tub, Close Walk to the Slopes!",
  link: await getLink("34142270"),
  imgSource:
    "https://images.trvl-media.com/lodging/35000000/34150000/34142300/34142270/86ce86d6.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package4 = {
  name: "LOCATION! Base Area Trails Right Outside your Door! GREAT RATES!",
  link: await getLink("60368466"),
  imgSource:
    "https://images.trvl-media.com/lodging/61000000/60370000/60368500/60368466/c6bac70b.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  address: "BASE AREA",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

setGraphsPerStay(".option_1", package1, csvPath);
setGraphsPerStay(".option_2", package2, csvPath);
setGraphsPerStay(".option_3", package3, csvPath);
setGraphsPerStay(".option_4", package4, csvPath);
