-- Agregar Argentina al ENUM country_code
ALTER TYPE country_code ADD VALUE IF NOT EXISTS 'Argentina';
