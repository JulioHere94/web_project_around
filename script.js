// Definindo as constiaveis//
const editButton = document.querySelector(".profile-Info__button");
const addButton = document.querySelector(".profile__Button-Add");
const favDialog = document.querySelector('.popup-name');
const favDialogImg = document.querySelector('.popup-image');
const closeButton = document.querySelector(".popup__button-cancel");
const closeButtonImg = document.querySelector(".popup__img-button-cancel");
const likeButton = document.querySelectorAll(".element__button");
const nomeLi = document.querySelector('.name-result');
const inputName = document.querySelector('.input-name');
const subName = document.querySelector('.sub-title');
const subNameForm = document.querySelector('.input__sub-name');
const formElement = document.querySelector('.popup__container');
const addContainer = document.querySelector('.add__container');
const inputTitle = document.querySelector('.input-title');
const inputLink = document.querySelector('.input__link');
const likedButton = document.querySelector('.like__button');
const addButtonForm = document.querySelector('button__add');
const favDialogElement = document.querySelector('.popup__element');



// adicionado os dados ao formulario
inputName.value = nomeLi.textContent;
subNameForm.value = subName.textContent;

// chamando o modal <dialog>
editButton.addEventListener("click", function () {
  favDialog.showModal();
})

addButton.addEventListener("click", function () {
  favDialogImg.showModal();
})


// chamando o 'close1 modal <dialog>
closeButton.addEventListener("click", function() {
  favDialog.close();
})

closeButtonImg.addEventListener("click", function() {
  favDialogImg.close();
})

// Função para o 'submit' do Formulario
formElement.addEventListener('submit', function (event) {
  event.preventDefault();
  nomeLi.textContent = inputName.value;
  subName.textContent = subNameForm.value;

  favDialog.close();
})

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
  })

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




