const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mami6161",
  database: "my_school_admin",
});

module.exports = pool;
