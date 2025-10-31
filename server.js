const express = require("express");
const path = require("path");
const pool = require("./config/db.js");
const { fileURLToPath } = require("url");
const { dirname } = require("path");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function incrementDiscontinuity(studentId) {
  const conn = await pool.getConnection();
  try {
    // 1. Veriyi çek
    const [rows] = await conn.query(
      "SELECT discontinuity FROM users_students WHERE id = ?",
      [studentId]
    );
    if (rows.length === 0) {
      console.log("Öğrenci bulunamadı");
      return;
    }

    let currentdiscontinuity = rows[0].discontinuity;
    console.log("Mevcut discontinuity:", currentdiscontinuity);

    // 2. Arttır
    const newdiscontinuity = currentdiscontinuity + 1;

    // 3. Geri yaz
    await conn.query(
      "UPDATE users_students SET discontinuity = ? WHERE id = ?",
      [newdiscontinuity, studentId]
    );
    console.log("Yeni discontinuity:", newdiscontinuity);
  } catch (err) {
    console.error(err);
  } finally {
    conn.release();
  }
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/class-selection", (req, res) => {
  res.render("class-selection");
});

app.get("/rollcall", (req, res) => {
  res.render("rollcall", { students: [] });
});

app.post("/classSelect", async (req, res) => {
  const { classSelect } = req.body;
  const sql = "SELECT * FROM users_students WHERE class = ?";

  try {
    const [rows] = await pool.query(sql, [classSelect]);

    return res.render("rollcall", { students: rows });
  } catch (err) {
    console.error("Sorgu hatası:", err);
    return res.status(500).send("Veri çekilirken hata oluştu");
  }
});

app.post("/rollcall", (req, res) => {
  const selectedStudents = Array.isArray(req.body.student)
    ? req.body.student
    : [req.body.student];

  selectedStudents.forEach((selectedStudent) => {
    const num = Number(selectedStudent);
    if (!isNaN(num)) {
      incrementDiscontinuity(num);
    } else {
      console.log("Geçersiz sayı:", selectedStudent);
    }
  });

  res.send("Roll call processed");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
