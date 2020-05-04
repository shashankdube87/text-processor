let TextDocument = require("../../services/fetchFilefromURL")
let TextService = require('../../services/textService')

global.q = require('q')

class textProcessor {
  getSynAndPos(req, res) {
    try {
      TextDocument.getTopOccurencesWords(10)
        .then(data => {
          var promises = []
          for (var id in data) {
            var callProcessor = TextService.process(data[id])
            promises.push(callProcessor)
          }
          return promises
        })
        .then(promises => q.all(promises))
        .then(function (resData) {
          res.status(200).send(resData)
        })
        .catch((error) => {
          res.status(400).send(error)
        })
    } catch (e) {
      console.log("Error in textProcessor ",e);
      res.status(500).send({
        status: 500,
        message: 'Internal server error',
        error: {
          'message': 'something went wrong...'
        }
      })
    }
  }
}
module.exports = new textProcessor()