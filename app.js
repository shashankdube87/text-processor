const app = require('express')()

global.absolutePath = __dirname
global.q = require('q')

const v1Routes = require('./API/v1Routes');
app.use((err, req, res, next) => {
    res.status(400).send({
        status: 400,
        message: 'Bad request',
        error: err
    })
})
app.use(v1Routes);


app.get('*', (req, res) => {
    res.status(404).send('404 PAGE not found >' + req.url + '<<')
})
let port = 3000
let server = app.listen(port)
server.timeout = 3600000

console.log('API is running on port ', port)