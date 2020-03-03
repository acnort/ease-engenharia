const express = require('express');
const router = express.Router();
const connection = require('../connection');
const authService = require('../services/auth-service');

//Get all constructions
router.get('/', authService.verifyToken, (req, res, next) => {
    connection.query('SELECT * FROM construction', (error, rows, fields) => {
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

//Get construction by id
router.get('/:id', authService.verifyToken, (req, res, next) => {
    connection.query('SELECT * FROM construction WHERE id = ?', [req.params.id], (error, rows, fields) => {
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

//Delete construction by id
router.delete('/:id', authService.verifyToken, (req, res, next) => {
    connection.query('DELETE FROM construction WHERE id = ?', [req.params.id], (error, rows, fields) => {
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

module.exports = router;