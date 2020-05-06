const express = require('express');
const connection = require('../connection');
const authService = require('../services/auth-service');
const dateUtils = require('../utils/date-utils')

const router = express.Router();

// Get all users
router.get('/', authService.verifyToken, (req, res, next) => {
  connection.query('SELECT * FROM user', (error, rows) => {
    if (!error) {
      res.status(200).send(rows);
    } else {
      console.log(error);
      res.send(error);
      next();
    }
  })
});

// Get user by id
router.get('/:id', authService.verifyToken, (req, res, next) => {
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (error, rows) => {
    if (!error) {
      res.status(200).send(rows);
    } else {
      console.log(error);
      res.send(error);
      next();
    }
  });
});

router.delete('/:id', authService.verifyToken, (req, res, next) => {
  connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (error, rows, fields) => {
    if (!error) {
      res.status(200).send('Deleted successfully.');
    } else {
      console.log(error);
      res.status(500).send(error);
      next();
    }
  });
});

// Insert an user
router.post('/', authService.verifyToken, (req, res, next) => {
  const post = req.body;
  const created = dateUtils.getCurrentDate();
  const query = 'INSERT INTO user(`name`, `email`, `password`, `lastAccess`, `admin`, `created`) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(query, [post.name, post.email, post.password, null, post.admin, created], (error, rows) => {
    if (!error) {
      res.status(201).send(rows[0][0]);
    } else {
      console.log(error);
      res.status(500).send(error);
      next();
    }
  });
});

// Update an user
router.put('/:id', authService.verifyToken, (req, res, next) => {
  const post = req.body;
  const updated = dateUtils.getCurrentDate();
  const query = 'UPDATE user SET `name` = ?, `email` = ?, `password` = ?, `lastAccess` = ?, `admin` = ?, `updated` = ?  WHERE id = ?';

  connection.query(query, [post.name, post.email, post.password, null, post.admin, updated, req.params.id], (error) => {
    if (!error) {
      res.status(200).send('Updated successfully');
    } else {
      console.log(error);
      res.status(500).send(error);
      next();
    }
  });
});

module.exports = router;
