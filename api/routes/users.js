const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../connection');
const authService = require('../services/auth-service');

//Get all users
router.get('/', authService.verifyToken, (req, res, next) => {
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
router.get('/:id', authService.verifyToken, (req, res, next) => {
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
router.delete('/:id', authService.verifyToken, (req, res, next) => {
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
router.post('/', authService.verifyToken, (req, res, next) => {
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
router.put('/', authService.verifyToken, (req, res, next) => {
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

module.exports = router;