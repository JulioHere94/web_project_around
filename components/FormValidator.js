export class FormValidator {
  constructor(formsSelector) {
    this.forms = document.querySelectorAll(formsSelector);
  }

  showInputError(input, errorMessage) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    if (errorElement) {
      input.classList.add('form__input_type_error');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('form__input-error_active');
    } else {
      console.error(`Elemento de erro não encontrado para ${input.id}`);
    }
  }

  hideInputError(input) {
    const errorElement = document.querySelector(`#${input.id}-error`);
    if (errorElement) {
      input.classList.remove('form__input_type_error');
      errorElement.textContent = '';
      errorElement.classList.remove('form__input-error_active');
    } else {
      console.error(`Elemento de erro não encontrado para ${input.id}`);
    }
  }

  isValid(input) {
    if (!input.validity.valid) {
      this.showInputError(input, input.validationMessage);
    } else {
      this.hideInputError(input);
    }
  }

  updateButtonState(inputs, submitButton) {
    const isFormValid = Array.from(inputs).every(input => input.validity.valid);
    if (isFormValid) {
      submitButton.classList.remove('form__button_disabled');
      submitButton.disabled = false;
    } else {
      submitButton.classList.add('form__button_disabled');
      submitButton.disabled = true;
    }
  }

  enableValidation() {
    this.forms.forEach(form => {
      const inputs = form.querySelectorAll('.form__input');
      const submitButton = form.querySelector('button[type="submit"]');

      inputs.forEach(input => {
        input.addEventListener('input', () => {
          this.isValid(input);
          this.updateButtonState(inputs, submitButton);
        });
      });

      this.updateButtonState(inputs, submitButton);

      form.addEventListener('submit', event => {
        event.preventDefault();
        inputs.forEach(input => this.isValid(input));
      });
    });
  }
}



