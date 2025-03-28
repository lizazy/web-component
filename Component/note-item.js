class NoteItem extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
  }

  _updateStyle() {
    this._style.textContent = `
    :host {
        display:block;
        border:2px solid #ccc;
        color: #504B38;
        padding:10px
        }
    `;
  }

  set note(item) {
    this._note = item;
    this.render();
  }

  connectedCallback() {
    if (this.hasAttribute('note-data')) {
        this.note = JSON.parse(this.getAttribute('note-data'))
    }
  }

  render() {
    this._updateStyle();
    this.shadowRoot.innerHTML = ""

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
    <h4>${this._note.title}</h4>
    <p>${this._note.body}</p>`;

    this.shadowRoot.appendChild(this._style);
    this.shadowRoot.appendChild(wrapper);
  }
}

customElements.define('note-item', NoteItem);