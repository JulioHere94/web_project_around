import { PopupWithImage } from './PopupWithImage.js';


export class Card {
  constructor(name, link, isLiked, id, templateSelector, { handleCardClick, handleLikeClick, handleDeleteClick }) {
    this.name = name;
    this.link = link;
    this.isLiked = isLiked;
    this.id = id;
    this.templateSelector = templateSelector;
    this._popupWithImage = new PopupWithImage('.popup__element');
    this._popupWithImage.setEventListeners();
    this.handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick;
    this.handleDeleteClick = handleDeleteClick; // Associa a função de exclusão
  }

  // Criando o elemento do cartão
  #createElement() {
    const container = document.createElement('div');
    container.classList.add('element');
    container.setAttribute('data-id', this.id); // Atribuindo ID ao container

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
    // Evento de clique para abrir o popup de exclusão
    containerTrash.addEventListener('click', () => this.#handleTrash(container));

    const containerLike = document.createElement('button');
    containerLike.classList.add('element__button');
    const containerLikeImage = document.createElement('img');
    containerLikeImage.classList.add('element_button-image');
    containerLikeImage.src = this.isLiked ? './images/likeAtive.png' : './images/Vector.svg';

    containerLike.append(containerLikeImage);
    // Evento de clique para o like
    containerLike.addEventListener('click', () => this.#toggleLike(containerLikeImage));

    // Evento de clique para abrir a imagem no popup
    containerImage.addEventListener('click', () => this.handleCardClick(this.name, this.link));

    container.append(containerParagraph, containerImage, containerLike, containerTrash);

    return container;
  }

  #handleTrash(container) {
    this.handleDeleteClick(this.id); // Passa o ID do card para a função de exclusão
  }

  #toggleLike(likeImage) {
    if (this._isProcessing) return; // Evita cliques consecutivos
    this._isProcessing = true;

    const previousState = this.isLiked;
    this.isLiked = !this.isLiked;

    // Atualiza a imagem do botão de like
    likeImage.src = this.isLiked ? './images/likeAtive.png' : './images/Vector.svg';

    // Chama a função de API para registrar a mudança no servidor
    this.handleLikeClick({ id: this.id, isLiked: this.isLiked })
      .then(() => {
      })
      .catch(err => {
        console.error('Erro ao atualizar o estado de like no servidor:', err);
        // Reverte o estado local em caso de erro
        this.isLiked = previousState;
        likeImage.src = this.isLiked ? './images/likeAtive.png' : './images/Vector.svg';
      })
      .finally(() => {
        this._isProcessing = false; // Libera o botão após a finalização
      });
  }

  getCardElement() {
    return this.#createElement();
  }
}














