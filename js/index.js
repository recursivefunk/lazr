
import P from 'bluebird'
import component from 'stampit'

const Lazr = component()
  .init(function({ instance }) {
    this._path = instance.path || '/lazr/signature'
    this._ready = false
  })
  .methods({
    isReady() {
      return this._ready
    },

    send(data) {
      return new P((resolve, reject) => {
        if (!this._ready) {
          return reject(Error(`You must obtain a signature first`))
        }
        sendData(data, this._signedRequest, this._url)
          .then((url) => resolve(url))
          .catch((err) => reject(err))
      })
    },

    getSignature() {
      return new P((resolve, reject) => {
        getSignature(this._path)
          .then((result) => {
            this._signedRequest = result.signedRequest
            this._url = result.url
            this._ready = true
            resolve()
          })
          .catch((err) => reject(err))
      })
    }
  })

export default (opts) => Lazr.create(opts)


function sendData(data, signedRequest, url) {
  return new P((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200) {
          resolve(url)
        }
        else{
          reject(`An error has occured`)
        }
      }
    };
    xhr.send(data)
  })
}

function getSignature(path='/lazr/signature') {
  return new P((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', path)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr)
        } else {
          reject(xhr)
        }
      }
    }
    xhr.send(null)
  })
}
