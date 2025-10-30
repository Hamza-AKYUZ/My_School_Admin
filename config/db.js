import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mami6161",
  database: "my_school_admin",
});

console.log("✅ MySQL bağlantısı başarılı!");

export default db;
