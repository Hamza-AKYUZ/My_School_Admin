import express from "express";
import path from "path";
import db from "./config/db.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
   
    const [rows] = await db.query(sql, [classSelect]);

  
    return res.render("rollcall", { students: rows });
  } catch (err) {
    console.error("Sorgu hatası:", err);
    return res.status(500).send("Veri çekilirken hata oluştu");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
