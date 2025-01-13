// api.js
export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  static getApiInstance() {
    if (!Api.instance) {
      Api.instance = new Api({
        baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
        headers: {
          authorization: "accf935d-bb5e-4295-83cc-70794360541e",
          "Content-Type": "application/json"
        }
      });
    }
    return Api.instance;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => res.json())
    .catch(err => console.error(`Erro ao obter informações do usuário: ${err}`));
  }

  updateUserInfo({ name, job, avatar }) {
    const data = {};
    if (name) data.name = name;
    if (job) data.about = job;
    if (avatar) data.avatar = avatar;

    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => Promise.reject(err.message));
        }
        return res.json();
      })
      .catch(err => {
        console.error(`Erro ao atualizar informações do usuário: ${err}`);
        throw err;
      });
  }

  updateUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => Promise.reject(err.message));
        }
        return res.json();
      })
      .catch(err => {
        console.error(`Erro ao atualizar avatar: ${err}`);
        throw err;
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => res.json())
    .catch(err => console.error(`Erro ao obter cartas iniciais: ${err}`));
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link })
    })
    .then(res => res.json())
    .catch(err => console.error(`Erro ao adicionar card: ${err}`));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao deletar card');
      return res.json();
    })
    .catch(err => {
      console.error(`Erro ao deletar card: ${err}`);
      throw err;
    });
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Erro ao atualizar o estado de like");
      }
      return res.json();
    })
    .catch(err => {
      console.error(`Erro ao atualizar like: ${err}`);
      throw err;
    });
  }
}











