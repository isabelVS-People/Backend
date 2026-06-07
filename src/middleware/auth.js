const jwt = require('jsonwebtoken');

/**
 * Verifica el JWT y adjunta { userId, role, country } a req.user.
 * El country NUNCA se acepta del body/query; siempre del token.
 */
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de autenticación requerido' });
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      role: payload.role,
      country: payload.country,
    };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Sesión expirada. Volvé a iniciar sesión.' });
    }
    return res.status(401).json({ error: 'Token inválido' });
  }
}

/**
 * requireRole('admin_rrhh') o requireRole('lider', 'admin_rrhh')
 * Siempre usar DESPUÉS de authenticate.
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Acceso denegado. Se requiere rol: ${roles.join(' o ')}`,
      });
    }
    next();
  };
}

/**
 * Valida que el líder solo acceda a colaboradores de su propio equipo y país.
 * Usar en rutas donde se recibe :employeeId como parámetro.
 */
async function requireSameTeam(req, res, next) {
  if (req.user.role === 'admin_rrhh') return next();

  const pool = require('../db/pool');
  const { employeeId } = req.params;

  try {
    const result = await pool.query(
      'SELECT leader_id, country FROM employees WHERE id = $1',
      [parseInt(employeeId)]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Colaborador no encontrado' });
    }
    const emp = result.rows[0];
    if (emp.country !== req.user.country) {
      return res.status(403).json({ error: 'Acceso denegado: país diferente' });
    }
    if (req.user.role === 'lider' && emp.leader_id !== req.user.userId) {
      return res.status(403).json({ error: 'Acceso denegado: colaborador fuera de tu equipo' });
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authenticate, requireRole, requireSameTeam };
