const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../connection');

app.post('/', (req, res, next) => {
    let post = req.body;

    connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [post.email, post.password], (error, rows, fields) =>{
        if(!error){
            if(rows.length > 0){
                var token = jwt.sign({ user: rows[0] }, 'secretkey');
                res.status(200).send({ auth: true, token: token });
            }
            else{
                res.status(500).send('Login inválido!');
            }
        }
        else{
            console.log(error);
            res.send(error);
            next();
        }
    });
});