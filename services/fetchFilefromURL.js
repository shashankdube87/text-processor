global.q = require('q')
let httpService = require('../services/httpService')
let config = require('./config/config.json')


class FetchFileFromURL {
    readFile() {
        let deferred = q.defer()
        try {
            let url = config.fileURL
            httpService.httpGet(url, {})
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


    getSortedArray(text, topCount) {
        var objArr = []
        for (var i in text) {
            objArr.push({
                word: i,
                value: text[i]
            })
        }
        return objArr.sort((a, b) => {
            return b.value - a.value
        }).slice(0, topCount)
    };

    countWords(stats, word) {
        if (stats.hasOwnProperty(word)) {
            stats[word] = stats[word] + 1
        } else {
            stats[word] = 1
        }
        return stats
    }
    getTopOccurencesWords(topCount) {
        let deferred = q.defer()
        this.readFile()
            .then((data) => {
                let pattern = /\w+/g
                let txtData = data.toString()

                const matchedWords = txtData.match(pattern)
                deferred.resolve(this.getSortedArray(matchedWords.reduce(this.countWords, {}), topCount))

            })
            .catch((error) => {
                console.log("Error in reading file from URL ", error)
                deferred.reject(error)
            })
        return deferred.promise;
    }
}

module.exports = new FetchFileFromURL()