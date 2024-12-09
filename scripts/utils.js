// Manipuladores de eventos para abrir/fechar as modais
const editButton = document.querySelector(".profile-Info__button");
const addButton = document.querySelector(".profile__Button-Add");
const favDialog = document.querySelector('.popup-name');
const favDialogImg = document.querySelector('.popup-image');
const closeButton = document.querySelector(".popup__button-cancel");
const closeButtonImg = document.querySelector(".popup__img-button-cancel");

// Abrindo os modais
editButton.addEventListener("click", function () {
  favDialog.showModal();
});

addButton.addEventListener("click", function () {
  favDialogImg.showModal();
});

// Fechando os modais com os botões de fechar
closeButton.addEventListener("click", function () {
  favDialog.close();
});

closeButtonImg.addEventListener("click", function () {
  favDialogImg.close();
});

// Fechar favDialog ao clicar fora do conteúdo
favDialog.addEventListener("click", function (event) {
  if (event.target === favDialog) {
    favDialog.close();
  }
});

// Fechar favDialogImg ao clicar fora do conteúdo
favDialogImg.addEventListener("click", function (event) {
  if (event.target === favDialogImg) {
    favDialogImg.close();
  }
});

// Impedindo o fechamento ao clicar no formulário de favDialog
document.querySelector(".popup__container").addEventListener("click", function (event) {
  event.stopPropagation();
});

// Impedindo o fechamento ao clicar no formulário de favDialogImg
document.querySelector(".add__container").addEventListener("click", function (event) {
  event.stopPropagation();
});

// Função para o 'submit' do Formulário
const formElement = document.querySelector('.popup__container-form');
formElement.addEventListener('submit', function (event) {
  event.preventDefault();
  nomeLi.textContent = inputName.value;
  subName.textContent = subNameForm.value;
  favDialog.close();
});

// Fechar o formulário com a tecla Escape
function closeFormEsc(event) {
  if (event.key === 'Escape') {
    forms.close();
  }
}
document.addEventListener('keydown', closeFormEsc);
