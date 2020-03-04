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

//Insert an constructions
router.post('/', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const query = 'INSERT INTO construction(`title`, `client_name`, `created`) VALUES (?, ?, ?)';
    
    const data = new Date();
    const created = new Date(data.valueOf() - data.getTimezoneOffset() * 60000).toISOString().slice(0, 19).replace('T', ' ');

    connection.query(query, [post.title, post.client_name, created], (error, rows, fields) => {
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
    const query = 'UPDATE construction SET `title` = ?, `client_name` = ? WHERE id = ?';

    connection.query(query, [post.title, post.client_name, post.id], (error, rows, fields) => {
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