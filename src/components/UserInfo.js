// UserInfo.js
import { Api } from './Api.js';

export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this.api = Api.getApiInstance();
  }

  // Retorna as informações do usuário
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src
    };
  }

  // Define novas informações do usuário
  setUserInfo({ name, job, avatar }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._avatarElement.src = avatar;
  }

  fetchUserInfo() {
    this.api.getUserInfo()
    .then((result) => {
      this.setUserInfo({
        name: result.name,
        job: result.about,
        avatar: result.avatar
      });
      console.log('Informações do usuário carregadas:', result);
    });
   }

  updateUserInfoOnServer({ name, job, avatar }) {
    return this.api.updateUserInfo({ name, job, avatar })
    .then((result) => {
      this.setUserInfo({
        name: result.name,
        job: result.about,
        avatar: result.avatar
      });
    });
  }
}


