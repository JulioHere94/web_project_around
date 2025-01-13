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
  // Seleciona o botão de envio dentro do popup
  const submitButton = document.querySelector('.popup-delete .container__button');
  const originalButtonText = submitButton.textContent;

  // Atualiza o texto do botão para "Excluindo..." e desativa o botão
  submitButton.textContent = 'Excluindo...';
  submitButton.disabled = true;

  api.deleteCard(deleteCardId)
    .then(() => {
      const cardElement = document.querySelector(`[data-id="${deleteCardId}"]`);
      if (cardElement) {
        cardElement.remove();
      }
      deletePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // Restaura o texto original do botão e reativa o botão
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
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

      // Seleciona o botão de envio dentro do formulário do popup
      const submitButton = document.querySelector('.popup-image .container__button');
      const originalButtonText = submitButton.textContent;

      // Atualiza o texto do botão para "Salvando..." e desativa o botão
      submitButton.textContent = 'Salvando...';
      submitButton.disabled = true;

      api.addCard(newCardData)
        .then((card) => {
          cardSection.addItem(renderCard(card));
          addPopup.close();
        })
        .catch((err) => {
          console.log('Erro ao adicionar cartão:', err);
        })
        .finally(() => {
          // Restaura o texto original do botão e reativa o botão
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
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
    // Seleciona o botão de envio dentro do popup
    const submitButton = document.querySelector('.popup-name .container__button');
    const originalButtonText = submitButton.textContent;

    // Atualiza o texto do botão para "Salvando..." e desativa o botão
    submitButton.textContent = 'Salvando...';
    submitButton.disabled = true;

    updateUserInfo.updateUserInfoOnServer({
      name: formData['input__name'],
      job: formData['input__sub-name']
    })
    .then(() => {
      editPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // Restaura o texto original do botão e reativa o botão
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
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

document.addEventListener('DOMContentLoaded', () => {
  const api = Api.getApiInstance();
  const profileImage = document.querySelector('.Profile__image');
  const profileIcon = document.querySelector('.profile-icon');
  const dialog = document.getElementById('popup__image-perfil');
  const form = document.querySelector('.popup__container');
  const closeButton = document.getElementById('close-dialog');

  const openDialog = () => {
    if (!dialog.open) {
      dialog.showModal();
    }
  };

  const closeDialog = () => {
    if (dialog.open) {
      dialog.close();
    }
  };

  profileImage.addEventListener('click', openDialog);
  profileIcon.addEventListener('click', openDialog);
  closeButton.addEventListener('click', closeDialog);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector('.container__button');
    const imageUrl = document.getElementById('input__image1').value;

    // Atualiza o texto do botão para "Salvando..."
    submitButton.textContent = 'Salvando...';
    submitButton.disabled = true; // Desativa o botão para evitar cliques múltiplos

    try {
      await api.updateUserAvatar(imageUrl);
      console.log('Foto do perfil atualizada com sucesso.');
      profileImage.src = imageUrl; // Atualiza a foto do perfil sem recarregar a página
      closeDialog();
    } catch (error) {
      console.error(error.message);
    } finally {
      // Retorna o botão ao estado original
      submitButton.textContent = 'Salvar';
      submitButton.disabled = false;
    }
  });
});













