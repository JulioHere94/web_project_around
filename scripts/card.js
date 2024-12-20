import { PopupWithImage } from './PopupWithImage.js'; // Importando PopupWithImage

export class Card {
  constructor(name, link, templateSelector) {
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
    this._popupWithImage = new PopupWithImage('.popup__element');
    this._popupWithImage.setEventListeners();
  }

  // Criando o elemento do cartão
  #createElement() {
    const container = document.createElement('div');
    container.classList.add('element');

    const containerParagraph = document.createElement('p');
    containerParagraph.classList.add('element_paragraph');
    containerParagraph.textContent = this.name;

    const containerImage = document.createElement('img');
    containerImage.classList.add('element_image');
    containerImage.src = this.link;
    containerImage.alt = this.name;

    const containerTrash = document.createElement('button');
    containerTrash.classList.add('element__button-trash');
    const containerTrashImage = document.createElement('img');
    containerTrashImage.classList.add('element_button-image-trash');
    containerTrashImage.src = './images/Trash.png';

    containerTrash.append(containerTrashImage);
    // Adicionando evento de clique para o trash
    containerTrash.addEventListener('click', () => this.#handleTrash(container));

    const containerLike = document.createElement('button');
    containerLike.classList.add('element__button');
    const containerLikeImage = document.createElement('img');
    containerLikeImage.classList.add('element_button-image');
    containerLikeImage.src = './images/Vector.svg';

    containerLike.append(containerLikeImage);
    // Adicionando evento de clique para o like
    containerLike.addEventListener('click', () => this.#toggleLike(containerLikeImage));

    // Popup
    containerImage.addEventListener('click', () => this._popupWithImage.open(this.name, this.link));

    container.append(containerParagraph, containerImage, containerLike, containerTrash);

    return container;
  }

  // Método privado para lidar com o evento do trash
  #handleTrash(container) {
    container.remove();  // Remove o cartão
  }

  // Método privado para alternar a imagem de like
  #toggleLike(likeImage) {
    if (likeImage.src.includes('Vector.svg')) {
      likeImage.src = './images/likeAtive.png';
    } else {
      likeImage.src = './images/Vector.svg';
    }
  }

  // Método público para retornar o elemento do cartão
  getCardElement() {
    return this.#createElement();
  }
}








