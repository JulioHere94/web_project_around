import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popup = document.querySelector(popupSelector); // Ensure this._popup is correctly initialized
    this._form = this._popup.querySelector('.form'); // Certifique-se de que o seletor seja correto
    this._inputList = this._form.querySelectorAll('.form__input');
  }

  // Método privado para coletar os valores de entrada
  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => {
      values[input.name] = input.value; // Assegure-se de que input.name seja consistente
    });
    return values;
  }

  // Sobrescreve o método pai para adicionar ouvintes de eventos
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  // Sobrescreve o método pai para redefinir o formulário quando fechado
  close() {
    super.close();
    this._form.reset(); // Reset the form when it is closed
  }
}