const express = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  const usuario = await Usuario.findOne({ correo });
  if (!usuario) {
    return res.status(400).json({ error: "Usuario no encontrado" });
  }

  const validPassword = await bcrypt.compare(password, usuario.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Contraseña incorrecta" });
  }

  const token = jwt.sign({ uid: usuario.id }, process.env.JWT_SECRET);

  res.json({ token });
});

module.exports = router;