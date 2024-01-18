class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    let elClass = {
      hilton: "not-active",
      vrbo: "not-active",
      airbnb: "not-active",
      lodge: "not-active",
    };

    const location = window.location.pathname.split("/web-pages/")[1];
    console.log("I'm on: ", location);
    let hotel = "";

    switch (location) {
      case "airbnb.html":
        hotel = "AirbNB";
        elClass.airbnb = "active";
        break;
      case "hilton.html":
        hotel = "Hilton";
        elClass.hilton = "active";
        break;
      case "vrbo.html":
        hotel = "VRBO";
        elClass.vrbo = "active";
        break;
      case "index.html":
        hotel = "Crested Butte - LODGE";
        elClass.lodge = "active";
        break;
    }

    this.innerHTML = `
    <div id="pageHeader">
    <div>
      <h1 id="header">The price changes ${hotel}</h1>
    </div>
    <div class="topnav">
      <a href="../">Home</a>
      <a class= ${elClass.hilton} href="hilton.html">Hilton</a>
      <a class= ${elClass.lodge} href="index.html">SkiCb</a>
      <a href="hampton.html">Hampton</a>
      <a class= ${elClass.airbnb} href="airbnb.html">AirbNB</a>
      <a class= ${elClass.vrbo} href="vrbo.html">VRBO</a>
    </div>
  </div>
      `;
  }
}
//class="active"
customElements.define("header-component", Header);
