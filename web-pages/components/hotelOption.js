class HotelOption extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let option = getRandomInt();
    this.innerHTML = `
    <div class="flex relative container">
      <div class="flex-1 overflow-hidden relative center">
        <div class="flex relative">
          <div class="flex-1 overflow-hidden relative">
            <img class="image" alt="listing-42709896-hero-image" />
          </div>
          <div class="flex-1 overflow-hidden relative title">
            <a class="propertyName"> </a>
            <br /><br />
            <a class="map"> </a>

            <hr />
            <b><div class="nightPrice"></div></b>
            <b><div class="totalPrice"></div></b>
            <b><a class="note"></a></b>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-hidden relative">
        <div>
          <div class="small-chart"></div>
        </div>
      </div>
    </div>

    <div class="container">
      <input id="collapsible+${option}" class="toggle" type="checkbox" />
      <label for="collapsible+${option}" class="lbl-toggle">More Info</label>
      <div class="collapsible-content">
        <div class="chart"></div>
      </div>
    </div>
      `;
    let myElem = document.getElementById(`collapsible+${option}`).parentNode;
    console.log(myElem.className);
    // console.log(myElem.parentNode.className);
  }
}

function getRandomInt() {
  return Math.floor(Math.random() * 1000);
}

customElements.define("hotel-option", HotelOption);
