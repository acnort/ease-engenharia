const mysql = require('mysql2');

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

module.exports = connection;