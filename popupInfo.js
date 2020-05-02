/* Definition of the PopupInfo webcomponent */
/* This is a autonomous component as it does not extend any built it component  */

class PopupInfo extends HTMLElement {
    constructor() {
        //  Always call super first in constructor
        super();
        // Create the shadow root
        var shadow = this.attachShadow({mode: 'open'});
        // Create spans
        var wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');
        var icon = document.createElement('span');
        icon.setAttribute('class', 'icon');
        icon.setAttribute('tabindex', '0');
        var info = document.createElement('span');
        info.setAttribute('class', 'info');

        // Take attribute content and put it inside info
        var text = this.getAttribute('data-text');
        info.textContent = text;
        // insert icon
        var imgURL;
        if(this.hasAttribute('img')) {
            imgURL = this.getAttribute('img');
        } else {
            imgURL =  'img/default.png';
        }
        var img = document.createElement('img');
        img.src = imgURL;
        icon.appendChild(img);

        // Create some css to apply to the shadow dom
        var style =  document.createElement('style');
        console.log(style.isConnected);
        style.textContent = `
            .wrapper {
                position: relative;
            }

            .info {
                font-size: 0.8rem;
                width: 200px;
                display: inline-block;
                border: 1px solid black;
                padding: 10px;
                background: white;
                border-radius: 5px;
                opacity: 0;
                transition: 0.6s all;
                position: absolute;
                bottom: 20px;
                left: 10px;
                z-index: 3;
            }


            img {
                width: 1.2rem;
            }

            .icon:hover + .info, .icon:focus + .info {
                opacity: 1
            }
        `;
        
        // either attach style or attach a css file using link attribute
        // link elements do not block the paint of the shadow DOM, so you may see FOUC,
        // ie Flash of Unstyled Content while the stylesheet loads.
        var link = document.createElement('link');
        link.setAttribute('rel',  'stylesheet');
        link.setAttribute('href', 'style.css');
        shadow.appendChild(link);
        // shadow.appendChild(style);
        console.log('After appendChild', style.isConnected);
        shadow.appendChild(wrapper);
        wrapper.appendChild(icon);
        wrapper.appendChild(info);
    }
}

// register the custom element on the Custom Element Registry
// using the define method
// params: element name and the class name that defines the functionality
customElements.define('popup-info',  PopupInfo);
