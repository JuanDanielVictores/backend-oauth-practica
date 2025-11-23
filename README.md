📚 Proyecto: Autenticación con JWT y OAuth 2.0 (Google)

Este proyecto implementa un sistema de autenticación que incluye:

✔ Registro y login con contraseña (JWT)

✔ Login con Google OAuth 2.0 (Passport.js)

✔ Base de datos MongoDB Atlas

✔ Servidor desplegado en Render

✔ Variables de entorno para producción

✔ Enrutamiento modular

📂 Estructura del Proyecto

/config

   db.js

/middleware

   googleAuth.js

/models

   Usuario.js

/routes

   auth.js

   usuarios.js

.env

server.js

package.json

🚀 Tecnologías Utilizadas

Node.js

Express.js

MongoDB Atlas

Mongoose

Passport.js (Google OAuth 2.0)

JSON Web Tokens (JWT)

Bcrypt

Render (deploy)

dotenv

⚙ Instalación del Proyecto
1️⃣ Clonar el repositorio

git clone https://github.com/JuanDanielVictores/backend-oauth-practica.git
cd backend-oauth-practica

2️⃣ Instalar dependencias

npm install

3️⃣ Crear archivo 

.env

En la raíz del proyecto crear:

MONGO_URI=tu_uri_de_mongo

JWT_SECRET=tu_secreto_jwt

PORT=3000

# OAuth Google
GOOGLE_CLIENT_ID=tu_client_id

GOOGLE_CLIENT_SECRET=tu_client_secret

GOOGLE_CALLBACK_URL=https://backend-oauth-practica.onrender.com/auth/google/callback


⚠ IMPORTANTE:
GOOGLE_CALLBACK_URL debe coincidir exactamente con la configurada en Google Cloud Platform.

🔌 5. Configuración de Google OAuth (Google Cloud Console)

Ir a: https://console.cloud.google.com/

Crear un proyecto OAuth.

Crear credenciales → ID de cliente OAuth.

En URIs de redirección autorizados, agregar:

✔ Para producción:

https://backend-oauth-practica.onrender.com/auth/google/callback

✔ Para pruebas locales:

http://localhost:3000/auth/google/callback


Guardar los cambios.

🧪 6. Endpoints Disponibles

🔹 Login normal (JWT)

Registrar usuario

Iniciar sesión con correo y contraseña

Recibir token JWT como respuesta

🔹 Login con Google (OAuth)

Iniciar sesión con Google:

/auth/google

Callback de Google:

/auth/google/callback


El backend devuelve un JSON con los datos del usuario autenticado.

☁️ 7. Deploy en Render

Pasos realizados:

Crear servicio Web en Render.

Conectar el repositorio de GitHub.

Configurar variables de entorno desde Environment Variables.

Comando de inicio:

node server.js


Render genera la URL pública del backend:

👉 https://backend-oauth-practica.onrender.com

Actualizar la URL de callback en Google Cloud.

Probar el login con Google desde la URL pública.

🧠 8. ¿Cómo funciona el flujo de Google OAuth?

El usuario accede a:

/auth/google

Google muestra la ventana para seleccionar una cuenta.

Después de iniciar sesión, Google redirige a:

/auth/google/callback


El backend valida el usuario.

El servidor devuelve un JSON con la información del perfil.

El sistema puede registrar o autenticar al usuario según sea necesario.