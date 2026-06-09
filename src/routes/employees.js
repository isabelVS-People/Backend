const express = require('express');
const pool = require('../db/pool');
const { authenticate, requireRole, requireSameTeam } = require('../middleware/auth');

const router = express.Router();
router.use((req, res, next) => {
  req.user = { userId: 1, role: 'admin_rrhh', country: req.headers['x-country'] || 'Chile' };
  next();
});

router.get('/', requireRole('lider', 'admin_rrhh'), async (req, res, next) => {
  try {
    const { area, role_id, level } = req.query;
    const { country, role, userId } = req.user;

    const conditions = ['e.country = $1'];
    const params = [country];
    let idx = 2;

    if (role === 'lider') { conditions.push(`e.leader_id = $${idx++}`); params.push(userId); }
    if (area) { conditions.push(`e.area = $${idx++}`); params.push(area); }
    if (role_id) { conditions.push(`e.role_id = $${idx++}`); params.push(parseInt(role_id)); }
    if (level) { conditions.push(`e.current_level = $${idx++}`); params.push(parseInt(level)); }

    const sql = `
      SELECT
        e.id, e.name, e.email, e.area, e.current_level, e.country,
        e.role_id, r.name AS role_name,
        rf.id AS family_id, rf.name AS family_name,
        e.leader_id, u.name AS leader_name,
        e.created_at
      FROM employees e
      LEFT JOIN roles r ON e.role_id = r.id
      LEFT JOIN role_families rf ON r.family_id = rf.id
      LEFT JOIN users u ON e.leader_id = u.id
      WHERE ${conditions.join(' AND ')}
      ORDER BY e.name ASC
    `;

    const result = await pool.query(sql, params);
    res.json(result.rows);
  } catch (err) { next(err); }
});

router.get('/me', requireRole('colaborador'), async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT e.id, e.name, e.email, e.area, e.current_level, e.country,
        e.role_id, r.name AS role_name,
        rf.id AS family_id, rf.name AS family_name,
        u.name AS leader_name
       FROM employees e
       LEFT JOIN roles r ON e.role_id = r.id
       LEFT JOIN role_families rf ON r.family_id = rf.id
       LEFT JOIN users u ON e.leader_id = u.id
       WHERE e.email = (SELECT email FROM users WHERE id = $1) AND e.country = $2`,
      [req.user.userId, req.user.country]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Perfil no encontrado' });
    res.json(result.rows[0]);
  } catch (err) { next(err); }
});

router.get('/:employeeId', requireRole('lider', 'admin_rrhh'), requireSameTeam, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT e.*, r.name AS role_name, rf.name AS family_name
       FROM employees e
       LEFT JOIN roles r ON e.role_id = r.id
       LEFT JOIN role_families rf ON r.family_id = rf.id
       WHERE e.id = $1 AND e.country = $2`,
      [req.params.employeeId, req.user.country]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Colaborador no encontrado' });
    res.json(result.rows[0]);
  } catch (err) { next(err); }
});

router.patch('/:employeeId', requireRole('lider', 'admin_rrhh'), requireSameTeam, async (req, res, next) => {
  const client = await pool.connect();
  try {
    const { employeeId } = req.params;
    const { role_id, current_level } = req.body;

    if (!role_id && !current_level) return res.status(400).json({ error: 'Se requiere role_id o current_level' });

    await client.query('BEGIN');

    const current = await client.query(
      'SELECT role_id, current_level FROM employees WHERE id = $1 AND country = $2 FOR UPDATE',
      [employeeId, req.user.country]
    );
    if (current.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Colaborador no encontrado' });
    }
    const prev = current.rows[0];
    const newRoleId = role_id ? parseInt(role_id) : prev.role_id;
    const newLevel = current_level ? parseInt(current_level) : prev.current_level;

    if (newLevel < 1 || newLevel > 5) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'El nivel debe estar entre 1 y 5' });
    }

    await client.query('UPDATE employees SET role_id = $1, current_level = $2 WHERE id = $3', [newRoleId, newLevel, employeeId]);
    await client.query(
      `INSERT INTO change_history (employee_id, changed_by_id, previous_role_id, new_role_id, previous_level, new_level, country)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [employeeId, req.user.userId, prev.role_id, newRoleId, prev.current_level, newLevel, req.user.country]
    );

    await client.query('COMMIT');

    const updated = await pool.query(
      `SELECT e.*, r.name AS role_name, rf.name AS family_name
       FROM employees e
       LEFT JOIN roles r ON e.role_id = r.id
       LEFT JOIN role_families rf ON r.family_id = rf.id
       WHERE e.id = $1`,
      [employeeId]
    );
    res.json(updated.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
});

router.get('/:employeeId/history', async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const { country, role, userId } = req.user;

    const emp = await pool.query('SELECT leader_id, country, email FROM employees WHERE id = $1', [parseInt(employeeId)]);
    if (emp.rows.length === 0) return res.status(404).json({ error: 'Colaborador no encontrado' });

    const e = emp.rows[0];
    if (e.country !== country) return res.status(403).json({ error: 'Acceso denegado' });
    if (role === 'colaborador') {
      const me = await pool.query('SELECT email FROM users WHERE id = $1', [userId]);
      if (me.rows[0]?.email !== e.email) return res.status(403).json({ error: 'Solo podés ver tu propio historial' });
    }
    if (role === 'lider' && e.leader_id !== userId) return res.status(403).json({ error: 'Colaborador fuera de tu equipo' });

    const result = await pool.query(
      `SELECT ch.id, ch.change_date,
        pr.name AS previous_role, nr.name AS new_role,
        ch.previous_level, ch.new_level,
        u.name AS changed_by
       FROM change_history ch
       LEFT JOIN roles pr ON ch.previous_role_id = pr.id
       LEFT JOIN roles nr ON ch.new_role_id = nr.id
       LEFT JOIN users u ON ch.changed_by_id = u.id
       WHERE ch.employee_id = $1 AND ch.country = $2
       ORDER BY ch.change_date DESC`,
      [employeeId, country]
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

router.get('/:employeeId/requirements', requireRole('lider', 'admin_rrhh'), requireSameTeam, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT arv.id, arv.requirement_def_id, ard.name, ard.value_type, ard.options_list, arv.value
       FROM additional_requirement_values arv
       JOIN additional_requirement_definitions ard ON arv.requirement_def_id = ard.id
       WHERE arv.employee_id = $1`,
      [req.params.employeeId]
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

router.put('/:employeeId/requirements', requireRole('admin_rrhh'), requireSameTeam, async (req, res, next) => {
  const client = await pool.connect();
  try {
    const { employeeId } = req.params;
    const values = req.body;
    if (!Array.isArray(values)) return res.status(400).json({ error: 'Se espera un array de requisitos' });

    await client.query('BEGIN');
    for (const v of values) {
      await client.query(
        `INSERT INTO additional_requirement_values(employee_id, requirement_def_id, value, country)
         VALUES($1, $2, $3, $4)
         ON CONFLICT(employee_id, requirement_def_id)
         DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
        [employeeId, v.requirement_def_id, v.value, req.user.country]
      );
    }
    await client.query('COMMIT');
    res.json({ ok: true });
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
});

module.exports = router;
