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

    return new Promise((resolve, reject)=>{
      fetch(url, options)
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        else {
          throw "Произошла ошибка в методе _sendRequest класса Api (ошибка парсера JSON)"; //Ловим это исключение в нижнем catch
        }
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err)=>{
        console.error(`При запросе к ${url} произошла ошибка!\nПодробности:\n${err}`);
        reject();
      });
    });
  }

  getUserInfo() {
    return new Promise((resolve, reject)=>{
      this._sendRequest('/users/me')
      .then((data)=>{
        resolve(data);
      })
      .catch(()=>{
        console.error(`Метод getUserInfo не получил данных, из-за ошибки.`);
        reject();
      })
    });
  }

  getCardSet() {
    return new Promise((resolve, reject)=>{
      this._sendRequest('/cards')
      .then((data)=>{
        resolve(data);
      })
      .catch(()=>{
        console.error(`Метод getCardSet не получил данных, из-за ошибки.`);
        reject();
      })
    });
  }

  sendEditProfileRequest({name, about}) {
    return new Promise((resolve, reject)=>{
      this._sendRequest('/users/me', 'PATCH', {
        'name': name,
        'about': about
      })
      .then((data)=>{
        resolve(data);
      })
      .catch(()=>{
        console.error(`Метод sendEditProfileRequest не получил данных, из-за ошибки.`);
        reject();
      })
    });
  }

  sendAddNewCardRequest({name, link}) {
    return new Promise((resolve, reject)=>{
      this._sendRequest('/cards', 'POST', {
        'name': name,
        'link': link
      })
      .then((data)=>{
        resolve(data);
      })
      .catch(()=>{
        console.error(`Метод sendAddNewCardRequest не получил данных, из-за ошибки.`);
        reject();
      })
    });
  }

  sendDeleteCardRequest(cardId) {
    return new Promise((resolve, reject)=>{
      this._sendRequest(`/cards/${cardId}`, 'DELETE')
      .then((data)=>{
        resolve(data);
      })
      .catch(()=>{
        console.error(`Метод sendDeleteCardRequest не получил данных, из-за ошибки.`);
        reject();
      })
    });
  }

  sendPutLikeCardRequest(cardId) {
    return new Promise((resolve, reject)=>{
      this._sendRequest(`/cards/likes/${cardId}`, 'PUT')
      .then((data)=>{
        resolve(data);
      })
      .catch(()=>{
        console.error(`Метод sendPutLikeCardRequest не получил данных, из-за ошибки.`);
        reject();
      })
    });
  }

  sendDeleteLikeCardRequest(cardId) {
    return new Promise((resolve, reject)=>{
      this._sendRequest(`/cards/likes/${cardId}`, 'DELETE')
      .then((data)=>{
        resolve(data);
      })
      .catch(()=>{
        console.error(`Метод sendDeleteLikeCardRequest не получил данных, из-за ошибки.`);
        reject();
      })
    });
  }

  sendUpdateUserAvatarRequest(avatarLink) {
    return new Promise((resolve, reject)=>{
      this._sendRequest('/users/me/avatar', 'PATCH', {
        avatar: avatarLink
      })
      .then((data)=>{
        resolve(data);
      })
      .catch(()=>{
        console.error(`Метод sendDeleteLikeCardRequest не получил данных, из-за ошибки.`);
        reject();
      })
    });
  }
}
