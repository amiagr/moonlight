const express = require('express')
const app = express()
const router = express.Router()

router.post('/', (req, res, next) => {
    res.render('home')
})

module.exports = router;