# Backend — Gestión de Competencias y Roles

API REST con Node.js + Express + PostgreSQL.

## Requisitos

- Node.js 18+
- PostgreSQL 14+

## Instalación

```bash
cd backend
npm install

# Copiar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL y JWT_SECRET

# Crear base de datos en PostgreSQL
createdb competencias_db

# Correr migraciones (crea el schema completo)
npm run db:migrate

# Poblar con datos de ejemplo
npm run db:seed

# Iniciar servidor en desarrollo
npm run dev
```

El servidor queda disponible en `http://localhost:3001`.

## Estructura

```
src/
├── db/
│   └── pool.js              # Pool de conexiones PostgreSQL
├── middleware/
│   ├── auth.js              # JWT authentication + requireRole + requireSameTeam
│   └── errorHandler.js      # Error handler global
├── routes/
│   ├── auth.js              # POST /login, POST /sso, GET /me
│   ├── employees.js         # CRUD colaboradores + historial + requisitos
│   ├── roles.js             # Familias, roles y niveles (compartidos)
│   ├── requirements.js      # Requisitos adicionales (CRUD)
│   ├── bulk.js              # Carga masiva CSV/Excel
│   └── export.js            # Exportación a Excel (.xlsx)
└── index.js                 # Entry point
scripts/
├── schema.sql               # DDL completo con índices y triggers
├── migrate.js               # Runner de migraciones
└── seed.js                  # Datos de ejemplo
```

## Endpoints principales

### Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Login demo (dev) |
| POST | `/api/auth/sso` | Intercambio de token SSO |
| GET  | `/api/auth/me` | Usuario actual |

### Colaboradores
| Método | Ruta | Roles | Descripción |
|--------|------|-------|-------------|
| GET | `/api/employees` | lider, admin_rrhh | Lista con filtros |
| GET | `/api/employees/me` | colaborador | Perfil propio |
| PATCH | `/api/employees/:id` | lider, admin_rrhh | Editar rol/nivel |
| GET | `/api/employees/:id/history` | todos | Historial |
| GET | `/api/employees/:id/requirements` | lider, admin_rrhh | Requisitos |
| PUT | `/api/employees/:id/requirements` | admin_rrhh | Evaluar requisitos |

### Roles y familias
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/roles/families` | Todas las familias con sus roles |
| GET | `/api/roles/:id/levels` | Niveles de competencia de un rol |

### Carga masiva
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/bulk/employees` | CSV/Excel de colaboradores |
| POST | `/api/bulk/roles` | CSV/Excel de familias/roles/niveles |

### Exportación
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/export/employees` | Excel con colaboradores + historial |

## Seguridad

- **JWT** con campos `userId`, `role`, `country`. El `country` nunca se acepta del cliente.
- **Aislamiento por país**: todas las queries filtran por `country` extraído del JWT.
- **requireSameTeam**: el líder solo puede modificar colaboradores de su propio equipo.
- En producción, configurar `JWT_SECRET` con al menos 32 caracteres aleatorios.

## SSO en producción

Para integrar con un Identity Provider real (Okta, Azure AD, Google Workspace):

```bash
npm install openid-client
```

Luego en `routes/auth.js`, reemplazar el stub del endpoint `/sso` con:

```js
const { Issuer } = require('openid-client');
const issuer = await Issuer.discover(process.env.SSO_ISSUER);
const client = new issuer.Client({
  client_id: process.env.SSO_CLIENT_ID,
  client_secret: process.env.SSO_CLIENT_SECRET,
});
// Validar idToken y obtener claims.email
```

## Conectar el frontend

En `frontend/src/utils/api.js` ya está el cliente HTTP listo.

En cada vista, reemplazar los imports de `mockData`:

```js
// Antes
import { employees } from '../data/mockData';

// Después
import api from '../utils/api';
const employees = await api.employees.list({ area: filtros.area });
```

Agregar en el frontend:
```env
# frontend/.env
VITE_API_URL=http://localhost:3001
```
<!-- deploy -->
