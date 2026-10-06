import mysql from "mysql2/promise";

const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "conex"
});

export { con };