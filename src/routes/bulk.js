const express = require('express');
const multer = require('multer');
const pool = require('../db/pool');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (allowed.includes(file.mimetype) || file.originalname.match(/\.(csv|xls|xlsx)$/i)) cb(null, true);
    else cb(new Error('Solo se permiten archivos CSV o Excel'));
  },
});

const PAISES_VALIDOS = ['chile', 'colombia', 'peru', 'perú', 'argentina'];

router.post('/employees', requireRole('admin_rrhh'), upload.single('file'), async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'Archivo requerido' });
  try {
    const rows = await parseFile(req.file);
    const results = { inserted: 0, skipped: 0, errors: [] };
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowNum = i + 2;
        try {
          const name = row['nombre'] || row['name'];
          const email = (row['email'] || '').toLowerCase().trim();
          const area = row['area'] || row['área'];
          const country = (row['pais'] || row['país'] || row['country'] || '').trim();
          const roleName = row['rol'] || row['role'];
          const level = parseInt(row['nivel'] || row['level']);
          if (!name || !email || !area || !country || !roleName || !level) {
            results.errors.push({ row: rowNum, error: 'Campos incompletos', data: row });
            results.skipped++; continue;
          }
          if (!PAISES_VALIDOS.includes(country.toLowerCase())) {
            results.errors.push({ row: rowNum, error: `País inválido: ${country}` });
            results.skipped++; continue;
          }
          if (level < 1 || level > 5) {
            results.errors.push({ row: rowNum, error: `Nivel inválido: ${level}` });
            results.skipped++; continue;
          }
          const roleResult = await client.query('SELECT id FROM roles WHERE LOWER(name) = LOWER($1)', [roleName]);
          if (!roleResult.rows.length) {
            results.errors.push({ row: rowNum, error: `Rol no encontrado: ${roleName}` });
            results.skipped++; continue;
          }
          await client.query(
            `INSERT INTO employees (name, email, area, role_id, current_level, country)
             VALUES ($1,$2,$3,$4,$5,$6)
             ON CONFLICT (email, country) DO UPDATE SET
               name=EXCLUDED.name, area=EXCLUDED.area,
               role_id=EXCLUDED.role_id, current_level=EXCLUDED.current_level`,
            [name, email, area, roleResult.rows[0].id, level, country]
          );
          results.inserted++;
        } catch (rowErr) { results.errors.push({ row: rowNum, error: rowErr.message }); results.skipped++; }
      }
      await client.query('COMMIT');
      res.json({ total: rows.length, inserted: results.inserted, skipped: results.skipped, errors: results.errors.slice(0, 50) });
    } catch (err) { await client.query('ROLLBACK'); throw err; } finally { client.release(); }
  } catch (err) { next(err); }
});

router.post('/roles', requireRole('admin_rrhh'), upload.single('file'), async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'Archivo requerido' });
  try {
    const rows = await parseFile(req.file);
    const results = { inserted: 0, errors: [] };
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]; const rowNum = i + 2;
        try {
          const familyName = row['familia'], roleName = row['rol'];
          const level = parseInt(row['nivel']);
          const description = row['descripcion'] || row['descripción'];
          if (!familyName || !roleName || !level || !description) { results.errors.push({ row: rowNum, error: 'Campos incompletos' }); continue; }
          const fam = await client.query(
            'INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id', [familyName]
          );
          const rol = await client.query(
            'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
            [fam.rows[0].id, roleName]
          );
          await client.query(
            `INSERT INTO competency_levels(role_id, level, description) VALUES($1,$2,$3)
             ON CONFLICT(role_id, level) DO UPDATE SET description=EXCLUDED.description`,
            [rol.rows[0].id, level, description]
          );
          results.inserted++;
        } catch (rowErr) { results.errors.push({ row: rowNum, error: rowErr.message }); }
      }
      await client.query('COMMIT');
      res.json({ total: rows.length, inserted: results.inserted, errors: results.errors.slice(0, 50) });
    } catch (err) { await client.query('ROLLBACK'); throw err; } finally { client.release(); }
  } catch (err) { next(err); }
});

async function parseFile(file) {
  const ext = file.originalname.split('.').pop().toLowerCase();
  if (ext === 'csv') return parseCSV(file.buffer.toString('utf8'));
  const ExcelJS = require('exceljs');
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file.buffer);
  const sheet = workbook.worksheets[0];
  const headers = [], rows = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) row.eachCell(cell => headers.push(String(cell.value || '').toLowerCase().trim()));
    else {
      const obj = {};
      row.eachCell((cell, col) => { const h = headers[col - 1]; if (h) obj[h] = cell.value != null ? String(cell.value).trim() : ''; });
      if (Object.values(obj).some(Boolean)) rows.push(obj);
    }
  });
  return rows;
}

function parseCSV(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.toLowerCase().trim().replace(/"/g, ''));
  return lines.slice(1).map(line => {
    const vals = line.split(',').map(v => v.trim().replace(/"/g, ''));
    const obj = {};
    headers.forEach((h, i) => { obj[h] = vals[i] || ''; });
    return obj;
  });
}

module.exports = router;
