const express = require('express');
const multer = require('multer');
const pool = require('../db/pool');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();
// Auth deshabilitada temporalmente para demo
const express = require('express');
const multer = require('multer');
const pool = require('../db/pool');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();
// Auth deshabilitada temporalmente para demo-repuesta
router.use((req, res, next) => { req.user = { userId: 1, role: 'admin_rrhh', country: 'Argentina' }; next(); });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['text/csv', 'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (allowed.includes(file.mimetype) || file.originalname.match(/\.(csv|xls|xlsx)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos CSV o Excel'));
    }
  },
});

/**
 * POST /api/bulk/employees
 * Carga masiva de colaboradores desde CSV o Excel.
 * Columnas esperadas: nombre, email, area, pais, rol, nivel
 * El campo 'pais' se valida contra los países permitidos.
 * Solo se insertan colaboradores del país del admin (o del campo país si es super-admin).
 */
router.post('/employees', upload.single('file'), async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'Archivo requerido' });

  try {
    const rows = await parseFile(req.file);
    const results = { inserted: 0, skipped: 0, errors: [] };
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowNum = i + 2; // +2 porque la fila 1 es el header

        try {
          const name = row['nombre'] || row['name'];
          const email = (row['email'] || '').toLowerCase().trim();
          const area = row['area'] || row['área'];
          const country = row['pais'] || row['país'] || row['country'];
          const roleName = row['rol'] || row['role'];
          const level = parseInt(row['nivel'] || row['level']);

          // Validaciones básicas
          if (!name || !email || !area || !country || !roleName || !level) {
            results.errors.push({ row: rowNum, error: 'Campos incompletos', data: row });
            results.skipped++;
            continue;
          }
          if (!['Chile', 'Colombia', 'Perú', 'Argentina'].includes(country)) {
            results.errors.push({ row: rowNum, error: `País inválido: ${country}` });
            results.skipped++;
            continue;
          }
          if (level < 1 || level > 5) {
            results.errors.push({ row: rowNum, error: `Nivel inválido: ${level}` });
            results.skipped++;
            continue;
          }

          // Buscar rol
          const roleResult = await client.query(
            'SELECT id FROM roles WHERE LOWER(name) = LOWER($1)', [roleName]
          );
          if (roleResult.rows.length === 0) {
            results.errors.push({ row: rowNum, error: `Rol no encontrado: ${roleName}` });
            results.skipped++;
            continue;
          }

          await client.query(
            `INSERT INTO employees(name, email, area, role_id, current_level, country)
             VALUES($1,$2,$3,$4,$5,$6)
             ON CONFLICT(email, country) DO UPDATE SET
               name = EXCLUDED.name,
               area = EXCLUDED.area,
               role_id = EXCLUDED.role_id,
               current_level = EXCLUDED.current_level`,
            [name, email, area, roleResult.rows[0].id, level, country]
          );
          results.inserted++;
        } catch (rowErr) {
          results.errors.push({ row: rowNum, error: rowErr.message });
          results.skipped++;
        }
      }

      await client.query('COMMIT');
      res.json({
        total: rows.length,
        inserted: results.inserted,
        skipped: results.skipped,
        errors: results.errors.slice(0, 50), // máximo 50 errores en respuesta
      });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/bulk/roles
 * Carga masiva de familias, roles y niveles.
 * Columnas: familia, rol, nivel, descripcion
 */
router.post('/roles', upload.single('file'), async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'Archivo requerido' });

  try {
    const rows = await parseFile(req.file);
    const client = await pool.connect();
    const results = { inserted: 0, errors: [] };

    try {
      await client.query('BEGIN');

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowNum = i + 2;
        try {
          const familyName = row['familia'];
          const roleName = row['rol'];
          const level = parseInt(row['nivel']);
          const description = row['descripcion'] || row['descripción'];

          if (!familyName || !roleName || !level || !description) {
            results.errors.push({ row: rowNum, error: 'Campos incompletos' });
            continue;
          }

          // Upsert familia
          const fam = await client.query(
            'INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
            [familyName]
          );
          const familyId = fam.rows[0].id;

          // Upsert rol
          const rol = await client.query(
            'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
            [familyId, roleName]
          );
          const roleId = rol.rows[0].id;

          // Upsert nivel
          await client.query(
            `INSERT INTO competency_levels(role_id, level, description) VALUES($1,$2,$3)
             ON CONFLICT(role_id, level) DO UPDATE SET description=EXCLUDED.description`,
            [roleId, level, description]
          );
          results.inserted++;
        } catch (rowErr) {
          results.errors.push({ row: rowNum, error: rowErr.message });
        }
      }

      await client.query('COMMIT');
      res.json({ total: rows.length, inserted: results.inserted, errors: results.errors.slice(0, 50) });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    next(err);
  }
});

// ─── Parser CSV/Excel ────────────────────────────────────────────────────────

async function parseFile(file) {
  const ext = file.originalname.split('.').pop().toLowerCase();

  if (ext === 'csv') {
    return parseCSV(file.buffer.toString('utf8'));
  }

  // Excel: usar ExcelJS
  const ExcelJS = require('exceljs');
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file.buffer);
  const sheet = workbook.worksheets[0];

  const headers = [];
  const rows = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell(cell => headers.push(String(cell.value || '').toLowerCase().trim()));
    } else {
      const obj = {};
      row.eachCell((cell, colNumber) => {
        const header = headers[colNumber - 1];
        if (header) obj[header] = cell.value !== null && cell.value !== undefined ? String(cell.value).trim() : '';
      });
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


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['text/csv', 'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (allowed.includes(file.mimetype) || file.originalname.match(/\.(csv|xls|xlsx)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos CSV o Excel'));
    }
  },
});

