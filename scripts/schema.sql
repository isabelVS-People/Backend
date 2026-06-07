-- ============================================================
-- SCHEMA: Gestión de Competencias y Roles
-- Multi-país: Chile, Colombia, Perú
-- ============================================================

-- Extensión para UUIDs opcionales
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ──────────────────────────────────────────
-- TABLAS COMPARTIDAS (sin campo country)
-- ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS role_families (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS roles (
  id        SERIAL PRIMARY KEY,
  family_id INTEGER NOT NULL REFERENCES role_families(id) ON DELETE CASCADE,
  name      VARCHAR(120) NOT NULL,
  UNIQUE(family_id, name)
);

CREATE TABLE IF NOT EXISTS competency_levels (
  id          SERIAL PRIMARY KEY,
  role_id     INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  level       SMALLINT NOT NULL CHECK (level BETWEEN 1 AND 5),
  description TEXT NOT NULL,
  UNIQUE(role_id, level)
);

CREATE TYPE req_value_type AS ENUM ('text', 'number', 'date', 'boolean', 'options');

CREATE TABLE IF NOT EXISTS additional_requirement_definitions (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(200) NOT NULL UNIQUE,
  value_type   req_value_type NOT NULL DEFAULT 'text',
  options_list TEXT[] DEFAULT '{}'
);

-- ──────────────────────────────────────────
-- USUARIOS (SSO: el password se usa solo en
-- desarrollo; en prod, el token viene del IdP)
-- ──────────────────────────────────────────

CREATE TYPE user_role AS ENUM ('colaborador', 'lider', 'admin_rrhh');
CREATE TYPE country_code AS ENUM ('Chile', 'Colombia', 'Perú');

CREATE TABLE IF NOT EXISTS users (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(200) NOT NULL,
  email        VARCHAR(200) NOT NULL UNIQUE,
  password_hash VARCHAR(255),           -- solo para dev/demo
  role         user_role NOT NULL,
  country      country_code NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────
-- TABLAS CON AISLAMIENTO POR PAÍS
-- ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS employees (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(200) NOT NULL,
  email         VARCHAR(200) NOT NULL,
  area          VARCHAR(120) NOT NULL,
  role_id       INTEGER REFERENCES roles(id),
  current_level SMALLINT CHECK (current_level BETWEEN 1 AND 5),
  country       country_code NOT NULL,
  leader_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(email, country)
);

CREATE TABLE IF NOT EXISTS additional_requirement_values (
  id                    SERIAL PRIMARY KEY,
  employee_id           INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  requirement_def_id    INTEGER NOT NULL REFERENCES additional_requirement_definitions(id) ON DELETE CASCADE,
  value                 TEXT,
  country               country_code NOT NULL,
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(employee_id, requirement_def_id)
);

CREATE TABLE IF NOT EXISTS change_history (
  id               SERIAL PRIMARY KEY,
  employee_id      INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  changed_by_id    INTEGER NOT NULL REFERENCES users(id),
  change_date      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  previous_role_id INTEGER REFERENCES roles(id),
  new_role_id      INTEGER REFERENCES roles(id),
  previous_level   SMALLINT,
  new_level        SMALLINT,
  country          country_code NOT NULL
);

-- ──────────────────────────────────────────
-- ÍNDICES OBLIGATORIOS
-- ──────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_employees_country          ON employees(country);
CREATE INDEX IF NOT EXISTS idx_employees_country_area     ON employees(country, area);
CREATE INDEX IF NOT EXISTS idx_employees_leader           ON employees(leader_id);
CREATE INDEX IF NOT EXISTS idx_change_history_emp_country ON change_history(employee_id, country);
CREATE INDEX IF NOT EXISTS idx_change_history_country     ON change_history(country);
CREATE INDEX IF NOT EXISTS idx_req_values_employee        ON additional_requirement_values(employee_id);

-- ──────────────────────────────────────────
-- FUNCIÓN: actualizar updated_at automático
-- ──────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_employees_updated_at
  BEFORE UPDATE ON employees
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
