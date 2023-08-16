import { LitElement, html, unsafeCSS } from "lit";
import { customElement, queryAssignedElements } from "lit/decorators.js";
import style from "./style.scss?inline";

@customElement("ah-tabbed")
export class AhTabbed extends LitElement {
  @queryAssignedElements({ slot: "label", flatten: true })
  _labels!: Array<HTMLElement>;

  @queryAssignedElements({ slot: "content", flatten: true })
  _contents!: Array<HTMLElement>;

  static override styles = unsafeCSS(style);

  findContent(label: HTMLElement) {
    if (label.hasAttribute("for")) {
      const forId = label.getAttribute("for");
      return this._contents.find((content) => content.id === forId);
    }
    const index = this._labels.indexOf(label);
    return this._contents[index];
  }

  handleLabelClick(event: Event) {
    const label = event.target as HTMLElement;

    this._labels.forEach((label) => label.classList.remove("active"));
    this._contents.forEach((content) => content.classList.remove("active"));

    const content = this.findContent(label);
    if (content) {
      label.classList.add("active");
      content.classList.add("active");
    } else {
      console.warn("No content found for label", label);
    }
  }

  setDefaultActiveTab() {
    const hasActive = this._labels.some((label) =>
      label.classList.contains("active")
    );
    if (!hasActive && this._labels.length > 0 && this._contents.length > 0) {
      this._labels[0]?.classList.add("active");
      this._contents[0]?.classList.add("active");
    }
  }

  setLabelLengthRestrictions() {
    /**
     * This function adds a class to the contents element if the contents are
     * wider than the labels. This is used to add a border radius to the
     * contents element top-right corner.
     **/

    const contents = this.shadowRoot?.querySelector(".ah-tabbed-contents");
    if (!this._labels || !contents) {
      return;
    }

    const labelsRight = Math.max(
      ...this._labels.map((label) => label.getBoundingClientRect().right)
    );
    const contentsRight = contents.getBoundingClientRect().right;
    const borderRadius = Number.parseInt(
      getComputedStyle(contents).borderBottomLeftRadius
    );

    const widerThanLabelsClass = "ah-tabbed-contents--wider-than-labels";
    if (labelsRight <= contentsRight - borderRadius) {
      contents.classList.add(widerThanLabelsClass);
    } else {
      contents.classList.remove(widerThanLabelsClass);
    }
  }

  handleSlotchange() {
    this._labels.forEach((label) => {
      label.classList.add("ah-tabbed-label");
      label.addEventListener("click", this.handleLabelClick.bind(this));
    });

    this._contents.forEach((content) => {
      content.classList.add("ah-tabbed-content");
    });

    this.setLabelLengthRestrictions();
    this.setDefaultActiveTab();
  }

  override render() {
    return html`
      <div class="ah-tabbed">
        <div class="ah-tabbed-labels">
          <slot name="label" @slotchange=${this.handleSlotchange}></slot>
        </div>
        <div class="ah-tabbed-contents">
          <slot name="content" @slotchange=${this.handleSlotchange}></slot>
        </div>
      </div>
    `;
  }
}
