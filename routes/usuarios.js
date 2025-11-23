const express = require("express");
const Usuario = require("../models/Usuario");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs"); // <-- IMPORTANTE
const router = express.Router();

// GET - obtener usuarios (PROTEGIDA)
router.get("/", auth, async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// POST - crear usuario (PÚBLICA)
router.post("/", async (req, res) => {
  try {
    let { nombre, correo, password } = req.body;

    // 🔐 Encriptar contraseña antes de guardar
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptado = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      password: passwordEncriptado
    });

    await nuevoUsuario.save();

    res.json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT - editar usuario (PROTEGIDA)
router.put("/:id", auth, async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar" });
  }
});

// DELETE - eliminar usuario (PROTEGIDA)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ msg: "Usuario eliminado" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar" });
  }
});

module.exports = router;