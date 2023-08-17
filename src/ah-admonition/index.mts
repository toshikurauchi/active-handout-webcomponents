import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import style from "./style.scss?inline";

@customElement("ah-admonition")
export class AhAdmonition extends LitElement {
  @property()
  override title: string = "";

  @property()
  collapsible: boolean = false;

  @property()
  collapsed: boolean = false;

  @property()
  type:
    | "default"
    | "note"
    | "abstract"
    | "info"
    | "tip"
    | "success"
    | "question"
    | "warning"
    | "failure"
    | "danger"
    | "bug"
    | "example"
    | "quote" = "default";

  static override styles = unsafeCSS(style);

  override render() {
    const admonitionTypeClass = this.type === "default" ? "" : ` ${this.type}`;

    const collapsable = this.collapsible !== false;
    const collapsed = this.collapsed !== false;
    if (collapsable) {
      return html`
        <details
          class="ah-admonition${admonitionTypeClass}"
          ?open=${!collapsed}
        >
          <summary class="ah-admonition-title">${this.title}</summary>
          <div class="ah-admonition-content">
            <slot></slot>
          </div>
        </details>
      `;
    }
    return html`
      <div class="ah-admonition${admonitionTypeClass}">
        ${this.title &&
        html`<div class="ah-admonition-title">${this.title}</div>`}
        <div class="ah-admonition-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
