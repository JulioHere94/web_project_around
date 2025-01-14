// PopupWithConfirmation.js
import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._popupCancel = this._popup.querySelector('.popup__button-cancel');
    this._popupConfirm = this._popup.querySelector('.container__button');
  }

  open(handleConfirm) {
    this._handleConfirm = handleConfirm || this._handleConfirm;
    super.open();
    this._popupCancel.addEventListener('click', this.#closeHandler);
    this._popupConfirm.addEventListener('click', this.#confirmHandler);
  }

  close() {
    super.close();
    this._popupCancel.removeEventListener('click', this.#closeHandler);
    this._popupConfirm.removeEventListener('click', this.#confirmHandler);
  }

  #closeHandler = () => this.close();

  #confirmHandler = (event) => {
    event.preventDefault();
    this._handleConfirm();
    this.close();
  }
}

