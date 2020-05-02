/** Source: https://github.com/mdn/web-components-examples/blob/master/expanding-list-web-component/main.js */

// This is a custom element that extends the in build ul element HTMLUListElement

class ExpandingList extends HTMLUListElement {
    constructor() {
        // return value from super is the reference to this element
        self = super();
        // get UL and LI elements that are child of this custom ul element
        const uls = Array.from(self.querySelectorAll('ul'));
        const lis = Array.from(self.querySelectorAll('li'));

        // hide all child uls
        // these lists will be shown when user clicks a higher level container
        uls.forEach(ul => {
            ul.style.display = 'none';
        });

        // look through each li element in the ul
        lis.forEach(li => {
            // if this li has a ul as a child then decorate it and add a click handler
            if(li.querySelectorAll('ul').length > 0) {
                // add an attribute which can be ised by the style to show open:closed
                li.setAttribute('class', 'closed');
                // wrap the li elements text in a new span element
                // so that we can assgin style and attach an event handler to it
                const childText = li.childNodes[0];
                const newSpan = document.createElement('span');
                // copy text from li to span
                // set cursor style
                newSpan.textContent = childText.textContent;
                newSpan.style.cursor = 'pointer';
                // Add click handler
                newSpan.onclick = self.showul;
                // Add the span and remove the bare text node from the li
                childText.parentNode.insertBefore(newSpan, childText);
                childText.parentNode.removeChild(childText);
            }
        });
    }

    // li click handler
    showul = function (event) {
        // next sibling to the span should be the ul
        const nextul = event.target.nextElementSibling;
        // toggle visible state and update class attribute on the ul
        if(nextul.style.display === 'block') {
            nextul.style.display = 'none';
            nextul.parentNode.setAttribute('class', 'closed');
        } else {
            nextul.style.display = 'block';
            nextul.parentNode.setAttribute('class', 'open');
        }
    }
}

// This is a custom element that extends the in build ul element HTMLUListElement
customElements.define('expanding-list', ExpandingList, { extends: 'ul' });
