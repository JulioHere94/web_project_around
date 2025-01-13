export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Método público para abrir o pop-up
  open() {
    this._popup.showModal();
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Método público para fechar o pop-up
  close() {
    this._popup.close();
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Método privado para fechar o pop-up com a tecla Esc
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // Método público para adicionar ouvintes de eventos
  setEventListeners() {
    this._popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup')) {
        this.close();
      }
    });

    // Verificar se o botão de fechar existe antes de adicionar o ouvinte de eventos
    const closeButton = this._popup.querySelector('.popup__button-cancel, .popup__img-button-cancel, .closePopup');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.close());
    } else {
      console.warn('Botão de fechar não encontrado.');
    }
  }
}