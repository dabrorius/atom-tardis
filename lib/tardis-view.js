'use babel';

export default class TardisView {

  constructor(serializedState) {
    this.element = document.createElement('div');
    this.element.classList.add('tardis');

    const root = document.createElement('div');
    const filePath = document.createElement('ul');
    filePath.setAttribute('id', 'filePath')

    this.element.appendChild(root);
    root.appendChild(filePath);

    filePath.textContent = "/?"
  }

  setPath(path) {
    let pathContainer = document.getElementById('filePath')
    pathContainer.innerHTML = ''
    let pathElements = path.split('/')
    pathElements.forEach(pathElement => {
      let pathPill = document.createElement('li')
      pathPill.textContent = pathElement
      filePath.appendChild(pathPill)
    })

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
