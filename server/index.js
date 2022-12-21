const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

//use express static folder
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./public/images/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({
  storage: storage,
});

app.post("/upload", upload.array("multi-files"), (req, res) => { 
  const files = req.files;
  const file = req.file;
  console.log("files",files);
  console.log("file",file);

  if (!req.files) {
    console.log("No file upload");
  } else {
    console.log(req.files[0].filename);
    files.map((d, i) => {
        console.log('*******************',d.filename);
      var imgsrc = "http://127.0.0.1:3000/images/" + d.filename;
      var insertData = "INSERT INTO users_file(file_src)VALUES(?)";
    //   if (d.filename) {
        console.log("dbquery");
        db.query(insertData, [imgsrc], (err, result) => {
          if (err) throw err;
          res.status(200).json({
            success: true,
            message: "successfully inserted into database",
            result,
          });
        });
    //   }
    });
  }
});

app.get("/api/get", (req, res) => {
  const sqlInsert = "select * from users";
  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert = "INSERT INTO users (movieName, movieReview) VALUES(?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
  });
});

app.delete("/api/delete/:movieName", (req, res) => {
  const movieName = req.params.movieName;

  const sqlDelete = " DELETE FROM users WHERE movieName=?";
  db.query(sqlDelete, movieName, (err, result) => {
    console.log(result);
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;

  const sqlUpdate = "UPDATE users SET movieReview=? WHERE movieName=?";
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(3001, () => {
  console.log("running on port : 3001");
});
