export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Método público para renderizar todos os itens
  renderItems() {
    this._renderedItems.forEach(item => {
      const element = this._renderer(item);
      this._container.append(element);
    });
  }

  // Método público para adicionar um item ao contêiner
  addItem(element) {
    this._container.prepend(element);
  }
}