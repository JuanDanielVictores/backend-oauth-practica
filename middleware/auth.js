const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({ error: "Acceso denegado. Token faltante." });
  }

  // Formato esperado → Authorization: Bearer TOKEN
  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "El token no tiene el formato correcto." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Token inválido o expirado." });
  }
}

module.exports = auth;