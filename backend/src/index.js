const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// const routes = require('./routes')

const app = express();
const port = 3333;

app.use(express.json());
// app.use(routes);

const db = mysql.createConnection({
    host: '192.168.0.19',
    user: 'remoteConnectionMAC',
    password: 'Remote@123',
    database: 'teamapp'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;

app.set('port', process.env.port || port);

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});