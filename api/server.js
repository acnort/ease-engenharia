const express = require('express');
const bodyParser = require('body-parser');

//Routes - Containers
const loginRoutes = require('./routes/login');
const usersRoutes = require('./routes/users');
const itemsRoutes = require('./routes/items');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/login", loginRoutes);
app.use("/users", usersRoutes);
app.use("/items", itemsRoutes);

app.listen(3000, () => console.log('Express server is running at port number: 3000'));