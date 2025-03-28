class NoteForm extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement("style");
    }
    

  _updateStyle() {
    this._style.textContent = `
        #title{
        display:block;
        width: 99%;
        margin-top:5px;
        height:1.2rem;
        boder-radius:3px}

        #description{
        width:99%;
        height:50px;
        margin-top:5px;
        border-radius:3px}

        .form-group{
        margin-bottom:7px;
        }

        #notifikasiSisaKarakter{
        font-size:0.7em;}

        input[type=submit]{
        width:100%;
        padding:12px;
        background-color:#B9B28A;
        border:1px solid #B9B28A;
        font-size: 1em;
        border-radius: 5px
        }

        input[type=submit]:hover{
        color:rgb(245, 232, 232);
        background-color:rgb(90, 87, 67)
        }
    `;
  }

  connectedCallback() {
    this.render();
    const noteForm = document.querySelector("note-form");
    const inputDescription = noteForm.shadowRoot.getElementById("description");
    const notifikasiSisaKarakter = noteForm.shadowRoot.getElementById(
      "notifikasiSisaKarakter"
    );

    inputDescription.addEventListener("input", function () {
      // Event onInput
      const jumlahKarakterDiketik = inputDescription.value.length;
      const jumlahKarakterMinimal = inputDescription.minLength;
      const sisaKarakterUpdate = jumlahKarakterMinimal - jumlahKarakterDiketik;

      if (sisaKarakterUpdate > 0) {
        notifikasiSisaKarakter.style.visibility = "visible";
        inputDescription.style.borderBlockColor = "red";
      } else {
        inputDescription.style.borderBlockColor = "red";
        notifikasiSisaKarakter.style.visibility = "hidden";
      }
    });

    this.shadowRoot.getElementById("data-form").addEventListener("submit", (event) => {
        event.preventDefault();

        const title = this.shadowRoot.getElementById("title").value;
        const body = inputDescription.value;

        if (title.trim() && body.trim()) {
          const newNote = {
            id: `notes-${new Date().getTime()}`,
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          };

        const noteList = document.querySelector("note-list");

        if (noteList) {
          noteList.addNote(newNote);
        }

        this.shadowRoot.getElementById("title").value = "";
        this.shadowRoot.getElementById("description").value = "";
    }
      });
  };

    render() {
        this._updateStyle();
        this._shadowRoot.innerHTML = `
            <form id="data-form">
                <div class="form-group">
                    <label for="title">Judul</label>
                    <input type="text" name="title" id="title" minlength= '1'>
                </div>
                <div class="form-group">
                    <label for="description">Deskripsi Singkat</label></br>
                    <textarea name="description" id="description" minlength = "15" placeholder="Minimal 15 Karakter"></textarea>
                    <br>
                    <label id="notifikasiSisaKarakter">Jumlah Karakter belum tercapai</label>
                </div>
                <div class="form-group">
                    <input type="submit" value="Add Your Note" id="button"></input>
                </div>
            </form>
            `;
        this.shadowRoot.appendChild(this._style);
    }
}

customElements.define('note-form', NoteForm)