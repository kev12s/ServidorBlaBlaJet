require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');



const app = express();

// Configuración CORS segura
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usuarioRoutes = require("./routes/usuario.routes.js");
app.use("/usuario", usuarioRoutes);

const vueloRoutes = require("./routes/vuelo.routes.js");
app.use("/vuelo", vueloRoutes);

// Añade antes de las rutas estáticas:
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

const PORT = 3100;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
