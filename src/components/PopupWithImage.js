import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  open(name, link) {
    const popupImage = this._popup.querySelector('.popup__element_img');
    const popupTitle = this._popup.querySelector('.popup__element_title');

    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;

    super.open();
  }
}