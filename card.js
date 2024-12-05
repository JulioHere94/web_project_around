// card.js
export class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
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
    containerImage.addEventListener('click', () => this.#openPopup(containerImage));

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

  // Método privado para abrir o popup
  #openPopup(image) {
    const imagePopup = document.querySelector('.popup__element');
    const popupImage = document.querySelector('.popup__element_img');
    const popupTitle = document.querySelector('.popup__element_title');

    popupImage.src = this.link;
    popupImage.alt = this.name;
    popupTitle.textContent = this.name;
    imagePopup.showModal();

    const closePopupButton = document.querySelector('.closePopup');
    closePopupButton.addEventListener("click", () => imagePopup.close());
    imagePopup.addEventListener('click', (event) => this.#closePopup(event, imagePopup));
  }

  // Método privado para fechar o popup ao clicar fora
  #closePopup(event, popup) {
    if (!event.target.closest('.popup_element-rectangle')) {
      popup.close();
    }
  }

  // Método público para retornar o elemento do cartão
  getCardElement() {
    return this.#createElement();
  }
}








