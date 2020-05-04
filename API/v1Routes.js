const express = require('express')
const router = express.Router()

// GET API
router.get('/v1/text/process', require('../API/TextProcess/textProcessor').getSynAndPos)

module.exports = router