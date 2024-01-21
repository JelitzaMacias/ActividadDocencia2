const express = require("express");
const app = express();
const port = 3000;
const client = require("./connection.js");
app.use(express.json());

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.post("/seleccionar", (req, res) => {
  client
    .query("SELECT * FROM esq_datos_personales.persona")
    .then((result) => res.json({ data: result.rows }));
});

app.post("/insertar", async (req, res) => {
  const { cedula, nombres, apellidos, fecha_nacimiento, telefono, direccion } =
    req.body;

  await client
    .query(
      "INSERT INTO esq_datos_personales.persona(cedula, nombres, apellidos, fecha_nacimiento, telefono, direccion) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [cedula, nombres, apellidos, fecha_nacimiento, telefono, direccion]
    )
    .then((result) => res.json({ data: result.rows }));
});

app.post("/where", (req, res) => {
  const { idpersona } = req.body;
  pool
    .query("SELECT * FROM esq_datos_personales.persona WHERE idpersona = $1", [
      idpersona,
    ])
    .then((result) => res.json({ data: result.rows }));
});

app.post("/eliminar", (req, res) => {
  const { idpersona } = req.body;
  client
    .query(
      "DELETE FROM esq_datos_personales.persona WHERE idpersona = $1 RETURNING *",
      [idpersona]
    )
    .then((result) =>
      res.json({
        message: "Datos eliminados correctamente",
        data: result.rows[0],
      })
    );
});
