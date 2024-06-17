import { LitElement, html, css } from "lit-element";
import "../components/card-user";

class HomePage extends LitElement {
  static get styles() {
    return css`
    :host {
        display: flex;
        padding: 16px;
        max-width: 100vw;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
      }
    `
  }

  static get properties() {
    return {
      people: { type: Array }
    }
  }

  constructor() {
    super();
    this.people = []
  }

  connectedCallback(){
    super.connectedCallback()
    this.getPeople()
  }

  async getPeople(){
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => this.people = data)
  }

  render() {
    return html`
      ${this.people.map((item) => html`
        <card-user .user_data=${item}></card-user>
      `)}
    `
  }
}

customElements.define("home-page", HomePage)