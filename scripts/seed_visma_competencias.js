require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('../src/db/pool');

async function seedVismaCompetencias() {
  const client = await pool.connect();
  try {
    // 1. Correr migración de nuevas tablas
    const sql = fs.readFileSync(path.join(__dirname, 'migrate_competencias.sql'), 'utf8');
    await client.query(sql);

    await client.query('BEGIN');

    // ── Familia: Finanzas & Control
    const {rows: [finanzas_y_c]} = await client.query(
      `INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      ['Finanzas & Control']
    );
    const fid_finanzas_y_c = finanzas_y_c.id;

    // Rol: Accountant
    const {rows: [r_accountant]} = await client.query(
      `INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [fid_finanzas_y_c, 'Accountant']
    );
    const rid_accountant = r_accountant.id;

    const {rows: [c_accountant_1]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_accountant, '1. Gestión Contable y Financiera', 1]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_1.id, 1, 'Registra transacciones básicas con supervisión.', 'Ej: Cargó correctamente los asientos de caja chica y los reconcilió con el supervisor al cierre del mes.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_1.id, 2, 'Realiza cierres mensuales con mínima supervisión.', 'Ej: Entregó el balance mensual en fecha, identificando y corrigiendo una diferencia de conciliación bancaria de forma autónoma.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_1.id, 3, 'Gestiona contabilidad completa y prepara estados financieros.', 'Ej: Preparó los estados financieros del trimestre, incluyendo notas explicativas, con cero observaciones del auditor externo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_1.id, 4, 'Lidera auditorías y optimiza procesos contables.', 'Ej: Coordinó la auditoría anual y diseñó un nuevo proceso de reconciliación que redujo el tiempo de cierre en 2 días.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_1.id, 5, 'Define políticas contables y estándares para la organización.', 'Ej: Redactó el manual de políticas contables corporativas adoptado por todas las filiales de LATAM.']
    );

    const {rows: [c_accountant_2]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_accountant, '2. Cumplimiento Normativo', 2]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_2.id, 1, 'Conoce las normas básicas aplicables.', 'Ej: Identificó correctamente qué impuestos aplican a una operación estándar al ser consultado por su líder.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_2.id, 2, 'Aplica normativas locales de forma consistente.', 'Ej: Presentó las declaraciones mensuales de IVA/IGV sin errores ni atrasos durante todo el año.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_2.id, 3, 'Interpreta y aplica NIIF/GAAP y regulaciones fiscales.', 'Ej: Asesoró al área legal sobre el tratamiento contable correcto de un contrato de leasing bajo NIIF 16.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_2.id, 4, 'Asegura el cumplimiento en entornos multijurisdiccionales.', 'Ej: Coordinó el cumplimiento fiscal simultáneo en Chile, Colombia y Perú durante una reorganización societaria.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_2.id, 5, 'Lidera la estrategia de cumplimiento regulatorio.', 'Ej: Implementó un sistema de alertas tempranas de cambios normativos que evitó una multa de alto impacto.']
    );

    const {rows: [c_accountant_3]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_accountant, '3. Análisis e Interpretación de Datos', 3]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_3.id, 1, 'Analiza datos contables con apoyo de herramientas básicas.', 'Ej: Elaboró una tabla dinámica en Excel para resumir los gastos por centro de costo del mes.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_3.id, 2, 'Elabora reportes financieros estándar.', 'Ej: Entregó el reporte mensual de variación de gastos con comentarios explicativos por línea.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_3.id, 3, 'Interpreta variaciones y tendencias financieras.', 'Ej: Detectó un desvío de +15% en costos de personal y presentó el análisis de causa raíz a la gerencia.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_3.id, 4, 'Diseña dashboards y análisis predictivos.', 'Ej: Construyó un dashboard en Power BI que muestra en tiempo real el flujo de caja proyectado a 90 días.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_3.id, 5, 'Implementa sistemas de análisis financiero avanzado.', 'Ej: Lideró la implementación de un modelo de forecasting automatizado integrado al ERP.']
    );

    const {rows: [c_accountant_4]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_accountant, '4. Comunicación y Presentación', 4]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_4.id, 1, 'Comunica información financiera básica a su equipo.', 'Ej: Explicó al equipo el proceso de carga de facturas de forma clara en una reunión de 10 minutos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_4.id, 2, 'Prepara informes claros para su área.', 'Ej: Redactó el informe de gastos mensual con un resumen ejecutivo comprensible para no contadores.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_4.id, 3, 'Presenta resultados a gerencia con claridad y precisión.', 'Ej: Expuso los resultados del trimestre al Comité de Gerencia respondiendo preguntas técnicas con solvencia.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_4.id, 4, 'Explica conceptos financieros complejos a audiencias no especializadas.', 'Ej: Capacitó a los líderes de área sobre cómo leer el P&L de su equipo en un taller de 1 hora.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_4.id, 5, 'Comunica estrategia financiera a nivel ejecutivo y directorio.', 'Ej: Presentó la estrategia de eficiencia financiera al directorio con impacto medible en decisiones de inversión.']
    );

    const {rows: [c_accountant_5]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_accountant, '5. Tecnología y Herramientas Financieras', 5]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_5.id, 1, 'Maneja Excel y software contable básico.', 'Ej: Utilizó fórmulas VLOOKUP y tablas dinámicas para conciliar el libro mayor sin asistencia.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_5.id, 2, 'Utiliza ERP con fluidez para operaciones rutinarias.', 'Ej: Procesó el cierre mensual completo en SAP siguiendo el checklist sin incidencias.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_5.id, 3, 'Optimiza el uso del ERP e integra herramientas de análisis.', 'Ej: Configuró un reporte automático en SAP que redujo 4 horas de trabajo manual mensual.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_5.id, 4, 'Evalúa e implementa nuevas soluciones tecnológicas.', 'Ej: Lideró la evaluación y selección de una herramienta de consolidación financiera para 3 países.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_accountant_5.id, 5, 'Define la arquitectura tecnológica del área financiera.', 'Ej: Diseñó el roadmap de digitalización del área financiera aprobado por el CFO.']
    );

    // Rol: Manager Financial Control - VQMS
    const {rows: [r_manager_financial_]} = await client.query(
      `INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [fid_finanzas_y_c, 'Manager Financial Control - VQMS']
    );
    const rid_manager_financial_ = r_manager_financial_.id;

    const {rows: [c_manager_financial__1]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_manager_financial_, '1. Control Financiero y Reporting', 1]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__1.id, 1, 'Elabora reportes financieros estándar bajo supervisión.', 'Ej: Completó el pack de reporting mensual siguiendo la plantilla corporativa sin errores de datos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__1.id, 2, 'Gestiona el ciclo de reporting mensual con autonomía.', 'Ej: Cerró el mes financiero en los plazos establecidos coordinando con 4 áreas internas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__1.id, 3, 'Diseña y optimiza el marco de control financiero del área.', 'Ej: Rediseñó el proceso de cierre mensual reduciendo el tiempo de 10 a 6 días hábiles.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__1.id, 4, 'Lidera el reporting financiero estratégico para el negocio.', 'Ej: Presentó el análisis de resultados del año al CFO con recomendaciones de eficiencia aceptadas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__1.id, 5, 'Define los estándares de control financiero a nivel corporativo.', 'Ej: Redactó el Manual de Control Financiero de Visma LATAM adoptado por las 3 filiales.']
    );

    const {rows: [c_manager_financial__2]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_manager_financial_, '2. Gestión Presupuestaria', 2]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__2.id, 1, 'Apoya la elaboración de presupuestos con datos históricos.', 'Ej: Compiló y validó los datos históricos de costos para el proceso de budgeting del año siguiente.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__2.id, 2, 'Realiza seguimiento presupuestario y análisis de variaciones.', 'Ej: Entregó el informe mensual de variación presupuestal con análisis de causa para cada desvío mayor al 5%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__2.id, 3, 'Lidera el proceso de budgeting y forecasting del área.', 'Ej: Coordinó el proceso de presupuesto anual con 8 gerencias, entregando el consolidado en plazo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__2.id, 4, 'Gestiona presupuestos complejos y multiárea con visión estratégica.', 'Ej: Diseñó el modelo de forecasting rolling que mejoró la precisión presupuestal del 75% al 92%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__2.id, 5, 'Define la metodología de planificación financiera de la organización.', 'Ej: Implementó la metodología de Zero-Based Budgeting para 2 áreas piloto con ahorro del 12%.']
    );

    const {rows: [c_manager_financial__3]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_manager_financial_, '3. Auditoría y Cumplimiento', 3]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__3.id, 1, 'Conoce los controles internos básicos aplicables.', 'Ej: Completó la autoevaluación de controles internos de su área sin observaciones del auditor.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__3.id, 2, 'Implementa controles internos y documenta procesos.', 'Ej: Documentó los 15 controles clave del proceso de cuentas a pagar con evidencia mensual.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__3.id, 3, 'Lidera auditorías internas y coordina con auditores externos.', 'Ej: Coordinó la auditoría externa anual entregando toda la documentación requerida sin hallazgos críticos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__3.id, 4, 'Diseña el marco de control interno y asegura el cumplimiento regulatorio.', 'Ej: Diseñó la matriz de riesgos y controles del área financiera aprobada por la junta de directores.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__3.id, 5, 'Define políticas de auditoría y gobierno financiero corporativo.', 'Ej: Implementó el framework de gobierno financiero corporativo alineado a los estándares de Visma Group.']
    );

    const {rows: [c_manager_financial__4]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_manager_financial_, '4. Liderazgo y Desarrollo de Equipo', 4]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__4.id, 1, 'Colabora con el equipo y cumple sus responsabilidades.', 'Ej: Participó activamente en el cierre de mes apoyando a un colega con carga de trabajo elevada.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__4.id, 2, 'Guía a colaboradores junior en tareas técnicas.', 'Ej: Acompañó a un analista junior en la preparación de su primer reporte de variaciones presupuestales.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__4.id, 3, 'Gestiona el desempeño del equipo y promueve el desarrollo.', 'Ej: Realizó conversaciones de feedback trimestrales con su equipo y acordó PDIs con cada integrante.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__4.id, 4, 'Lidera equipos multifuncionales y desarrolla talento estratégico.', 'Ej: Desarrolló a 2 analistas que fueron promovidos a roles de senior en el período de evaluación.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__4.id, 5, 'Define la cultura del área y lidera la estrategia de talento financiero.', 'Ej: Implementó el programa de rotación de roles financieros que redujo la rotación del área al 5%.']
    );

    const {rows: [c_manager_financial__5]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_manager_financial_, '5. Toma de Decisiones Basada en Datos', 5]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__5.id, 1, 'Utiliza datos disponibles para análisis básicos.', 'Ej: Analizó la evolución de 3 KPIs financieros y los presentó en la reunión de equipo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__5.id, 2, 'Interpreta indicadores financieros para la toma de decisiones operativas.', 'Ej: Recomendó retrasar una compra de activos al detectar un desvío de liquidez en el forecast a 30 días.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__5.id, 3, 'Construye modelos financieros para respaldar decisiones estratégicas.', 'Ej: Construyó un modelo de sensibilidad de márgenes que respaldó la decisión de ajuste de precios del año.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__5.id, 4, 'Diseña frameworks de decisión basados en datos para la organización.', 'Ej: Implementó un tablero ejecutivo de indicadores que es el punto de partida de cada reunión de directorio.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_manager_financial__5.id, 5, 'Lidera la cultura de decisión data-driven a nivel ejecutivo.', 'Ej: Capacitó a todos los gerentes en el uso del modelo financiero corporativo mejorando la calidad de las decisiones.']
    );

    // ── Familia: Comercial
    const {rows: [comercial]} = await client.query(
      `INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      ['Comercial']
    );
    const fid_comercial = comercial.id;

    // Rol: Assistant Account Manager
    const {rows: [r_assistant_account_]} = await client.query(
      `INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [fid_comercial, 'Assistant Account Manager']
    );
    const rid_assistant_account_ = r_assistant_account_.id;

    const {rows: [c_assistant_account__1]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_assistant_account_, '1. Gestión de Cuentas y Clientes', 1]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__1.id, 1, 'Apoya tareas administrativas de cuentas asignadas.', 'Ej: Preparó carpetas de cliente con propuestas y contratos listos para la firma del Account Manager.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__1.id, 2, 'Realiza seguimiento de clientes con supervisión.', 'Ej: Llamó a 5 clientes para confirmar renovaciones, registrando el resultado en el CRM.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__1.id, 3, 'Gestiona cuentas de forma autónoma y construye relaciones sólidas.', 'Ej: Renovó 3 contratos de forma independiente, logrando un aumento del 10% en el valor de cada uno.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__1.id, 4, 'Desarrolla estrategias de retención y crecimiento en cuentas clave.', 'Ej: Diseñó un plan de cuenta para el cliente más importante del portafolio que resultó en upsell de 2 módulos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__1.id, 5, 'Lidera la estrategia de gestión de cuentas y mentoriza al equipo.', 'Ej: Implementó un modelo de segmentación de clientes adoptado por todo el equipo comercial.']
    );

    const {rows: [c_assistant_account__2]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_assistant_account_, '2. Comunicación Comercial', 2]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__2.id, 1, 'Responde consultas básicas de clientes.', 'Ej: Respondió en menos de 2 horas consultas de clientes sobre precios y condiciones de servicio.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__2.id, 2, 'Elabora propuestas comerciales estándar.', 'Ej: Preparó una propuesta personalizada para un cliente mediano que fue aprobada sin modificaciones.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__2.id, 3, 'Negocia condiciones comerciales con clientes de forma efectiva.', 'Ej: Cerró una renovación con un descuento dentro del rango permitido, manteniendo el margen objetivo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__2.id, 4, 'Conduce negociaciones complejas y cierra acuerdos estratégicos.', 'Ej: Lideró la negociación de un contrato de 3 años con un cliente enterprise, superando el objetivo de ARR.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__2.id, 5, 'Define el discurso comercial y los estándares de comunicación.', 'Ej: Redactó el playbook de ventas adoptado por el equipo que mejoró el ratio de cierre en 20%.']
    );

    const {rows: [c_assistant_account__3]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_assistant_account_, '3. Conocimiento del Producto/Servicio', 3]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__3.id, 1, 'Conoce las características básicas del portafolio.', 'Ej: Respondió correctamente 8 de 10 preguntas técnicas básicas del producto en una evaluación interna.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__3.id, 2, 'Explica beneficios y diferenciadores a clientes.', 'Ej: Realizó una demo del producto a un prospecto destacando los 3 diferenciadores clave frente a la competencia.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__3.id, 3, 'Asesora a clientes en soluciones adaptadas a sus necesidades.', 'Ej: Recomendó el módulo correcto a un cliente luego de analizar su proceso operativo, logrando adopción en 30 días.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__3.id, 4, 'Desarrolla propuestas de valor complejas y personalizadas.', 'Ej: Construyó un ROI calculator personalizado para un cliente enterprise que aceleró el proceso de decisión.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__3.id, 5, 'Define el posicionamiento del portafolio en el mercado.', 'Ej: Lideró el workshop de reposicionamiento del producto principal frente a 2 competidores nuevos.']
    );

    const {rows: [c_assistant_account__4]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_assistant_account_, '4. Gestión Administrativa y CRM', 4]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__4.id, 1, 'Carga datos básicos en el CRM.', 'Ej: Ingresó los datos de 15 nuevos contactos en Salesforce luego de un evento comercial.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__4.id, 2, 'Mantiene actualizado el CRM y genera reportes estándar.', 'Ej: Entregó el reporte semanal de pipeline sin datos faltantes durante 3 meses consecutivos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__4.id, 3, 'Analiza datos del CRM para identificar oportunidades.', 'Ej: Identificó 5 cuentas con alto potencial de upsell analizando el historial de uso en el CRM.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__4.id, 4, 'Optimiza procesos de CRM y entrena al equipo.', 'Ej: Diseñó un flujo automatizado en Salesforce que redujo el tiempo de actualización del pipeline en 40%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__4.id, 5, 'Define estrategia de CRM y gestión de datos de clientes.', 'Ej: Lideró la migración del CRM y definió la nueva taxonomía de datos adoptada por el área comercial.']
    );

    const {rows: [c_assistant_account__5]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_assistant_account_, '5. Orientación a Resultados', 5]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__5.id, 1, 'Cumple tareas asignadas dentro de los plazos establecidos.', 'Ej: Completó todas las tareas del sprint comercial sin atrasos durante el trimestre.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__5.id, 2, 'Alcanza metas individuales con foco en calidad.', 'Ej: Cumplió el 100% de su cuota trimestral manteniendo un NPS de clientes por encima del objetivo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__5.id, 3, 'Supera objetivos y contribuye al cumplimiento del equipo.', 'Ej: Cerró el trimestre al 115% de cuota y colaboró con 2 colegas para que alcanzaran sus metas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__5.id, 4, 'Impulsa resultados del equipo y optimiza la performance comercial.', 'Ej: Implementó una rutina de revisión semanal de pipeline que elevó el ratio de cierre del equipo en 15%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_assistant_account__5.id, 5, 'Define KPIs estratégicos y lidera la cultura de alto desempeño.', 'Ej: Rediseñó el scorecard comercial del área alineado a los objetivos de ARR de Visma para el año.']
    );

    // Rol: Sales Lead
    const {rows: [r_sales_lead]} = await client.query(
      `INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [fid_comercial, 'Sales Lead']
    );
    const rid_sales_lead = r_sales_lead.id;

    const {rows: [c_sales_lead_1]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_sales_lead, '1. Gestión del Pipeline Comercial', 1]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_1.id, 1, 'Actualiza el pipeline con apoyo del equipo.', 'Ej: Actualizó el estado de todas sus oportunidades en el CRM antes de la reunión semanal de pipeline.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_1.id, 2, 'Gestiona su pipeline de forma autónoma con precisión.', 'Ej: Mantuvo el forecast mensual con una precisión del 90% durante todo el trimestre.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_1.id, 3, 'Optimiza el pipeline y anticipa cierres con alta precisión.', 'Ej: Identificó 3 oportunidades estancadas y las reactivó logrando 2 cierres adicionales en el trimestre.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_1.id, 4, 'Lidera la gestión del pipeline del equipo y define forecasts.', 'Ej: Implementó una revisión semanal de pipeline que mejoró la precisión del forecast del equipo al 95%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_1.id, 5, 'Define metodología de ventas y gestión de pipeline organizacional.', 'Ej: Diseñó el Sales Playbook y la metodología de forecasting adoptada por todo el equipo comercial de LATAM.']
    );

    const {rows: [c_sales_lead_2]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_sales_lead, '2. Desarrollo de Negocio y Prospección', 2]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_2.id, 1, 'Realiza prospección básica siguiendo procesos definidos.', 'Ej: Contactó 20 prospectos de la lista asignada siguiendo la secuencia de outreach del equipo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_2.id, 2, 'Identifica y califica oportunidades de forma autónoma.', 'Ej: Identificó y calificó 5 cuentas nuevas en un mercado vertical sin asignación previa.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_2.id, 3, 'Diseña estrategias de prospección y expande el mercado.', 'Ej: Diseñó una campaña de outbound para el sector retail que generó 15 nuevas oportunidades en 2 meses.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_2.id, 4, 'Lidera la expansión de mercado y gestiona cuentas estratégicas.', 'Ej: Abrió el mercado de empresas de más de 500 empleados generando el 30% del nuevo ARR del año.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_2.id, 5, 'Define la estrategia de desarrollo de negocio para la organización.', 'Ej: Definió la estrategia de entrada a un nuevo segmento de mercado aprobada por el Managing Director.']
    );

    const {rows: [c_sales_lead_3]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_sales_lead, '3. Negociación y Cierre', 3]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_3.id, 1, 'Participa en negociaciones con supervisión.', 'Ej: Asistió a 3 reuniones de cierre con el Sales Lead senior tomando notas y aprendiendo el proceso.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_3.id, 2, 'Conduce negociaciones simples y cierra acuerdos con autonomía.', 'Ej: Cerró 2 contratos de forma independiente dentro del rango de descuento permitido.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_3.id, 3, 'Negocia acuerdos complejos y gestiona objeciones con efectividad.', 'Ej: Cerró un contrato de $150K superando 4 objeciones de precio con argumentos de valor documentados.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_3.id, 4, 'Lidera negociaciones estratégicas de alto valor.', 'Ej: Condujo la negociación de un acuerdo de $500K con un cliente enterprise cerrando en condiciones favorables.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_3.id, 5, 'Define metodología de negociación y estándares de cierre.', 'Ej: Creó el framework de negociación del equipo que mejoró el deal size promedio en un 25%.']
    );

    const {rows: [c_sales_lead_4]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_sales_lead, '4. Liderazgo y Desarrollo del Equipo de Ventas', 4]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_4.id, 1, 'Comparte buenas prácticas con colegas.', 'Ej: Compartió su script de llamadas en frío con el equipo en la reunión semanal; 3 colegas lo adoptaron.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_4.id, 2, 'Guía a vendedores junior en el proceso comercial.', 'Ej: Acompañó a 2 nuevos vendedores en sus primeras 5 llamadas de ventas con debriefing post-llamada.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_4.id, 3, 'Gestiona y desarrolla al equipo de ventas para superar objetivos.', 'Ej: Llevó a su equipo de 3 vendedores al 110% de cuota trimestral mediante coaching semanal.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_4.id, 4, 'Lidera equipos comerciales regionales con impacto en resultados.', 'Ej: Gestionó el equipo de ventas de 3 países logrando el mejor año de ARR en la historia de la BU.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_4.id, 5, 'Define la estrategia de talento y cultura del equipo de ventas.', 'Ej: Implementó el programa de onboarding comercial que redujo el ramp-up de nuevos vendedores de 6 a 3 meses.']
    );

    const {rows: [c_sales_lead_5]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_sales_lead, '5. Orientación al Cliente y Valor', 5]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_5.id, 1, 'Entiende las necesidades básicas del cliente.', 'Ej: Completó el discovery call identificando correctamente el pain principal del prospecto.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_5.id, 2, 'Identifica necesidades y propone soluciones adecuadas.', 'Ej: Propuso el módulo correcto al cliente luego de un análisis de su proceso, logrando el cierre en 2 reuniones.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_5.id, 3, 'Construye propuestas de valor personalizadas y genera lealtad.', 'Ej: Presentó un business case de ROI personalizado que aceleró el proceso de decisión de 60 a 20 días.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_5.id, 4, 'Desarrolla relaciones estratégicas con clientes de alto valor.', 'Ej: Convirtió a 3 clientes en referentes activos que generaron 5 nuevas oportunidades de negocio.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_sales_lead_5.id, 5, 'Define la estrategia de customer success y experiencia del cliente.', 'Ej: Diseñó el programa de Customer Advisory Board que redujo el churn del segmento enterprise al 3%.']
    );

    // ── Familia: Tecnología & Datos
    const {rows: [tecnología_y]} = await client.query(
      `INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      ['Tecnología & Datos']
    );
    const fid_tecnología_y = tecnología_y.id;

    // Rol: Data Analyst
    const {rows: [r_data_analyst]} = await client.query(
      `INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [fid_tecnología_y, 'Data Analyst']
    );
    const rid_data_analyst = r_data_analyst.id;

    const {rows: [c_data_analyst_1]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_data_analyst, '1. Análisis y Tratamiento de Datos', 1]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_1.id, 1, 'Limpia y organiza datasets con supervisión.', 'Ej: Eliminó duplicados y normalizó formatos de fecha en un dataset de 50.000 registros bajo guía del senior.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_1.id, 2, 'Realiza análisis exploratorios y detección de patrones básicos.', 'Ej: Identificó que el 80% de los tickets de soporte provenían de 3 tipos de error, presentando el hallazgo al equipo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_1.id, 3, 'Ejecuta análisis estadísticos y construye modelos descriptivos.', 'Ej: Construyó un modelo de segmentación de clientes por comportamiento de uso que el área de producto adoptó.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_1.id, 4, 'Diseña soluciones analíticas complejas para problemas de negocio.', 'Ej: Diseñó un modelo de propensión a churn que permitió al equipo de CS priorizar retenciones preventivas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_1.id, 5, 'Define la estrategia analítica y metodologías para la organización.', 'Ej: Definió el framework de datos y metodologías analíticas adoptado por todos los equipos de datos de Visma LATAM.']
    );

    const {rows: [c_data_analyst_2]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_data_analyst, '2. Visualización y Storytelling con Datos', 2]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_2.id, 1, 'Crea gráficos básicos en Excel o herramientas estándar.', 'Ej: Entregó un gráfico de barras comparativo de ventas por región que fue incluido en la presentación de gerencia.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_2.id, 2, 'Construye dashboards funcionales en BI tools.', 'Ej: Construyó un dashboard en Power BI con 5 KPIs del negocio utilizado diariamente por el equipo comercial.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_2.id, 3, 'Diseña visualizaciones impactantes y narrativas basadas en datos.', 'Ej: Presentó un análisis de retención con visualizaciones interactivas que impulsó una decisión de producto en 48 hs.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_2.id, 4, 'Presenta hallazgos complejos a audiencias ejecutivas.', 'Ej: Expuso los resultados del análisis de expansión de mercado al Comité Directivo con un story telling de datos claro.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_2.id, 5, 'Define los estándares de visualización y cultura de datos.', 'Ej: Creó la guía de estilo de visualizaciones de datos de Visma LATAM adoptada por todos los analistas.']
    );

    const {rows: [c_data_analyst_3]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_data_analyst, '3. Herramientas y Lenguajes de Análisis', 3]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_3.id, 1, 'Usa SQL básico y Excel para consultas simples.', 'Ej: Extrajo el listado de clientes activos por país con una query SQL básica sin asistencia.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_3.id, 2, 'Maneja SQL avanzado, Python/R para análisis rutinarios.', 'Ej: Automatizó la extracción y limpieza semanal de datos con un script de Python que ahorra 3 horas por semana.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_3.id, 3, 'Domina múltiples herramientas y automatiza flujos de trabajo.', 'Ej: Construyó un pipeline de datos en Airflow que alimenta automáticamente 4 dashboards de negocio.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_3.id, 4, 'Implementa pipelines de datos y arquitecturas analíticas.', 'Ej: Diseñó e implementó el data warehouse del área de producto sobre BigQuery.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_3.id, 5, 'Evalúa e incorpora nuevas tecnologías y frameworks analíticos.', 'Ej: Evaluó 3 plataformas de ML y recomendó la adopción de dbt para transformación de datos en toda la organización.']
    );

    const {rows: [c_data_analyst_4]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_data_analyst, '4. Pensamiento Crítico y Resolución de Problemas', 4]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_4.id, 1, 'Identifica problemas simples con apoyo del equipo.', 'Ej: Detectó una inconsistencia en los datos de facturación y la reportó al equipo para su corrección.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_4.id, 2, 'Propone soluciones analíticas a problemas estructurados.', 'Ej: Propuso y ejecutó un análisis de causa raíz para una caída en la tasa de activación de nuevos usuarios.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_4.id, 3, 'Formula hipótesis y diseña experimentos para validarlas.', 'Ej: Diseñó un A/B test para validar si un cambio en el onboarding mejoraba la activación; presentó resultados al PO.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_4.id, 4, 'Resuelve problemas analíticos complejos y ambiguos de forma autónoma.', 'Ej: Desarrolló un modelo de forecasting de demanda sin precedentes en el equipo, logrando un error menor al 8%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_4.id, 5, 'Anticipa tendencias y define agenda de innovación analítica.', 'Ej: Identificó la oportunidad de usar NLP para analizar tickets de soporte y lideró su implementación.']
    );

    const {rows: [c_data_analyst_5]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_data_analyst, '5. Colaboración con el Negocio', 5]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_5.id, 1, 'Entiende requerimientos básicos con orientación.', 'Ej: Completó el brief de análisis correctamente luego de una reunión de clarificación con su líder.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_5.id, 2, 'Traduce requerimientos del negocio en análisis concretos.', 'Ej: Convirtió una solicitud vaga de 'entender las ventas' en un análisis de 3 dimensiones que el área de ventas usó.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_5.id, 3, 'Actúa como socio analítico de las áreas de negocio.', 'Ej: Participó en la planificación trimestral de producto aportando insights de datos que influenciaron el roadmap.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_5.id, 4, 'Genera insights estratégicos que impactan decisiones de alto nivel.', 'Ej: Su análisis de rentabilidad por segmento de cliente fue el input principal para la decisión de precio del año.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_data_analyst_5.id, 5, 'Lidera la agenda data-driven de la organización.', 'Ej: Implementó el programa 'Data Champions' que capacitó a 30 colaboradores para tomar decisiones basadas en datos.']
    );

    // Rol: Developer
    const {rows: [r_developer]} = await client.query(
      `INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [fid_tecnología_y, 'Developer']
    );
    const rid_developer = r_developer.id;

    const {rows: [c_developer_1]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_developer, '1. Desarrollo y Calidad de Código', 1]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_1.id, 1, 'Escribe código funcional con supervisión y revisión constante.', 'Ej: Implementó un endpoint REST bajo guía del Tech Lead, incorporando todos los comentarios del code review.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_1.id, 2, 'Desarrolla funcionalidades completas con buenas prácticas básicas.', 'Ej: Entregó un módulo de notificaciones con tests unitarios y documentación, sin observaciones mayores en el PR.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_1.id, 3, 'Produce código limpio, mantenible y bien documentado de forma autónoma.', 'Ej: Refactorizó un servicio legado reduciendo la deuda técnica en 30% sin introducir regresiones.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_1.id, 4, 'Lidera estándares de código y arquitectura a nivel de módulo.', 'Ej: Definió las convenciones de código para el equipo y las documentó en el wiki técnico del proyecto.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_1.id, 5, 'Define arquitectura técnica y visión de ingeniería del producto.', 'Ej: Diseñó la arquitectura de microservicios que permitió escalar el producto de 10k a 100k usuarios.']
    );

    const {rows: [c_developer_2]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_developer, '2. Resolución de Problemas Técnicos', 2]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_2.id, 1, 'Resuelve bugs simples con orientación.', 'Ej: Corrigió un bug de validación de formulario siguiendo la guía del senior en menos de 2 horas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_2.id, 2, 'Diagnostica y resuelve problemas de complejidad media.', 'Ej: Identificó y resolvió una condición de carrera en el módulo de pagos que causaba errores intermitentes.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_2.id, 3, 'Depura problemas complejos y propone soluciones escalables.', 'Ej: Resolvió un problema de degradación de performance en producción analizando trazas de Datadog.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_2.id, 4, 'Anticipa fallas técnicas y diseña sistemas resilientes.', 'Ej: Implementó circuit breakers y retry policies que redujeron los incidentes de producción en un 60%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_2.id, 5, 'Define estrategias técnicas para resolver problemas sistémicos.', 'Ej: Lideró el postmortem de un incidente crítico y diseñó el plan de resiliencia adoptado por todos los equipos.']
    );

    const {rows: [c_developer_3]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_developer, '3. Colaboración y Trabajo en Equipo', 3]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_3.id, 1, 'Participa activamente en ceremonias del equipo.', 'Ej: Asistió a todas las dailies y retrospectivas, aportando bloqueos claros y acciones de mejora concretas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_3.id, 2, 'Colabora en code reviews y comparte conocimiento.', 'Ej: Revisó 3 PRs por semana con comentarios constructivos y organizó una sesión técnica sobre testing.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_3.id, 3, 'Mentoriza juniors y facilita la dinámica del equipo.', 'Ej: Acompañó el onboarding de 2 nuevos developers, acortando su tiempo de productividad de 4 a 2 semanas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_3.id, 4, 'Lidera el equipo técnico y gestiona dependencias entre equipos.', 'Ej: Coordinó la integración técnica con 2 equipos externos eliminando bloqueos que retrasaban el release.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_3.id, 5, 'Define cultura de ingeniería y colaboración organizacional.', 'Ej: Creó el Engineering Handbook de Visma LATAM adoptado por todos los equipos de desarrollo.']
    );

    const {rows: [c_developer_4]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_developer, '4. Adaptación Tecnológica', 4]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_4.id, 1, 'Aprende nuevas tecnologías con apoyo del equipo.', 'Ej: Completó el curso de Docker asignado y desplegó su primer contenedor en el ambiente de staging.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_4.id, 2, 'Adopta nuevas herramientas y frameworks de forma autónoma.', 'Ej: Migró un módulo a React 18 de forma autónoma, aplicando las nuevas APIs de concurrencia correctamente.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_4.id, 3, 'Evalúa y propone adopción de nuevas tecnologías al equipo.', 'Ej: Presentó un spike de evaluación de tres ORMs y recomendó Prisma con justificación técnica y de performance.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_4.id, 4, 'Lidera la evolución tecnológica del stack con visión estratégica.', 'Ej: Lideró la migración de la arquitectura monolítica a microservicios en 6 meses sin downtime.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_4.id, 5, 'Define la hoja de ruta tecnológica de la organización.', 'Ej: Definió el tech radar de Visma LATAM alineado a la estrategia de producto para los próximos 2 años.']
    );

    const {rows: [c_developer_5]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_developer, '5. Entrega de Valor y Agilidad', 5]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_5.id, 1, 'Completa tareas dentro del sprint con supervisión.', 'Ej: Cerró todas las tareas del sprint sin dejar work in progress al final de la iteración.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_5.id, 2, 'Estima y entrega trabajo de forma consistente dentro del sprint.', 'Ej: Mantuvo un velocity consistente durante 4 sprints consecutivos con estimaciones dentro del 10% de variación.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_5.id, 3, 'Gestiona su backlog y entrega valor de forma predecible.', 'Ej: Priorizó sus tareas de forma autónoma asegurando que los ítems de mayor impacto se completaran primero.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_5.id, 4, 'Optimiza el flujo de entrega del equipo e identifica impedimentos.', 'Ej: Detectó un cuello de botella en el proceso de QA y propuso una solución que redujo el cycle time en 30%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_developer_5.id, 5, 'Define procesos de delivery y cultura de mejora continua.', 'Ej: Implementó el framework de métricas DORA en el equipo, logrando pasar de deploy semanal a diario.']
    );

    // Rol: Tech Lead
    const {rows: [r_tech_lead]} = await client.query(
      `INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [fid_tecnología_y, 'Tech Lead']
    );
    const rid_tech_lead = r_tech_lead.id;

    const {rows: [c_tech_lead_1]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_tech_lead, '1. Liderazgo Técnico y Arquitectura', 1]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_1.id, 1, 'Comprende la arquitectura del sistema y contribuye con decisiones básicas.', 'Ej: Seleccionó correctamente el patrón de diseño más adecuado para una nueva feature al ser consultado por el equipo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_1.id, 2, 'Define soluciones técnicas para funcionalidades de mediana complejidad.', 'Ej: Diseñó la solución técnica de un módulo de notificaciones con diagramas y criterios de aceptación claros.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_1.id, 3, 'Diseña la arquitectura de módulos o servicios con visión de escalabilidad.', 'Ej: Diseñó el servicio de autenticación que soporta 10x el volumen actual sin cambios de infraestructura.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_1.id, 4, 'Lidera la arquitectura del sistema completo con visión de largo plazo.', 'Ej: Definió la arquitectura de la plataforma para soportar la expansión a 2 nuevos países sin deuda técnica.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_1.id, 5, 'Define la visión tecnológica y arquitectura de la organización.', 'Ej: Presentó el Technology Blueprint de Visma LATAM al CTO global con aprobación para implementación.']
    );

    const {rows: [c_tech_lead_2]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_tech_lead, '2. Desarrollo de Equipo Técnico', 2]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_2.id, 1, 'Comparte conocimiento técnico con el equipo.', 'Ej: Facilitó una sesión técnica sobre patrones de diseño a la que asistieron 8 developers del equipo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_2.id, 2, 'Realiza code reviews constructivos y mentoriza juniors.', 'Ej: Realizó code reviews detallados para 2 developers junior logrando mejorar su calidad de código en 4 semanas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_2.id, 3, 'Diseña planes de desarrollo técnico para el equipo.', 'Ej: Definió el skill matrix del equipo e identificó las brechas que se cerraron con un plan de capacitación de 3 meses.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_2.id, 4, 'Lidera el crecimiento técnico del equipo y construye capacidades.', 'Ej: Desarrolló a 2 seniors que asumieron el liderazgo técnico de sus propios módulos en 6 meses.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_2.id, 5, 'Define el modelo de desarrollo técnico y cultura de ingeniería.', 'Ej: Creó el Engineering Career Ladder de Visma LATAM adoptado por todas las BUs de tecnología.']
    );

    const {rows: [c_tech_lead_3]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_tech_lead, '3. Gestión Técnica de Proyectos', 3]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_3.id, 1, 'Estima tareas y cumple compromisos técnicos básicos.', 'Ej: Estimó correctamente las tareas del sprint con una variación menor al 15% durante 3 sprints consecutivos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_3.id, 2, 'Gestiona dependencias técnicas dentro del equipo.', 'Ej: Identificó y resolvió 3 dependencias técnicas que bloqueaban el avance del sprint antes de que impactaran.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_3.id, 3, 'Lidera la planificación técnica y gestiona riesgos del proyecto.', 'Ej: Identificó un riesgo técnico crítico con 3 semanas de antelación y rediseñó el plan para mitigarlo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_3.id, 4, 'Gestiona proyectos técnicos complejos con múltiples dependencias.', 'Ej: Lideró la migración de base de datos de 6 semanas con 4 equipos involucrados sin downtime.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_3.id, 5, 'Define metodologías de gestión técnica para la organización.', 'Ej: Implementó el framework de Technical Project Management adoptado por todos los Tech Leads de Visma LATAM.']
    );

    const {rows: [c_tech_lead_4]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_tech_lead, '4. Calidad e Innovación Técnica', 4]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_4.id, 1, 'Sigue estándares de calidad técnica establecidos.', 'Ej: Cumplió el 100% del checklist de calidad del equipo en todos sus PRs del trimestre.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_4.id, 2, 'Propone mejoras técnicas y de proceso al equipo.', 'Ej: Propuso implementar mutation testing que el equipo adoptó y mejoró la cobertura real de tests en un 20%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_4.id, 3, 'Lidera iniciativas de deuda técnica y adopción de mejores prácticas.', 'Ej: Lideró un sprint de deuda técnica que eliminó el 40% de los issues críticos del backlog de calidad.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_4.id, 4, 'Diseña programas de innovación técnica con impacto en el negocio.', 'Ej: Lanzó el Hackathon técnico semestral que generó 2 features hoy en producción.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_4.id, 5, 'Define la agenda de innovación tecnológica organizacional.', 'Ej: Presentó el Tech Innovation Roadmap de Visma LATAM aprobado por el Group CTO.']
    );

    const {rows: [c_tech_lead_5]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_tech_lead, '5. Colaboración con Producto y Negocio', 5]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_5.id, 1, 'Entiende los requerimientos de negocio básicos.', 'Ej: Participó en el refinamiento haciendo preguntas técnicas relevantes que clarificaron el alcance de la historia.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_5.id, 2, 'Traduce requerimientos de negocio en soluciones técnicas.', 'Ej: Convirtió un requerimiento ambiguo de 'mejorar la performance' en 3 tareas técnicas medibles.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_5.id, 3, 'Actúa como puente entre negocio y tecnología en decisiones clave.', 'Ej: Facilitó la discusión entre producto e ingeniería para decidir entre build vs buy, presentando el análisis de trade-offs.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_5.id, 4, 'Lidera la alineación estratégica entre tecnología y objetivos de negocio.', 'Ej: Participó en el planning estratégico anual definiendo las capacidades técnicas necesarias para los objetivos del negocio.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_tech_lead_5.id, 5, 'Define el modelo de colaboración entre tecnología y las áreas de negocio.', 'Ej: Diseñó el modelo de Tech-Business Partnership de Visma LATAM que aceleró el time-to-market en un 30%.']
    );

    // Rol: Technical Support
    const {rows: [r_technical_support]} = await client.query(
      `INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [fid_tecnología_y, 'Technical Support']
    );
    const rid_technical_support = r_technical_support.id;

    const {rows: [c_technical_support_1]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_technical_support, '1. Soporte Técnico e Infraestructura', 1]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_1.id, 1, 'Resuelve incidencias técnicas básicas con procedimientos definidos.', 'Ej: Reinstató acceso a un usuario bloqueado siguiendo el procedimiento de Active Directory en 15 minutos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_1.id, 2, 'Diagnostica y resuelve problemas de hardware, software y red.', 'Ej: Diagnosticó y resolvió un problema de conectividad VPN para un colaborador remoto en menos de 1 hora.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_1.id, 3, 'Gestiona incidencias complejas e infraestructura con autonomía.', 'Ej: Reconfiguró el servidor de archivos durante una migración sin incidencias y con comunicación proactiva.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_1.id, 4, 'Lidera la gestión de infraestructura y optimización de sistemas.', 'Ej: Implementó la monitorización proactiva de servidores que redujo los incidentes reactivos en un 40%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_1.id, 5, 'Define la estrategia de infraestructura y soporte técnico.', 'Ej: Definió el roadmap de modernización de infraestructura de Visma LATAM aprobado por la dirección.']
    );

    const {rows: [c_technical_support_2]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_technical_support, '2. Gestión de Tickets y SLAs', 2]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_2.id, 1, 'Registra y actualiza tickets siguiendo el proceso establecido.', 'Ej: Completó todos los campos obligatorios del ticket y actualizó el estado en tiempo real durante el mes.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_2.id, 2, 'Gestiona tickets cumpliendo SLAs definidos.', 'Ej: Cerró el 95% de los tickets dentro del SLA durante el trimestre, por encima del objetivo del 90%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_2.id, 3, 'Optimiza el flujo de tickets y asegura el cumplimiento de SLAs.', 'Ej: Redujo el backlog de tickets abiertos de 45 a 12 en 2 semanas priorizando por impacto y urgencia.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_2.id, 4, 'Diseña procesos de gestión de tickets y define SLAs.', 'Ej: Redefinió los SLAs por categoría de incidente que mejoraron la satisfacción del usuario interno al 92%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_2.id, 5, 'Define la estrategia de gestión de servicio y gobierno de SLAs.', 'Ej: Implementó el framework ITIL adaptado para Visma LATAM que estandarizó la gestión de servicios de TI.']
    );

    const {rows: [c_technical_support_3]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_technical_support, '3. Seguridad y Buenas Prácticas', 3]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_3.id, 1, 'Aplica procedimientos básicos de seguridad informática.', 'Ej: Configuró el MFA para todos los nuevos usuarios siguiendo el procedimiento de seguridad sin excepciones.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_3.id, 2, 'Implementa controles de seguridad en dispositivos y sistemas.', 'Ej: Aplicó el hardening de seguridad en 20 equipos nuevos siguiendo el checklist corporativo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_3.id, 3, 'Gestiona políticas de seguridad y responde a incidentes.', 'Ej: Detectó y bloqueó un intento de phishing en la red, notificando al equipo en menos de 30 minutos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_3.id, 4, 'Lidera la estrategia de seguridad de endpoint y redes.', 'Ej: Implementó la solución de EDR en todos los equipos de la organización reduciendo el riesgo de ciberseguridad.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_3.id, 5, 'Define la política de seguridad informática organizacional.', 'Ej: Redactó la Política de Seguridad Informática de Visma LATAM aprobada por la dirección y auditores externos.']
    );

    const {rows: [c_technical_support_4]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_technical_support, '4. Comunicación y Orientación al Usuario', 4]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_4.id, 1, 'Responde consultas de usuarios con claridad y paciencia.', 'Ej: Explicó a un usuario no técnico cómo configurar su correo en el móvil paso a paso con lenguaje simple.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_4.id, 2, 'Gestiona expectativas y comunica soluciones de forma efectiva.', 'Ej: Informó proactivamente a un usuario sobre el avance de su ticket evitando que escalara la solicitud.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_4.id, 3, 'Construye relaciones de confianza con usuarios y áreas de negocio.', 'Ej: Fue reconocido por el área de Finanzas como el referente de TI de confianza para sus requerimientos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_4.id, 4, 'Lidera la experiencia del usuario interno y gestiona cuentas.', 'Ej: Realizó revisiones trimestrales de servicio con las 5 áreas principales logrando un CSAT del 95%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_4.id, 5, 'Define estándares de servicio y cultura de soporte interno.', 'Ej: Creó el Service Catalogue de TI que estandarizó los niveles de servicio esperados por toda la organización.']
    );

    const {rows: [c_technical_support_5]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_technical_support, '5. Automatización y Mejora Continua', 5]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_5.id, 1, 'Identifica tareas repetitivas en su trabajo cotidiano.', 'Ej: Reportó al líder que el proceso de creación de usuarios tardaba 30 minutos y podría automatizarse.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_5.id, 2, 'Automatiza procesos básicos de soporte con herramientas estándar.', 'Ej: Creó un script de PowerShell que automatizó la creación de usuarios en AD reduciendo el tiempo de 30 a 2 minutos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_5.id, 3, 'Diseña automatizaciones que mejoran la eficiencia del equipo.', 'Ej: Automatizó 5 procesos repetitivos del equipo liberando 8 horas semanales para soporte de mayor valor.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_5.id, 4, 'Lidera iniciativas de automatización con impacto medible.', 'Ej: Implementó un bot de soporte de nivel 0 que resuelve automáticamente el 25% de los tickets entrantes.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_technical_support_5.id, 5, 'Define la estrategia de automatización del área técnica.', 'Ej: Definió el roadmap de automatización de TI de Visma LATAM con ahorro proyectado de 500 horas/año.']
    );

    // Rol: Quality Assurer
    const {rows: [r_quality_assurer]} = await client.query(
      `INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [fid_tecnología_y, 'Quality Assurer']
    );
    const rid_quality_assurer = r_quality_assurer.id;

    const {rows: [c_quality_assurer_1]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_quality_assurer, '1. Diseño y Ejecución de Pruebas', 1]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_1.id, 1, 'Ejecuta casos de prueba predefinidos con supervisión.', 'Ej: Ejecutó el plan de regresión del sprint y documentó los resultados siguiendo la plantilla del equipo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_1.id, 2, 'Diseña y ejecuta casos de prueba funcionales de forma autónoma.', 'Ej: Diseñó 30 casos de prueba para el módulo de pagos cubriendo flujos positivos y negativos sin asistencia.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_1.id, 3, 'Diseña estrategias de testing completas.', 'Ej: Diseñó el plan de testing end-to-end del lanzamiento incluyendo pruebas de carga y seguridad.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_1.id, 4, 'Lidera la estrategia de calidad para productos complejos.', 'Ej: Definió la estrategia de QA para la plataforma de 3 productos, logrando cero bugs críticos en producción.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_1.id, 5, 'Define el framework de calidad y las metodologías de testing.', 'Ej: Creó el Quality Framework de Visma LATAM adoptado por todos los equipos de producto.']
    );

    const {rows: [c_quality_assurer_2]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_quality_assurer, '2. Automatización de Pruebas', 2]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_2.id, 1, 'Conoce herramientas de automatización a nivel básico.', 'Ej: Ejecutó la suite de tests automatizados existente e interpretó correctamente los resultados.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_2.id, 2, 'Crea y mantiene scripts de automatización básicos.', 'Ej: Automatizó 20 casos de prueba de regresión en Selenium reduciendo el tiempo de ejecución en 2 horas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_2.id, 3, 'Diseña y optimiza frameworks de automatización de pruebas.', 'Ej: Rediseñó el framework de automatización reduciendo el tiempo de ejecución de la suite de 4 horas a 45 minutos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_2.id, 4, 'Lidera la implementación de automatización a escala.', 'Ej: Implementó automatización en 3 equipos logrando que el 70% de los casos de regresión se ejecuten automáticamente.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_2.id, 5, 'Define la estrategia de automatización y selección de herramientas.', 'Ej: Evaluó y seleccionó Playwright como estándar de automatización de Visma LATAM con justificación técnica.']
    );

    const {rows: [c_quality_assurer_3]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_quality_assurer, '3. Análisis y Reporte de Defectos', 3]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_3.id, 1, 'Registra defectos con información básica.', 'Ej: Creó tickets de bug con pasos para reproducir, ambiente y screenshot en Jira sin omisiones.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_3.id, 2, 'Documenta defectos con detalle y reproduce errores.', 'Ej: Documentó un bug intermitente con logs, video de reproducción y análisis de frecuencia de aparición.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_3.id, 3, 'Analiza patrones de defectos y propone mejoras preventivas.', 'Ej: Identificó que el 60% de los bugs provenían del módulo de integración y propuso refactorizar su test suite.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_3.id, 4, 'Lidera análisis de causa raíz y define procesos de prevención.', 'Ej: Condujo el RCA de un incidente crítico e implementó 4 controles preventivos aprobados por el equipo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_3.id, 5, 'Define estándares de calidad y gestión de defectos organizacionales.', 'Ej: Definió la taxonomía de defectos y las métricas de calidad adoptadas por todos los equipos de desarrollo.']
    );

    const {rows: [c_quality_assurer_4]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_quality_assurer, '4. Integración en Procesos Ágiles', 4]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_4.id, 1, 'Participa en ceremonias ágiles y entiende el proceso.', 'Ej: Participó en todas las dailies y aportó el estado de testing de forma clara y concisa.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_4.id, 2, 'Colabora activamente con el equipo en ciclos de desarrollo ágil.', 'Ej: Participó en el refinamiento detectando ambigüedades en los criterios de aceptación antes del desarrollo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_4.id, 3, 'Lidera la integración de calidad en el pipeline de CI/CD.', 'Ej: Configuró la suite de tests en el pipeline de CI logrando que ningún bug crítico llegue a staging.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_4.id, 4, 'Diseña procesos de QA para equipos distribuidos.', 'Ej: Diseñó el proceso de quality gate para 4 equipos remotos con documentación clara y métricas de seguimiento.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_4.id, 5, 'Define la cultura de calidad continua en la organización.', 'Ej: Implementó el programa 'Quality First' que redujo la tasa de bugs en producción en un 50% en 6 meses.']
    );

    const {rows: [c_quality_assurer_5]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_quality_assurer, '5. Comunicación y Gestión de Calidad', 5]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_5.id, 1, 'Reporta el estado de pruebas a su equipo.', 'Ej: Entregó el daily testing report con el porcentaje de ejecución y bugs abiertos sin omisiones.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_5.id, 2, 'Comunica riesgos de calidad a stakeholders relevantes.', 'Ej: Alertó al PO sobre un riesgo de calidad antes del release y propuso una estrategia de mitigación.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_5.id, 3, 'Gestiona expectativas de calidad con Product Owner y desarrollo.', 'Ej: Negoció el alcance del testing con el PO ante una restricción de tiempo, documentando los riesgos aceptados.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_5.id, 4, 'Lidera la comunicación de calidad a nivel ejecutivo.', 'Ej: Presentó el Quality Dashboard mensual al VP de Producto con tendencias y plan de mejora.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_quality_assurer_5.id, 5, 'Define la estrategia de comunicación de calidad organizacional.', 'Ej: Implementó el Quality Report corporativo que es el estándar de reporte de calidad de Visma LATAM.']
    );

    // ── Familia: Producto & Dirección
    const {rows: [producto_y_d]} = await client.query(
      `INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      ['Producto & Dirección']
    );
    const fid_producto_y_d = producto_y_d.id;

    // Rol: Product Owner
    const {rows: [r_product_owner]} = await client.query(
      `INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [fid_producto_y_d, 'Product Owner']
    );
    const rid_product_owner = r_product_owner.id;

    const {rows: [c_product_owner_1]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_product_owner, '1. Gestión del Product Backlog', 1]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_1.id, 1, 'Crea y documenta historias de usuario con apoyo.', 'Ej: Escribió 10 user stories con criterios de aceptación claros bajo revisión del PO senior.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_1.id, 2, 'Prioriza el backlog de forma autónoma con criterios claros.', 'Ej: Ordenó el backlog usando el framework RICE y lo presentó al equipo con justificación clara.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_1.id, 3, 'Gestiona un backlog complejo, balanceando valor, riesgo y capacidad.', 'Ej: Replanificó el backlog mid-sprint ante un cambio de regulación sin impactar los objetivos del trimestre.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_1.id, 4, 'Diseña la estrategia de backlog para múltiples equipos o productos.', 'Ej: Coordinó el backlog de 3 equipos de desarrollo para lanzar una feature interdependiente a tiempo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_1.id, 5, 'Define frameworks de gestión de producto a nivel organizacional.', 'Ej: Creó el PO Playbook de Visma LATAM adoptado por todos los Product Owners de la organización.']
    );

    const {rows: [c_product_owner_2]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_product_owner, '2. Visión y Estrategia de Producto', 2]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_2.id, 1, 'Entiende la visión del producto y su contexto de negocio.', 'Ej: Explicó correctamente el posicionamiento del producto a un nuevo integrante del equipo en su primera semana.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_2.id, 2, 'Contribuye a la definición de roadmap con datos del mercado.', 'Ej: Aportó 3 oportunidades de mercado identificadas en entrevistas de usuario para el proceso de roadmap anual.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_2.id, 3, 'Define el roadmap del producto alineado a la estrategia de negocio.', 'Ej: Presentó el roadmap trimestral al Comité de Producto con justificación de negocio para cada iniciativa.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_2.id, 4, 'Lidera la visión de producto con impacto en múltiples unidades.', 'Ej: Definió la visión del producto para los próximos 2 años alineada a los OKRs de Visma LATAM.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_2.id, 5, 'Define la estrategia de portafolio de productos.', 'Ej: Lideró la racionalización del portafolio eliminando 2 productos de bajo ROI y priorizando 3 de alto impacto.']
    );

    const {rows: [c_product_owner_3]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_product_owner, '3. Colaboración con Stakeholders', 3]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_3.id, 1, 'Participa en reuniones con stakeholders y recoge feedback.', 'Ej: Tomó notas detalladas en la reunión con Ventas y las trasladó como requerimientos al backlog.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_3.id, 2, 'Gestiona expectativas de stakeholders de forma efectiva.', 'Ej: Comunicó proactivamente un retraso de feature con alternativas, manteniendo la confianza del área comercial.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_3.id, 3, 'Negocia prioridades y alinea a stakeholders en decisiones clave.', 'Ej: Facilitó una sesión de priorización entre Ventas y Soporte que resultó en un backlog aceptado por ambas áreas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_3.id, 4, 'Lidera la gestión de stakeholders ejecutivos y estratégicos.', 'Ej: Presentó la estrategia de producto al CEO y al cliente más importante logrando alineación estratégica.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_3.id, 5, 'Define modelos de gobernanza de producto con múltiples partes interesadas.', 'Ej: Implementó el Product Council de Visma que regula las decisiones de producto entre todas las BUs.']
    );

    const {rows: [c_product_owner_4]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_product_owner, '4. Orientación al Usuario y Mercado', 4]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_4.id, 1, 'Realiza entrevistas básicas y analiza feedback de usuarios.', 'Ej: Condujo 5 entrevistas de usuario y sintetizó los hallazgos en un documento compartido con el equipo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_4.id, 2, 'Conduce investigaciones de usuario y traduce insights en requerimientos.', 'Ej: Realizó un estudio de usabilidad que identificó 3 fricciones críticas traducidas en épicas del backlog.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_4.id, 3, 'Diseña estrategias de discovery y valida hipótesis de producto.', 'Ej: Diseñó y ejecutó un experimento que validó en 2 semanas si una nueva feature tenía demanda real.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_4.id, 4, 'Lidera la estrategia de investigación y define la propuesta de valor.', 'Ej: Redefinió el ICP (Ideal Customer Profile) del producto basándose en 50 entrevistas de usuario y datos de uso.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_4.id, 5, 'Define la visión de experiencia de usuario a nivel organizacional.', 'Ej: Definió los principios de UX de Visma LATAM adoptados por todos los equipos de producto.']
    );

    const {rows: [c_product_owner_5]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_product_owner, '5. Métricas y Decisiones Basadas en Datos', 5]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_5.id, 1, 'Comprende las métricas básicas del producto.', 'Ej: Siguió la evolución del DAU y el churn semanal y los reportó correctamente en la reunión de equipo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_5.id, 2, 'Analiza métricas para priorizar decisiones de producto.', 'Ej: Usó datos de adopción de features para desprioritizar 2 épicas de bajo uso en la planificación trimestral.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_5.id, 3, 'Define OKRs y KPIs del producto y los utiliza para decisiones.', 'Ej: Definió los OKRs del producto para el año y tomó 3 decisiones de roadmap respaldadas en su evolución.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_5.id, 4, 'Diseña el framework de métricas y cultura data-driven del equipo.', 'Ej: Implementó un dashboard de producto con North Star Metric y métricas de input para todo el equipo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_product_owner_5.id, 5, 'Define la estrategia de medición de impacto del portafolio.', 'Ej: Diseñó el modelo de medición de ROI del portafolio de productos adoptado por la dirección.']
    );

    // Rol: Managing Director
    const {rows: [r_managing_director]} = await client.query(
      `INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [fid_producto_y_d, 'Managing Director']
    );
    const rid_managing_director = r_managing_director.id;

    const {rows: [c_managing_director_1]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_managing_director, '1. Liderazgo Estratégico', 1]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_1.id, 1, 'Entiende la visión y estrategia de la organización.', 'Ej: Presentó correctamente los objetivos estratégicos de Visma LATAM en el onboarding de su equipo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_1.id, 2, 'Contribuye a la definición de objetivos estratégicos del área.', 'Ej: Propuso 3 iniciativas de crecimiento alineadas al plan estratégico que fueron incluidas en el plan anual.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_1.id, 3, 'Lidera la ejecución de la estrategia de negocio en su unidad.', 'Ej: Ejecutó el plan estratégico de su unidad logrando el 105% de los objetivos anuales.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_1.id, 4, 'Define y comunica la estrategia con impacto regional.', 'Ej: Presentó la estrategia de expansión a Colombia al Comité de Visma Group obteniendo aprobación y funding.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_1.id, 5, 'Lidera la visión a largo plazo y posiciona a la organización en el mercado.', 'Ej: Definió el plan de crecimiento a 3 años que posicionó a Visma LATAM como líder en su segmento de mercado.']
    );

    const {rows: [c_managing_director_2]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_managing_director, '2. Gestión de P&L y Resultados', 2]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_2.id, 1, 'Comprende los principales indicadores financieros del negocio.', 'Ej: Analizó el P&L de su área e identificó las 3 líneas de mayor impacto en el margen.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_2.id, 2, 'Gestiona presupuesto de su área y asegura eficiencia operativa.', 'Ej: Cerró el año con el 98% de ejecución presupuestal y un margen operativo por encima del objetivo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_2.id, 3, 'Es responsable del P&L completo de su unidad de negocio.', 'Ej: Gestionó el P&L de su BU logrando un crecimiento del ARR del 22% y EBITDA en línea con el target.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_2.id, 4, 'Optimiza el P&L en múltiples unidades con visión de portafolio.', 'Ej: Reasignó recursos entre 3 BUs logrando un crecimiento neto del portafolio del 18% sin incremento de costos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_2.id, 5, 'Define la estrategia financiera que maximiza el valor para Visma.', 'Ej: Lideró la integración financiera de una empresa adquirida logrando sinergias por encima del business case.']
    );

    const {rows: [c_managing_director_3]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_managing_director, '3. Desarrollo de Talento y Cultura', 3]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_3.id, 1, 'Promueve una cultura positiva y los valores de la organización.', 'Ej: Reconoció públicamente comportamientos que reflejan los valores Visma en la reunión mensual de equipo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_3.id, 2, 'Identifica y desarrolla talento dentro de su equipo.', 'Ej: Identificó a 2 High Potentials y diseñó planes de desarrollo individuales con desafíos concretos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_3.id, 3, 'Construye equipos de alto desempeño y culturas de excelencia.', 'Ej: Construyó un equipo directivo que logró el mejor resultado de engagement de la organización (87%).']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_3.id, 4, 'Lidera la estrategia de talento y cultura a nivel organizacional.', 'Ej: Lanzó el programa de liderazgo 'Visma Next' que desarrolló a 15 futuros líderes en 12 meses.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_3.id, 5, 'Define el modelo de liderazgo y cultura corporativa.', 'Ej: Definió los principios de liderazgo de Visma LATAM adoptados como estándar por Visma Group para la región.']
    );

    const {rows: [c_managing_director_4]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_managing_director, '4. Gestión de Stakeholders', 4]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_4.id, 1, 'Construye relaciones efectivas con su equipo y pares.', 'Ej: Recibió feedback positivo de sus pares en la encuesta de 360° sobre colaboración y comunicación.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_4.id, 2, 'Gestiona relaciones con clientes clave y socios del negocio.', 'Ej: Retuvo al cliente más importante de la BU tras una reunión ejecutiva que resolvió una crisis de servicio.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_4.id, 3, 'Lidera relaciones estratégicas con clientes, reguladores y aliados.', 'Ej: Firmó un acuerdo de partnership estratégico con un canal que representa el 15% del nuevo ARR.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_4.id, 4, 'Representa a la organización ante stakeholders de alto nivel.', 'Ej: Participó en el Advisory Board del sector SaaS representando la posición de Visma ante reguladores.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_4.id, 5, 'Influye en el ecosistema e industria y define alianzas estratégicas.', 'Ej: Lideró la formación de un consorcio de empresas SaaS que influyó en la regulación del sector en LATAM.']
    );

    const {rows: [c_managing_director_5]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_managing_director, '5. Innovación y Transformación', 5]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_5.id, 1, 'Adopta nuevas prácticas y herramientas con apertura.', 'Ej: Adoptó la nueva plataforma de gestión de performance de Visma y completó el onboarding en el plazo definido.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_5.id, 2, 'Promueve la mejora continua en su área.', 'Ej: Implementó una dinámica de retrospectiva mensual en su equipo directivo que generó 5 mejoras concretas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_5.id, 3, 'Lidera iniciativas de transformación en su unidad.', 'Ej: Lideró la transformación digital de las operaciones de su BU reduciendo costos en un 20%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_5.id, 4, 'Diseña y ejecuta programas de innovación organizacional.', 'Ej: Creó el programa 'Visma Labs' de innovación interna que generó 3 nuevas líneas de producto.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_managing_director_5.id, 5, 'Define la agenda de transformación digital e innovación.', 'Ej: Definió el roadmap de transformación digital de Visma LATAM aprobado por el Group Leadership Team.']
    );

    // ── Familia: Legal & Especialistas
    const {rows: [legal_y_espe]} = await client.query(
      `INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      ['Legal & Especialistas']
    );
    const fid_legal_y_espe = legal_y_espe.id;

    // Rol: DPM - Data Protection Manager
    const {rows: [r_dpm___data_protect]} = await client.query(
      `INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [fid_legal_y_espe, 'DPM - Data Protection Manager']
    );
    const rid_dpm___data_protect = r_dpm___data_protect.id;

    const {rows: [c_dpm___data_protect_1]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_dpm___data_protect, '1. Conocimiento Normativo y Legal', 1]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_1.id, 1, 'Conoce los principios básicos del RGPD y normativas aplicables.', 'Ej: Respondió correctamente qué datos requieren consentimiento explícito al ser consultado por un colega.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_1.id, 2, 'Aplica normativas de protección de datos en procesos cotidianos.', 'Ej: Revisó y ajustó el formulario de recolección de datos de un nuevo producto para cumplir con la ley local.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_1.id, 3, 'Interpreta y asesora sobre regulaciones complejas.', 'Ej: Asesoró al equipo legal sobre las implicancias de la Ley 29733 (Perú) en la nueva campaña de marketing.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_1.id, 4, 'Lidera la estrategia de cumplimiento normativo en materia de datos.', 'Ej: Diseñó el programa de cumplimiento de datos para los 3 países de LATAM aprobado por el comité legal.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_1.id, 5, 'Define políticas corporativas de privacidad alineadas a regulaciones globales.', 'Ej: Redactó la Política de Privacidad Corporativa de Visma LATAM armonizada con RGPD, LGPD y legislaciones locales.']
    );

    const {rows: [c_dpm___data_protect_2]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_dpm___data_protect, '2. Gestión de Riesgos de Privacidad', 2]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_2.id, 1, 'Identifica riesgos básicos de privacidad con apoyo.', 'Ej: Completó el checklist de privacidad de un nuevo proceso con orientación de un colega senior.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_2.id, 2, 'Realiza evaluaciones de impacto (DPIA) simples.', 'Ej: Completó la DPIA de un nuevo módulo de RR.HH. siguiendo la plantilla corporativa sin observaciones.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_2.id, 3, 'Conduce DPIAs complejas y propone medidas de mitigación.', 'Ej: Realizó la DPIA de una integración con un proveedor de IA, identificando 3 riesgos críticos y sus controles.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_2.id, 4, 'Diseña el marco de gestión de riesgos de privacidad.', 'Ej: Implementó el registro de actividades de tratamiento (RAT) en todas las áreas de la organización.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_2.id, 5, 'Define la estrategia corporativa de gestión de riesgos de datos.', 'Ej: Creó el framework de privacy by design adoptado en todos los proyectos de desarrollo de producto.']
    );

    const {rows: [c_dpm___data_protect_3]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_dpm___data_protect, '3. Gestión de Incidentes de Datos', 3]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_3.id, 1, 'Reporta incidentes de datos según protocolo establecido.', 'Ej: Notificó una brecha de datos menor al DPM en menos de 24 horas siguiendo el procedimiento vigente.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_3.id, 2, 'Documenta y escala incidentes de forma adecuada.', 'Ej: Documentó un incidente de acceso no autorizado con todos los campos requeridos y lo escaló a tiempo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_3.id, 3, 'Coordina la respuesta a brechas de datos y notificaciones regulatorias.', 'Ej: Coordinó la notificación a la autoridad de protección de datos dentro del plazo legal de 72 horas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_3.id, 4, 'Lidera la gestión de crisis de privacidad a nivel organizacional.', 'Ej: Dirigió el equipo de respuesta ante una brecha que afectó datos de 10.000 usuarios, minimizando el impacto.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_3.id, 5, 'Define el plan de respuesta a incidentes y cultura de seguridad.', 'Ej: Diseñó el Playbook de Gestión de Incidentes de Privacidad aprobado por la dirección y auditores externos.']
    );

    const {rows: [c_dpm___data_protect_4]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_dpm___data_protect, '4. Formación y Sensibilización', 4]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_4.id, 1, 'Participa en capacitaciones de privacidad.', 'Ej: Completó el 100% de los módulos de formación en privacidad y aprobó la evaluación con nota máxima.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_4.id, 2, 'Apoya el diseño y facilitación de talleres básicos.', 'Ej: Co-facilitó un taller de privacidad para el equipo de marketing con materiales preparados por el DPM senior.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_4.id, 3, 'Diseña y ejecuta programas de formación en privacidad.', 'Ej: Diseñó el programa anual de concientización en privacidad que alcanzó al 95% de la organización.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_4.id, 4, 'Lidera la cultura de privacidad y promueve el privacy by design.', 'Ej: Lanzó la iniciativa 'Privacy Champions' que formó a 20 referentes de privacidad en las áreas de negocio.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_4.id, 5, 'Define la estrategia de concientización y cultura de protección de datos.', 'Ej: Implementó el modelo de madurez de privacidad organizacional que elevó el score de 2 a 4 en 18 meses.']
    );

    const {rows: [c_dpm___data_protect_5]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_dpm___data_protect, '5. Comunicación con Partes Interesadas', 5]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_5.id, 1, 'Se comunica con su equipo sobre temas de privacidad.', 'Ej: Envió un comunicado claro al equipo explicando los cambios en la política de uso de datos personales.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_5.id, 2, 'Interactúa con áreas internas para cumplimiento de políticas.', 'Ej: Trabajó con el equipo de producto para ajustar el flujo de consentimiento antes del lanzamiento de una feature.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_5.id, 3, 'Asesora a líderes y gestiona relaciones con autoridades regulatorias.', 'Ej: Atendió una consulta de la autoridad de protección de datos de Chile con respuestas precisas y en plazo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_5.id, 4, 'Representa a la organización ante reguladores y socios estratégicos.', 'Ej: Participó en la mesa de trabajo con el regulador peruano sobre nuevas guías de datos en el sector SaaS.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_dpm___data_protect_5.id, 5, 'Lidera la agenda de privacidad en foros externos e industria.', 'Ej: Expuso el modelo de privacidad de Visma LATAM en un congreso regional, posicionando a la empresa como referente.']
    );

    // Rol: Support Consultant
    const {rows: [r_support_consultant]} = await client.query(
      `INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
      [fid_legal_y_espe, 'Support Consultant']
    );
    const rid_support_consultant = r_support_consultant.id;

    const {rows: [c_support_consultant_1]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_support_consultant, '1. Resolución de Problemas y Soporte Técnico', 1]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_1.id, 1, 'Resuelve incidencias básicas siguiendo procedimientos.', 'Ej: Resolvió 15 tickets de soporte de nivel 1 en el día siguiendo el árbol de decisión del equipo.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_1.id, 2, 'Diagnostica y resuelve problemas de complejidad media.', 'Ej: Resolvió un problema de configuración de permisos de un cliente sin escalar, en menos de 2 horas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_1.id, 3, 'Resuelve incidencias complejas y crea documentación de soluciones.', 'Ej: Resolvió un bug de integración con API de terceros y documentó la solución en la base de conocimiento.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_1.id, 4, 'Lidera la resolución de casos críticos y escala de manera efectiva.', 'Ej: Coordinó la resolución de un incidente P1 en 4 horas, comunicando actualizaciones al cliente cada 30 minutos.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_1.id, 5, 'Define procesos de soporte y estándares de resolución.', 'Ej: Rediseñó el árbol de decisión de nivel 1 que redujo el tiempo de resolución promedio en un 35%.']
    );

    const {rows: [c_support_consultant_2]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_support_consultant, '2. Comunicación con el Cliente', 2]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_2.id, 1, 'Responde consultas con claridad y empatía básica.', 'Ej: Recibió 5 estrellas en la encuesta post-interacción por su claridad y amabilidad.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_2.id, 2, 'Gestiona conversaciones difíciles con profesionalismo.', 'Ej: Atendió a un cliente frustrado, validando su situación y ofreciendo una solución concreta que lo dejó satisfecho.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_2.id, 3, 'Construye relaciones de confianza y asegura satisfacción del cliente.', 'Ej: Fue mencionado por nombre en una reseña positiva de un cliente que destacó su acompañamiento.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_2.id, 4, 'Lidera la experiencia del cliente y gestiona cuentas estratégicas.', 'Ej: Fue el punto de contacto principal de los 5 clientes más grandes, logrando un NPS de 72.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_2.id, 5, 'Define estándares de comunicación y cultura de servicio al cliente.', 'Ej: Creó la Guía de Comunicación con Clientes adoptada por todo el equipo de soporte de LATAM.']
    );

    const {rows: [c_support_consultant_3]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_support_consultant, '3. Conocimiento del Producto', 3]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_3.id, 1, 'Conoce las funcionalidades básicas del producto.', 'Ej: Resolvió consultas básicas sobre el módulo de facturación sin necesidad de consultar la documentación.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_3.id, 2, 'Explica funcionalidades avanzadas y resuelve dudas.', 'Ej: Guió a un cliente en la configuración avanzada de reportes explicando cada paso de forma clara.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_3.id, 3, 'Domina el producto y asesora sobre mejores prácticas de uso.', 'Ej: Identificó que un cliente no estaba usando el módulo de automatización y lo configuró para ahorrarle 5 horas/semana.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_3.id, 4, 'Actúa como referente de producto para el equipo de soporte.', 'Ej: Fue consultado por 4 colegas en el mes para resolver dudas técnicas complejas del producto.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_3.id, 5, 'Define el modelo de conocimiento y capacitación del equipo.', 'Ej: Creó el programa de certificación interna de producto que elevó el score de conocimiento del equipo en un 40%.']
    );

    const {rows: [c_support_consultant_4]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_support_consultant, '4. Documentación y Gestión del Conocimiento', 4]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_4.id, 1, 'Documenta incidencias en el sistema de tickets.', 'Ej: Documentó todos sus tickets con categoría, solución y tiempo de resolución sin omisiones durante el mes.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_4.id, 2, 'Crea artículos básicos de base de conocimiento.', 'Ej: Escribió 3 artículos de FAQ que redujeron las consultas repetidas sobre el módulo de reportes en un 20%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_4.id, 3, 'Diseña y mantiene una base de conocimiento completa.', 'Ej: Reorganizó la base de conocimiento del equipo mejorando el tiempo de búsqueda de soluciones en un 50%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_4.id, 4, 'Lidera la estrategia de gestión del conocimiento del equipo.', 'Ej: Implementó el proceso de documentación sistemática que aseguró que el 90% de los casos tuvieran solución documentada.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_4.id, 5, 'Define el framework de conocimiento organizacional de soporte.', 'Ej: Diseñó la arquitectura de la base de conocimiento de Visma LATAM adoptada por todos los equipos de soporte.']
    );

    const {rows: [c_support_consultant_5]} = await client.query(
      `INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id`,
      [rid_support_consultant, '5. Mejora Continua del Servicio', 5]
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_5.id, 1, 'Identifica patrones de problemas recurrentes.', 'Ej: Reportó al líder que el 40% de los tickets del mes eran por el mismo error de configuración.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_5.id, 2, 'Propone mejoras al proceso de soporte.', 'Ej: Propuso incluir un paso de verificación en el proceso de onboarding que redujo los tickets de primeras semanas.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_5.id, 3, 'Lidera iniciativas de mejora que reducen el volumen de tickets.', 'Ej: Lideró la creación de un tutorial de video que redujo los tickets del módulo de reportes en un 30%.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_5.id, 4, 'Diseña programas de mejora continua con impacto medible.', 'Ej: Implementó el programa de análisis mensual de tickets que redujo el volumen total en un 25% en 6 meses.']
    );
    await client.query(
      `INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable`,
      [c_support_consultant_5.id, 5, 'Define la estrategia de evolución del servicio de soporte.', 'Ej: Diseñó el roadmap de evolución del servicio de soporte de Visma LATAM aprobado por la dirección.']
    );

    await client.query('COMMIT');
    console.log('✅ Seed Visma completado');
    console.log('   → 5 familias · 13 roles · 65 competencias · 325 niveles descritos');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error:', err.message);
    throw err;
  } finally {
    client.release();
    pool.end();
  }
}

seedVismaCompetencias().catch(() => process.exit(1));
