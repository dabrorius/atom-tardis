'use babel';

export default class TardisView {

  constructor(serializedState) {


    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('tardis');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The Tardis package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
  }

  setPath(path) {
    this.element.children[0].textContent = path;
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
