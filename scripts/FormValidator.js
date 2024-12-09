export class FormValidator {
  constructor(formsSelector) {
    this.forms = document.querySelectorAll(formsSelector); // Seleciona todos os formulários
  }

  // Função para exibir erro
  showInputError(input, errorMessage) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    input.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
  }

  // Função para ocultar erro
  hideInputError(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    input.classList.remove('form__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('form__input-error_active');
  }

  // Função de validação para um campo específico
  isValid(input) {
    if (!input.validity.valid) {
      this.showInputError(input, input.validationMessage);
    } else {
      this.hideInputError(input);
    }
  }

  // Função para atualizar o estado do botão
  updateButtonState(inputs, submitButton) {
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
  }

  // Função para adicionar a lógica de validação a cada formulário
  enableValidation() {
    this.forms.forEach((form) => {
      const inputs = form.querySelectorAll('.form__input');
      const submitButton = form.querySelector('button[type="submit"]');

      // Adiciona eventos de input para validação e atualização do estado do botão
      inputs.forEach((input) => {
        input.addEventListener('input', () => {
          this.isValid(input);  // Valida o campo específico
          this.updateButtonState(inputs, submitButton);  // Atualiza o estado do botão
        });
      });

      // Configura o estado inicial do botão
      this.updateButtonState(inputs, submitButton);

      form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão
        inputs.forEach(input => this.isValid(input)); // Valida todos os campos antes de enviar
      });
    });
  }
}



