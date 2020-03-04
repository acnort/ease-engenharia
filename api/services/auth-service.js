const jwt = require('jsonwebtoken');

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader === 'undefined') {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }

    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    jwt.verify(token, 'secretkey', function (error, decoded) {
        if (error) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        req.userId = decoded.id;
        req.token = token;
        next();
    });
}

module.exports.verifyToken = verifyToken;