export default class Section {

  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer; // renderCallback

    this._container = document.querySelector(containerSelector);
  }

  inserElement(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear()
    this._items.forEach(item => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }
}
