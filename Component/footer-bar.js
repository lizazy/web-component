class FooterBar extends HTMLElement {

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
      div{ 
      background-color: #B9B28A;
      padding: 8px
      }
      p {text-align: center;
        font-size: 1em;
        color:#504B38;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._updateStyle();

    this.shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
            <div>
                <p>Notes App &copy;2025</p>  
            </div>
        `;
  }
}

customElements.define('footer-bar', FooterBar)
