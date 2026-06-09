require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const roleRoutes = require('./routes/roles');
const requirementRoutes = require('./routes/requirements');
const bulkRoutes = require('./routes/bulk');
const exportRoutes = require('./routes/export');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// ── CORS ────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.includes('vercel.app') || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// ── Body parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

// ── Rutas ─────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/requirements', requirementRoutes);
app.use('/api/bulk', bulkRoutes);
app.use('/api/export', exportRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.path}` });
});

// ── Error handler (debe ser el último middleware) ─────────────────────────────
app.use(errorHandler);

// ── Arranque ──────────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || '3001');
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`   Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   CORS habilitado para: ${process.env.FRONTEND_URL || 'http://localhost:5173'}\n`);
});

module.exports = app;
