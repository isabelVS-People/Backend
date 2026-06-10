const express = require('express');
const pool = require('../db/pool');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);

router.get('/families', async (req, res, next) => {
  try {
    const families = await pool.query('SELECT * FROM role_families ORDER BY name');
    const roles = await pool.query('SELECT * FROM roles ORDER BY name');
    res.json(families.rows.map(f => ({ ...f, roles: roles.rows.filter(r => r.family_id === f.id) })));
  } catch (err) { next(err); }
});

router.get('/:roleId/levels', async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT cl.*, r.name AS role_name, rf.name AS family_name
       FROM competency_levels cl
       JOIN roles r ON cl.role_id = r.id
       JOIN role_families rf ON r.family_id = rf.id
       WHERE cl.role_id = $1 ORDER BY cl.level ASC`,
      [req.params.roleId]
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

router.post('/families', requireRole('admin_rrhh'), async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'name requerido' });
    const r = await pool.query(
      'INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING *',
      [name]
    );
    res.status(201).json(r.rows[0]);
  } catch (err) { next(err); }
});

router.post('/', requireRole('admin_rrhh'), async (req, res, next) => {
  try {
    const { family_id, name } = req.body;
    if (!family_id || !name) return res.status(400).json({ error: 'family_id y name requeridos' });
    const r = await pool.query('INSERT INTO roles(family_id, name) VALUES($1,$2) RETURNING *', [parseInt(family_id), name]);
    res.status(201).json(r.rows[0]);
  } catch (err) { next(err); }
});

router.put('/:roleId/levels/:level', requireRole('admin_rrhh'), async (req, res, next) => {
  try {
    const { roleId, level } = req.params;
    const { description } = req.body;
    if (!description) return res.status(400).json({ error: 'description requerida' });
    const r = await pool.query(
      `INSERT INTO competency_levels(role_id, level, description) VALUES($1,$2,$3)
       ON CONFLICT(role_id, level) DO UPDATE SET description=EXCLUDED.description RETURNING *`,
      [parseInt(roleId), parseInt(level), description]
    );
    res.json(r.rows[0]);
  } catch (err) { next(err); }
});

module.exports = router;
