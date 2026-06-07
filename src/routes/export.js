const express = require('express');
const ExcelJS = require('exceljs');
const pool = require('../db/pool');
const { authenticate, requireRole } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate, requireRole('lider', 'admin_rrhh'));

/**
 * GET /api/export/employees
 * Exporta colaboradores + requisitos adicionales + historial a Excel.
 * Líder: solo su equipo. Admin RRHH: todos los de su país.
 */
router.get('/employees', async (req, res, next) => {
  try {
    const { country, role, userId } = req.user;

    // 1. Colaboradores
    let empQuery = `
      SELECT e.id, e.name, e.email, e.area, e.current_level, e.country,
             r.name AS role_name, rf.name AS family_name,
             u.name AS leader_name
      FROM employees e
      LEFT JOIN roles r ON e.role_id = r.id
      LEFT JOIN role_families rf ON r.family_id = rf.id
      LEFT JOIN users u ON e.leader_id = u.id
      WHERE e.country = $1
    `;
    const empParams = [country];
    if (role === 'lider') {
      empQuery += ' AND e.leader_id = $2';
      empParams.push(userId);
    }
    empQuery += ' ORDER BY e.name';

    const emps = await pool.query(empQuery, empParams);
    const empIds = emps.rows.map(e => e.id);

    // 2. Definiciones de requisitos
    const reqDefs = await pool.query('SELECT * FROM additional_requirement_definitions ORDER BY name');

    // 3. Valores de requisitos
    let reqVals = { rows: [] };
    if (empIds.length > 0) {
      reqVals = await pool.query(
        `SELECT arv.employee_id, ard.name AS req_name, arv.value
         FROM additional_requirement_values arv
         JOIN additional_requirement_definitions ard ON arv.requirement_def_id = ard.id
         WHERE arv.employee_id = ANY($1)`,
        [empIds]
      );
    }

    // Agrupar req values por empleado
    const reqByEmp = {};
    reqVals.rows.forEach(v => {
      if (!reqByEmp[v.employee_id]) reqByEmp[v.employee_id] = {};
      reqByEmp[v.employee_id][v.req_name] = v.value;
    });

    // 4. Historial
    let histQuery = `
      SELECT ch.employee_id, e.name AS employee_name,
             ch.change_date, u.name AS changed_by,
             pr.name AS previous_role, nr.name AS new_role,
             ch.previous_level, ch.new_level
      FROM change_history ch
      JOIN employees e ON ch.employee_id = e.id
      LEFT JOIN roles pr ON ch.previous_role_id = pr.id
      LEFT JOIN roles nr ON ch.new_role_id = nr.id
      LEFT JOIN users u ON ch.changed_by_id = u.id
      WHERE ch.country = $1
    `;
    const histParams = [country];
    if (empIds.length > 0 && role === 'lider') {
      histQuery += ' AND ch.employee_id = ANY($2)';
      histParams.push(empIds);
    }
    histQuery += ' ORDER BY ch.change_date DESC';
    const hist = await pool.query(histQuery, histParams);

    // ── Construir Excel ──────────────────────────────────────
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Sistema de Gestión de Competencias';
    workbook.created = new Date();

    // Hoja 1: Colaboradores
    const sheet1 = workbook.addWorksheet('Colaboradores');
    const reqNames = reqDefs.rows.map(r => r.name);
    const headers1 = [
      'Nombre', 'Email', 'País', 'Área', 'Familia de rol', 'Rol', 'Nivel', 'Líder',
      ...reqNames,
    ];

    sheet1.addRow(headers1);
    styleHeaderRow(sheet1.getRow(1));

    emps.rows.forEach(emp => {
      const reqCols = reqNames.map(rn => reqByEmp[emp.id]?.[rn] || '');
      sheet1.addRow([
        emp.name, emp.email, emp.country, emp.area,
        emp.family_name || '', emp.role_name || '', emp.current_level,
        emp.leader_name || '',
        ...reqCols,
      ]);
    });
    sheet1.columns.forEach(col => { col.width = 20; });

    // Hoja 2: Historial
    const sheet2 = workbook.addWorksheet('Historial de cambios');
    const headers2 = ['Colaborador', 'Fecha', 'Realizado por', 'Rol anterior', 'Rol nuevo', 'Nivel anterior', 'Nivel nuevo'];
    sheet2.addRow(headers2);
    styleHeaderRow(sheet2.getRow(1));

    hist.rows.forEach(h => {
      sheet2.addRow([
        h.employee_name,
        new Date(h.change_date).toLocaleDateString('es-CL'),
        h.changed_by,
        h.previous_role || '',
        h.new_role || '',
        h.previous_level,
        h.new_level,
      ]);
    });
    sheet2.columns.forEach(col => { col.width = 22; });

    // Enviar respuesta
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="mapeo_competencias_${country}_${formatDate()}.xlsx"`);
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    next(err);
  }
});

function styleHeaderRow(row) {
  row.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF534AB7' } };
  row.alignment = { vertical: 'middle' };
}

function formatDate() {
  return new Date().toISOString().split('T')[0];
}

module.exports = router;
