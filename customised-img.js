/* Customised image tag that tries to lazy load images based on
intersection observer */

class LazyImg extends HTMLImageElement {
  constructor() {
    self = super();
   
    // declare Intersection Observer options
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0.50] 
      // invoke the callback as soon as the element is 50% visible
    };
    
    // add fallback placeholder url
    if (!(self.getAttribute('src'))) {
      self.setAttribute(
       'src',  
       'https://i.picsum.photos/id/208/20/30.jpg?blur=5');  
    }

    // instantiate the observer
    const observer = new IntersectionObserver(
       self.handleCallback.bind(self),
       options);
    
    // start observing
    observer.observe(self);
  }

  handleCallback(entries, observer) {
    entries.forEach((entry, index) => {
      const target = entry.target;
      const dataSrc = target.getAttribute('data-src');
      const src = target.getAttribute('src');
      if (entry.isIntersecting) {
        if (src !== dataSrc) {
          self.loadImage(observer, target, dataSrc);
        }
      }
    });
  }

  loadImage(observer, target, dataSrc) {
    // put the desired url as the src
    target.setAttribute('src', dataSrc);
    
    // add a class lazy-img
    target.setAttribute(
     'class', 
     `${target.getAttribute('class')} lazy-loaded`);
    // unobserve the element
    observer.unobserve(target);
   }
}

customElements.define('lazy-img', LazyImg, { extends: 'img' });
