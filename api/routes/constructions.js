const express = require('express');
const router = express.Router();
const path = require('path');
const connection = require('../connection');
const authService = require('../services/auth-service');
const dateUtils = require('../utils/date-utils');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');

const storage = new Storage({
    projectId: "ease-app-49229",
    keyFilename: path.join(__dirname, "../ease-app-49229-firebase-adminsdk-ese96-90b58830d3.json")
});

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

const bucket = storage.bucket('gs://ease-app-49229.appspot.com/');

//#region GET

//Get all constructions
router.get('/', authService.verifyToken, (req, res, next) => {
    connection.query('SELECT * FROM construction', (error, rows, fields) => {
        if (!error) {
            res.status(200).send(rows);
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    })
});

//Get construction by id
router.get('/:id', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT c.*, f.id AS floorId, f.title AS floorTitle  FROM construction AS c LEFT JOIN floor AS f ON f.constructionId = c.id WHERE c.id = ?';

    connection.query(query, [req.params.id], (error, rows, fields) => {
        if (!error) {
            if (rows.length > 0) {
                const construction = {
                    id: rows[0].id,
                    title: rows[0].title,
                    clientName: rows[0].clientName,
                    created: rows[0].created,
                    updated: rows[0].updated,
                    floors: []
                };

                rows.forEach(r => {
                    if (r.floorId) {
                        construction.floors.push({
                            id: r.floorId,
                            title: r.floorTitle
                        });
                    }
                });

                res.status(200).send(construction);
            }
            else {
                res.status(200).send(rows);
            }
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    });
});

//Get reports by construction
router.get('/:id/reports', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM report WHERE constructionId = ?';

    connection.query(query, [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.status(200).send(rows);
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    })
});

//Get report by id
router.get('/:id/reports/:reportId', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM report WHERE id = ?';

    connection.query(query, [req.params.reportId], (error, rows, fields) => {
        if (!error) {
            if (rows.length > 0) {
                res.status(200).send(rows[0]);
            }
            else {
                res.status(200).send(rows);
            }
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    })
});

//Get floors by construction
router.get('/:id/floors', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM floor WHERE constructionId = ?';

    connection.query(query, [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.status(200).send(rows);
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    })
});

//Get floor by id
router.get('/:id/floors/:floorId', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT f.*, i.id AS itemId, i.title AS itemTitle, i.observation, i.rating, i.image FROM floor AS f LEFT JOIN item AS i ON i.floorId = f.id WHERE f.id = 1;';

    connection.query(query, [req.params.floorId], (error, rows, fields) => {
        if (!error) {
            if (rows.length > 0) {
                const floor = {
                    id: rows[0].id,
                    constructionId: rows[0].constructionId,
                    title: rows[0].title,
                    created: rows[0].created,
                    updated: rows[0].updated,
                    items: []
                };

                rows.forEach(r => {
                    if (r.itemId) {
                        floor.items.push({
                            id: r.itemId,
                            title: r.itemTitle,
                            observation: r.observation,
                            rating: r.rating,
                            image: r.image
                        });
                    }
                });

                res.status(200).send(floor);
            }
            else {
                res.status(200).send(rows);
            }
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    });
});

