const express = require("express");
const router = express.Router();
const fs = require("fs");
const nodemailer = require("nodemailer");

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

router.post("/mail", (req, res, next) => {
  let transporte = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "qwerty.repair.pc@gmail.com",
      pass: "P1a2s3s4"
    }
  });

  let mailOptions = {
    from: "QWERTY Repair <qwerty.repair.pc@gmail.com>",
    to: "qwerty.repair.pc@gmail.com",
    subject: "Has recibido un mensaje desde QWERTY Repair",
    text: `Has recibido un nuevo mensaje de:  
      - Nombre: ${req.body.name} 
      - Email: ${req.body.email}
      - Asunto: ${req.body.subject} 
      - Mensaje: ${req.body.message}`,
    html: `<p>Has recibido un nuevo mensaje</p>
              <ul><li> Nombre ${req.body.name}</li> 
              <li>Email: ${req.body.email} </li>
              <li>Asunto: ${req.body.subject} </li>
              <li>Mensaje: ${req.body.message}</li></ul>`
  };

  transporte.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      // res.render("error", { msg: "error al enviar el formulario" });
    } else {
      console.log("mensaje enviado " + info.response);
      res.send(mailOptions.text);
      // res.render("enviado", { msg: "el mensaje fue enviado" });
    }

    //res.redirect("/");
  });
});

module.exports = router;
