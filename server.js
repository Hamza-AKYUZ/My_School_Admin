const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const students = [
  {
    id: 1,
    first_name: "Ahmet",
    last_name: "Yılmaz",
    class: "8-A",
    numbers: 12345,
    seniority: 2,
    discontinuity: 1,
  },
  {
    id: 2,
    first_name: "Mehmet",
    last_name: "Demir",
    class: "9-B",
    numbers: 67890,
    seniority: 3,
    discontinuity: 0,
  },
  {
    id: 3,
    first_name: "Ayşe",
    last_name: "Kara",
    class: "10-C",
    numbers: 54321,
    seniority: 1,
    discontinuity: 2,
  },
  {
    id: 4,
    first_name: "Fatma",
    last_name: "Öztürk",
    class: "7-A",
    numbers: 98765,
    seniority: 2,
    discontinuity: 0,
  },
  {
    id: 5,
    first_name: "Ali",
    last_name: "Çelik",
    class: "8-B",
    numbers: 11223,
    seniority: 3,
    discontinuity: 1,
  },
  {
    id: 6,
    first_name: "Selin",
    last_name: "Koç",
    class: "9-C",
    numbers: 33445,
    seniority: 1,
    discontinuity: 0,
  },
  {
    id: 7,
    first_name: "Emre",
    last_name: "Aydın",
    class: "10-A",
    numbers: 55667,
    seniority: 3,
    discontinuity: 1,
  },
  {
    id: 8,
    first_name: "Zeynep",
    last_name: "Polat",
    class: "7-B",
    numbers: 77889,
    seniority: 2,
    discontinuity: 0,
  },
  {
    id: 9,
    first_name: "Burak",
    last_name: "Demirtaş",
    class: "8-C",
    numbers: 99001,
    seniority: 1,
    discontinuity: 1,
  },
  {
    id: 10,
    first_name: "Elif",
    last_name: "Yıldız",
    class: "9-A",
    numbers: 22334,
    seniority: 3,
    discontinuity: 2,
  },
];

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/rollcall", (req, res) => {
  res.render("rollcall", { students });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
