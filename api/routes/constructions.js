const express = require('express');
const router = express.Router();
const connection = require('../connection');
const authService = require('../services/auth-service');
const dateUtils = require('../utils/date-utils');

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

//Insert an constructions
router.post('/', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const created = dateUtils.getCurrentDate();
    const query = 'INSERT INTO construction(`title`, `client_name`, `created`) VALUES (?, ?, ?)';

    connection.query(query, [post.title, post.clientName, created], (error, rows, fields) => {
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

//Update an constructions
router.put('/', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const updated = dateUtils.getCurrentDate();
    const query = 'UPDATE construction SET `title` = ?, `client_name` = ?, `updated` = ? WHERE id = ?';

    if(!post.id){
        return res.status(500).send({ message: "Id undefined" });
    }

    connection.query(query, [post.title, post.clientName, updated, post.id], (error, rows, fields) => {
        if (!error) {
            res.status(200).send({ message: 'Updated successfully' });
        }
        else {
            console.log(error);
            res.status(500).send(error);
            next();
        }
    });
});

module.exports = router;