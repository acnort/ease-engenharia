const express = require('express');
const router = express.Router();
const connection = require('../connection');
const authService = require('../services/auth-service');
const dateUtils = require('../utils/date-utils');

//Get floors by construction
router.get('/construction/:id', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM floor WHERE id_construction = ?';

    connection.query(query, [req.params.id], (error, rows, fields) => {
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

//Insert an floors
router.post('/', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const created = dateUtils.getCurrentDate();
    const query = 'INSERT INTO floor(`id_construction`, `title`, `created`) VALUES (?, ?, ?)';

    connection.query(query, [post.constructionId, post.title, created], (error, rows, fields) => {
        if (!error) {
            res.status(201).send({ id: rows.insertId });
        }
        else {
            console.log(error);
            res.status(500).send(error);
            next();
        }
    });
});

//Update an floors
router.put('/', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const updated = dateUtils.getCurrentDate();
    const query = 'UPDATE floor SET `title` = ?, `updated` = ? WHERE id = ?';

    connection.query(query, [post.title, updated, post.id], (error, rows, fields) => {
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