const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

// Routes - Containers
const loginRoutes = require('./routes/login');
const usersRoutes = require('./routes/users');
const constructionsRoutes = require('./routes/constructions');


const app = express();

// app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', loginRoutes);
app.use('/users', usersRoutes);
app.use('/constructions', constructionsRoutes);

app.listen(3000, () => console.log('Express server is running at port number: 3000'));
