const express = require('express');
const pool = require('../db/pool');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use((req, res, next) => { req.user = { userId: 1, role: 'admin_rrhh', country: req.headers['x-country'] || 'Chile' }; next(); });

/**
 * GET /api/requirements
 * Lista todos los requisitos adicionales definidos.
 * Accesible por lider y admin_rrhh.
 */
router.get('/', requireRole('lider', 'admin_rrhh'), async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM additional_requirement_definitions ORDER BY name'
    );
    res.json(result.rows);
  } catch (err) { next(err); }
});

/**
 * POST /api/requirements
 * Crear un nuevo requisito adicional.
 * Solo admin_rrhh.
 * Body: { name, value_type, options_list? }
 */
router.post('/', requireRole('admin_rrhh'), async (req, res, next) => {
  try {
    const { name, value_type, options_list } = req.body;
    if (!name || !value_type) {
      return res.status(400).json({ error: 'name y value_type son requeridos' });
    }
    const validTypes = ['text', 'number', 'date', 'boolean', 'options'];
    if (!validTypes.includes(value_type)) {
      return res.status(400).json({ error: `value_type debe ser uno de: ${validTypes.join(', ')}` });
    }
    if (value_type === 'options' && (!options_list || options_list.length === 0)) {
      return res.status(400).json({ error: 'options_list requerida para tipo options' });
    }

    const result = await pool.query(
      `INSERT INTO additional_requirement_definitions(name, value_type, options_list)
       VALUES($1, $2, $3) RETURNING *`,
      [name.trim(), value_type, options_list || []]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Ya existe un requisito con ese nombre' });
    next(err);
  }
});

/**
 * PATCH /api/requirements/:id
 * Actualizar nombre u opciones.
 */
router.patch('/:id', requireRole('admin_rrhh'), async (req, res, next) => {
  try {
    const { name, options_list } = req.body;
    const fields = [];
    const params = [];
    let idx = 1;

    if (name) { fields.push(`name = $${idx++}`); params.push(name.trim()); }
    if (options_list) { fields.push(`options_list = $${idx++}`); params.push(options_list); }
    if (fields.length === 0) return res.status(400).json({ error: 'Nada que actualizar' });

    params.push(parseInt(req.params.id));
    const result = await pool.query(
      `UPDATE additional_requirement_definitions SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      params
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Requisito no encontrado' });
    res.json(result.rows[0]);
  } catch (err) { next(err); }
});

/**
 * DELETE /api/requirements/:id
 */
router.delete('/:id', requireRole('admin_rrhh'), async (req, res, next) => {
  try {
    await pool.query('DELETE FROM additional_requirement_definitions WHERE id = $1', [parseInt(req.params.id)]);
    res.json({ ok: true });
  } catch (err) { next(err); }
});

module.exports = router;
