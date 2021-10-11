export default class Api {
  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _sendRequest(relativePath, method = 'GET', bodyObject = {}) {

    const options = {
      'method': method,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    };
    const url = this._baseUrl + relativePath;

    if (Object.keys(bodyObject).length !== 0) {
      options.body = JSON.stringify(bodyObject);
    }

    return fetch(url, options)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        else {
          return Promise.reject();
        }
      });
  }

  getUserInfo() {
    return this._sendRequest('/users/me');
  }

  getCardSet() {
    return this._sendRequest('/cards');
  }

  sendEditProfileRequest({name, about}) {
    return this._sendRequest('/users/me', 'PATCH', {
        'name': name,
        'about': about
      });
  }

  sendAddNewCardRequest({name, link}) {
    return this._sendRequest('/cards', 'POST', {
        'name': name,
        'link': link
      });
  }

  sendDeleteCardRequest(cardId) {
    return this._sendRequest(`/cards/${cardId}`, 'DELETE');
  }

  sendPutLikeCardRequest(cardId) {
    return this._sendRequest(`/cards/likes/${cardId}`, 'PUT');
  }

  sendDeleteLikeCardRequest(cardId) {
    return this._sendRequest(`/cards/likes/${cardId}`, 'DELETE');
  }

  sendUpdateUserAvatarRequest(avatarLink) {
    return this._sendRequest('/users/me/avatar', 'PATCH', {
        avatar: avatarLink
      });
  }
}
