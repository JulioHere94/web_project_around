// Definindo as variaveis//
var editButton = document.querySelector(".profile-Info__button");
var favDialog = document.querySelector('.popup');
var closeButton = document.querySelector(".popup__button-cancel");
let likeButton = document.querySelectorAll(".element__button");
let nomeLi = document.querySelector('.name-result');
let inputName = document.querySelector('.input-name');
let subName = document.querySelector('.sub-title');
let subNameForm = document.querySelector('.input__sub-name');
let formElement = document.querySelector('.popup__container');


// adicionado os dados ao formulario
inputName.value = nomeLi.textContent;
subNameForm.value = subName.textContent;

// chamando o modal <dialog>
editButton.addEventListener("click", function () {
  favDialog.showModal();
})

// chamando o 'close1 modal <dialog>
closeButton.addEventListener("click", function() {
  favDialog.close();
})

// Função para o 'submit' do Formulario
formElement.addEventListener('submit', function (event) {
  event.preventDefault();
  nomeLi.textContent = inputName.value;
  subName.textContent = subNameForm.value;

  favDialog.close();
})

// lógica para o botão de like (obs.: optei pela troca de imagens)
likeButton.forEach(likeButton => {
  let liked = false;

likeButton.addEventListener("click", function(){
  if(!liked) {
    likeButton.innerHTML = `<img src="./images/likeAtive.png" alt="icone de curtida" class="element_button-image"></img>`;
    liked = true;
  } else {
    likeButton.innerHTML = `<img src="./images/Vector.svg" alt="icone de curtida" class="element_button-image">`;
    liked = false;
  }
});
});

