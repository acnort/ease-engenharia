const express = require('express');
const router = express.Router();
const connection = require('../connection');
const authService = require('../services/auth-service');

//Get floors by construction
router.get('/construction/:id', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM floor WHERE constructionId = ?';

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

//Get floor by id
router.get('/:id', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM floor WHERE id = ?';

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

//Delete floor by id
router.delete('/:id', authService.verifyToken, (req, res, next) => {
    connection.query('DELETE FROM floor WHERE id = ?', [req.params.id], (error, rows, fields) => {
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