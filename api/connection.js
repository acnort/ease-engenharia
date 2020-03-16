const util = require('util');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'easeengenharia',
    multipleStatements: true
});

connection.connect(error => {
    if (!error) {
        console.log('DB connection succeded');
    } else {
        console.log('DB connection failed', JSON.stringify(error, undefined, 2));
    }
});

connection.query = util.promisify(connection.query).bind(connection);

module.exports = connection;