let request = require('request')
class HttpService {
  httpGet (url, headers = {}) {
    let deferred = q.defer()
    try {
      let options = {
        method: 'GET',
        url: url,
        headers: headers,
        json: true
      }
      request(options, (error, response, body) => {
        if (error) {
          deferred.reject(error)
        } else {
          deferred.resolve(body)
        }
      })
    } catch (error) {
      deferred.reject(error)
    }
    return deferred.promise
  }
}
module.exports = new HttpService()
