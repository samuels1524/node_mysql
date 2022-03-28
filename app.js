require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const app = express();
const usuarios = require("./routes/usuarios");
const clientes = require("./routes/clientes");

app.use(express.json());
app.use(cors());

//Rutas
app.use("/usuarios", usuarios);
app.use("/clientes", clientes);

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
