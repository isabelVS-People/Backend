-- ══════════════════════════════════════════════════════════
-- MIGRACIÓN: Tabla de competencias múltiples por rol/nivel
-- ══════════════════════════════════════════════════════════

-- Nueva tabla: competencias específicas por rol
CREATE TABLE IF NOT EXISTS role_competencies (
  id          SERIAL PRIMARY KEY,
  role_id     INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  name        VARCHAR(200) NOT NULL,
  sort_order  SMALLINT NOT NULL DEFAULT 1,
  UNIQUE(role_id, name)
);

-- Nueva tabla: descripción de cada competencia por nivel
CREATE TABLE IF NOT EXISTS competency_level_descriptions (
  id              SERIAL PRIMARY KEY,
  competency_id   INTEGER NOT NULL REFERENCES role_competencies(id) ON DELETE CASCADE,
  level           SMALLINT NOT NULL CHECK (level BETWEEN 1 AND 5),
  description     TEXT NOT NULL,
  observable      TEXT,
  UNIQUE(competency_id, level)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_role_competencies_role ON role_competencies(role_id);
CREATE INDEX IF NOT EXISTS idx_comp_level_desc_comp   ON competency_level_descriptions(competency_id);

-- La tabla competency_levels original se mantiene para compatibilidad
-- (se puede deprecar luego)
