require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('../src/db/pool');

async function seedVismaCompetencias() {
  const client = await pool.connect();
  try {
    // 1. Migración de nuevas tablas
    const sql = fs.readFileSync(path.join(__dirname, 'migrate_competencias.sql'), 'utf8');
    await client.query(sql);

    await client.query('BEGIN');

    // Familia: Finanzas & Control
    const {rows:[{id:fid_0}]} = await client.query(
      'INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      ["Finanzas & Control"]
    );

    const {rows:[{id:rid_0}]} = await client.query(
      'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      [fid_0, "Accountant"]
    );

    const {rows:[{id:cid_0}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_0, "1. Gesti\u00f3n Contable y Financiera", 1]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_0, 1, "Registra transacciones b\u00e1sicas con supervisi\u00f3n.", "Ej: Carg\u00f3 correctamente los asientos de caja chica y los reconcili\u00f3 con el supervisor al cierre del mes."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_0, 2, "Realiza cierres mensuales con m\u00ednima supervisi\u00f3n.", "Ej: Entreg\u00f3 el balance mensual en fecha, identificando y corrigiendo una diferencia de conciliaci\u00f3n bancaria de forma aut\u00f3noma."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_0, 3, "Gestiona contabilidad completa y prepara estados financieros.", "Ej: Prepar\u00f3 los estados financieros del trimestre, incluyendo notas explicativas, con cero observaciones del auditor externo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_0, 4, "Lidera auditor\u00edas y optimiza procesos contables.", "Ej: Coordin\u00f3 la auditor\u00eda anual y dise\u00f1\u00f3 un nuevo proceso de reconciliaci\u00f3n que redujo el tiempo de cierre en 2 d\u00edas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_0, 5, "Define pol\u00edticas contables y est\u00e1ndares para la organizaci\u00f3n.", "Ej: Redact\u00f3 el manual de pol\u00edticas contables corporativas adoptado por todas las filiales de LATAM."]
    );

    const {rows:[{id:cid_1}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_0, "2. Cumplimiento Normativo", 2]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_1, 1, "Conoce las normas b\u00e1sicas aplicables.", "Ej: Identific\u00f3 correctamente qu\u00e9 impuestos aplican a una operaci\u00f3n est\u00e1ndar al ser consultado por su l\u00edder."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_1, 2, "Aplica normativas locales de forma consistente.", "Ej: Present\u00f3 las declaraciones mensuales de IVA/IGV sin errores ni atrasos durante todo el a\u00f1o."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_1, 3, "Interpreta y aplica NIIF/GAAP y regulaciones fiscales.", "Ej: Asesor\u00f3 al \u00e1rea legal sobre el tratamiento contable correcto de un contrato de leasing bajo NIIF 16."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_1, 4, "Asegura el cumplimiento en entornos multijurisdiccionales.", "Ej: Coordin\u00f3 el cumplimiento fiscal simult\u00e1neo en Chile, Colombia y Per\u00fa durante una reorganizaci\u00f3n societaria."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_1, 5, "Lidera la estrategia de cumplimiento regulatorio.", "Ej: Implement\u00f3 un sistema de alertas tempranas de cambios normativos que evit\u00f3 una multa de alto impacto."]
    );

    const {rows:[{id:cid_2}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_0, "3. An\u00e1lisis e Interpretaci\u00f3n de Datos", 3]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_2, 1, "Analiza datos contables con apoyo de herramientas b\u00e1sicas.", "Ej: Elabor\u00f3 una tabla din\u00e1mica en Excel para resumir los gastos por centro de costo del mes."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_2, 2, "Elabora reportes financieros est\u00e1ndar.", "Ej: Entreg\u00f3 el reporte mensual de variaci\u00f3n de gastos con comentarios explicativos por l\u00ednea."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_2, 3, "Interpreta variaciones y tendencias financieras.", "Ej: Detect\u00f3 un desv\u00edo de +15% en costos de personal y present\u00f3 el an\u00e1lisis de causa ra\u00edz a la gerencia."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_2, 4, "Dise\u00f1a dashboards y an\u00e1lisis predictivos.", "Ej: Construy\u00f3 un dashboard en Power BI que muestra en tiempo real el flujo de caja proyectado a 90 d\u00edas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_2, 5, "Implementa sistemas de an\u00e1lisis financiero avanzado.", "Ej: Lider\u00f3 la implementaci\u00f3n de un modelo de forecasting automatizado integrado al ERP."]
    );

    const {rows:[{id:cid_3}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_0, "4. Comunicaci\u00f3n y Presentaci\u00f3n", 4]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_3, 1, "Comunica informaci\u00f3n financiera b\u00e1sica a su equipo.", "Ej: Explic\u00f3 al equipo el proceso de carga de facturas de forma clara en una reuni\u00f3n de 10 minutos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_3, 2, "Prepara informes claros para su \u00e1rea.", "Ej: Redact\u00f3 el informe de gastos mensual con un resumen ejecutivo comprensible para no contadores."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_3, 3, "Presenta resultados a gerencia con claridad y precisi\u00f3n.", "Ej: Expuso los resultados del trimestre al Comit\u00e9 de Gerencia respondiendo preguntas t\u00e9cnicas con solvencia."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_3, 4, "Explica conceptos financieros complejos a audiencias no especializadas.", "Ej: Capacit\u00f3 a los l\u00edderes de \u00e1rea sobre c\u00f3mo leer el P&L de su equipo en un taller de 1 hora."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_3, 5, "Comunica estrategia financiera a nivel ejecutivo y directorio.", "Ej: Present\u00f3 la estrategia de eficiencia financiera al directorio con impacto medible en decisiones de inversi\u00f3n."]
    );

    const {rows:[{id:cid_4}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_0, "5. Tecnolog\u00eda y Herramientas Financieras", 5]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_4, 1, "Maneja Excel y software contable b\u00e1sico.", "Ej: Utiliz\u00f3 f\u00f3rmulas VLOOKUP y tablas din\u00e1micas para conciliar el libro mayor sin asistencia."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_4, 2, "Utiliza ERP con fluidez para operaciones rutinarias.", "Ej: Proces\u00f3 el cierre mensual completo en SAP siguiendo el checklist sin incidencias."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_4, 3, "Optimiza el uso del ERP e integra herramientas de an\u00e1lisis.", "Ej: Configur\u00f3 un reporte autom\u00e1tico en SAP que redujo 4 horas de trabajo manual mensual."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_4, 4, "Eval\u00faa e implementa nuevas soluciones tecnol\u00f3gicas.", "Ej: Lider\u00f3 la evaluaci\u00f3n y selecci\u00f3n de una herramienta de consolidaci\u00f3n financiera para 3 pa\u00edses."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_4, 5, "Define la arquitectura tecnol\u00f3gica del \u00e1rea financiera.", "Ej: Dise\u00f1\u00f3 el roadmap de digitalizaci\u00f3n del \u00e1rea financiera aprobado por el CFO."]
    );

    const {rows:[{id:rid_1}]} = await client.query(
      'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      [fid_0, "Manager Financial Control - VQMS"]
    );

    const {rows:[{id:cid_5}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_1, "1. Control Financiero y Reporting", 1]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_5, 1, "Elabora reportes financieros est\u00e1ndar bajo supervisi\u00f3n.", "Ej: Complet\u00f3 el pack de reporting mensual siguiendo la plantilla corporativa sin errores de datos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_5, 2, "Gestiona el ciclo de reporting mensual con autonom\u00eda.", "Ej: Cerr\u00f3 el mes financiero en los plazos establecidos coordinando con 4 \u00e1reas internas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_5, 3, "Dise\u00f1a y optimiza el marco de control financiero del \u00e1rea.", "Ej: Redise\u00f1\u00f3 el proceso de cierre mensual reduciendo el tiempo de 10 a 6 d\u00edas h\u00e1biles."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_5, 4, "Lidera el reporting financiero estrat\u00e9gico para el negocio.", "Ej: Present\u00f3 el an\u00e1lisis de resultados del a\u00f1o al CFO con recomendaciones de eficiencia aceptadas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_5, 5, "Define los est\u00e1ndares de control financiero a nivel corporativo.", "Ej: Redact\u00f3 el Manual de Control Financiero de Visma LATAM adoptado por las 3 filiales."]
    );

    const {rows:[{id:cid_6}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_1, "2. Gesti\u00f3n Presupuestaria", 2]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_6, 1, "Apoya la elaboraci\u00f3n de presupuestos con datos hist\u00f3ricos.", "Ej: Compil\u00f3 y valid\u00f3 los datos hist\u00f3ricos de costos para el proceso de budgeting del a\u00f1o siguiente."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_6, 2, "Realiza seguimiento presupuestario y an\u00e1lisis de variaciones.", "Ej: Entreg\u00f3 el informe mensual de variaci\u00f3n presupuestal con an\u00e1lisis de causa para cada desv\u00edo mayor al 5%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_6, 3, "Lidera el proceso de budgeting y forecasting del \u00e1rea.", "Ej: Coordin\u00f3 el proceso de presupuesto anual con 8 gerencias, entregando el consolidado en plazo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_6, 4, "Gestiona presupuestos complejos y multi\u00e1rea con visi\u00f3n estrat\u00e9gica.", "Ej: Dise\u00f1\u00f3 el modelo de forecasting rolling que mejor\u00f3 la precisi\u00f3n presupuestal del 75% al 92%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_6, 5, "Define la metodolog\u00eda de planificaci\u00f3n financiera de la organizaci\u00f3n.", "Ej: Implement\u00f3 la metodolog\u00eda de Zero-Based Budgeting para 2 \u00e1reas piloto con ahorro del 12%."]
    );

    const {rows:[{id:cid_7}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_1, "3. Auditor\u00eda y Cumplimiento", 3]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_7, 1, "Conoce los controles internos b\u00e1sicos aplicables.", "Ej: Complet\u00f3 la autoevaluaci\u00f3n de controles internos de su \u00e1rea sin observaciones del auditor."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_7, 2, "Implementa controles internos y documenta procesos.", "Ej: Document\u00f3 los 15 controles clave del proceso de cuentas a pagar con evidencia mensual."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_7, 3, "Lidera auditor\u00edas internas y coordina con auditores externos.", "Ej: Coordin\u00f3 la auditor\u00eda externa anual entregando toda la documentaci\u00f3n requerida sin hallazgos cr\u00edticos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_7, 4, "Dise\u00f1a el marco de control interno y asegura el cumplimiento regulatorio.", "Ej: Dise\u00f1\u00f3 la matriz de riesgos y controles del \u00e1rea financiera aprobada por la junta de directores."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_7, 5, "Define pol\u00edticas de auditor\u00eda y gobierno financiero corporativo.", "Ej: Implement\u00f3 el framework de gobierno financiero corporativo alineado a los est\u00e1ndares de Visma Group."]
    );

    const {rows:[{id:cid_8}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_1, "4. Liderazgo y Desarrollo de Equipo", 4]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_8, 1, "Colabora con el equipo y cumple sus responsabilidades.", "Ej: Particip\u00f3 activamente en el cierre de mes apoyando a un colega con carga de trabajo elevada."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_8, 2, "Gu\u00eda a colaboradores junior en tareas t\u00e9cnicas.", "Ej: Acompa\u00f1\u00f3 a un analista junior en la preparaci\u00f3n de su primer reporte de variaciones presupuestales."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_8, 3, "Gestiona el desempe\u00f1o del equipo y promueve el desarrollo.", "Ej: Realiz\u00f3 conversaciones de feedback trimestrales con su equipo y acord\u00f3 PDIs con cada integrante."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_8, 4, "Lidera equipos multifuncionales y desarrolla talento estrat\u00e9gico.", "Ej: Desarroll\u00f3 a 2 analistas que fueron promovidos a roles de senior en el per\u00edodo de evaluaci\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_8, 5, "Define la cultura del \u00e1rea y lidera la estrategia de talento financiero.", "Ej: Implement\u00f3 el programa de rotaci\u00f3n de roles financieros que redujo la rotaci\u00f3n del \u00e1rea al 5%."]
    );

    const {rows:[{id:cid_9}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_1, "5. Toma de Decisiones Basada en Datos", 5]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_9, 1, "Utiliza datos disponibles para an\u00e1lisis b\u00e1sicos.", "Ej: Analiz\u00f3 la evoluci\u00f3n de 3 KPIs financieros y los present\u00f3 en la reuni\u00f3n de equipo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_9, 2, "Interpreta indicadores financieros para la toma de decisiones operativas.", "Ej: Recomend\u00f3 retrasar una compra de activos al detectar un desv\u00edo de liquidez en el forecast a 30 d\u00edas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_9, 3, "Construye modelos financieros para respaldar decisiones estrat\u00e9gicas.", "Ej: Construy\u00f3 un modelo de sensibilidad de m\u00e1rgenes que respald\u00f3 la decisi\u00f3n de ajuste de precios del a\u00f1o."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_9, 4, "Dise\u00f1a frameworks de decisi\u00f3n basados en datos para la organizaci\u00f3n.", "Ej: Implement\u00f3 un tablero ejecutivo de indicadores que es el punto de partida de cada reuni\u00f3n de directorio."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_9, 5, "Lidera la cultura de decisi\u00f3n data-driven a nivel ejecutivo.", "Ej: Capacit\u00f3 a todos los gerentes en el uso del modelo financiero corporativo mejorando la calidad de las decisiones."]
    );

    // Familia: Comercial
    const {rows:[{id:fid_1}]} = await client.query(
      'INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      ["Comercial"]
    );

    const {rows:[{id:rid_2}]} = await client.query(
      'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      [fid_1, "Assistant Account Manager"]
    );

    const {rows:[{id:cid_10}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_2, "1. Gesti\u00f3n de Cuentas y Clientes", 1]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_10, 1, "Apoya tareas administrativas de cuentas asignadas.", "Ej: Prepar\u00f3 carpetas de cliente con propuestas y contratos listos para la firma del Account Manager."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_10, 2, "Realiza seguimiento de clientes con supervisi\u00f3n.", "Ej: Llam\u00f3 a 5 clientes para confirmar renovaciones, registrando el resultado en el CRM."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_10, 3, "Gestiona cuentas de forma aut\u00f3noma y construye relaciones s\u00f3lidas.", "Ej: Renov\u00f3 3 contratos de forma independiente, logrando un aumento del 10% en el valor de cada uno."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_10, 4, "Desarrolla estrategias de retenci\u00f3n y crecimiento en cuentas clave.", "Ej: Dise\u00f1\u00f3 un plan de cuenta para el cliente m\u00e1s importante del portafolio que result\u00f3 en upsell de 2 m\u00f3dulos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_10, 5, "Lidera la estrategia de gesti\u00f3n de cuentas y mentoriza al equipo.", "Ej: Implement\u00f3 un modelo de segmentaci\u00f3n de clientes adoptado por todo el equipo comercial."]
    );

    const {rows:[{id:cid_11}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_2, "2. Comunicaci\u00f3n Comercial", 2]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_11, 1, "Responde consultas b\u00e1sicas de clientes.", "Ej: Respondi\u00f3 en menos de 2 horas consultas de clientes sobre precios y condiciones de servicio."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_11, 2, "Elabora propuestas comerciales est\u00e1ndar.", "Ej: Prepar\u00f3 una propuesta personalizada para un cliente mediano que fue aprobada sin modificaciones."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_11, 3, "Negocia condiciones comerciales con clientes de forma efectiva.", "Ej: Cerr\u00f3 una renovaci\u00f3n con un descuento dentro del rango permitido, manteniendo el margen objetivo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_11, 4, "Conduce negociaciones complejas y cierra acuerdos estrat\u00e9gicos.", "Ej: Lider\u00f3 la negociaci\u00f3n de un contrato de 3 a\u00f1os con un cliente enterprise, superando el objetivo de ARR."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_11, 5, "Define el discurso comercial y los est\u00e1ndares de comunicaci\u00f3n.", "Ej: Redact\u00f3 el playbook de ventas adoptado por el equipo que mejor\u00f3 el ratio de cierre en 20%."]
    );

    const {rows:[{id:cid_12}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_2, "3. Conocimiento del Producto/Servicio", 3]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_12, 1, "Conoce las caracter\u00edsticas b\u00e1sicas del portafolio.", "Ej: Respondi\u00f3 correctamente 8 de 10 preguntas t\u00e9cnicas b\u00e1sicas del producto en una evaluaci\u00f3n interna."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_12, 2, "Explica beneficios y diferenciadores a clientes.", "Ej: Realiz\u00f3 una demo del producto a un prospecto destacando los 3 diferenciadores clave frente a la competencia."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_12, 3, "Asesora a clientes en soluciones adaptadas a sus necesidades.", "Ej: Recomend\u00f3 el m\u00f3dulo correcto a un cliente luego de analizar su proceso operativo, logrando adopci\u00f3n en 30 d\u00edas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_12, 4, "Desarrolla propuestas de valor complejas y personalizadas.", "Ej: Construy\u00f3 un ROI calculator personalizado para un cliente enterprise que aceler\u00f3 el proceso de decisi\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_12, 5, "Define el posicionamiento del portafolio en el mercado.", "Ej: Lider\u00f3 el workshop de reposicionamiento del producto principal frente a 2 competidores nuevos."]
    );

    const {rows:[{id:cid_13}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_2, "4. Gesti\u00f3n Administrativa y CRM", 4]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_13, 1, "Carga datos b\u00e1sicos en el CRM.", "Ej: Ingres\u00f3 los datos de 15 nuevos contactos en Salesforce luego de un evento comercial."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_13, 2, "Mantiene actualizado el CRM y genera reportes est\u00e1ndar.", "Ej: Entreg\u00f3 el reporte semanal de pipeline sin datos faltantes durante 3 meses consecutivos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_13, 3, "Analiza datos del CRM para identificar oportunidades.", "Ej: Identific\u00f3 5 cuentas con alto potencial de upsell analizando el historial de uso en el CRM."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_13, 4, "Optimiza procesos de CRM y entrena al equipo.", "Ej: Dise\u00f1\u00f3 un flujo automatizado en Salesforce que redujo el tiempo de actualizaci\u00f3n del pipeline en 40%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_13, 5, "Define estrategia de CRM y gesti\u00f3n de datos de clientes.", "Ej: Lider\u00f3 la migraci\u00f3n del CRM y defini\u00f3 la nueva taxonom\u00eda de datos adoptada por el \u00e1rea comercial."]
    );

    const {rows:[{id:cid_14}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_2, "5. Orientaci\u00f3n a Resultados", 5]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_14, 1, "Cumple tareas asignadas dentro de los plazos establecidos.", "Ej: Complet\u00f3 todas las tareas del sprint comercial sin atrasos durante el trimestre."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_14, 2, "Alcanza metas individuales con foco en calidad.", "Ej: Cumpli\u00f3 el 100% de su cuota trimestral manteniendo un NPS de clientes por encima del objetivo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_14, 3, "Supera objetivos y contribuye al cumplimiento del equipo.", "Ej: Cerr\u00f3 el trimestre al 115% de cuota y colabor\u00f3 con 2 colegas para que alcanzaran sus metas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_14, 4, "Impulsa resultados del equipo y optimiza la performance comercial.", "Ej: Implement\u00f3 una rutina de revisi\u00f3n semanal de pipeline que elev\u00f3 el ratio de cierre del equipo en 15%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_14, 5, "Define KPIs estrat\u00e9gicos y lidera la cultura de alto desempe\u00f1o.", "Ej: Redise\u00f1\u00f3 el scorecard comercial del \u00e1rea alineado a los objetivos de ARR de Visma para el a\u00f1o."]
    );

    const {rows:[{id:rid_3}]} = await client.query(
      'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      [fid_1, "Sales Lead"]
    );

    const {rows:[{id:cid_15}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_3, "1. Gesti\u00f3n del Pipeline Comercial", 1]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_15, 1, "Actualiza el pipeline con apoyo del equipo.", "Ej: Actualiz\u00f3 el estado de todas sus oportunidades en el CRM antes de la reuni\u00f3n semanal de pipeline."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_15, 2, "Gestiona su pipeline de forma aut\u00f3noma con precisi\u00f3n.", "Ej: Mantuvo el forecast mensual con una precisi\u00f3n del 90% durante todo el trimestre."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_15, 3, "Optimiza el pipeline y anticipa cierres con alta precisi\u00f3n.", "Ej: Identific\u00f3 3 oportunidades estancadas y las reactiv\u00f3 logrando 2 cierres adicionales en el trimestre."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_15, 4, "Lidera la gesti\u00f3n del pipeline del equipo y define forecasts.", "Ej: Implement\u00f3 una revisi\u00f3n semanal de pipeline que mejor\u00f3 la precisi\u00f3n del forecast del equipo al 95%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_15, 5, "Define metodolog\u00eda de ventas y gesti\u00f3n de pipeline organizacional.", "Ej: Dise\u00f1\u00f3 el Sales Playbook y la metodolog\u00eda de forecasting adoptada por todo el equipo comercial de LATAM."]
    );

    const {rows:[{id:cid_16}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_3, "2. Desarrollo de Negocio y Prospecci\u00f3n", 2]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_16, 1, "Realiza prospecci\u00f3n b\u00e1sica siguiendo procesos definidos.", "Ej: Contact\u00f3 20 prospectos de la lista asignada siguiendo la secuencia de outreach del equipo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_16, 2, "Identifica y califica oportunidades de forma aut\u00f3noma.", "Ej: Identific\u00f3 y calific\u00f3 5 cuentas nuevas en un mercado vertical sin asignaci\u00f3n previa."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_16, 3, "Dise\u00f1a estrategias de prospecci\u00f3n y expande el mercado.", "Ej: Dise\u00f1\u00f3 una campa\u00f1a de outbound para el sector retail que gener\u00f3 15 nuevas oportunidades en 2 meses."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_16, 4, "Lidera la expansi\u00f3n de mercado y gestiona cuentas estrat\u00e9gicas.", "Ej: Abri\u00f3 el mercado de empresas de m\u00e1s de 500 empleados generando el 30% del nuevo ARR del a\u00f1o."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_16, 5, "Define la estrategia de desarrollo de negocio para la organizaci\u00f3n.", "Ej: Defini\u00f3 la estrategia de entrada a un nuevo segmento de mercado aprobada por el Managing Director."]
    );

    const {rows:[{id:cid_17}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_3, "3. Negociaci\u00f3n y Cierre", 3]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_17, 1, "Participa en negociaciones con supervisi\u00f3n.", "Ej: Asisti\u00f3 a 3 reuniones de cierre con el Sales Lead senior tomando notas y aprendiendo el proceso."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_17, 2, "Conduce negociaciones simples y cierra acuerdos con autonom\u00eda.", "Ej: Cerr\u00f3 2 contratos de forma independiente dentro del rango de descuento permitido."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_17, 3, "Negocia acuerdos complejos y gestiona objeciones con efectividad.", "Ej: Cerr\u00f3 un contrato de $150K superando 4 objeciones de precio con argumentos de valor documentados."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_17, 4, "Lidera negociaciones estrat\u00e9gicas de alto valor.", "Ej: Condujo la negociaci\u00f3n de un acuerdo de $500K con un cliente enterprise cerrando en condiciones favorables."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_17, 5, "Define metodolog\u00eda de negociaci\u00f3n y est\u00e1ndares de cierre.", "Ej: Cre\u00f3 el framework de negociaci\u00f3n del equipo que mejor\u00f3 el deal size promedio en un 25%."]
    );

    const {rows:[{id:cid_18}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_3, "4. Liderazgo y Desarrollo del Equipo de Ventas", 4]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_18, 1, "Comparte buenas pr\u00e1cticas con colegas.", "Ej: Comparti\u00f3 su script de llamadas en fr\u00edo con el equipo en la reuni\u00f3n semanal; 3 colegas lo adoptaron."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_18, 2, "Gu\u00eda a vendedores junior en el proceso comercial.", "Ej: Acompa\u00f1\u00f3 a 2 nuevos vendedores en sus primeras 5 llamadas de ventas con debriefing post-llamada."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_18, 3, "Gestiona y desarrolla al equipo de ventas para superar objetivos.", "Ej: Llev\u00f3 a su equipo de 3 vendedores al 110% de cuota trimestral mediante coaching semanal."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_18, 4, "Lidera equipos comerciales regionales con impacto en resultados.", "Ej: Gestion\u00f3 el equipo de ventas de 3 pa\u00edses logrando el mejor a\u00f1o de ARR en la historia de la BU."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_18, 5, "Define la estrategia de talento y cultura del equipo de ventas.", "Ej: Implement\u00f3 el programa de onboarding comercial que redujo el ramp-up de nuevos vendedores de 6 a 3 meses."]
    );

    const {rows:[{id:cid_19}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_3, "5. Orientaci\u00f3n al Cliente y Valor", 5]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_19, 1, "Entiende las necesidades b\u00e1sicas del cliente.", "Ej: Complet\u00f3 el discovery call identificando correctamente el pain principal del prospecto."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_19, 2, "Identifica necesidades y propone soluciones adecuadas.", "Ej: Propuso el m\u00f3dulo correcto al cliente luego de un an\u00e1lisis de su proceso, logrando el cierre en 2 reuniones."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_19, 3, "Construye propuestas de valor personalizadas y genera lealtad.", "Ej: Present\u00f3 un business case de ROI personalizado que aceler\u00f3 el proceso de decisi\u00f3n de 60 a 20 d\u00edas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_19, 4, "Desarrolla relaciones estrat\u00e9gicas con clientes de alto valor.", "Ej: Convirti\u00f3 a 3 clientes en referentes activos que generaron 5 nuevas oportunidades de negocio."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_19, 5, "Define la estrategia de customer success y experiencia del cliente.", "Ej: Dise\u00f1\u00f3 el programa de Customer Advisory Board que redujo el churn del segmento enterprise al 3%."]
    );

    // Familia: Tecnología & Datos
    const {rows:[{id:fid_2}]} = await client.query(
      'INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      ["Tecnolog\u00eda & Datos"]
    );

    const {rows:[{id:rid_4}]} = await client.query(
      'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      [fid_2, "Data Analyst"]
    );

    const {rows:[{id:cid_20}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_4, "1. An\u00e1lisis y Tratamiento de Datos", 1]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_20, 1, "Limpia y organiza datasets con supervisi\u00f3n.", "Ej: Elimin\u00f3 duplicados y normaliz\u00f3 formatos de fecha en un dataset de 50.000 registros bajo gu\u00eda del senior."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_20, 2, "Realiza an\u00e1lisis exploratorios y detecci\u00f3n de patrones b\u00e1sicos.", "Ej: Identific\u00f3 que el 80% de los tickets de soporte proven\u00edan de 3 tipos de error, presentando el hallazgo al equipo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_20, 3, "Ejecuta an\u00e1lisis estad\u00edsticos y construye modelos descriptivos.", "Ej: Construy\u00f3 un modelo de segmentaci\u00f3n de clientes por comportamiento de uso que el \u00e1rea de producto adopt\u00f3."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_20, 4, "Dise\u00f1a soluciones anal\u00edticas complejas para problemas de negocio.", "Ej: Dise\u00f1\u00f3 un modelo de propensi\u00f3n a churn que permiti\u00f3 al equipo de CS priorizar retenciones preventivas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_20, 5, "Define la estrategia anal\u00edtica y metodolog\u00edas para la organizaci\u00f3n.", "Ej: Defini\u00f3 el framework de datos y metodolog\u00edas anal\u00edticas adoptado por todos los equipos de datos de Visma LATAM."]
    );

    const {rows:[{id:cid_21}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_4, "2. Visualizaci\u00f3n y Storytelling con Datos", 2]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_21, 1, "Crea gr\u00e1ficos b\u00e1sicos en Excel o herramientas est\u00e1ndar.", "Ej: Entreg\u00f3 un gr\u00e1fico de barras comparativo de ventas por regi\u00f3n que fue incluido en la presentaci\u00f3n de gerencia."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_21, 2, "Construye dashboards funcionales en BI tools.", "Ej: Construy\u00f3 un dashboard en Power BI con 5 KPIs del negocio utilizado diariamente por el equipo comercial."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_21, 3, "Dise\u00f1a visualizaciones impactantes y narrativas basadas en datos.", "Ej: Present\u00f3 un an\u00e1lisis de retenci\u00f3n con visualizaciones interactivas que impuls\u00f3 una decisi\u00f3n de producto en 48 hs."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_21, 4, "Presenta hallazgos complejos a audiencias ejecutivas.", "Ej: Expuso los resultados del an\u00e1lisis de expansi\u00f3n de mercado al Comit\u00e9 Directivo con un story telling de datos claro."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_21, 5, "Define los est\u00e1ndares de visualizaci\u00f3n y cultura de datos.", "Ej: Cre\u00f3 la gu\u00eda de estilo de visualizaciones de datos de Visma LATAM adoptada por todos los analistas."]
    );

    const {rows:[{id:cid_22}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_4, "3. Herramientas y Lenguajes de An\u00e1lisis", 3]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_22, 1, "Usa SQL b\u00e1sico y Excel para consultas simples.", "Ej: Extrajo el listado de clientes activos por pa\u00eds con una query SQL b\u00e1sica sin asistencia."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_22, 2, "Maneja SQL avanzado, Python/R para an\u00e1lisis rutinarios.", "Ej: Automatiz\u00f3 la extracci\u00f3n y limpieza semanal de datos con un script de Python que ahorra 3 horas por semana."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_22, 3, "Domina m\u00faltiples herramientas y automatiza flujos de trabajo.", "Ej: Construy\u00f3 un pipeline de datos en Airflow que alimenta autom\u00e1ticamente 4 dashboards de negocio."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_22, 4, "Implementa pipelines de datos y arquitecturas anal\u00edticas.", "Ej: Dise\u00f1\u00f3 e implement\u00f3 el data warehouse del \u00e1rea de producto sobre BigQuery."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_22, 5, "Eval\u00faa e incorpora nuevas tecnolog\u00edas y frameworks anal\u00edticos.", "Ej: Evalu\u00f3 3 plataformas de ML y recomend\u00f3 la adopci\u00f3n de dbt para transformaci\u00f3n de datos en toda la organizaci\u00f3n."]
    );

    const {rows:[{id:cid_23}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_4, "4. Pensamiento Cr\u00edtico y Resoluci\u00f3n de Problemas", 4]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_23, 1, "Identifica problemas simples con apoyo del equipo.", "Ej: Detect\u00f3 una inconsistencia en los datos de facturaci\u00f3n y la report\u00f3 al equipo para su correcci\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_23, 2, "Propone soluciones anal\u00edticas a problemas estructurados.", "Ej: Propuso y ejecut\u00f3 un an\u00e1lisis de causa ra\u00edz para una ca\u00edda en la tasa de activaci\u00f3n de nuevos usuarios."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_23, 3, "Formula hip\u00f3tesis y dise\u00f1a experimentos para validarlas.", "Ej: Dise\u00f1\u00f3 un A/B test para validar si un cambio en el onboarding mejoraba la activaci\u00f3n; present\u00f3 resultados al PO."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_23, 4, "Resuelve problemas anal\u00edticos complejos y ambiguos de forma aut\u00f3noma.", "Ej: Desarroll\u00f3 un modelo de forecasting de demanda sin precedentes en el equipo, logrando un error menor al 8%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_23, 5, "Anticipa tendencias y define agenda de innovaci\u00f3n anal\u00edtica.", "Ej: Identific\u00f3 la oportunidad de usar NLP para analizar tickets de soporte y lider\u00f3 su implementaci\u00f3n."]
    );

    const {rows:[{id:cid_24}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_4, "5. Colaboraci\u00f3n con el Negocio", 5]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_24, 1, "Entiende requerimientos b\u00e1sicos con orientaci\u00f3n.", "Ej: Complet\u00f3 el brief de an\u00e1lisis correctamente luego de una reuni\u00f3n de clarificaci\u00f3n con su l\u00edder."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_24, 2, "Traduce requerimientos del negocio en an\u00e1lisis concretos.", "Ej: Convirti\u00f3 una solicitud vaga de 'entender las ventas' en un an\u00e1lisis de 3 dimensiones que el \u00e1rea de ventas us\u00f3."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_24, 3, "Act\u00faa como socio anal\u00edtico de las \u00e1reas de negocio.", "Ej: Particip\u00f3 en la planificaci\u00f3n trimestral de producto aportando insights de datos que influenciaron el roadmap."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_24, 4, "Genera insights estrat\u00e9gicos que impactan decisiones de alto nivel.", "Ej: Su an\u00e1lisis de rentabilidad por segmento de cliente fue el input principal para la decisi\u00f3n de precio del a\u00f1o."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_24, 5, "Lidera la agenda data-driven de la organizaci\u00f3n.", "Ej: Implement\u00f3 el programa 'Data Champions' que capacit\u00f3 a 30 colaboradores para tomar decisiones basadas en datos."]
    );

    const {rows:[{id:rid_5}]} = await client.query(
      'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      [fid_2, "Developer"]
    );

    const {rows:[{id:cid_25}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_5, "1. Desarrollo y Calidad de C\u00f3digo", 1]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_25, 1, "Escribe c\u00f3digo funcional con supervisi\u00f3n y revisi\u00f3n constante.", "Ej: Implement\u00f3 un endpoint REST bajo gu\u00eda del Tech Lead, incorporando todos los comentarios del code review."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_25, 2, "Desarrolla funcionalidades completas con buenas pr\u00e1cticas b\u00e1sicas.", "Ej: Entreg\u00f3 un m\u00f3dulo de notificaciones con tests unitarios y documentaci\u00f3n, sin observaciones mayores en el PR."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_25, 3, "Produce c\u00f3digo limpio, mantenible y bien documentado de forma aut\u00f3noma.", "Ej: Refactoriz\u00f3 un servicio legado reduciendo la deuda t\u00e9cnica en 30% sin introducir regresiones."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_25, 4, "Lidera est\u00e1ndares de c\u00f3digo y arquitectura a nivel de m\u00f3dulo.", "Ej: Defini\u00f3 las convenciones de c\u00f3digo para el equipo y las document\u00f3 en el wiki t\u00e9cnico del proyecto."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_25, 5, "Define arquitectura t\u00e9cnica y visi\u00f3n de ingenier\u00eda del producto.", "Ej: Dise\u00f1\u00f3 la arquitectura de microservicios que permiti\u00f3 escalar el producto de 10k a 100k usuarios."]
    );

    const {rows:[{id:cid_26}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_5, "2. Resoluci\u00f3n de Problemas T\u00e9cnicos", 2]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_26, 1, "Resuelve bugs simples con orientaci\u00f3n.", "Ej: Corrigi\u00f3 un bug de validaci\u00f3n de formulario siguiendo la gu\u00eda del senior en menos de 2 horas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_26, 2, "Diagnostica y resuelve problemas de complejidad media.", "Ej: Identific\u00f3 y resolvi\u00f3 una condici\u00f3n de carrera en el m\u00f3dulo de pagos que causaba errores intermitentes."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_26, 3, "Depura problemas complejos y propone soluciones escalables.", "Ej: Resolvi\u00f3 un problema de degradaci\u00f3n de performance en producci\u00f3n analizando trazas de Datadog."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_26, 4, "Anticipa fallas t\u00e9cnicas y dise\u00f1a sistemas resilientes.", "Ej: Implement\u00f3 circuit breakers y retry policies que redujeron los incidentes de producci\u00f3n en un 60%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_26, 5, "Define estrategias t\u00e9cnicas para resolver problemas sist\u00e9micos.", "Ej: Lider\u00f3 el postmortem de un incidente cr\u00edtico y dise\u00f1\u00f3 el plan de resiliencia adoptado por todos los equipos."]
    );

    const {rows:[{id:cid_27}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_5, "3. Colaboraci\u00f3n y Trabajo en Equipo", 3]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_27, 1, "Participa activamente en ceremonias del equipo.", "Ej: Asisti\u00f3 a todas las dailies y retrospectivas, aportando bloqueos claros y acciones de mejora concretas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_27, 2, "Colabora en code reviews y comparte conocimiento.", "Ej: Revis\u00f3 3 PRs por semana con comentarios constructivos y organiz\u00f3 una sesi\u00f3n t\u00e9cnica sobre testing."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_27, 3, "Mentoriza juniors y facilita la din\u00e1mica del equipo.", "Ej: Acompa\u00f1\u00f3 el onboarding de 2 nuevos developers, acortando su tiempo de productividad de 4 a 2 semanas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_27, 4, "Lidera el equipo t\u00e9cnico y gestiona dependencias entre equipos.", "Ej: Coordin\u00f3 la integraci\u00f3n t\u00e9cnica con 2 equipos externos eliminando bloqueos que retrasaban el release."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_27, 5, "Define cultura de ingenier\u00eda y colaboraci\u00f3n organizacional.", "Ej: Cre\u00f3 el Engineering Handbook de Visma LATAM adoptado por todos los equipos de desarrollo."]
    );

    const {rows:[{id:cid_28}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_5, "4. Adaptaci\u00f3n Tecnol\u00f3gica", 4]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_28, 1, "Aprende nuevas tecnolog\u00edas con apoyo del equipo.", "Ej: Complet\u00f3 el curso de Docker asignado y despleg\u00f3 su primer contenedor en el ambiente de staging."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_28, 2, "Adopta nuevas herramientas y frameworks de forma aut\u00f3noma.", "Ej: Migr\u00f3 un m\u00f3dulo a React 18 de forma aut\u00f3noma, aplicando las nuevas APIs de concurrencia correctamente."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_28, 3, "Eval\u00faa y propone adopci\u00f3n de nuevas tecnolog\u00edas al equipo.", "Ej: Present\u00f3 un spike de evaluaci\u00f3n de tres ORMs y recomend\u00f3 Prisma con justificaci\u00f3n t\u00e9cnica y de performance."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_28, 4, "Lidera la evoluci\u00f3n tecnol\u00f3gica del stack con visi\u00f3n estrat\u00e9gica.", "Ej: Lider\u00f3 la migraci\u00f3n de la arquitectura monol\u00edtica a microservicios en 6 meses sin downtime."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_28, 5, "Define la hoja de ruta tecnol\u00f3gica de la organizaci\u00f3n.", "Ej: Defini\u00f3 el tech radar de Visma LATAM alineado a la estrategia de producto para los pr\u00f3ximos 2 a\u00f1os."]
    );

    const {rows:[{id:cid_29}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_5, "5. Entrega de Valor y Agilidad", 5]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_29, 1, "Completa tareas dentro del sprint con supervisi\u00f3n.", "Ej: Cerr\u00f3 todas las tareas del sprint sin dejar work in progress al final de la iteraci\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_29, 2, "Estima y entrega trabajo de forma consistente dentro del sprint.", "Ej: Mantuvo un velocity consistente durante 4 sprints consecutivos con estimaciones dentro del 10% de variaci\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_29, 3, "Gestiona su backlog y entrega valor de forma predecible.", "Ej: Prioriz\u00f3 sus tareas de forma aut\u00f3noma asegurando que los \u00edtems de mayor impacto se completaran primero."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_29, 4, "Optimiza el flujo de entrega del equipo e identifica impedimentos.", "Ej: Detect\u00f3 un cuello de botella en el proceso de QA y propuso una soluci\u00f3n que redujo el cycle time en 30%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_29, 5, "Define procesos de delivery y cultura de mejora continua.", "Ej: Implement\u00f3 el framework de m\u00e9tricas DORA en el equipo, logrando pasar de deploy semanal a diario."]
    );

    const {rows:[{id:rid_6}]} = await client.query(
      'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      [fid_2, "Tech Lead"]
    );

    const {rows:[{id:cid_30}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_6, "1. Liderazgo T\u00e9cnico y Arquitectura", 1]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_30, 1, "Comprende la arquitectura del sistema y contribuye con decisiones b\u00e1sicas.", "Ej: Seleccion\u00f3 correctamente el patr\u00f3n de dise\u00f1o m\u00e1s adecuado para una nueva feature al ser consultado por el equipo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_30, 2, "Define soluciones t\u00e9cnicas para funcionalidades de mediana complejidad.", "Ej: Dise\u00f1\u00f3 la soluci\u00f3n t\u00e9cnica de un m\u00f3dulo de notificaciones con diagramas y criterios de aceptaci\u00f3n claros."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_30, 3, "Dise\u00f1a la arquitectura de m\u00f3dulos o servicios con visi\u00f3n de escalabilidad.", "Ej: Dise\u00f1\u00f3 el servicio de autenticaci\u00f3n que soporta 10x el volumen actual sin cambios de infraestructura."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_30, 4, "Lidera la arquitectura del sistema completo con visi\u00f3n de largo plazo.", "Ej: Defini\u00f3 la arquitectura de la plataforma para soportar la expansi\u00f3n a 2 nuevos pa\u00edses sin deuda t\u00e9cnica."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_30, 5, "Define la visi\u00f3n tecnol\u00f3gica y arquitectura de la organizaci\u00f3n.", "Ej: Present\u00f3 el Technology Blueprint de Visma LATAM al CTO global con aprobaci\u00f3n para implementaci\u00f3n."]
    );

    const {rows:[{id:cid_31}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_6, "2. Desarrollo de Equipo T\u00e9cnico", 2]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_31, 1, "Comparte conocimiento t\u00e9cnico con el equipo.", "Ej: Facilit\u00f3 una sesi\u00f3n t\u00e9cnica sobre patrones de dise\u00f1o a la que asistieron 8 developers del equipo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_31, 2, "Realiza code reviews constructivos y mentoriza juniors.", "Ej: Realiz\u00f3 code reviews detallados para 2 developers junior logrando mejorar su calidad de c\u00f3digo en 4 semanas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_31, 3, "Dise\u00f1a planes de desarrollo t\u00e9cnico para el equipo.", "Ej: Defini\u00f3 el skill matrix del equipo e identific\u00f3 las brechas que se cerraron con un plan de capacitaci\u00f3n de 3 meses."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_31, 4, "Lidera el crecimiento t\u00e9cnico del equipo y construye capacidades.", "Ej: Desarroll\u00f3 a 2 seniors que asumieron el liderazgo t\u00e9cnico de sus propios m\u00f3dulos en 6 meses."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_31, 5, "Define el modelo de desarrollo t\u00e9cnico y cultura de ingenier\u00eda.", "Ej: Cre\u00f3 el Engineering Career Ladder de Visma LATAM adoptado por todas las BUs de tecnolog\u00eda."]
    );

    const {rows:[{id:cid_32}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_6, "3. Gesti\u00f3n T\u00e9cnica de Proyectos", 3]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_32, 1, "Estima tareas y cumple compromisos t\u00e9cnicos b\u00e1sicos.", "Ej: Estim\u00f3 correctamente las tareas del sprint con una variaci\u00f3n menor al 15% durante 3 sprints consecutivos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_32, 2, "Gestiona dependencias t\u00e9cnicas dentro del equipo.", "Ej: Identific\u00f3 y resolvi\u00f3 3 dependencias t\u00e9cnicas que bloqueaban el avance del sprint antes de que impactaran."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_32, 3, "Lidera la planificaci\u00f3n t\u00e9cnica y gestiona riesgos del proyecto.", "Ej: Identific\u00f3 un riesgo t\u00e9cnico cr\u00edtico con 3 semanas de antelaci\u00f3n y redise\u00f1\u00f3 el plan para mitigarlo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_32, 4, "Gestiona proyectos t\u00e9cnicos complejos con m\u00faltiples dependencias.", "Ej: Lider\u00f3 la migraci\u00f3n de base de datos de 6 semanas con 4 equipos involucrados sin downtime."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_32, 5, "Define metodolog\u00edas de gesti\u00f3n t\u00e9cnica para la organizaci\u00f3n.", "Ej: Implement\u00f3 el framework de Technical Project Management adoptado por todos los Tech Leads de Visma LATAM."]
    );

    const {rows:[{id:cid_33}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_6, "4. Calidad e Innovaci\u00f3n T\u00e9cnica", 4]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_33, 1, "Sigue est\u00e1ndares de calidad t\u00e9cnica establecidos.", "Ej: Cumpli\u00f3 el 100% del checklist de calidad del equipo en todos sus PRs del trimestre."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_33, 2, "Propone mejoras t\u00e9cnicas y de proceso al equipo.", "Ej: Propuso implementar mutation testing que el equipo adopt\u00f3 y mejor\u00f3 la cobertura real de tests en un 20%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_33, 3, "Lidera iniciativas de deuda t\u00e9cnica y adopci\u00f3n de mejores pr\u00e1cticas.", "Ej: Lider\u00f3 un sprint de deuda t\u00e9cnica que elimin\u00f3 el 40% de los issues cr\u00edticos del backlog de calidad."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_33, 4, "Dise\u00f1a programas de innovaci\u00f3n t\u00e9cnica con impacto en el negocio.", "Ej: Lanz\u00f3 el Hackathon t\u00e9cnico semestral que gener\u00f3 2 features hoy en producci\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_33, 5, "Define la agenda de innovaci\u00f3n tecnol\u00f3gica organizacional.", "Ej: Present\u00f3 el Tech Innovation Roadmap de Visma LATAM aprobado por el Group CTO."]
    );

    const {rows:[{id:cid_34}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_6, "5. Colaboraci\u00f3n con Producto y Negocio", 5]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_34, 1, "Entiende los requerimientos de negocio b\u00e1sicos.", "Ej: Particip\u00f3 en el refinamiento haciendo preguntas t\u00e9cnicas relevantes que clarificaron el alcance de la historia."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_34, 2, "Traduce requerimientos de negocio en soluciones t\u00e9cnicas.", "Ej: Convirti\u00f3 un requerimiento ambiguo de 'mejorar la performance' en 3 tareas t\u00e9cnicas medibles."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_34, 3, "Act\u00faa como puente entre negocio y tecnolog\u00eda en decisiones clave.", "Ej: Facilit\u00f3 la discusi\u00f3n entre producto e ingenier\u00eda para decidir entre build vs buy, presentando el an\u00e1lisis de trade-offs."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_34, 4, "Lidera la alineaci\u00f3n estrat\u00e9gica entre tecnolog\u00eda y objetivos de negocio.", "Ej: Particip\u00f3 en el planning estrat\u00e9gico anual definiendo las capacidades t\u00e9cnicas necesarias para los objetivos del negocio."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_34, 5, "Define el modelo de colaboraci\u00f3n entre tecnolog\u00eda y las \u00e1reas de negocio.", "Ej: Dise\u00f1\u00f3 el modelo de Tech-Business Partnership de Visma LATAM que aceler\u00f3 el time-to-market en un 30%."]
    );

    const {rows:[{id:rid_7}]} = await client.query(
      'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      [fid_2, "Technical Support"]
    );

    const {rows:[{id:cid_35}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_7, "1. Soporte T\u00e9cnico e Infraestructura", 1]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_35, 1, "Resuelve incidencias t\u00e9cnicas b\u00e1sicas con procedimientos definidos.", "Ej: Reinstat\u00f3 acceso a un usuario bloqueado siguiendo el procedimiento de Active Directory en 15 minutos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_35, 2, "Diagnostica y resuelve problemas de hardware, software y red.", "Ej: Diagnostic\u00f3 y resolvi\u00f3 un problema de conectividad VPN para un colaborador remoto en menos de 1 hora."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_35, 3, "Gestiona incidencias complejas e infraestructura con autonom\u00eda.", "Ej: Reconfigur\u00f3 el servidor de archivos durante una migraci\u00f3n sin incidencias y con comunicaci\u00f3n proactiva."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_35, 4, "Lidera la gesti\u00f3n de infraestructura y optimizaci\u00f3n de sistemas.", "Ej: Implement\u00f3 la monitorizaci\u00f3n proactiva de servidores que redujo los incidentes reactivos en un 40%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_35, 5, "Define la estrategia de infraestructura y soporte t\u00e9cnico.", "Ej: Defini\u00f3 el roadmap de modernizaci\u00f3n de infraestructura de Visma LATAM aprobado por la direcci\u00f3n."]
    );

    const {rows:[{id:cid_36}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_7, "2. Gesti\u00f3n de Tickets y SLAs", 2]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_36, 1, "Registra y actualiza tickets siguiendo el proceso establecido.", "Ej: Complet\u00f3 todos los campos obligatorios del ticket y actualiz\u00f3 el estado en tiempo real durante el mes."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_36, 2, "Gestiona tickets cumpliendo SLAs definidos.", "Ej: Cerr\u00f3 el 95% de los tickets dentro del SLA durante el trimestre, por encima del objetivo del 90%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_36, 3, "Optimiza el flujo de tickets y asegura el cumplimiento de SLAs.", "Ej: Redujo el backlog de tickets abiertos de 45 a 12 en 2 semanas priorizando por impacto y urgencia."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_36, 4, "Dise\u00f1a procesos de gesti\u00f3n de tickets y define SLAs.", "Ej: Redefini\u00f3 los SLAs por categor\u00eda de incidente que mejoraron la satisfacci\u00f3n del usuario interno al 92%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_36, 5, "Define la estrategia de gesti\u00f3n de servicio y gobierno de SLAs.", "Ej: Implement\u00f3 el framework ITIL adaptado para Visma LATAM que estandariz\u00f3 la gesti\u00f3n de servicios de TI."]
    );

    const {rows:[{id:cid_37}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_7, "3. Seguridad y Buenas Pr\u00e1cticas", 3]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_37, 1, "Aplica procedimientos b\u00e1sicos de seguridad inform\u00e1tica.", "Ej: Configur\u00f3 el MFA para todos los nuevos usuarios siguiendo el procedimiento de seguridad sin excepciones."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_37, 2, "Implementa controles de seguridad en dispositivos y sistemas.", "Ej: Aplic\u00f3 el hardening de seguridad en 20 equipos nuevos siguiendo el checklist corporativo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_37, 3, "Gestiona pol\u00edticas de seguridad y responde a incidentes.", "Ej: Detect\u00f3 y bloque\u00f3 un intento de phishing en la red, notificando al equipo en menos de 30 minutos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_37, 4, "Lidera la estrategia de seguridad de endpoint y redes.", "Ej: Implement\u00f3 la soluci\u00f3n de EDR en todos los equipos de la organizaci\u00f3n reduciendo el riesgo de ciberseguridad."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_37, 5, "Define la pol\u00edtica de seguridad inform\u00e1tica organizacional.", "Ej: Redact\u00f3 la Pol\u00edtica de Seguridad Inform\u00e1tica de Visma LATAM aprobada por la direcci\u00f3n y auditores externos."]
    );

    const {rows:[{id:cid_38}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_7, "4. Comunicaci\u00f3n y Orientaci\u00f3n al Usuario", 4]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_38, 1, "Responde consultas de usuarios con claridad y paciencia.", "Ej: Explic\u00f3 a un usuario no t\u00e9cnico c\u00f3mo configurar su correo en el m\u00f3vil paso a paso con lenguaje simple."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_38, 2, "Gestiona expectativas y comunica soluciones de forma efectiva.", "Ej: Inform\u00f3 proactivamente a un usuario sobre el avance de su ticket evitando que escalara la solicitud."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_38, 3, "Construye relaciones de confianza con usuarios y \u00e1reas de negocio.", "Ej: Fue reconocido por el \u00e1rea de Finanzas como el referente de TI de confianza para sus requerimientos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_38, 4, "Lidera la experiencia del usuario interno y gestiona cuentas.", "Ej: Realiz\u00f3 revisiones trimestrales de servicio con las 5 \u00e1reas principales logrando un CSAT del 95%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_38, 5, "Define est\u00e1ndares de servicio y cultura de soporte interno.", "Ej: Cre\u00f3 el Service Catalogue de TI que estandariz\u00f3 los niveles de servicio esperados por toda la organizaci\u00f3n."]
    );

    const {rows:[{id:cid_39}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_7, "5. Automatizaci\u00f3n y Mejora Continua", 5]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_39, 1, "Identifica tareas repetitivas en su trabajo cotidiano.", "Ej: Report\u00f3 al l\u00edder que el proceso de creaci\u00f3n de usuarios tardaba 30 minutos y podr\u00eda automatizarse."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_39, 2, "Automatiza procesos b\u00e1sicos de soporte con herramientas est\u00e1ndar.", "Ej: Cre\u00f3 un script de PowerShell que automatiz\u00f3 la creaci\u00f3n de usuarios en AD reduciendo el tiempo de 30 a 2 minutos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_39, 3, "Dise\u00f1a automatizaciones que mejoran la eficiencia del equipo.", "Ej: Automatiz\u00f3 5 procesos repetitivos del equipo liberando 8 horas semanales para soporte de mayor valor."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_39, 4, "Lidera iniciativas de automatizaci\u00f3n con impacto medible.", "Ej: Implement\u00f3 un bot de soporte de nivel 0 que resuelve autom\u00e1ticamente el 25% de los tickets entrantes."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_39, 5, "Define la estrategia de automatizaci\u00f3n del \u00e1rea t\u00e9cnica.", "Ej: Defini\u00f3 el roadmap de automatizaci\u00f3n de TI de Visma LATAM con ahorro proyectado de 500 horas/a\u00f1o."]
    );

    const {rows:[{id:rid_8}]} = await client.query(
      'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      [fid_2, "Quality Assurer"]
    );

    const {rows:[{id:cid_40}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_8, "1. Dise\u00f1o y Ejecuci\u00f3n de Pruebas", 1]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_40, 1, "Ejecuta casos de prueba predefinidos con supervisi\u00f3n.", "Ej: Ejecut\u00f3 el plan de regresi\u00f3n del sprint y document\u00f3 los resultados siguiendo la plantilla del equipo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_40, 2, "Dise\u00f1a y ejecuta casos de prueba funcionales de forma aut\u00f3noma.", "Ej: Dise\u00f1\u00f3 30 casos de prueba para el m\u00f3dulo de pagos cubriendo flujos positivos y negativos sin asistencia."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_40, 3, "Dise\u00f1a estrategias de testing completas.", "Ej: Dise\u00f1\u00f3 el plan de testing end-to-end del lanzamiento incluyendo pruebas de carga y seguridad."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_40, 4, "Lidera la estrategia de calidad para productos complejos.", "Ej: Defini\u00f3 la estrategia de QA para la plataforma de 3 productos, logrando cero bugs cr\u00edticos en producci\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_40, 5, "Define el framework de calidad y las metodolog\u00edas de testing.", "Ej: Cre\u00f3 el Quality Framework de Visma LATAM adoptado por todos los equipos de producto."]
    );

    const {rows:[{id:cid_41}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_8, "2. Automatizaci\u00f3n de Pruebas", 2]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_41, 1, "Conoce herramientas de automatizaci\u00f3n a nivel b\u00e1sico.", "Ej: Ejecut\u00f3 la suite de tests automatizados existente e interpret\u00f3 correctamente los resultados."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_41, 2, "Crea y mantiene scripts de automatizaci\u00f3n b\u00e1sicos.", "Ej: Automatiz\u00f3 20 casos de prueba de regresi\u00f3n en Selenium reduciendo el tiempo de ejecuci\u00f3n en 2 horas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_41, 3, "Dise\u00f1a y optimiza frameworks de automatizaci\u00f3n de pruebas.", "Ej: Redise\u00f1\u00f3 el framework de automatizaci\u00f3n reduciendo el tiempo de ejecuci\u00f3n de la suite de 4 horas a 45 minutos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_41, 4, "Lidera la implementaci\u00f3n de automatizaci\u00f3n a escala.", "Ej: Implement\u00f3 automatizaci\u00f3n en 3 equipos logrando que el 70% de los casos de regresi\u00f3n se ejecuten autom\u00e1ticamente."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_41, 5, "Define la estrategia de automatizaci\u00f3n y selecci\u00f3n de herramientas.", "Ej: Evalu\u00f3 y seleccion\u00f3 Playwright como est\u00e1ndar de automatizaci\u00f3n de Visma LATAM con justificaci\u00f3n t\u00e9cnica."]
    );

    const {rows:[{id:cid_42}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_8, "3. An\u00e1lisis y Reporte de Defectos", 3]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_42, 1, "Registra defectos con informaci\u00f3n b\u00e1sica.", "Ej: Cre\u00f3 tickets de bug con pasos para reproducir, ambiente y screenshot en Jira sin omisiones."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_42, 2, "Documenta defectos con detalle y reproduce errores.", "Ej: Document\u00f3 un bug intermitente con logs, video de reproducci\u00f3n y an\u00e1lisis de frecuencia de aparici\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_42, 3, "Analiza patrones de defectos y propone mejoras preventivas.", "Ej: Identific\u00f3 que el 60% de los bugs proven\u00edan del m\u00f3dulo de integraci\u00f3n y propuso refactorizar su test suite."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_42, 4, "Lidera an\u00e1lisis de causa ra\u00edz y define procesos de prevenci\u00f3n.", "Ej: Condujo el RCA de un incidente cr\u00edtico e implement\u00f3 4 controles preventivos aprobados por el equipo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_42, 5, "Define est\u00e1ndares de calidad y gesti\u00f3n de defectos organizacionales.", "Ej: Defini\u00f3 la taxonom\u00eda de defectos y las m\u00e9tricas de calidad adoptadas por todos los equipos de desarrollo."]
    );

    const {rows:[{id:cid_43}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_8, "4. Integraci\u00f3n en Procesos \u00c1giles", 4]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_43, 1, "Participa en ceremonias \u00e1giles y entiende el proceso.", "Ej: Particip\u00f3 en todas las dailies y aport\u00f3 el estado de testing de forma clara y concisa."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_43, 2, "Colabora activamente con el equipo en ciclos de desarrollo \u00e1gil.", "Ej: Particip\u00f3 en el refinamiento detectando ambig\u00fcedades en los criterios de aceptaci\u00f3n antes del desarrollo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_43, 3, "Lidera la integraci\u00f3n de calidad en el pipeline de CI/CD.", "Ej: Configur\u00f3 la suite de tests en el pipeline de CI logrando que ning\u00fan bug cr\u00edtico llegue a staging."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_43, 4, "Dise\u00f1a procesos de QA para equipos distribuidos.", "Ej: Dise\u00f1\u00f3 el proceso de quality gate para 4 equipos remotos con documentaci\u00f3n clara y m\u00e9tricas de seguimiento."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_43, 5, "Define la cultura de calidad continua en la organizaci\u00f3n.", "Ej: Implement\u00f3 el programa 'Quality First' que redujo la tasa de bugs en producci\u00f3n en un 50% en 6 meses."]
    );

    const {rows:[{id:cid_44}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_8, "5. Comunicaci\u00f3n y Gesti\u00f3n de Calidad", 5]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_44, 1, "Reporta el estado de pruebas a su equipo.", "Ej: Entreg\u00f3 el daily testing report con el porcentaje de ejecuci\u00f3n y bugs abiertos sin omisiones."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_44, 2, "Comunica riesgos de calidad a stakeholders relevantes.", "Ej: Alert\u00f3 al PO sobre un riesgo de calidad antes del release y propuso una estrategia de mitigaci\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_44, 3, "Gestiona expectativas de calidad con Product Owner y desarrollo.", "Ej: Negoci\u00f3 el alcance del testing con el PO ante una restricci\u00f3n de tiempo, documentando los riesgos aceptados."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_44, 4, "Lidera la comunicaci\u00f3n de calidad a nivel ejecutivo.", "Ej: Present\u00f3 el Quality Dashboard mensual al VP de Producto con tendencias y plan de mejora."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_44, 5, "Define la estrategia de comunicaci\u00f3n de calidad organizacional.", "Ej: Implement\u00f3 el Quality Report corporativo que es el est\u00e1ndar de reporte de calidad de Visma LATAM."]
    );

    // Familia: Producto & Dirección
    const {rows:[{id:fid_3}]} = await client.query(
      'INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      ["Producto & Direcci\u00f3n"]
    );

    const {rows:[{id:rid_9}]} = await client.query(
      'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      [fid_3, "Product Owner"]
    );

    const {rows:[{id:cid_45}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_9, "1. Gesti\u00f3n del Product Backlog", 1]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_45, 1, "Crea y documenta historias de usuario con apoyo.", "Ej: Escribi\u00f3 10 user stories con criterios de aceptaci\u00f3n claros bajo revisi\u00f3n del PO senior."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_45, 2, "Prioriza el backlog de forma aut\u00f3noma con criterios claros.", "Ej: Orden\u00f3 el backlog usando el framework RICE y lo present\u00f3 al equipo con justificaci\u00f3n clara."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_45, 3, "Gestiona un backlog complejo, balanceando valor, riesgo y capacidad.", "Ej: Replanific\u00f3 el backlog mid-sprint ante un cambio de regulaci\u00f3n sin impactar los objetivos del trimestre."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_45, 4, "Dise\u00f1a la estrategia de backlog para m\u00faltiples equipos o productos.", "Ej: Coordin\u00f3 el backlog de 3 equipos de desarrollo para lanzar una feature interdependiente a tiempo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_45, 5, "Define frameworks de gesti\u00f3n de producto a nivel organizacional.", "Ej: Cre\u00f3 el PO Playbook de Visma LATAM adoptado por todos los Product Owners de la organizaci\u00f3n."]
    );

    const {rows:[{id:cid_46}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_9, "2. Visi\u00f3n y Estrategia de Producto", 2]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_46, 1, "Entiende la visi\u00f3n del producto y su contexto de negocio.", "Ej: Explic\u00f3 correctamente el posicionamiento del producto a un nuevo integrante del equipo en su primera semana."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_46, 2, "Contribuye a la definici\u00f3n de roadmap con datos del mercado.", "Ej: Aport\u00f3 3 oportunidades de mercado identificadas en entrevistas de usuario para el proceso de roadmap anual."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_46, 3, "Define el roadmap del producto alineado a la estrategia de negocio.", "Ej: Present\u00f3 el roadmap trimestral al Comit\u00e9 de Producto con justificaci\u00f3n de negocio para cada iniciativa."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_46, 4, "Lidera la visi\u00f3n de producto con impacto en m\u00faltiples unidades.", "Ej: Defini\u00f3 la visi\u00f3n del producto para los pr\u00f3ximos 2 a\u00f1os alineada a los OKRs de Visma LATAM."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_46, 5, "Define la estrategia de portafolio de productos.", "Ej: Lider\u00f3 la racionalizaci\u00f3n del portafolio eliminando 2 productos de bajo ROI y priorizando 3 de alto impacto."]
    );

    const {rows:[{id:cid_47}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_9, "3. Colaboraci\u00f3n con Stakeholders", 3]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_47, 1, "Participa en reuniones con stakeholders y recoge feedback.", "Ej: Tom\u00f3 notas detalladas en la reuni\u00f3n con Ventas y las traslad\u00f3 como requerimientos al backlog."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_47, 2, "Gestiona expectativas de stakeholders de forma efectiva.", "Ej: Comunic\u00f3 proactivamente un retraso de feature con alternativas, manteniendo la confianza del \u00e1rea comercial."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_47, 3, "Negocia prioridades y alinea a stakeholders en decisiones clave.", "Ej: Facilit\u00f3 una sesi\u00f3n de priorizaci\u00f3n entre Ventas y Soporte que result\u00f3 en un backlog aceptado por ambas \u00e1reas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_47, 4, "Lidera la gesti\u00f3n de stakeholders ejecutivos y estrat\u00e9gicos.", "Ej: Present\u00f3 la estrategia de producto al CEO y al cliente m\u00e1s importante logrando alineaci\u00f3n estrat\u00e9gica."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_47, 5, "Define modelos de gobernanza de producto con m\u00faltiples partes interesadas.", "Ej: Implement\u00f3 el Product Council de Visma que regula las decisiones de producto entre todas las BUs."]
    );

    const {rows:[{id:cid_48}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_9, "4. Orientaci\u00f3n al Usuario y Mercado", 4]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_48, 1, "Realiza entrevistas b\u00e1sicas y analiza feedback de usuarios.", "Ej: Condujo 5 entrevistas de usuario y sintetiz\u00f3 los hallazgos en un documento compartido con el equipo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_48, 2, "Conduce investigaciones de usuario y traduce insights en requerimientos.", "Ej: Realiz\u00f3 un estudio de usabilidad que identific\u00f3 3 fricciones cr\u00edticas traducidas en \u00e9picas del backlog."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_48, 3, "Dise\u00f1a estrategias de discovery y valida hip\u00f3tesis de producto.", "Ej: Dise\u00f1\u00f3 y ejecut\u00f3 un experimento que valid\u00f3 en 2 semanas si una nueva feature ten\u00eda demanda real."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_48, 4, "Lidera la estrategia de investigaci\u00f3n y define la propuesta de valor.", "Ej: Redefini\u00f3 el ICP (Ideal Customer Profile) del producto bas\u00e1ndose en 50 entrevistas de usuario y datos de uso."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_48, 5, "Define la visi\u00f3n de experiencia de usuario a nivel organizacional.", "Ej: Defini\u00f3 los principios de UX de Visma LATAM adoptados por todos los equipos de producto."]
    );

    const {rows:[{id:cid_49}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_9, "5. M\u00e9tricas y Decisiones Basadas en Datos", 5]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_49, 1, "Comprende las m\u00e9tricas b\u00e1sicas del producto.", "Ej: Sigui\u00f3 la evoluci\u00f3n del DAU y el churn semanal y los report\u00f3 correctamente en la reuni\u00f3n de equipo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_49, 2, "Analiza m\u00e9tricas para priorizar decisiones de producto.", "Ej: Us\u00f3 datos de adopci\u00f3n de features para desprioritizar 2 \u00e9picas de bajo uso en la planificaci\u00f3n trimestral."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_49, 3, "Define OKRs y KPIs del producto y los utiliza para decisiones.", "Ej: Defini\u00f3 los OKRs del producto para el a\u00f1o y tom\u00f3 3 decisiones de roadmap respaldadas en su evoluci\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_49, 4, "Dise\u00f1a el framework de m\u00e9tricas y cultura data-driven del equipo.", "Ej: Implement\u00f3 un dashboard de producto con North Star Metric y m\u00e9tricas de input para todo el equipo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_49, 5, "Define la estrategia de medici\u00f3n de impacto del portafolio.", "Ej: Dise\u00f1\u00f3 el modelo de medici\u00f3n de ROI del portafolio de productos adoptado por la direcci\u00f3n."]
    );

    const {rows:[{id:rid_10}]} = await client.query(
      'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      [fid_3, "Managing Director"]
    );

    const {rows:[{id:cid_50}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_10, "1. Liderazgo Estrat\u00e9gico", 1]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_50, 1, "Entiende la visi\u00f3n y estrategia de la organizaci\u00f3n.", "Ej: Present\u00f3 correctamente los objetivos estrat\u00e9gicos de Visma LATAM en el onboarding de su equipo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_50, 2, "Contribuye a la definici\u00f3n de objetivos estrat\u00e9gicos del \u00e1rea.", "Ej: Propuso 3 iniciativas de crecimiento alineadas al plan estrat\u00e9gico que fueron incluidas en el plan anual."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_50, 3, "Lidera la ejecuci\u00f3n de la estrategia de negocio en su unidad.", "Ej: Ejecut\u00f3 el plan estrat\u00e9gico de su unidad logrando el 105% de los objetivos anuales."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_50, 4, "Define y comunica la estrategia con impacto regional.", "Ej: Present\u00f3 la estrategia de expansi\u00f3n a Colombia al Comit\u00e9 de Visma Group obteniendo aprobaci\u00f3n y funding."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_50, 5, "Lidera la visi\u00f3n a largo plazo y posiciona a la organizaci\u00f3n en el mercado.", "Ej: Defini\u00f3 el plan de crecimiento a 3 a\u00f1os que posicion\u00f3 a Visma LATAM como l\u00edder en su segmento de mercado."]
    );

    const {rows:[{id:cid_51}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_10, "2. Gesti\u00f3n de P&L y Resultados", 2]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_51, 1, "Comprende los principales indicadores financieros del negocio.", "Ej: Analiz\u00f3 el P&L de su \u00e1rea e identific\u00f3 las 3 l\u00edneas de mayor impacto en el margen."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_51, 2, "Gestiona presupuesto de su \u00e1rea y asegura eficiencia operativa.", "Ej: Cerr\u00f3 el a\u00f1o con el 98% de ejecuci\u00f3n presupuestal y un margen operativo por encima del objetivo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_51, 3, "Es responsable del P&L completo de su unidad de negocio.", "Ej: Gestion\u00f3 el P&L de su BU logrando un crecimiento del ARR del 22% y EBITDA en l\u00ednea con el target."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_51, 4, "Optimiza el P&L en m\u00faltiples unidades con visi\u00f3n de portafolio.", "Ej: Reasign\u00f3 recursos entre 3 BUs logrando un crecimiento neto del portafolio del 18% sin incremento de costos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_51, 5, "Define la estrategia financiera que maximiza el valor para Visma.", "Ej: Lider\u00f3 la integraci\u00f3n financiera de una empresa adquirida logrando sinergias por encima del business case."]
    );

    const {rows:[{id:cid_52}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_10, "3. Desarrollo de Talento y Cultura", 3]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_52, 1, "Promueve una cultura positiva y los valores de la organizaci\u00f3n.", "Ej: Reconoci\u00f3 p\u00fablicamente comportamientos que reflejan los valores Visma en la reuni\u00f3n mensual de equipo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_52, 2, "Identifica y desarrolla talento dentro de su equipo.", "Ej: Identific\u00f3 a 2 High Potentials y dise\u00f1\u00f3 planes de desarrollo individuales con desaf\u00edos concretos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_52, 3, "Construye equipos de alto desempe\u00f1o y culturas de excelencia.", "Ej: Construy\u00f3 un equipo directivo que logr\u00f3 el mejor resultado de engagement de la organizaci\u00f3n (87%)."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_52, 4, "Lidera la estrategia de talento y cultura a nivel organizacional.", "Ej: Lanz\u00f3 el programa de liderazgo 'Visma Next' que desarroll\u00f3 a 15 futuros l\u00edderes en 12 meses."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_52, 5, "Define el modelo de liderazgo y cultura corporativa.", "Ej: Defini\u00f3 los principios de liderazgo de Visma LATAM adoptados como est\u00e1ndar por Visma Group para la regi\u00f3n."]
    );

    const {rows:[{id:cid_53}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_10, "4. Gesti\u00f3n de Stakeholders", 4]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_53, 1, "Construye relaciones efectivas con su equipo y pares.", "Ej: Recibi\u00f3 feedback positivo de sus pares en la encuesta de 360\u00b0 sobre colaboraci\u00f3n y comunicaci\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_53, 2, "Gestiona relaciones con clientes clave y socios del negocio.", "Ej: Retuvo al cliente m\u00e1s importante de la BU tras una reuni\u00f3n ejecutiva que resolvi\u00f3 una crisis de servicio."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_53, 3, "Lidera relaciones estrat\u00e9gicas con clientes, reguladores y aliados.", "Ej: Firm\u00f3 un acuerdo de partnership estrat\u00e9gico con un canal que representa el 15% del nuevo ARR."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_53, 4, "Representa a la organizaci\u00f3n ante stakeholders de alto nivel.", "Ej: Particip\u00f3 en el Advisory Board del sector SaaS representando la posici\u00f3n de Visma ante reguladores."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_53, 5, "Influye en el ecosistema e industria y define alianzas estrat\u00e9gicas.", "Ej: Lider\u00f3 la formaci\u00f3n de un consorcio de empresas SaaS que influy\u00f3 en la regulaci\u00f3n del sector en LATAM."]
    );

    const {rows:[{id:cid_54}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_10, "5. Innovaci\u00f3n y Transformaci\u00f3n", 5]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_54, 1, "Adopta nuevas pr\u00e1cticas y herramientas con apertura.", "Ej: Adopt\u00f3 la nueva plataforma de gesti\u00f3n de performance de Visma y complet\u00f3 el onboarding en el plazo definido."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_54, 2, "Promueve la mejora continua en su \u00e1rea.", "Ej: Implement\u00f3 una din\u00e1mica de retrospectiva mensual en su equipo directivo que gener\u00f3 5 mejoras concretas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_54, 3, "Lidera iniciativas de transformaci\u00f3n en su unidad.", "Ej: Lider\u00f3 la transformaci\u00f3n digital de las operaciones de su BU reduciendo costos en un 20%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_54, 4, "Dise\u00f1a y ejecuta programas de innovaci\u00f3n organizacional.", "Ej: Cre\u00f3 el programa 'Visma Labs' de innovaci\u00f3n interna que gener\u00f3 3 nuevas l\u00edneas de producto."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_54, 5, "Define la agenda de transformaci\u00f3n digital e innovaci\u00f3n.", "Ej: Defini\u00f3 el roadmap de transformaci\u00f3n digital de Visma LATAM aprobado por el Group Leadership Team."]
    );

    // Familia: Legal & Especialistas
    const {rows:[{id:fid_4}]} = await client.query(
      'INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      ["Legal & Especialistas"]
    );

    const {rows:[{id:rid_11}]} = await client.query(
      'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      [fid_4, "DPM - Data Protection Manager"]
    );

    const {rows:[{id:cid_55}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_11, "1. Conocimiento Normativo y Legal", 1]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_55, 1, "Conoce los principios b\u00e1sicos del RGPD y normativas aplicables.", "Ej: Respondi\u00f3 correctamente qu\u00e9 datos requieren consentimiento expl\u00edcito al ser consultado por un colega."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_55, 2, "Aplica normativas de protecci\u00f3n de datos en procesos cotidianos.", "Ej: Revis\u00f3 y ajust\u00f3 el formulario de recolecci\u00f3n de datos de un nuevo producto para cumplir con la ley local."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_55, 3, "Interpreta y asesora sobre regulaciones complejas.", "Ej: Asesor\u00f3 al equipo legal sobre las implicancias de la Ley 29733 (Per\u00fa) en la nueva campa\u00f1a de marketing."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_55, 4, "Lidera la estrategia de cumplimiento normativo en materia de datos.", "Ej: Dise\u00f1\u00f3 el programa de cumplimiento de datos para los 3 pa\u00edses de LATAM aprobado por el comit\u00e9 legal."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_55, 5, "Define pol\u00edticas corporativas de privacidad alineadas a regulaciones globales.", "Ej: Redact\u00f3 la Pol\u00edtica de Privacidad Corporativa de Visma LATAM armonizada con RGPD, LGPD y legislaciones locales."]
    );

    const {rows:[{id:cid_56}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_11, "2. Gesti\u00f3n de Riesgos de Privacidad", 2]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_56, 1, "Identifica riesgos b\u00e1sicos de privacidad con apoyo.", "Ej: Complet\u00f3 el checklist de privacidad de un nuevo proceso con orientaci\u00f3n de un colega senior."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_56, 2, "Realiza evaluaciones de impacto (DPIA) simples.", "Ej: Complet\u00f3 la DPIA de un nuevo m\u00f3dulo de RR.HH. siguiendo la plantilla corporativa sin observaciones."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_56, 3, "Conduce DPIAs complejas y propone medidas de mitigaci\u00f3n.", "Ej: Realiz\u00f3 la DPIA de una integraci\u00f3n con un proveedor de IA, identificando 3 riesgos cr\u00edticos y sus controles."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_56, 4, "Dise\u00f1a el marco de gesti\u00f3n de riesgos de privacidad.", "Ej: Implement\u00f3 el registro de actividades de tratamiento (RAT) en todas las \u00e1reas de la organizaci\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_56, 5, "Define la estrategia corporativa de gesti\u00f3n de riesgos de datos.", "Ej: Cre\u00f3 el framework de privacy by design adoptado en todos los proyectos de desarrollo de producto."]
    );

    const {rows:[{id:cid_57}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_11, "3. Gesti\u00f3n de Incidentes de Datos", 3]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_57, 1, "Reporta incidentes de datos seg\u00fan protocolo establecido.", "Ej: Notific\u00f3 una brecha de datos menor al DPM en menos de 24 horas siguiendo el procedimiento vigente."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_57, 2, "Documenta y escala incidentes de forma adecuada.", "Ej: Document\u00f3 un incidente de acceso no autorizado con todos los campos requeridos y lo escal\u00f3 a tiempo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_57, 3, "Coordina la respuesta a brechas de datos y notificaciones regulatorias.", "Ej: Coordin\u00f3 la notificaci\u00f3n a la autoridad de protecci\u00f3n de datos dentro del plazo legal de 72 horas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_57, 4, "Lidera la gesti\u00f3n de crisis de privacidad a nivel organizacional.", "Ej: Dirigi\u00f3 el equipo de respuesta ante una brecha que afect\u00f3 datos de 10.000 usuarios, minimizando el impacto."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_57, 5, "Define el plan de respuesta a incidentes y cultura de seguridad.", "Ej: Dise\u00f1\u00f3 el Playbook de Gesti\u00f3n de Incidentes de Privacidad aprobado por la direcci\u00f3n y auditores externos."]
    );

    const {rows:[{id:cid_58}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_11, "4. Formaci\u00f3n y Sensibilizaci\u00f3n", 4]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_58, 1, "Participa en capacitaciones de privacidad.", "Ej: Complet\u00f3 el 100% de los m\u00f3dulos de formaci\u00f3n en privacidad y aprob\u00f3 la evaluaci\u00f3n con nota m\u00e1xima."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_58, 2, "Apoya el dise\u00f1o y facilitaci\u00f3n de talleres b\u00e1sicos.", "Ej: Co-facilit\u00f3 un taller de privacidad para el equipo de marketing con materiales preparados por el DPM senior."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_58, 3, "Dise\u00f1a y ejecuta programas de formaci\u00f3n en privacidad.", "Ej: Dise\u00f1\u00f3 el programa anual de concientizaci\u00f3n en privacidad que alcanz\u00f3 al 95% de la organizaci\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_58, 4, "Lidera la cultura de privacidad y promueve el privacy by design.", "Ej: Lanz\u00f3 la iniciativa 'Privacy Champions' que form\u00f3 a 20 referentes de privacidad en las \u00e1reas de negocio."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_58, 5, "Define la estrategia de concientizaci\u00f3n y cultura de protecci\u00f3n de datos.", "Ej: Implement\u00f3 el modelo de madurez de privacidad organizacional que elev\u00f3 el score de 2 a 4 en 18 meses."]
    );

    const {rows:[{id:cid_59}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_11, "5. Comunicaci\u00f3n con Partes Interesadas", 5]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_59, 1, "Se comunica con su equipo sobre temas de privacidad.", "Ej: Envi\u00f3 un comunicado claro al equipo explicando los cambios en la pol\u00edtica de uso de datos personales."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_59, 2, "Interact\u00faa con \u00e1reas internas para cumplimiento de pol\u00edticas.", "Ej: Trabaj\u00f3 con el equipo de producto para ajustar el flujo de consentimiento antes del lanzamiento de una feature."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_59, 3, "Asesora a l\u00edderes y gestiona relaciones con autoridades regulatorias.", "Ej: Atendi\u00f3 una consulta de la autoridad de protecci\u00f3n de datos de Chile con respuestas precisas y en plazo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_59, 4, "Representa a la organizaci\u00f3n ante reguladores y socios estrat\u00e9gicos.", "Ej: Particip\u00f3 en la mesa de trabajo con el regulador peruano sobre nuevas gu\u00edas de datos en el sector SaaS."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_59, 5, "Lidera la agenda de privacidad en foros externos e industria.", "Ej: Expuso el modelo de privacidad de Visma LATAM en un congreso regional, posicionando a la empresa como referente."]
    );

    const {rows:[{id:rid_12}]} = await client.query(
      'INSERT INTO roles(family_id, name) VALUES($1,$2) ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
      [fid_4, "Support Consultant"]
    );

    const {rows:[{id:cid_60}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_12, "1. Resoluci\u00f3n de Problemas y Soporte T\u00e9cnico", 1]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_60, 1, "Resuelve incidencias b\u00e1sicas siguiendo procedimientos.", "Ej: Resolvi\u00f3 15 tickets de soporte de nivel 1 en el d\u00eda siguiendo el \u00e1rbol de decisi\u00f3n del equipo."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_60, 2, "Diagnostica y resuelve problemas de complejidad media.", "Ej: Resolvi\u00f3 un problema de configuraci\u00f3n de permisos de un cliente sin escalar, en menos de 2 horas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_60, 3, "Resuelve incidencias complejas y crea documentaci\u00f3n de soluciones.", "Ej: Resolvi\u00f3 un bug de integraci\u00f3n con API de terceros y document\u00f3 la soluci\u00f3n en la base de conocimiento."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_60, 4, "Lidera la resoluci\u00f3n de casos cr\u00edticos y escala de manera efectiva.", "Ej: Coordin\u00f3 la resoluci\u00f3n de un incidente P1 en 4 horas, comunicando actualizaciones al cliente cada 30 minutos."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_60, 5, "Define procesos de soporte y est\u00e1ndares de resoluci\u00f3n.", "Ej: Redise\u00f1\u00f3 el \u00e1rbol de decisi\u00f3n de nivel 1 que redujo el tiempo de resoluci\u00f3n promedio en un 35%."]
    );

    const {rows:[{id:cid_61}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_12, "2. Comunicaci\u00f3n con el Cliente", 2]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_61, 1, "Responde consultas con claridad y empat\u00eda b\u00e1sica.", "Ej: Recibi\u00f3 5 estrellas en la encuesta post-interacci\u00f3n por su claridad y amabilidad."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_61, 2, "Gestiona conversaciones dif\u00edciles con profesionalismo.", "Ej: Atendi\u00f3 a un cliente frustrado, validando su situaci\u00f3n y ofreciendo una soluci\u00f3n concreta que lo dej\u00f3 satisfecho."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_61, 3, "Construye relaciones de confianza y asegura satisfacci\u00f3n del cliente.", "Ej: Fue mencionado por nombre en una rese\u00f1a positiva de un cliente que destac\u00f3 su acompa\u00f1amiento."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_61, 4, "Lidera la experiencia del cliente y gestiona cuentas estrat\u00e9gicas.", "Ej: Fue el punto de contacto principal de los 5 clientes m\u00e1s grandes, logrando un NPS de 72."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_61, 5, "Define est\u00e1ndares de comunicaci\u00f3n y cultura de servicio al cliente.", "Ej: Cre\u00f3 la Gu\u00eda de Comunicaci\u00f3n con Clientes adoptada por todo el equipo de soporte de LATAM."]
    );

    const {rows:[{id:cid_62}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_12, "3. Conocimiento del Producto", 3]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_62, 1, "Conoce las funcionalidades b\u00e1sicas del producto.", "Ej: Resolvi\u00f3 consultas b\u00e1sicas sobre el m\u00f3dulo de facturaci\u00f3n sin necesidad de consultar la documentaci\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_62, 2, "Explica funcionalidades avanzadas y resuelve dudas.", "Ej: Gui\u00f3 a un cliente en la configuraci\u00f3n avanzada de reportes explicando cada paso de forma clara."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_62, 3, "Domina el producto y asesora sobre mejores pr\u00e1cticas de uso.", "Ej: Identific\u00f3 que un cliente no estaba usando el m\u00f3dulo de automatizaci\u00f3n y lo configur\u00f3 para ahorrarle 5 horas/semana."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_62, 4, "Act\u00faa como referente de producto para el equipo de soporte.", "Ej: Fue consultado por 4 colegas en el mes para resolver dudas t\u00e9cnicas complejas del producto."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_62, 5, "Define el modelo de conocimiento y capacitaci\u00f3n del equipo.", "Ej: Cre\u00f3 el programa de certificaci\u00f3n interna de producto que elev\u00f3 el score de conocimiento del equipo en un 40%."]
    );

    const {rows:[{id:cid_63}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_12, "4. Documentaci\u00f3n y Gesti\u00f3n del Conocimiento", 4]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_63, 1, "Documenta incidencias en el sistema de tickets.", "Ej: Document\u00f3 todos sus tickets con categor\u00eda, soluci\u00f3n y tiempo de resoluci\u00f3n sin omisiones durante el mes."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_63, 2, "Crea art\u00edculos b\u00e1sicos de base de conocimiento.", "Ej: Escribi\u00f3 3 art\u00edculos de FAQ que redujeron las consultas repetidas sobre el m\u00f3dulo de reportes en un 20%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_63, 3, "Dise\u00f1a y mantiene una base de conocimiento completa.", "Ej: Reorganiz\u00f3 la base de conocimiento del equipo mejorando el tiempo de b\u00fasqueda de soluciones en un 50%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_63, 4, "Lidera la estrategia de gesti\u00f3n del conocimiento del equipo.", "Ej: Implement\u00f3 el proceso de documentaci\u00f3n sistem\u00e1tica que asegur\u00f3 que el 90% de los casos tuvieran soluci\u00f3n documentada."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_63, 5, "Define el framework de conocimiento organizacional de soporte.", "Ej: Dise\u00f1\u00f3 la arquitectura de la base de conocimiento de Visma LATAM adoptada por todos los equipos de soporte."]
    );

    const {rows:[{id:cid_64}]} = await client.query(
      'INSERT INTO role_competencies(role_id, name, sort_order) VALUES($1,$2,$3) ON CONFLICT(role_id,name) DO UPDATE SET sort_order=EXCLUDED.sort_order RETURNING id',
      [rid_12, "5. Mejora Continua del Servicio", 5]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_64, 1, "Identifica patrones de problemas recurrentes.", "Ej: Report\u00f3 al l\u00edder que el 40% de los tickets del mes eran por el mismo error de configuraci\u00f3n."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_64, 2, "Propone mejoras al proceso de soporte.", "Ej: Propuso incluir un paso de verificaci\u00f3n en el proceso de onboarding que redujo los tickets de primeras semanas."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_64, 3, "Lidera iniciativas de mejora que reducen el volumen de tickets.", "Ej: Lider\u00f3 la creaci\u00f3n de un tutorial de video que redujo los tickets del m\u00f3dulo de reportes en un 30%."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_64, 4, "Dise\u00f1a programas de mejora continua con impacto medible.", "Ej: Implement\u00f3 el programa de an\u00e1lisis mensual de tickets que redujo el volumen total en un 25% en 6 meses."]
    );
    await client.query(
      'INSERT INTO competency_level_descriptions(competency_id, level, description, observable) VALUES($1,$2,$3,$4) ON CONFLICT(competency_id,level) DO UPDATE SET description=EXCLUDED.description, observable=EXCLUDED.observable',
      [cid_64, 5, "Define la estrategia de evoluci\u00f3n del servicio de soporte.", "Ej: Dise\u00f1\u00f3 el roadmap de evoluci\u00f3n del servicio de soporte de Visma LATAM aprobado por la direcci\u00f3n."]
    );

    await client.query('COMMIT');
    console.log('✅ Seed Visma completado');
    console.log('   → 5 familias · 13 roles · 65 competencias · 325 niveles');
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
