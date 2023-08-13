import {LitElement, html, unsafeCSS} from 'lit';
import style from './ah-button.scss?inline';

export class AhButton extends LitElement {
  static properties = {
    href: {type: String},
    primary: {type: Boolean},
  };

  static styles = unsafeCSS(style);

  constructor() {
    super();
    this.href = "#";
    this.primary = false;
  }

  render() {
    let isPrimary = "";
    if (this.primary) {
      isPrimary = "ah-button--primary";
    }
    return html`
      <div>
        <a href="${this.href}" class="ah-button ${isPrimary}"><slot></slot></a>
      </div>
    `;
  }
}
customElements.define('ah-button', AhButton);
