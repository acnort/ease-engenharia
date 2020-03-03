const express = require('express');
const router = express.Router();
const connection = require('../connection');
const authService = require('../services/auth-service');

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
    const query = 'SELECT * FROM item WHERE id = ?';

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

//Delete item by id
router.delete('/:id', authService.verifyToken, (req, res, next) => {
    connection.query('DELETE FROM item WHERE id = ?', [req.params.id], (error, rows, fields) => {
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

//Insert an items
router.post('/', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const query = 'INSERT INTO item(`id_floor`, `title`, `observation`, `rating`, `image`, `created`) VALUES (?, ?, ?, ?, ?, ?)';

    let image = '';

    connection.query(query, [post.floorId, post.title, post.observation, post.rating, image, Date.now()], (error, rows, fields) => {
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

//Update an items
router.put('/', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const query = 'UPDATE item SET `id_floor` = ?, `title` = ?, `observation` = ?, `rating` = ?, `image` = ?, `created` = ?) WHERE id = ?';

    let image = '';

    connection.query(query, [post.floorId, post.title, post.observation, post.rating, image, Date.now(), post.id], (error, rows, fields) => {
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