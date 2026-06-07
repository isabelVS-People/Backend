/**
 * Middleware global de manejo de errores.
 * Debe registrarse ÚLTIMO en Express, después de todas las rutas.
 */
function errorHandler(err, req, res, next) {
  // Log en servidor
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path}`, err.message);

  // Errores de validación de express-validator
  if (err.type === 'validation') {
    return res.status(422).json({ error: 'Datos inválidos', details: err.details });
  }

  // Errores de Multer (carga de archivos)
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'El archivo excede el tamaño máximo permitido (10MB)' });
  }

  // Errores de PostgreSQL
  if (err.code) {
    switch (err.code) {
      case '23505': // unique_violation
        return res.status(409).json({ error: 'Registro duplicado', detail: err.detail });
      case '23503': // foreign_key_violation
        return res.status(400).json({ error: 'Referencia inválida', detail: err.detail });
      case '22P02': // invalid_text_representation
        return res.status(400).json({ error: 'Formato de datos inválido' });
      case '23514': // check_violation
        return res.status(400).json({ error: 'Valor fuera del rango permitido', detail: err.detail });
    }
  }

  // Error genérico
  const status = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' && status === 500
    ? 'Error interno del servidor'
    : err.message || 'Error interno del servidor';

  res.status(status).json({ error: message });
}

module.exports = errorHandler;
