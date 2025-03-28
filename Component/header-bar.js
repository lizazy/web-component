class HeaderBar extends HTMLElement {

    constructor () {
        super();

        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._style = document.createElement('style');
    }

    _updateStyle() {
        this._style.textContent = `
        :host{
        padding:20px;}
        div{
        background-color: #B9B28A;
        margin-top:0;
        padding:20px}
        h1{
        text-align:center}
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
                <h1 class = "header">NOTES APP</h1>
            </div>
        `
    }
}

customElements.define('header-bar', HeaderBar)