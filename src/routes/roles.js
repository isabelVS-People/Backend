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

/**
 * GET /api/roles/families/:familyId/competencies
 * Devuelve la matriz 5x5 de competencias x niveles para una familia,
 * agrupada por competencia: [{ competency_name, levels: [{level, description}, ...5] }, ...]
 */
router.get('/families/:familyId/competencies', async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT competency_name, level, description
       FROM family_competency_levels
       WHERE family_id = $1
       ORDER BY competency_name ASC, level ASC`,
      [req.params.familyId]
    );
    const grouped = {};
    for (const row of result.rows) {
      if (!grouped[row.competency_name]) grouped[row.competency_name] = [];
      grouped[row.competency_name].push({ level: row.level, description: row.description });
    }
    const competencies = Object.entries(grouped).map(([competency_name, levels]) => ({ competency_name, levels }));
    res.json(competencies);
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

/**
 * PUT /api/roles/families/:familyId/competencies/:competencyName/:level
 * Edita la descripción de una competencia x nivel para una familia.
 */
router.put('/families/:familyId/competencies/:competencyName/:level', requireRole('admin_rrhh'), async (req, res, next) => {
  try {
    const { familyId, competencyName, level } = req.params;
    const { description } = req.body;
    if (!description) return res.status(400).json({ error: 'description requerida' });
    const lvl = parseInt(level);
    if (lvl < 1 || lvl > 5) return res.status(400).json({ error: 'Nivel entre 1 y 5' });
    const r = await pool.query(
      `INSERT INTO family_competency_levels(family_id, competency_name, level, description)
       VALUES($1,$2,$3,$4)
       ON CONFLICT(family_id, competency_name, level) DO UPDATE SET description=EXCLUDED.description RETURNING *`,
      [parseInt(familyId), decodeURIComponent(competencyName), lvl, description]
    );
    res.json(r.rows[0]);
  } catch (err) { next(err); }
});

module.exports = router;
