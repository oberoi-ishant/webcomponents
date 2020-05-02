

class ElementDetails extends HTMLElement {
    constructor() {
        super();
        var template = document.getElementById('element-details-template');
        const shadowRoot = this.attachShadow({ mode: 'open' });
        var templateContent = template.content;
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
}

customElements.define('element-details', ElementDetails);


