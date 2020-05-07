class CodeSnippet extends HTMLElement {
  constructor() {
    super();
    var template = document.getElementById('code-snippet');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    var templateContent = template.content;
    shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}

customElements.define('code-snippet', CodeSnippet);