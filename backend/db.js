// mysql db connection
// require mysql
import mysql from "mysql";

// create a connection to the mysql server

// var connection = mysql.createConnection({
//     host: 'remotemysql.com',
//     user: 'gVxeiDkwb2',
//     password: 'ATQJyTR5K6',
//     database: 'gVxeiDkwb2',
// });
// connection.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// });

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gVxeiDkwb2',
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
export default connection;
