const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../connection');

//Get all users
router.get('/', verifyToken, (req, res, next) => {
    connection.query('SELECT * FROM user', (error, rows, fields) => {
        if (!error) {
            res.status(200).send(rows);
        }
        else {
            console.log(error);
            res.send(error);
            next();
        }
    })
});

//Get user by id
router.get('/:id', verifyToken, (req, res, next) => {
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.status(200).send(rows);
        }
        else {
            console.log(error);
            res.send(error);
            next();
        }
    });
});

//Delete user by id
router.delete('/:id', verifyToken, (req, res, next) => {
    connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.status(200).send('Deleted successfully.');
        }
        else {
            console.log(error);
            res.status(500).send(error);
            next();
        }
    });
});

//Insert an user
router.post('/', verifyToken, (req, res, next) => {
    let post = req.body;

    connection.query('CALL user_add_or_edit(?, ?, ?, ?, ?, ?)', [0, post.name, post.email, post.password, null, post.admin], (error, rows, fields) => {
        if (!error) {
            res.status(201).send(rows[0][0]);
        }
        else {
            console.log(error);
            res.status(500).send(error);
            next();
        }
    });
});

//Update an user
router.put('/', verifyToken, (req, res, next) => {
    let post = req.body;

    connection.query('CALL user_add_or_edit(?, ?, ?, ?, ?, ?)', [post.id, post.name, post.email, post.password, null, post.admin], (error, rows, fields) => {
        if (!error) {
            res.status(200).send('Updated successfully');
        }
        else {
            console.log(error);
            res.status(500).send(error);
            next();
        }
    });
});

//FORMAT OF TOKEN
//Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
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

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        req.token = token;
        next();
    });
}

module.exports = router;