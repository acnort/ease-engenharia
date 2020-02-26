const express = require('express');
const bodyParser = require('body-parser');

//Routes - Containers
const usersRoutes = require('./routes/users');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.listen(3000, () => console.log('Express server is running at port number: 3000'));