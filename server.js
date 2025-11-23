require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");

// Conexión a Mongo
const { initDb } = require("./config/db");

// Passport OAuth
const passport = require("./middleware/googleAuth");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Sesiones necesarias para OAuth
app.use(
  session({
    secret: "superSecret",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Conexión a la base de datos
initDb();

// Rutas normales de tu proyecto
app.use("/usuarios", require("./routes/usuarios"));
app.use("/auth", require("./routes/auth"));

// 👉 Ruta para iniciar con Google
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 👉 Callback de Google
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.json({
      msg: "Login con Google exitoso",
      user: req.user
    });
  }
);

// Servidor
app.listen(process.env.PORT, () => {
  console.log("🔥 Servidor corriendo en el puerto " + process.env.PORT);
});