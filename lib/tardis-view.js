'use babel';

export default class TardisView {

  constructor(serializedState) {


    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('tardis');

    const root = document.createElement('div');
    const itemCount = document.createElement('span');
    const historyIndicator = document.createElement('span');
    const filePath = document.createElement('span');

    this.element.appendChild(root);
    root.appendChild(itemCount);
    root.appendChild(historyIndicator);
    root.appendChild(filePath);

    itemCount.textContent = "."
    historyIndicator.textContent = "?"
    filePath.textContent = "/?"
  }

  setPath(path) {
    this.element.children[0].children[2].textContent = path;
  }

  setCount(count) {
    this.element.children[0].children[0].textContent = count;
  }

  setPastIndicator(onRight) {
    this.element.children[0].children[1].textContent = onRight > 0 ? ` > ${onRight} ` : " . ";
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
