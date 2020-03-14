const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../connection');

const router = express.Router();

// Post user for login
router.post('/', (req, res, next) => {
  const post = req.body;

  connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [post.email, post.password], (error, rows) => {
    if (!error) {
      if (rows.length > 0) {
        const token = jwt.sign({ user: rows[0] }, 'secretkey');
        res.status(200).send({ auth: true, userId: rows[0].id, token });
      } else {
        res.status(500).send('Invalid login!');
      }
    } else {
      console.log(error);
      res.send(error);
      next();
    }
  });
});

module.exports = router;
