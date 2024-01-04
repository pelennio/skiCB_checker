import * as graph from "../graphBuilder1.js";
const csvPath = "../curent_prices/hilton-price.csv";

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
  name: "ENCLAVE GARDEN VIEW - 2 QUEEN BEDS",
  link: "https://be.synxis.com/?adult=3&arrive=2024-03-09&chain=17001&child=1&childages=8&config=PlayaWebsite&configcode=PlayaWebsite&currency=USD&depart=2024-03-16&dsclid=57964578136145920&hotel=5231&level=hotel&local=en-US&locale=en-US&rooms=1&theme=PlayaWebsite&themecode=PlayaWebsite&utm_medium=metasearch&utm_source=tripadvisor&utm_term=US",
  imgSource:
    "https://controlcenter-p1.synxis.com/hotel/5231/images/room/lrmfm_k1tg_premium_garden_view_king_04_be.jpg",
  address: "enter correct address",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package2 = {
  name: "Flexible Rate",
  link: "https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=HOUSIGI&arrivalDate=2024-01-26&departureDate=2024-01-28&room1NumAdults=2&room1NumChildren=2",
  imgSource:
    "https://www.hilton.com/im/en/HOUSIGI/2257722/housigi-hilton-garden-inn-00001-exterior-1.jpg?impolicy=crop&cw=4565&ch=2407&gravity=NorthWest&xposition=0&yposition=318&rw=1100&rh=580",
  address: "23535 Northgate Crossing Blvd, Spring, TX 77373",
  addressMap: "https://maps.app.goo.gl/7nVEaA5PpEH2TMJi9",
};

setGraphsPerStay(".option_1", package1);
setGraphsPerStay(".option_2", package2);
