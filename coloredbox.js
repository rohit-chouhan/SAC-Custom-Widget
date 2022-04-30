(function () {
  let template = document.createElement("template");
  template.innerHTML = `
<style>
:host {
border-width: 4px;
border-color: black;
border-style: solid;
width:300px;
height:300px;
display: block;
}
</style>
<p>Rohit</p>
`;
  class ColoredBox extends HTMLElement {
    constructor() {
      super();
      let shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this.addEventListener("click", (event) => {
        alert("Click the button");
        var event = new Event("onClick");
        this.dispatchEvent(event);
      });
      this._props = {};
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
      if ("color" in changedProperties) {
        this.style["background-color"] = changedProperties["color"];
      }
      if ("opacity" in changedProperties) {
        this.style["opacity"] = changedProperties["opacity"];
      }
      if ("radius" in changedProperties) {
        this.style["border-color"] = changedProperties["radius"];
      }
    }
    
  }
  customElements.define("com-sap-sample-coloredbox", ColoredBox);
})();
