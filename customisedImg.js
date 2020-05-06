/* Customised image tag that tries to lazy load images based on
intersection observer */

class LazyImg extends HTMLImageElement {
  constructor() {
    self = super();
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: [0.50]
    };
    const dummyUrl = self.getAttribute('dummy') || 'https://dummyimage.com/200x300/000/fff';
    self.setAttribute('src', dummyUrl);
    const observer = new IntersectionObserver(self.handleCallback.bind(self), options);
    observer.observe(self);
  }

  handleCallback(entries, observer) {
    const entry = entries[0];
    const target = entry.target;
    const lazy = target.getAttribute('lazy');
    const src = target.getAttribute('src');
    if (entry.isIntersecting) {
      if (src !== lazy) 
      self.loadImage(target, lazy);
    }
  }

  loadImage(target, lazy) {
    target.setAttribute('src', lazy);
    target.setAttribute('class', `${target.getAttribute('class')} loaded`)
  }
}

customElements.define('img-lazy', LazyImg, { extends: 'img' });