// Definindo as variaveis//
var editButton = document.querySelector(".profile-Info__button");
var addButton = document.querySelector(".profile__Button-Add");
var favDialog = document.querySelector('.popup-name'); //usado
var favDialogImg = document.querySelector('.popup-image'); //usado
var closeButton = document.querySelector(".popup__button-cancel"); //usado
var closeButtonImg = document.querySelector(".popup__img-button-cancel"); //usado
let likeButton = document.querySelectorAll(".element__button");
const nomeLi = document.querySelector('.name-result'); //usado
const inputName = document.querySelector('.input-name'); //usado
const subName = document.querySelector('.sub-title'); //usado
const subNameForm = document.querySelector('.input__sub-name'); //usado
const formElement = document.querySelector('.popup__container'); //usado
const addContainer = document.querySelector('.add__container');
const inputTitle = document.querySelector('.input-title');
const inputLink = document.querySelector('.input__link');
const likedButton = document.querySelector('.like__button');
const addButtonForm = document.querySelector('button__add')


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

const elementContainer = document.querySelector('.elements__container');

// adicionando os cartões
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




//renderizando um card

function renderCards(cardsArray){

cardsArray.forEach(card => {
  //Criação dos elementos
  const container = document.createElement('div');
  container.classList.add('element');

  const containerParagraph = document.createElement('p');
  containerParagraph.classList.add('element_paragraph');
  containerParagraph.textContent = card.name;

  const containerImage = document.createElement('img');
  containerImage.classList.add('element_image');
  containerImage.src = card.link;

  const containerTrash = document.createElement('button')
  containerTrash.classList.add('element__button-trash')

  const containerTrashImage = document.createElement('img')
  containerTrashImage.classList.add('element_button-image-trash')
  containerTrashImage.src = './images/Trash.png'
  
  //função da lixeira
  containerTrash.addEventListener('click', function(){
    container.remove()
  });

  const containerLike = document.createElement('button')
  containerLike.classList.add('element__button')

  const containerLikeImage = document.createElement('img')
  containerLikeImage.classList.add('element_button-image')
  containerLikeImage.src = './images/Vector.svg'

  //função do like
  containerLike.addEventListener('click', () => {
    if(containerLikeImage.src.includes('Vector.svg')) {
      containerLikeImage.src = './images/likeAtive.png';
    } else {
      containerLikeImage.src = './images/Vector.svg';
    }
  })

  containerTrash.append(containerTrashImage)
  containerLike.append(containerLikeImage)
  container.append(containerParagraph, containerImage,containerLike, containerTrash);
  elementContainer.append(container);
});
}

renderCards(initialCards);


//renderizando um card no topo

function renderCardsAtTop(cardsArray){

  cardsArray.forEach(card => {
    const container = document.createElement('div');
    container.classList.add('element');

    const containerParagraph = document.createElement('p');
    containerParagraph.classList.add('element_paragraph');
    containerParagraph.textContent = card.name;

    const containerImage = document.createElement('img');
    containerImage.classList.add('element_image');
    containerImage.src = card.link;

    const containerTrash = document.createElement('button')
    containerTrash.classList.add('element__button-trash')

    const containerTrashImage = document.createElement('img')
    containerTrashImage.classList.add('element_button-image-trash')
    containerTrashImage.src = './images/Trash.png'

    containerTrash.addEventListener('click', function(){
      container.remove()
    });

    const containerLike = document.createElement('button')
    containerLike.classList.add('element__button')

    const containerLikeImage = document.createElement('img')
    containerLikeImage.classList.add('element_button-image')
    containerLikeImage.src = './images/Vector.svg'

    containerLike.addEventListener('click', () => {
      if(containerLikeImage.src.includes('Vector.svg')) {
        containerLikeImage.src = './images/likeAtive.png';
      } else {
        containerLikeImage.src = './images/Vector.svg';
      }

    })

    containerTrash.append(containerTrashImage)
    containerLike.append(containerLikeImage)
    container.prepend(containerTrash, containerParagraph, containerImage,containerLike);
    elementContainer.prepend(container);
  });
  }

  //adicionando um item ao array

addContainer.addEventListener('submit', function(event) {
  event.preventDefault();

  const newElement = {
    name: inputTitle.value,
    link: inputLink.value,
  };

initialCards.unshift(newElement);
renderCardsAtTop([newElement]);

inputTitle.value='';
inputLink.value='';


favDialogImg.close();

});


