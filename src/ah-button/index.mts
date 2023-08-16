import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import style from "./style.scss?inline";

@customElement("ah-button")
export class AhButton extends LitElement {
  @property()
  href: string = "#";

  @property()
  primary: boolean = false;

  static override styles = unsafeCSS(style);

  override render() {
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
