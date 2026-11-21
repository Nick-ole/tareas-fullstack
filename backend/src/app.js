const express = require('express');
const cors = require('cors');

function crearApp(config) {
  const app = express();
  app.use(express.json());
  app.use(cors({ origin: config.corsOrigin }));

  const tareas = [{ id: 1, titulo: 'Preparar despliegue', hecha: false }];

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', version: config.version, entorno: config.entorno });
  });
  app.get('/api/tareas', (req, res) => res.json(tareas));
  app.post('/api/tareas', (req, res) => {
    if (!req.body.titulo) return res.status(400).json({ error: 'titulo es obligatorio' });
    const nueva = { id: tareas.length + 1, titulo: req.body.titulo, hecha: false };
    tareas.push(nueva);
    res.status(201).json(nueva);
  });
  return app;
}
module.exports = { crearApp };
