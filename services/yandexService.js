let httpService = require('./httpService')
let config = require('./config/config.json')
class Yandex {
  callService(textToSearch) {
    let deferred = q.defer()
    try {
      let url = config.yandexAPI.dicServiceEndPoint + encodeURIComponent(textToSearch.toString())
      httpService.httpGet(url.replace('apikey', config.yandexAPI.apiKey), {})
        .then((data) => {
          deferred.resolve(data)
        })
        .catch((error) => {
          deferred.reject(error)
        })
    } catch (error) {
      deferred.reject(error)
    }
    return deferred.promise
  }
}

module.exports = new Yandex()