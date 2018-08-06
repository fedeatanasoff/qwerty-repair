const express = require("express");
const router = express.Router();
const fs = require("fs");

let json;
fs.readFile("json/data.json", "utf-8", (err, data) => {
  if (err) throw new Error("Ha ocurrido un error al cargar la informacion");

  json = JSON.parse(data);
  console.log(json.title);
});

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "QWERTY Repair", json: json });
});

module.exports = router;
