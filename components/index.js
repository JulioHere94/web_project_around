import { Card } from './card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { Api } from './Api.js';
import { PopupWithConfirmation } from './PopupWithConfirmation.js';

const api = Api.getApiInstance();

const imagePopup = new PopupWithImage('.popup__element');
imagePopup.setEventListeners();

let deleteCardId = null; // Variável global para armazenar o id do card a ser deletado

const deletePopup = new PopupWithConfirmation('.popup-delete', () => {
  api.deleteCard(deleteCardId)
    .then(() => {
      const cardElement = document.querySelector(`[data-id="${deleteCardId}"]`);
      if (cardElement) {
        cardElement.remove();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

deletePopup.setEventListeners();

const renderCard = (data) => {
  const card = new Card(data.name, data.link, data.isLiked, data._id, '.card-template', {
    handleCardClick: () => {
      imagePopup.open(data.name, data.link);
    },
    handleLikeClick: ({ id, isLiked }) => {
      return api.toggleLike(id, isLiked);
    },
    handleDeleteClick: (cardId) => {
      deleteCardId = cardId; // Atualiza o ID do card a ser deletado
      deletePopup.open();
    }
  });
  return card.getCardElement();
};

api.getInitialCards()
  .then((cards) => {
    if (cards.length > 0) {
      const cardSection = new Section({
        items: cards,
        renderer: renderCard,
      }, '.elements__container');
      cardSection.renderItems();
    } else {
      console.log('Nenhum card encontrado');
    }
  })
  .catch((err) => {
    console.log(err);
  });

  const cardSection = new Section({
    items: [],  // Inicialmente vazio, será preenchido posteriormente
    renderer: renderCard,
  }, '.elements__container');

  const addPopup = new PopupWithForm({
    popupSelector: '.popup-image',
    handleFormSubmit: (formData) => {
      const newCardData = {
        name: formData['input__title'],
        link: formData['input__link2']
      };

      api.addCard(newCardData)
        .then((card) => {
          cardSection.addItem(renderCard(card));
          addPopup.close();
        })
        .catch((err) => {
          console.log('Erro ao adicionar cartão:', err);
        });
    }
  });

  addPopup.setEventListeners();
  cardSection.renderItems();  // Renderiza os itens iniciais



const updateUserInfo = new UserInfo({
  nameSelector: '.name-result',
  jobSelector: '.sub-title',
  avatarSelector: '.Profile__image'
});

updateUserInfo.fetchUserInfo();

const editPopup = new PopupWithForm({
  popupSelector: '.popup-name',
  handleFormSubmit: (formData) => {
    updateUserInfo.updateUserInfoOnServer({
      name: formData['input__name'],
      job: formData['input__sub-name']
    })
    .then(() => {
      editPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
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
    const userData = updateUserInfo.getUserInfo();
    document.querySelector('[name="input__name"]').value = userData.name;
    document.querySelector('[name="input__sub-name"]').value = userData.job;
    editPopup.open();
  });
}

const formValidator = new FormValidator('.form');
formValidator.enableValidation();

function toggleLike(card) {
  api.toggleLike(card.id, card.isLiked)
    .then((data) => {
      card.isLiked = !card.isLiked;
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}