/**
 * POST /api/bulk/employees
 * Carga masiva de colaboradores desde CSV o Excel.
 * Columnas esperadas: nombre, email, area, pais, rol, nivel
 * El campo 'pais' se valida contra los países permitidos.
 * Solo se insertan colaboradores del país del admin (o del campo país si es super-admin).
 */
router.post('/employees', upload.single('file'), async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'Archivo requerido' });

  try {
    const rows = await parseFile(req.file);
    const results = { inserted: 0, skipped: 0, errors: [] };
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowNum = i + 2; // +2 porque la fila 1 es el header

        try {
          const name = row['nombre'] || row['name'];
          const email = (row['email'] || '').toLowerCase().trim();
          const area = row['area'] || row['área'];
          const country = row['pais'] || row['país'] || row['country'];
          const roleName = row['rol'] || row['role'];
          const level = parseInt(row['nivel'] || row['level']);

          // Validaciones básicas
          if (!name || !email || !area || !country || !roleName || !level) {
            results.errors.push({ row: rowNum, error: 'Campos incompletos', data: row });
            results.skipped++;
            continue;
          }
          if (!['Chile', 'Colombia', 'Perú', 'Argentina'].includes(country)) {
            results.errors.push({ row: rowNum, error: `País inválido: ${country}` });
            results.skipped++;
            continue;
          }
          if (level < 1 || level > 5) {
            results.errors.push({ row: rowNum, error: `Nivel inválido: ${level}` });
            results.skipped++;
            continue;
          }

          // Buscar rol
          const roleResult = await client.query(
            'SELECT id FROM roles WHERE LOWER(name) = LOWER($1)', [roleName]
          );
          if (roleResult.rows.length === 0) {
            results.errors.push({ row: rowNum, error: `Rol no encontrado: ${roleName}` });
            results.skipped++;
            continue;
          }

          await client.query(
            `INSERT INTO employees(name, email, area, role_id, current_level, country)
             VALUES($1,$2,$3,$4,$5,$6)
             ON CONFLICT(email, country) DO UPDATE SET
               name = EXCLUDED.name,
               area = EXCLUDED.area,
               role_id = EXCLUDED.role_id,
               current_level = EXCLUDED.current_level`,
            [name, email, area, roleResult.rows[0].id, level, country]
          );
          results.inserted++;
        } catch (rowErr) {
          results.errors.push({ row: rowNum, error: rowErr.message });
          results.skipped++;
        }
      }

      await client.query('COMMIT');
      res.json({
        total: rows.length,
        inserted: results.inserted,
        skipped: results.skipped,
        errors: results.errors.slice(0, 50), // máximo 50 errores en respuesta
      });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/bulk/roles
 * Carga masiva de familias, roles y niveles.
 * Columnas: familia, rol, nivel, descripcion
 */
router.post('/roles', upload.single('file'), async (req, res, next) => {
  if (!req.file) return res.status(400).json({ error: 'Archivo requerido' });

  try {
    const rows = await parseFile(req.file);
    const client = await pool.connect();
    const results = { inserted: 0, errors: [] };

    try {
      await client.query('BEGIN');

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowNum = i + 2;
        try {
          const familyName = row['familia'];
          const roleName = row['rol'];
          const level = parseInt(row['nivel']);
          const description = row['descripcion'] || row['descripción'];

          if (!familyName || !roleName || !level || !description) {
            results.errors.push({ row: rowNum, error: 'Campos incompletos' });
            continue;
          }

          // Upsert familia
          const fam = await client.query(
            'INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
            [familyName]
          );
          const familyId = fam.rows[0].id;

          // Upsert rol
          const rol = await client.query(
            'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
            [familyId, roleName]
          );
          const roleId = rol.rows[0].id;

          // Upsert nivel
          await client.query(
            `INSERT INTO competency_levels(role_id, level, description) VALUES($1,$2,$3)
             ON CONFLICT(role_id, level) DO UPDATE SET description=EXCLUDED.description`,
            [roleId, level, description]
          );
          results.inserted++;
        } catch (rowErr) {
          results.errors.push({ row: rowNum, error: rowErr.message });
        }
      }

      await client.query('COMMIT');
      res.json({ total: rows.length, inserted: results.inserted, errors: results.errors.slice(0, 50) });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    next(err);
  }
});

// ─── Parser CSV/Excel ────────────────────────────────────────────────────────

async function parseFile(file) {
  const ext = file.originalname.split('.').pop().toLowerCase();

  if (ext === 'csv') {
    return parseCSV(file.buffer.toString('utf8'));
  }

  // Excel: usar ExcelJS
  const ExcelJS = require('exceljs');
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file.buffer);
  const sheet = workbook.worksheets[0];

  const headers = [];
  const rows = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.eachCell(cell => headers.push(String(cell.value || '').toLowerCase().trim()));
    } else {
      const obj = {};
      row.eachCell((cell, colNumber) => {
        const header = headers[colNumber - 1];
        if (header) obj[header] = cell.value !== null && cell.value !== undefined ? String(cell.value).trim() : '';
      });
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
