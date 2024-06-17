import { LitElement, html, css } from "lit-element";

class CardUser extends LitElement{
  static get styles (){
    return css`
      :host{
        padding: 1rem;
        border: 2px solid var(--color-secundary);
        box-shadow: 2px 2px 5px ;
        display: flex;
        border-radius: .5rem;
        gap: .5rem;
        max-width: 400px;
      }
      .user-image {
        display: flex;
        width: 10rem;
        height: 10rem;
      }
      .user-information {
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-family: var(--font-family-info);
        gap: 1rem;
      }
      p {
        margin: 0;
      }
      
    `
  }
  static get properties() {
    return {
      user_data : {
        type : Object
      },
      url_img : {
        type: String
      }
    }
  }
  constructor(){
    super();
    this.user_data = {}
    this.url_img = ""
  }
  connectedCallback(){
    super.connectedCallback()
    this.getPhoto()
  }
  async getPhoto(){
    await fetch(`https://jsonplaceholder.typicode.com/photos/${this.user_data.id}`)
      .then((response) => response.json())
      .then((data) => this.url_img = data.url)
  }

  render(){
    return html`
      <div class="user-image">
        <img src="${this.url_img}" alt="">
      </div>
      <div class="user-information">
        <p>User: ${this.user_data.name}</p>
        <p>User name: ${this.user_data.username}</p>
        <p>Email: ${this.user_data.email}</p>
        <p>Phone: ${this.user_data.phone}</p>
        <a target="_blank" 
          href="https://www.google.com/maps?q=${this.user_data.address.geo.lat},${this.user_data.address.geo.lng}">Go to maps</a>
      </div>
    `
  }
  firstUpdated(){
    console.log(this.user_data);
  }
}

customElements.define("card-user", CardUser)