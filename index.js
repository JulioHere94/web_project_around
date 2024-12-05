// index.js
import { Card } from './card.js'; // Importando a classe Card
import { FormValidator } from './FormValidator.js';

// Seletor do container onde os cartões serão inseridos
const elementContainer = document.querySelector('.elements__container');

// Array com dados dos cartões
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

// Função para renderizar os cartões
function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const card = new Card(cardData.name, cardData.link, '.card-template');
    elementContainer.append(card.getCardElement());
  });
}

// Inicializando a renderização dos cartões iniciais
renderInitialCards();

// Função para adicionar novos cartões ao array e renderizá-los
const addContainer = document.querySelector('.add__container');

addContainer.addEventListener('submit', function (event) {
  event.preventDefault(); // Evita o refresh da página

  const newElement = {
    name: document.querySelector('.input-title').value,
    link: document.querySelector('.input__link').value
  };

  // Adicionando o novo cartão à lista
  initialCards.unshift(newElement);

  // Criando e inserindo o novo cartão no início da lista
  const newCard = new Card(newElement.name, newElement.link, '.card-template');
  elementContainer.prepend(newCard.getCardElement());

  // Limpando os campos de entrada
  document.querySelector('.input-title').value = '';
  document.querySelector('.input__link').value = '';

  // Fechando o popup de adicionar
  document.querySelector('.popup-image').close();
});

// Criando uma instância da classe FormValidator e ativando a validação
const formValidator = new FormValidator('.form');
formValidator.enableValidation();


const nomeLi = document.querySelector('.name-result');
const inputName = document.querySelector('.input-name');
const subName = document.querySelector('.sub-title');
const subNameForm = document.querySelector('.input__sub-name');
const formElement = document.querySelector('.popup__container');

// adicionado os dados ao formulario
inputName.value = nomeLi.textContent;
subNameForm.value = subName.textContent;

// Função para o 'submit' do Formulário
formElement.addEventListener('submit', function (event) {
  event.preventDefault();
  nomeLi.textContent = inputName.value;
  subName.textContent = subNameForm.value;
  favDialog.close();
});

