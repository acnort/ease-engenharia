const express = require('express');
const router = express.Router();
const connection = require('../connection');

//Get items by floorId
router.get('/floor/:id', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM item WHERE florId = ?';

    connection.query(query, (error, rows, fields) => {
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

//Get item by id
router.get('/:id', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM user WHERE id = ?';

    connection.query(query, [req.params.id], (error, rows, fields) => {
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