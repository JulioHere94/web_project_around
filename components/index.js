import { Card } from './card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

const initialCards = [
  { name: "Vale de Yosemite", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg" },
  { name: "Lago Louise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg" },
  { name: "Montanhas Carecas", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg" },
  { name: "Latemar", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg" },
  { name: "Parque Nacional da Vanoise", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg" },
  { name: "Lago di Braies", link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg" }
];

const imagePopup = new PopupWithImage('.popup-image');
imagePopup.setEventListeners();

const renderCard = (data) => {
  const card = new Card(data.name, data.link, '.card-template', imagePopup.open.bind(imagePopup)); // Passando handleCardClick
  return card.getCardElement();
};

const cardSection = new Section({
  items: initialCards,
  renderer: renderCard
}, '.elements__container');

cardSection.renderItems();

const addPopup = new PopupWithForm({
  popupSelector: '.popup-image',
  handleFormSubmit: (formData) => {
    const newCardElement = renderCard({
      name: formData['input__title'],
      link: formData['input__link']
    });
    cardSection.addItem(newCardElement);
    addPopup.close();
  }
});
addPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.name-result',
  jobSelector: '.sub-title'
});

const editPopup = new PopupWithForm({
  popupSelector: '.popup-name',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      name: formData['input__name'],
      job: formData['input__sub-name']
    });
    editPopup.close();
  }
});
editPopup.setEventListeners();

const addButton = document.querySelector('.profile__Button-Add');
const editButton = document.querySelector('.profile-Info__button');

if (addButton) {
  addButton.addEventListener('click', () => {
    addPopup.open();
  });
}

if (editButton) {
  editButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    document.querySelector('[name="input__name"]').value = userData.name;
    document.querySelector('[name="input__sub-name"]').value = userData.job;
    editPopup.open();
  });
}

const formValidator = new FormValidator('.form');
formValidator.enableValidation();


