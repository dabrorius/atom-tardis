'use babel';

export default class TardisView {

  constructor(serializedState) {


    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('tardis');

    const root = document.createElement('div');
    const filePath = document.createElement('span');

    this.element.appendChild(root);
    root.appendChild(filePath);

    filePath.textContent = "/?"
  }

  setPath(path) {
    this.element.children[0].children[0].textContent = path;
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
