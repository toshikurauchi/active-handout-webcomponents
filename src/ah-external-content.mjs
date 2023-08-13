import {LitElement, html, css} from 'lit';

export class AhExternalContent extends LitElement {
  static properties = {
    src: {type: String},
  };

  static styles = css`
    :host {
      display: block;
      height: 400px;
    }
  `;

  constructor() {
    super();
    this.src = "";
  }

  render() {
    if (this.src.endsWith(".html")) {
      return html`
        <iframe src=${this.src} width="100%" height="100%"></iframe>
      `;
    } 
    return html``;

    return html`
      <link rel="stylesheet" href="https://insper.github.io/tecnicas-de-programacao/assets/css/main.css">
      <div>
        <a href="${this.href}" class="ah-button ${isPrimary}"><slot></slot></a>
      </div>
    `;
  }
}
customElements.define('ah-external-content', AhExternalContent);
