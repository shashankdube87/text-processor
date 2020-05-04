global.q = require('q')
let yandexService = require('./yandexService')

class ProcessAPIData {
    process(data) {
        let deferred = q.defer()
        try {
            yandexService.callService(data.word)
                .then((dis) => {
                    var customeData = {}
                    customeData.Word = data.word
                    customeData.count = data.value
                    let Pos = []
                    let Synonyms = []
                    dis.def.forEach(element => {
                        Pos.push(element.pos)
                        element.tr.forEach(trelement => {
                            if (trelement.syn) {
                                Synonyms.push(trelement.syn)
                            }
                        })
                    })
                    customeData.Pos = Pos
                    customeData.Synonyms = Synonyms
                    deferred.resolve(customeData)
                })
                .catch((error) => {
                    deferred.reject(error)
                })
        } catch (error) {
            console.log("Error in text service ",error)
            deferred.reject(error)
        }
        return deferred.promise
    }
}

module.exports = new ProcessAPIData()