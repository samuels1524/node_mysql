const express = require("express");
const connection = require("../config/mysql");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM usuarios";

  connection.query(sql, (err, data) => {
    if (err) return res.status(400).json({ msj: `ocurrio un error: ${err}` });
    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ msj: "No hay usuarios todavia" });
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM usuarios WHERE id = ${id}`;

  connection.query(sql, (err, data) => {
    if (err) return res.status(400).json({ msj: `ocurrio un error: ${err}` });
    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ msj: `No existe un usuario con el id ${id}` });
    }
  });
});

router.post("/", (req, res) => {
  const usuarioObj = { ...req.body };
  const sql = "INSERT INTO usuarios SET ?";

  connection.query(sql, usuarioObj, (err) => {
    if (err) return res.status(400).json({ msj: `ocurrio un error: ${err}` });
    res.status(200).json({ msj: "usuario creado!" });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, correo, password } = req.body;
  const sql = `UPDATE usuarios SET nombre = '${nombre}', apellido='${apellido}', correo='${correo}', password='${password}' WHERE id =${id}`;

  connection.query(sql, (err, data) => {
    if (err) return res.status(400).json({ msj: `ocurrio un error: ${err}` });
    res.status(200).json({ msj: data });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM usuarios WHERE id= ${id}`;

  connection.query(sql, (err) => {
    if (err) return res.status(400).json({ msj: `ocurrio un error: ${err}` });
    res.status(200).json({ msj: "usuario eliminado" });
  });
});

module.exports = router;
