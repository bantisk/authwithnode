const jwt = require('jsonwebtoken');

module.export = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        res.status(400).send('Access Denied, Login to post something');
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};