// Definindo as constantes
const editButton = document.querySelector(".profile-Info__button");
const addButton = document.querySelector(".profile__Button-Add");
const favDialog = document.querySelector('.popup-name');
const favDialogImg = document.querySelector('.popup-image');
const closeButton = document.querySelector(".popup__button-cancel");
const closeButtonImg = document.querySelector(".popup__img-button-cancel");
const nomeLi = document.querySelector('.name-result');
const inputName = document.querySelector('.input-name');
const subName = document.querySelector('.sub-title');
const subNameForm = document.querySelector('.input__sub-name');
const formElement = document.querySelector('.popup__container');
const addContainer = document.querySelector('.add__container');
const inputTitle = document.querySelector('.input-title');
const inputLink = document.querySelector('.input__link');

// adicionado os dados ao formulario
inputName.value = nomeLi.textContent;
subNameForm.value = subName.textContent;

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

// Fechar `favDialog` ao clicar fora do conteúdo
favDialog.addEventListener("click", function (event) {
  if (event.target === favDialog) {
    favDialog.close();
  }
});

// Fechar `favDialogImg` ao clicar fora do conteúdo
favDialogImg.addEventListener("click", function (event) {
  if (event.target === favDialogImg) {
    favDialogImg.close();
  }
});

// Impedindo o fechamento ao clicar no formulário de `favDialog`
document.querySelector(".popup__container").addEventListener("click", function (event) {
  event.stopPropagation();
});

// Impedindo o fechamento ao clicar no formulário de `favDialogImg`
document.querySelector(".add__container").addEventListener("click", function (event) {
  event.stopPropagation();
});

// Função para o 'submit' do Formulário
formElement.addEventListener('submit', function (event) {
  event.preventDefault();
  nomeLi.textContent = inputName.value;
  subName.textContent = subNameForm.value;
  favDialog.close();
});

//Definindo o container
const elementContainer = document.querySelector('.elements__container');

// adicionando os cartões "Default"
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
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

function setTextContent(element, text) {
  element.textContent = text;
}

function setSrc(element, src) {
  element.src = src;
}

function setAlt(element, alt) {
  element.alt = alt;
}


//renderizando um card (default)

function createCardElement(card){
  const container = document.createElement('div');
  container.classList.add('element');

  const containerParagraph = document.createElement('p');
  containerParagraph.classList.add('element_paragraph');
  setTextContent(containerParagraph, card.name);

  const containerImage = document.createElement('img');
  containerImage.classList.add('element_image');
  setSrc(containerImage, card.link);
  setAlt(containerImage, card.name);

  const containerTrash = document.createElement('button')
  containerTrash.classList.add('element__button-trash')

  const containerTrashImage = document.createElement('img')
  containerTrashImage.classList.add('element_button-image-trash')
  setSrc(containerTrashImage, './images/Trash.png')

  //função da lixeira
  containerTrash.addEventListener('click', function(){
    container.remove()
  });

  const containerLike = document.createElement('button')
  containerLike.classList.add('element__button')

  //função de like
  const containerLikeImage = document.createElement('img')
  containerLikeImage.classList.add('element_button-image')
  setSrc(containerLikeImage, './images/Vector.svg')

  //adição do Eventi Listener ao like para mudança da imagem (substituindo o innerHTML)
  containerLike.addEventListener('click', () => {
    if(containerLikeImage.src.includes('Vector.svg')) {
      containerLikeImage.src = './images/likeAtive.png';
    } else {
      setSrc(containerLikeImage, './images/Vector.svg');
    }
  })

  //Abertura do popup com a imagem 'postada'
  containerImage.addEventListener('click', function(){
    const imagePopup = document.querySelector('.popup__element');
    const popupImage = document.querySelector('.popup__element_img');
    const popupTitle = document.querySelector('.popup__element_title');
    setSrc(popupImage, card.link);
    setTextContent(popupTitle, card.name);
    setAlt(popupImage, card.name); //adicionado o alt do pop up
    imagePopup.showModal();
  });
  const closePopupButton = document.querySelector('.closePopup');
        closePopupButton.addEventListener("click", function() {
        document.querySelector('.popup__element').close();
  });

  // Fechar o pop-up ao clicar no fundo (no próprio dialog)
  const popupElement = document.querySelector('.popup__element'); //seleciona o elemento pop_UP
  popupElement.addEventListener('click', function(event) { //captuta o evento ao click
  // Verificar se o clique foi fora do conteúdo
  const contentArea = document.querySelector('.popup_element-rectangle');
  if (!contentArea.contains(event.target)) {
    popupElement.close(); // Fecha o pop-up
  }
});

// Impedir o fechamento do pop-up ao clicar dentro da área do conteúdo (no formulário)
const contentArea = document.querySelector('.popup_element-rectangle');
contentArea.addEventListener('click', function(event) {
  event.stopPropagation(); // Impede que o clique dentro do conteúdo feche o pop-up
});

  //adicionando os elementos ao HTML
  containerTrash.append(containerTrashImage)
  containerLike.append(containerLikeImage)
  container.append(containerParagraph, containerImage,containerLike, containerTrash);

  return container;
}

//renderizo os cards iniciais na posição original
function renderInitialCards(){
  initialCards.forEach((card) => {
    const cardElement = createCardElement(card);
    elementContainer.append(cardElement);
  });
}

//utilizo a função
renderInitialCards();

//adicionando um item ao array
  addContainer.addEventListener('submit', function(event) {
  event.preventDefault(); //pelas minhas pesquisas o preventDefault evita o refresh da pagina

  const newElement = {
    name: inputTitle.value,
    link: inputLink.value,
  };

initialCards.unshift(newElement);

const newCardElement = createCardElement(newElement);
elementContainer.prepend(newCardElement); //utilizando o prepend para renderizar na primeira posicao

inputTitle.value='';
inputLink.value='';


favDialogImg.close();

});

//validação do formulário

// Selecionando todos os formulários na página
const forms = document.querySelectorAll('.form');

// Função para exibir erro
const showInputError = (input, errorMessage) => {
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

// Função para ocultar erro
const hideInputError = (input) => {
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.remove('form__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('form__input-error_active');
};

// Função de validação para um campo específico
const isValid = (input) => {
  if (!input.validity.valid) {
    showInputError(input, input.validationMessage);
  } else {
    hideInputError(input);
  }
};

// Adicionando a lógica de validação para cada formulário
forms.forEach((form) => {
  const inputs = form.querySelectorAll('.form__input');
  const submitButton = form.querySelector('button[type="submit"]');

  // Função para atualizar o estado do botão
  const updateButtonState = () => {
    // Verifica se todos os inputs são válidos
    const isFormValid = Array.from(inputs).every(input => input.validity.valid);

    // Habilita ou desabilita o botão de envio com base na validade
    if (isFormValid) {
      submitButton.classList.remove('form__button_disabled');
      submitButton.disabled = false;
    } else {
      submitButton.classList.add('form__button_disabled');
      submitButton.disabled = true;
    }
  };

  // Adiciona eventos de input para validação e atualização do estado do botão
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(input);  // Valida o campo específico
      updateButtonState();  // Atualiza o estado do botão
    });
  });

  // Configura o estado inicial do botão
  updateButtonState(); // Verifica se o botão deve ser habilitado ao carregar a página

  // Validação no envio do formulário
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão
    inputs.forEach(isValid); // Valida todos os campos antes de enviar
  });
});





