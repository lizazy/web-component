import { notesData } from "../data/note-data.js";

class NoteList extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.notes = [...notesData];
    console.log('data:', this.notes)
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render()
  }

  addNote(note) {
    this.notes.push(note);
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
        :host{
        display:block;
        padding:5px;
        }
        div{
        display:grid;
        grid-template-columns: repeat(auto-fit, minmax(250px,1fr));
        gap:8px;
        margin-top:10px
        }
        `
  }

  render() {
    this._updateStyle();
    this.shadowRoot.innerHTML = "";
    const container = document.createElement('div');
    container.classList.add('container');

    this.notes.forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.setAttribute('note-data', JSON.stringify(note))
      container.appendChild(noteItem);
    });
    this.shadowRoot.appendChild(container);
    this.shadowRoot.appendChild(this._style);
  }
}

customElements.define("note-list", NoteList);



