import { setGraphsPerStay } from "../graphBuilder1.js";
import { Dates } from "../../components/dates.js";
const dates = new Dates();
const checkInDate = dates.checkInDate;
const checkOutDate = dates.checkOutDate;
const csvPath = "../curent_prices/vrbo.csv";
const details = `The price for the stay from ${checkInDate} to ${checkOutDate}`;
let placeholder = document.querySelector(".search-details");
placeholder.innerHTML = details;
// https://www.vrbo.com/search?adults=2&amenities=&children=1_9%2C1_15&chkin=2024-12-19&chkout=2024-12-26&d1=2024-12-19&d2=2024-12-26&destination=Crested%20Butte%20Mountain%20Resort%2C%20Crested%20Butte%2C%20Colorado%2C%20United%20States%20of%20America&endDate=2024-12-26&latLong=38.896747587597645%2C-106.94335518507134&mapBounds=&privacyTrackingState=CAN_TRACK&pwaDialog=&regionId=6089703&searchId=f7496746-6723-4bb5-a265-aa64014e8a30&semdtl=&sort=RECOMMENDED&startDate=2024-12-19
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

const package5 = {
  name: "Ski-in/Ski-out, Panoramic ski slope views, Heated Garage",
  link: await getLink("55427397"),
  imgSource:
    "https://images.trvl-media.com/lodging/56000000/55430000/55427400/55427397/a44b5c02.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  address: "BASE AREA",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package6 = {
  name: "Cozy Crested Butte Condo 50 Yards from Ski Lift!",
  link: await getLink("32054818"),
  imgSource:
    "https://images.trvl-media.com/lodging/33000000/32060000/32054900/32054818/1c38b4f8.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  address: "Black Bear Lodge",
  addressMap: "https://maps.app.goo.gl/vjGvyhUkRJtX6GCW8",
};

const package7 = {
  name: "Ski-In, Ski-Out Condo. Steps from the lift!",
  link: await getLink("71736392"),
  imgSource:
    "https://images.trvl-media.com/lodging/72000000/71740000/71736400/71736392/b7b87504.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  address: "near Silver Queen",
  addressMap: "https://maps.app.goo.gl/vjGvyhUkRJtX6GCW8",
};

const package8 = {
  name: '"Paradise" Condo, Ski In, Walk Out in Crested Butte , 2/2, Great Views, Hot Tub',
  link: await getLink("34094330"),
  imgSource:
    "https://images.trvl-media.com/lodging/35000000/34100000/34094400/34094330/a203c7c1.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  address: "Paradise Condos",
  addressMap: "https://maps.app.goo.gl/BMUJm247DVocwqwE9",
};

setGraphsPerStay(".option_1", package1, csvPath);
setGraphsPerStay(".option_2", package2, csvPath);
setGraphsPerStay(".option_3", package3, csvPath);
setGraphsPerStay(".option_4", package4, csvPath);
setGraphsPerStay(".option_5", package5, csvPath);
setGraphsPerStay(".option_6", package6, csvPath);
setGraphsPerStay(".option_7", package7, csvPath);
setGraphsPerStay(".option_8", package8, csvPath);
