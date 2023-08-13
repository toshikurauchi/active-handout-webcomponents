import {LitElement, html, css} from 'lit';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false });

export class AhDiagram extends LitElement {
  static properties = {
  };

  static styles = css`
    :host {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    slot {
      display: none;
    }
  `;

  constructor() {
    super();
    this.svgContent = "";
  }

  async changedSlot() {
    let l = "";
    this.shadowRoot.querySelector('slot')?.assignedNodes().forEach(
      (node) => {
        l += node.textContent;
      });
      console.log(l);
      const { svg }  = await mermaid.render("graphDiv", l);
      this.svgContent = html`${unsafeSVG(svg)}`;
      this.requestUpdate();
    }

  render() {
    return html`
    <slot @slotchange=${this.changedSlot}></slot>
    <div class="svg-container">${this.svgContent}</div>
    `;
  }
}

customElements.define('ah-diagram', AhDiagram);
