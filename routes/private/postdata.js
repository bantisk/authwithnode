const router = require('express').Router();
const verifytoken = require('../verifyToken');

router.get('/', (req, res) => {
    res.status(200).send({
        post: {
            title: 'First post',
            data: 'posted something'
        }
    })
})

module.exports = router;