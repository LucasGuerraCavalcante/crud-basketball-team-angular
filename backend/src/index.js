const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const router = require('./routes')

const app = express();
const port = 3333;

app.use(express.json());
app.use(router);

app.set('port', process.env.port || port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '192.168.0.19',
    user: 'remoteConnectionMAC',
    password: 'Remote@123',
    database: 'teamapp'
});

connection.connect((err) => {
    if (err) throw err;

    console.log('Connected to database');

    app.listen(port, (err) => {
        if (err)  throw err;

        console.log(`Server running on port: ${port}`);
    });

});

global.connection = connection;

