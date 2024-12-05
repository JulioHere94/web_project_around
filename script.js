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

  const imagePopup = document.querySelector('.popup__element'); // selecionei fora assim não preciso chamar sempre o elemento via querry selector
const contentArea = document.querySelector('.popup_element-rectangle');

  containerImage.addEventListener('click', function(){
    const popupImage = document.querySelector('.popup__element_img');
    const popupTitle = document.querySelector('.popup__element_title');
    setSrc(popupImage, card.link);
    setTextContent(popupTitle, card.name);
    setAlt(popupImage, card.name); //adicionado o alt do pop up
    imagePopup.showModal();
  });
  const closePopupButton = document.querySelector('.closePopup');
        closePopupButton.addEventListener("click", function() {
          imagePopup.close();
  });

  // Fechar o pop-up ao clicar no fundo (no próprio dialog)
  imagePopup.addEventListener('click', function(event) { //captuta o evento ao click

    // Verificar se o clique foi fora do conteúdo
  if (!contentArea.contains(event.target)) {
    imagePopup.close(); // Fecha o pop-up
  }
});

// Impedi o fechamento do pop-up ao clicar dentro da área do conteúdo (no formulário)
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


//função para fechar com o esc
function closeFormEsc(event) {
  if (event.key === 'Escape') {
    forms.close();
  }
}
document.addEventListener('keydown', closeFormEsc);




