export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  // Retorna as informações do usuário
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    };
  }

  // Define novas informações do usuário
  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}