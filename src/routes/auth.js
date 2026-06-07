const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');

const router = express.Router();

/**
 * POST /api/auth/login
 * Login demo (solo desarrollo). En producción reemplazar por SSO.
 * Body: { email, password }
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }

    const result = await pool.query(
      'SELECT id, name, email, password_hash, role, country FROM users WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role, country: user.country },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, country: user.country },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/auth/sso
 * Endpoint para recibir el token del Identity Provider (Okta, Azure AD, Google Workspace, etc.)
 * El IdP redirige aquí con un id_token. Validamos, obtenemos el usuario de nuestra DB,
 * y emitimos nuestro propio JWT con { userId, role, country }.
 *
 * En producción: validar la firma del id_token con las claves públicas del IdP (JWKS).
 * Por ahora: stub documentado para integrar.
 */
router.post('/sso', async (req, res, next) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: 'idToken requerido' });

    // TODO: validar idToken con librería como 'openid-client' o 'passport-openidconnect'
    // Ejemplo con openid-client:
    //   const client = await getOidcClient();
    //   const tokenSet = await client.callback(redirectUri, { id_token: idToken });
    //   const claims = tokenSet.claims();
    //   const email = claims.email;

    // Stub: decodificar sin verificar (SOLO DEMO)
    const decoded = jwt.decode(idToken);
    if (!decoded?.email) return res.status(400).json({ error: 'Token SSO inválido' });

    const result = await pool.query(
      'SELECT id, name, email, role, country FROM users WHERE email = $1',
      [decoded.email.toLowerCase()]
    );
    if (result.rows.length === 0) {
      return res.status(403).json({ error: 'Usuario no registrado en el sistema' });
    }

    const user = result.rows[0];
    const token = jwt.sign(
      { userId: user.id, role: user.role, country: user.country },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, country: user.country },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/auth/me
 * Devuelve el usuario autenticado actual (para rehidratar sesión al refrescar).
 */
router.get('/me', require('../middleware/auth').authenticate, async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, country FROM users WHERE id = $1',
      [req.user.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
