const { crearApp } = require('./app');

const config = {
  port: process.env.PORT || 3000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  entorno: process.env.NODE_ENV || 'development',
  version: process.env.APP_VERSION || '1.0.0',
};

crearApp(config).listen(config.port, () => {
  console.log(`API [${config.entorno}] escuchando en puerto ${config.port}`);
  console.log(`CORS permitido para: ${config.corsOrigin}`);
});
