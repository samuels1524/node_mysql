const express = require("express");
const connection = require("../config/mysql");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM clientes";

  connection.query(sql, (err, data) => {
    if (err) return res.status(400).json({ msj: `ocurrio un error: ${err}` });
    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ msj: "No hay clientes todavia" });
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM clientes WHERE id = ${id}`;

  connection.query(sql, (err, data) => {
    if (err) return res.status(400).json({ msj: `ocurrio un error: ${err}` });
    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ msj: `No existe un cliente con el id ${id}` });
    }
  });
});

router.post("/", (req, res) => {
  const clienteObj = { ...req.body };
  const sql = "INSERT INTO clientes SET ?";

  connection.query(sql, clienteObj, (err) => {
    if (err) return res.status(400).json({ msj: `ocurrio un error: ${err}` });
    res.status(200).json({ msj: "cliente creado!" });
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { email, first_name, last_name, avatar } = req.body;
  const sql = `UPDATE clientes SET email = '${email}', first_name='${first_name}', last_name='${last_name}', avatar='${avatar}' WHERE id =${id}`;

  connection.query(sql, (err, data) => {
    if (err) return res.status(400).json({ msj: `ocurrio un error: ${err}` });
    res.status(200).json({ msj: data });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM clientes WHERE id= ${id}`;

  connection.query(sql, (err) => {
    if (err) return res.status(400).json({ msj: `ocurrio un error: ${err}` });
    res.status(200).json({ msj: "cliente eliminado" });
  });
});

module.exports = router;
