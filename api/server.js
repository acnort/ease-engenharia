const express = require('express');
const bodyParser = require('body-parser');

//Routes - Containers
const loginRoutes = require('./routes/login');
const usersRoutes = require('./routes/users');
const constructionsRoutes = require('./routes/constructions');
const floorsRoutes = require('./routes/floors');
const itemsRoutes = require('./routes/items');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/login", loginRoutes);
app.use("/users", usersRoutes);
app.use("/constructions", constructionsRoutes);
app.use("/floors", floorsRoutes);
app.use("/items", itemsRoutes);

app.listen(3000, () => console.log('Express server is running at port number: 3000'));