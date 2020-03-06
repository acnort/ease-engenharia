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
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    })
});

//Get construction by id
router.get('/:id', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT c.*, f.id AS floorId, f.title AS floorTitle  FROM construction AS c LEFT JOIN floor AS f ON f.constructionId = c.id WHERE c.id = ?';

    connection.query(query, [req.params.id], (error, rows, fields) => {
        if (!error) {
            if(rows.length > 0){
                const construction = {
                    id: rows[0].id,
                    title: rows[0].title,
                    clientName: rows[0].clientName,
                    created: rows[0].created,
                    updated: rows[0].updated,
                    floors: []
                };

                rows.forEach(r => {
                    if(r.floorId){
                        construction.floors.push({
                            id: r.floorId,
                            title: r.floorTitle
                        });
                    }
                });

                res.status(200).send(construction);
            }
            else{
                res.status(200).send(rows);
            }
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    });
});

//Get floors by construction
router.get('/:id/floors', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM floor WHERE constructionId = ?';

    connection.query(query, [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.status(200).send(rows);
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    })
});

//Get floor by id
router.get('/:id/floors/:floorId', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM floor WHERE id = ?';

    connection.query(query, [req.params.floorId], (error, rows, fields) => {
        if (!error) {
            res.status(200).send(rows);
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    });
});

//Get item by id
router.get('/:id/floors/:floorId/items/:itemId', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM item WHERE id = ?';

    connection.query(query, [req.params.itemId], (error, rows, fields) => {
        if (!error) {
            res.status(200).send(rows);
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    });
});

//Get items by floorId
router.get('/:id/floors/:floorId/items', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM item WHERE floorId = ?';

    connection.query(query, [req.params.floorId], (error, rows, fields) => {
        if (!error) {
            res.status(200).send(rows);
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    })
});

//Delete construction by id
router.delete('/:id', authService.verifyToken, (req, res, next) => {
    connection.query('DELETE FROM construction WHERE id = ?', [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.status(200).send('Deleted successfully.');
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    });
});

//Delete floor by id
router.delete('/:id/floors/:floorId', authService.verifyToken, (req, res, next) => {
    connection.query('DELETE FROM floor WHERE id = ?', [req.params.floorId], (error, rows, fields) => {
        if (!error) {
            res.status(200).send('Deleted successfully.');
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    });
});

//Delete item by id
router.delete('/:id/floors/:floorId/items/:itemId', authService.verifyToken, (req, res, next) => {
    connection.query('DELETE FROM item WHERE id = ?', [req.params.itemId], (error, rows, fields) => {
        if (!error) {
            res.status(200).send('Deleted successfully.');
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    });
});

//Insert an constructions
router.post('/', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const created = dateUtils.getCurrentDate();
    const query = 'INSERT INTO construction(`title`, `clientName`, `created`) VALUES (?, ?, ?)';

    connection.query(query, [post.title, post.clientName, created], (error, rows, fields) => {
        if (!error) {
            res.status(201).send({ id: rows.insertId });
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    });
});

//Insert an floors
router.post('/:id/floors', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const created = dateUtils.getCurrentDate();
    const query = 'INSERT INTO floor(`constructionId`, `title`, `created`) VALUES (?, ?, ?)';

    connection.query(query, [req.params.id, post.title, created], (error, rows, fields) => {
        if (!error) {
            res.status(201).send({ id: rows.insertId });
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    });
});

//Insert an items
router.post('/:id/floors/:floorId/items', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const created = dateUtils.getCurrentDate();
    const query = 'INSERT INTO item(`floorId`, `title`, `observation`, `rating`, `image`, `created`) VALUES (?, ?, ?, ?, ?, ?)';

    let image = '';

    connection.query(query, [req.params.floorId, post.title, post.observation, post.rating, image, created], (error, rows, fields) => {
        if (!error) {
            res.status(201).send({ id: rows.insertId });
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    });
});

//Update an constructions
router.put('/:id', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const updated = dateUtils.getCurrentDate();
    const query = 'UPDATE construction SET `title` = ?, `clientName` = ?, `updated` = ? WHERE id = ?';

    if (!req.params.id) {
        return res.status(500).send({ message: "Id undefined" });
    }

    connection.query(query, [post.title, post.clientName, updated, req.params.id], (error, rows, fields) => {
        if (!error) {
            res.status(200).send({ message: 'Updated successfully' });
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    });
});

//Update an floors
router.put('/:id/floors/:floorId', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const updated = dateUtils.getCurrentDate();
    const query = 'UPDATE floor SET `title` = ?, `updated` = ? WHERE id = ?';

    if (!req.params.floorId) {
        return res.status(500).send({ message: "Id undefined" });
    }

    connection.query(query, [post.title, updated, req.params.floorId], (error, rows, fields) => {
        if (!error) {
            res.status(200).send({ message: 'Updated successfully' });
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    });
});

//Update an items
router.put('/:id/floors/:floorId/items/:itemId', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const updated = dateUtils.getCurrentDate();
    const query = 'UPDATE item SET `title` = ?, `observation` = ?, `rating` = ?, `image` = ?, `updated` = ? WHERE id = ?';

    if (!req.params.itemId) {
        return res.status(500).send({ message: "Id undefined" });
    }

    connection.query(query, [post.title, post.observation, post.rating, post.image, updated, req.params.itemId], (error, rows, fields) => {
        if (!error) {
            res.status(200).send({ message: 'Updated successfully' });
        }
        else {
            res.status(500).send({ "message": error.sqlMessage });
            next();
        }
    });
});

module.exports = router;