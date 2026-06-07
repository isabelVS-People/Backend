require('dotenv').config();
const pool = require('../src/db/pool');
const bcrypt = require('bcryptjs');

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ── Familias de roles ──────────────────────────────────────
    const families = [
      'Tecnología & Desarrollo',
      'Datos & Analytics',
      'Producto & Diseño',
      'Operaciones & Procesos',
      'Comercial & Ventas',
    ];
    const familyIds = {};
    for (const name of families) {
      const r = await client.query(
        'INSERT INTO role_families(name) VALUES($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id',
        [name]
      );
      familyIds[name] = r.rows[0].id;
    }

    // ── Roles por familia ──────────────────────────────────────
    const rolesData = {
      'Tecnología & Desarrollo': [
        'Desarrollador Frontend', 'Desarrollador Backend',
        'DevOps Engineer', 'Tech Lead', 'Arquitecto de Software',
      ],
      'Datos & Analytics': [
        'Data Analyst', 'Data Engineer', 'Data Scientist',
        'BI Developer', 'ML Engineer',
      ],
      'Producto & Diseño': [
        'Product Manager', 'UX Designer', 'UX Researcher',
        'Product Designer', 'Product Owner',
      ],
      'Operaciones & Procesos': [
        'Analista de Procesos', 'Project Manager', 'Scrum Master',
        'Business Analyst', 'Operations Lead',
      ],
      'Comercial & Ventas': [
        'Ejecutivo de Ventas', 'Account Manager', 'Sales Engineer',
        'Customer Success', 'Sales Lead',
      ],
    };

    const roleIds = {};
    for (const [familyName, roleNames] of Object.entries(rolesData)) {
      for (const roleName of roleNames) {
        const r = await client.query(
          `INSERT INTO roles(family_id, name) VALUES($1,$2)
           ON CONFLICT(family_id, name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
          [familyIds[familyName], roleName]
        );
        roleIds[roleName] = r.rows[0].id;
      }
    }

    // ── Niveles de competencia (genéricos para todos los roles) ─
    const levelDescs = [
      'Conocimiento básico. Requiere supervisión constante. Aplica conceptos fundamentales bajo guía.',
      'Conocimiento funcional. Trabaja con supervisión moderada. Resuelve problemas estándar.',
      'Conocimiento sólido. Trabaja de forma autónoma. Resuelve problemas complejos.',
      'Conocimiento avanzado. Guía a otros. Diseña soluciones y mejora procesos existentes.',
      'Experto referente. Lidera iniciativas estratégicas. Define estándares y mejores prácticas.',
    ];
    for (const roleId of Object.values(roleIds)) {
      for (let level = 1; level <= 5; level++) {
        await client.query(
          `INSERT INTO competency_levels(role_id, level, description) VALUES($1,$2,$3)
           ON CONFLICT(role_id, level) DO UPDATE SET description=EXCLUDED.description`,
          [roleId, level, levelDescs[level - 1]]
        );
      }
    }

    // ── Requisitos adicionales ─────────────────────────────────
    const reqDefs = [
      { name: 'Certificación AWS', value_type: 'boolean', options_list: [] },
      { name: 'Años de experiencia', value_type: 'number', options_list: [] },
      { name: 'Idioma adicional', value_type: 'options', options_list: ['Inglés B2', 'Inglés C1', 'Inglés C2', 'Portugués', 'Francés'] },
      { name: 'Última capacitación', value_type: 'date', options_list: [] },
      { name: 'Observaciones', value_type: 'text', options_list: [] },
    ];
    for (const req of reqDefs) {
      await client.query(
        `INSERT INTO additional_requirement_definitions(name, value_type, options_list)
         VALUES($1,$2,$3) ON CONFLICT(name) DO NOTHING`,
        [req.name, req.value_type, req.options_list]
      );
    }

    // ── Usuarios de prueba ─────────────────────────────────────
    const passwordHash = await bcrypt.hash('demo1234', 10);
    const usersData = [
      { name: 'Admin RRHH Chile', email: 'admin.chile@empresa.com', role: 'admin_rrhh', country: 'Chile' },
      { name: 'Admin RRHH Colombia', email: 'admin.colombia@empresa.com', role: 'admin_rrhh', country: 'Colombia' },
      { name: 'Admin RRHH Perú', email: 'admin.peru@empresa.com', role: 'admin_rrhh', country: 'Perú' },
      { name: 'Pedro Soto', email: 'pedro.soto@empresa.com', role: 'lider', country: 'Chile' },
      { name: 'Rosa Ibáñez', email: 'rosa.ibanez@empresa.com', role: 'lider', country: 'Chile' },
      { name: 'Ana Martínez', email: 'ana.martinez@empresa.com', role: 'colaborador', country: 'Chile' },
      { name: 'Carlos Vega', email: 'carlos.vega@empresa.com', role: 'colaborador', country: 'Chile' },
      { name: 'Isabela Gómez', email: 'isabela.gomez@empresa.com', role: 'colaborador', country: 'Colombia' },
    ];
    const userIds = {};
    for (const u of usersData) {
      const r = await client.query(
        `INSERT INTO users(name, email, password_hash, role, country)
         VALUES($1,$2,$3,$4,$5)
         ON CONFLICT(email) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
        [u.name, u.email, passwordHash, u.role, u.country]
      );
      userIds[u.email] = r.rows[0].id;
    }

    // ── Empleados de ejemplo ───────────────────────────────────
    const empData = [
      { name: 'Ana Martínez', email: 'ana.martinez@empresa.com', area: 'Ingeniería', roleName: 'Desarrollador Frontend', level: 3, country: 'Chile', leaderEmail: 'pedro.soto@empresa.com' },
      { name: 'Carlos Vega', email: 'carlos.vega@empresa.com', area: 'Ingeniería', roleName: 'Desarrollador Backend', level: 2, country: 'Chile', leaderEmail: 'pedro.soto@empresa.com' },
      { name: 'Sofía Rojas', email: 'sofia.rojas@empresa.com', area: 'Ingeniería', roleName: 'DevOps Engineer', level: 4, country: 'Chile', leaderEmail: 'pedro.soto@empresa.com' },
      { name: 'Diego Herrera', email: 'diego.herrera@empresa.com', area: 'Datos', roleName: 'Data Analyst', level: 3, country: 'Chile', leaderEmail: 'rosa.ibanez@empresa.com' },
      { name: 'Valentina Cruz', email: 'valentina.cruz@empresa.com', area: 'Producto', roleName: 'Product Manager', level: 4, country: 'Chile', leaderEmail: 'rosa.ibanez@empresa.com' },
      { name: 'Isabela Gómez', email: 'isabela.gomez@empresa.com', area: 'Ingeniería', roleName: 'Desarrollador Frontend', level: 1, country: 'Colombia', leaderEmail: null },
      { name: 'Nicolás Díaz', email: 'nicolas.diaz@empresa.com', area: 'Datos', roleName: 'Data Scientist', level: 3, country: 'Colombia', leaderEmail: null },
    ];
    for (const e of empData) {
      const leaderId = e.leaderEmail ? userIds[e.leaderEmail] : null;
      await client.query(
        `INSERT INTO employees(name, email, area, role_id, current_level, country, leader_id)
         VALUES($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT(email, country) DO UPDATE SET name=EXCLUDED.name`,
        [e.name, e.email, e.area, roleIds[e.roleName], e.level, e.country, leaderId]
      );
    }

    await client.query('COMMIT');
    console.log('✅ Seed completado exitosamente');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error en seed:', err);
    throw err;
  } finally {
    client.release();
    pool.end();
  }
}

seed().catch(() => process.exit(1));
