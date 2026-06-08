require('dotenv').config();
const pool = require('../src/db/pool');

async function addArgentina() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Agregar Argentina al ENUM
    await client.query(`ALTER TYPE country_code ADD VALUE IF NOT EXISTS 'Argentina'`);

    // Crear usuario Admin RRHH Argentina
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('demo1234', 10);
    await client.query(
      `INSERT INTO users(name, email, password_hash, role, country)
       VALUES($1,$2,$3,$4,$5) ON CONFLICT(email) DO NOTHING`,
      ['Admin RRHH Argentina', 'admin.argentina@empresa.com', hash, 'admin_rrhh', 'Argentina']
    );

    await client.query('COMMIT');
    console.log('✅ Argentina agregada exitosamente');
    console.log('   → ENUM country_code actualizado');
    console.log('   → Admin RRHH Argentina creado (admin.argentina@empresa.com / demo1234)');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error:', err.message);
    throw err;
  } finally {
    client.release();
    pool.end();
  }
}

addArgentina().catch(() => process.exit(1));