//Get items by floor
router.get('/:id/floors/:floorId/items', authService.verifyToken, (req, res, next) => {
    let query = 'SELECT * FROM item WHERE floorId = ?';
    let params = [req.params.floorId];

    if (req.query.search) {
        query = 'SELECT title FROM item WHERE floorId = ? AND title LIKE ? GROUP BY title'
        params.push('%' + req.query.search + '%');
    }

    if (req.query.title) {
        query = 'SELECT * FROM item WHERE floorId = ? AND title = ? ORDER BY id DESC LIMIT 1'
        params.push(req.query.title);
    }

    connection.query(query, params, (error, rows, fields) => {
        if (!error) {
            res.status(200).send(rows);
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    })
});

//Get item by id
router.get('/:id/floors/:floorId/items/:itemId', authService.verifyToken, (req, res, next) => {
    const query = 'SELECT * FROM item WHERE id = ?';

    connection.query(query, [req.params.itemId], (error, rows, fields) => {
        if (!error) {
            if (rows.length > 0) {
                res.status(200).send(rows[0]);
            }
            else {
                res.status(200).send(rows);
            }
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    });
});

//#endregion GET

//#region DELETE

//Delete construction by id
router.delete('/:id', authService.verifyToken, (req, res, next) => {
    connection.query('DELETE FROM construction WHERE id = ?', [req.params.id], (error, rows, fields) => {
        if (!error) {
            res.status(200).send({ message: 'Deleted successfully.' });
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    });
});

//Delete floor by id
router.delete('/:id/reports/:reportId', authService.verifyToken, (req, res, next) => {
    connection.query('DELETE FROM report WHERE id = ?', [req.params.reportId], (error, rows, fields) => {
        if (!error) {
            res.status(200).send({ message: 'Deleted successfully.' });
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    });
});

//Delete floor by id
router.delete('/:id/floors/:floorId', authService.verifyToken, (req, res, next) => {
    connection.query('DELETE FROM floor WHERE id = ?', [req.params.floorId], (error, rows, fields) => {
        if (!error) {
            res.status(200).send({ message: 'Deleted successfully.' });
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    });
});

//Delete item by id
router.delete('/:id/floors/:floorId/items/:itemId', authService.verifyToken, (req, res, next) => {
    connection.query('DELETE FROM item WHERE id = ?', [req.params.itemId], (error, rows, fields) => {
        if (!error) {
            res.status(200).send({ message: 'Deleted successfully.' });
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    });
});

//#endregion DELETE

//#region POST

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
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    });
});

//Insert an reports
router.post('/:id/reports', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const created = dateUtils.getCurrentDate();
    const query = 'INSERT INTO report(`constructionId`, `serviceNumber`, `pdf`, `word`, `created`) VALUES (?, ?, ?, ?, ?)';

    connection.query(query, [req.params.id, post.serviceNumber, post.pdf, post.word, created], (error, rows, fields) => {
        if (!error) {
            res.status(201).send({ id: rows.insertId });
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
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
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    });
});

//Insert an items
router.post('/:id/floors/:floorId/items', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const created = dateUtils.getCurrentDate();
    const query = 'INSERT INTO item(`floorId`, `title`, `observation`, `rating`, `image`, `created`) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(query, [req.params.floorId, post.title, post.observation, post.rating, post.image, created], (error, rows, fields) => {
        if (!error) {
            res.status(201).send({ id: rows.insertId });
        }
        else {
            res.status(500).send({ message: error.sqlMessage });
            next();
        }
    });
});

//#endregion POST

//#region PUT

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

//Update an reports
router.put('/:id/reports/:reportId', authService.verifyToken, (req, res, next) => {
    const post = req.body;
    const updated = dateUtils.getCurrentDate();
    const query = 'UPDATE report SET `serviceNumber` = ?, `pdf` = ?, `word` = ?, `updated` = ? WHERE id = ?';

    if (!req.params.reportId) {
        return res.status(500).send({ message: "Id undefined" });
    }

    connection.query(query, [post.serviceNumber, post.pdf, post.word, updated, req.params.reportId], (error, rows, fields) => {
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

//#endregion PUT

/**
 * Adding new file to the storage
 */
router.post('/upload', multer.single('file'), (req, res) => {
    let file = req.file;
    let path = req.body.path;

    if (file) {
        uploadImageToStorage(file, path).then((success) => {
            res.status(200).send({
                url: success
            });
        }).catch((error) => {
            console.error(error);
        });
    }
});

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 * @param {string} path
 */
const uploadImageToStorage = (file, path) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No file');
        }

        let newFileName = `${Date.now()}_${file.originalname}`;
        let fileUpload = bucket.file(newFileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            console.log(error.response);
            reject('Something is wrong! Unable to upload at the moment.');
        });

        blobStream.on('finish', () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${(encodeURI(fileUpload.name)).replace("\/", "%2F")}?alt=media&token=7faf8573-7b8b-46c2-b90e-e3693cf19e8e`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
}

module.exports = router;