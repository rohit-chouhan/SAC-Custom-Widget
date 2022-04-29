(function () {
  let template = document.createElement("template");
  template.innerHTML = `
<form id="form">
<fieldset>
<legend>Colored Box Properties</legend>
<table>
<tr>
<td>Opacity</td>
<td><input id="builder_opacity" type="text" size="5" maxlength="5"></td>
</tr>
<tr>
<td>Radius</td>
<td><input id="builder_radius" type="text" size="10" maxlength="10"></td>
</tr>
</table>
<input type="submit" >
</fieldset>
</form>
<style>
:host {
display: block;
padding: 1em 1em 1em 1em;
}
</style>
`;
  class ColoredBoxBuilderPanel extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._shadowRoot
        .getElementById("form")
        .addEventListener("submit", this._submit.bind(this));
    }
    _submit(e) {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("propertiesChanged", {
          detail: {
            properties: {
              opacity: this.opacity,
              radius:this.radius
            },
          },
        })
      );
    }
    set opacity(newOpacity) {
      this._shadowRoot.getElementById("builder_opacity").value = newOpacity;
    }
    get opacity() {
      return this._shadowRoot.getElementById("builder_opacity").value;
    }

    set radius(newRadius) {
      this._shadowRoot.getElementById("builder_radius").value = newRadius;
    }
    get radius() {
      return this._shadowRoot.getElementById("builder_radius").value;
    }
  }
  customElements.define(
    "com-sap-sample-coloredbox-builder",
    ColoredBoxBuilderPanel
  );
})();
