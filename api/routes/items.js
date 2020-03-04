const express = require('express');
const router = express.Router();
const connection = require('../connection');
const authService = require('../services/auth-service');
const dateUtils = require('../utils/date-utils');

//Get items by floorId
router.get('/floor/:id', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM item WHERE id_floor = ?';

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
    const created = dateUtils.getCurrentDate();
    const query = 'INSERT INTO item(`id_floor`, `title`, `observation`, `rating`, `image`, `created`) VALUES (?, ?, ?, ?, ?, ?)';

    let image = '';

    connection.query(query, [post.floorId, post.title, post.observation, post.rating, image, created], (error, rows, fields) => {
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

//Update an items
router.put('/', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const updated = dateUtils.getCurrentDate();
    const query = 'UPDATE item SET `title` = ?, `observation` = ?, `rating` = ?, `image` = ?, `updated` = ? WHERE id = ?';

    if(!post.id){
        return res.status(500).send({ message: "Id undefined" });
    }

    connection.query(query, [post.title, post.observation, post.rating, post.image, updated, post.id], (error, rows, fields) => {
        if (!error) {
            console.log(rows);
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