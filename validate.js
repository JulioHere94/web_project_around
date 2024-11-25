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
  updateButtonState();

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão
    inputs.forEach(isValid); // Valida todos os campos antes de enviar
  });
});


