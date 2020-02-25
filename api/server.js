const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'easi',
    database: 'easiEngenharia',
    multipleStatements: true
});

connection.connect(error => {
    if(!error){
        console.log('DB connection succeded');
    }
    else{
        console.log('DB connection failed', JSON.stringify(error, undefined, 2));
    }
});

app.listen(3000, () => console.log('Express server is running at port number: 3000'));

//Get all users
app.get('/users', (req, res) =>{
    connection.query('SELECT * FROM user', (error, rows, fields) =>{
        if(!error){
            res.send(rows);
        }
        else{
            console.log(error);
        }
    })
});

//Get user by id
app.get('/users/:id', (req, res) =>{
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (error, rows, fields) =>{
        if(!error){
            res.send(rows);
        }
        else{
            console.log(error);
        }
    })
});

//Delete user by id
app.delete('/users/:id', (req, res) =>{
    connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (error, rows, fields) =>{
        if(!error){
            res.send('Deleted successfully.');
        }
        else{
            console.log(error);
        }
    })
});

//Insert an user
app.post('/users', (req, res) =>{
    let post = req.body;
    
    connection.query('CALL user_add_or_edit(?, ?, ?, ?, ?, ?, ?)', [0, post.name, post.email, post.password, null, post.admin, 0], (error, rows, fields) =>{
        if(!error){
            res.send(rows);
        }
        else{
            console.log(error);
        }
    })
});