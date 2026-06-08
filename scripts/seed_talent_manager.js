require('dotenv').config();
const pool = require('../src/db/pool');

async function seedTalentManager() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ══════════════════════════════════════════════════════════════
    // FAMILIA 1: DESARROLLO DE PERSONAS
    // ══════════════════════════════════════════════════════════════
    const fam1 = await client.query(
      `INSERT INTO role_families(name) VALUES('Desarrollo de Personas')
       ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id`
    );
    const f1 = fam1.rows[0].id;

    const rolesDesarrollo = [
      {
        name: 'Talent Development Analyst',
        levels: [
          'Apoya la ejecución de programas de desarrollo existentes bajo supervisión. Conoce herramientas básicas de diagnóstico de necesidades y gestión del aprendizaje.',
          'Diseña e implementa acciones de desarrollo para perfiles específicos. Analiza brechas de competencias y propone planes individuales con criterio propio.',
          'Lidera programas de desarrollo para múltiples áreas. Articula el aprendizaje organizacional con la estrategia de negocio y gestiona proveedores externos.',
          'Define el marco de desarrollo de talento de la organización. Impulsa culturas de aprendizaje continuo y mide el impacto de las iniciativas en el desempeño.',
          'Referente regional en desarrollo de talento. Diseña arquitecturas de aprendizaje organizacional y asesora a la alta dirección en estrategias de crecimiento de capacidades.',
        ],
      },
      {
        name: 'Learning & Development Specialist',
        levels: [
          'Administra plataformas de e-learning y coordina logística de capacitaciones. Evalúa la satisfacción de los participantes mediante encuestas post-formación.',
          'Diseña contenidos de formación alineados a competencias. Facilita talleres y programas de inducción con autonomía y adapta metodologías según la audiencia.',
          'Desarrolla currículas de formación por familia de roles. Aplica modelos como 70-20-10 y gestiona el ciclo completo de un programa formativo.',
          'Lidera la estrategia L&D de la organización. Implementa modelos de medición del impacto del aprendizaje (Kirkpatrick, ROI) y gestiona presupuestos formativos.',
          'Diseña el ecosistema de aprendizaje organizacional. Integra aprendizaje formal, social y experiencial en una propuesta de valor que impulsa la ventaja competitiva.',
        ],
      },
      {
        name: 'Career Development Partner',
        levels: [
          'Apoya procesos de orientación de carrera con herramientas predefinidas. Recopila información sobre aspiraciones de los colaboradores y la canaliza al equipo de RRHH.',
          'Conduce conversaciones de carrera con colaboradores de forma autónoma. Mapea trayectorias posibles dentro de la organización y facilita planes de desarrollo individual.',
          'Diseña e implementa marcos de carrera para múltiples áreas. Conecta las aspiraciones individuales con las necesidades organizacionales y gestiona programas de movilidad interna.',
          'Define la arquitectura de carreras de la organización. Lidera iniciativas de sucesión y retención de talento clave, articulando desarrollo individual con estrategia de negocio.',
          'Referente en gestión de carreras organizacionales. Diseña modelos de movilidad y sucesión a nivel regional, asesora a líderes en decisiones estratégicas de talento.',
        ],
      },
      {
        name: 'Talent Manager',
        levels: [
          'Gestiona procesos de atracción y desarrollo de talento con supervisión. Conoce las herramientas del ciclo de vida del colaborador y apoya iniciativas de retención.',
          'Gestiona el ciclo completo de talento de forma autónoma: atracción, desarrollo, retención y sucesión. Asesora a líderes en decisiones de personas con criterio estratégico.',
          'Lidera la estrategia de talento para múltiples áreas o países. Implementa modelos de gestión del desempeño, sucesión y desarrollo alineados al negocio.',
          'Define la propuesta de valor al empleado y la estrategia de talento organizacional. Mide el impacto de las iniciativas de personas en los resultados del negocio.',
          'Referente regional en gestión integral de talento. Diseña modelos innovadores de atracción, desarrollo y retención, y asesora a la alta dirección en estrategia de personas.',
        ],
      },
      {
        name: 'Organizational Development Consultant',
        levels: [
          'Apoya diagnósticos organizacionales y relevamientos de clima bajo supervisión. Conoce metodologías básicas de OD y gestiona proyectos de cambio de alcance acotado.',
          'Diseña e implementa intervenciones de desarrollo organizacional con autonomía. Facilita procesos de cambio, diagnósticos de clima y talleres de alineamiento cultural.',
          'Lidera proyectos complejos de transformación organizacional. Aplica metodologías avanzadas de OD, gestiona múltiples stakeholders y mide el impacto de las intervenciones.',
          'Define la estrategia de desarrollo organizacional. Diseña arquitecturas de cambio a escala, impulsa la agilidad organizacional y asesora a la alta dirección en transformación.',
          'Referente en desarrollo y transformación organizacional a nivel regional. Diseña modelos de evolución cultural y estructural que habilitan la estrategia de largo plazo.',
        ],
      },
    ];

    for (const rol of rolesDesarrollo) {
      const r = await client.query(
        `INSERT INTO roles(family_id, name) VALUES($1,$2)
         ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
        [f1, rol.name]
      );
      for (let i = 0; i < 5; i++) {
        await client.query(
          `INSERT INTO competency_levels(role_id, level, description) VALUES($1,$2,$3)
           ON CONFLICT(role_id,level) DO UPDATE SET description=EXCLUDED.description`,
          [r.rows[0].id, i + 1, rol.levels[i]]
        );
      }
    }

    // ══════════════════════════════════════════════════════════════
    // FAMILIA 2: GESTIÓN DEL DESEMPEÑO
    // ══════════════════════════════════════════════════════════════
    const fam2 = await client.query(
      `INSERT INTO role_families(name) VALUES('Gestión del Desempeño')
       ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id`
    );
    const f2 = fam2.rows[0].id;

    const rolesDesempeno = [
      {
        name: 'Performance Management Analyst',
        levels: [
          'Administra el ciclo de evaluación de desempeño y da soporte a colaboradores en el uso de herramientas. Consolida datos y genera reportes básicos de resultados.',
          'Gestiona el ciclo completo de desempeño con autonomía. Asesora a líderes en la aplicación de criterios de evaluación y analiza resultados para detectar patrones.',
          'Diseña e implementa el modelo de gestión del desempeño. Calibra evaluaciones entre áreas, gestiona conversaciones difíciles y conecta resultados con decisiones de talento.',
          'Define la estrategia de desempeño organizacional. Integra el modelo de evaluación con compensación, desarrollo y sucesión, y mide el impacto en productividad.',
          'Referente en gestión del desempeño a nivel regional. Diseña marcos innovadores de evaluación continua, asesora a la alta dirección y lidera la evolución del modelo.',
        ],
      },
      {
        name: 'OKR & Goals Specialist',
        levels: [
          'Apoya la implementación del modelo OKR en equipos específicos. Conoce la metodología, facilita sesiones de definición de objetivos y realiza seguimiento básico.',
          'Implementa y acompaña el ciclo OKR de forma autónoma en múltiples equipos. Capacita a líderes, identifica desalineamientos y propone ajustes durante el ciclo.',
          'Lidera la adopción del modelo OKR en la organización. Diseña la cascada de objetivos, facilita la alineación estratégica y genera reportes de impacto para la dirección.',
          'Define la estrategia de gestión por objetivos. Integra OKRs con la planificación estratégica, la compensación variable y el desarrollo de talento a nivel organizacional.',
          'Referente regional en metodologías de gestión por objetivos. Diseña marcos de alineación estratégica y asesora a líderes ejecutivos en la implementación de modelos ágiles.',
        ],
      },
      {
        name: 'People Analytics Specialist',
        levels: [
          'Extrae y consolida datos de personas de distintas fuentes. Genera dashboards básicos de indicadores de RRHH y apoya el análisis descriptivo bajo supervisión.',
          'Diseña y mantiene dashboards de People Analytics. Realiza análisis descriptivos y predictivos básicos, e interpreta datos para apoyar decisiones de talento.',
          'Lidera proyectos de análisis avanzado de datos de personas. Desarrolla modelos predictivos de rotación, desempeño y engagement, y presenta hallazgos a la dirección.',
          'Define la estrategia de People Analytics de la organización. Implementa infraestructura de datos de personas, impulsa la toma de decisiones basada en evidencia.',
          'Referente regional en People Analytics. Diseña arquitecturas de datos de personas, desarrolla modelos de IA aplicados a RRHH y asesora a la alta dirección en estrategia.',
        ],
      },
      {
        name: 'Feedback & Coaching Facilitator',
        levels: [
          'Facilita procesos de feedback estructurado con herramientas definidas. Conoce metodologías de coaching básico y acompaña conversaciones de retroalimentación simples.',
          'Conduce procesos de feedback 360° y conversaciones de desarrollo de forma autónoma. Aplica técnicas de coaching para potenciar el crecimiento de colaboradores.',
          'Diseña e implementa programas de feedback continuo y coaching organizacional. Forma a líderes en habilidades de feedback y gestiona comunidades de práctica.',
          'Define la estrategia de feedback y coaching de la organización. Implementa culturas de retroalimentación continua y mide su impacto en el desempeño y el clima.',
          'Referente regional en feedback y desarrollo. Diseña ecosistemas de coaching organizacional, certifica facilitadores internos y asesora a la alta dirección en cultura de feedback.',
        ],
      },
      {
        name: 'Compensation & Benefits Analyst',
        levels: [
          'Administra procesos de compensación y beneficios bajo supervisión. Realiza encuestas salariales básicas y gestiona novedades de beneficios con criterio operativo.',
          'Gestiona el ciclo de compensación con autonomía. Analiza equidad interna y competitividad externa, y asesora a líderes en decisiones salariales dentro de bandas.',
          'Diseña estructuras de compensación y beneficios alineadas a la estrategia. Gestiona procesos de mérito, bonus y equidad, e integra la compensación con el desempeño.',
          'Define la estrategia de compensación total de la organización. Lidera el diseño de bandas salariales, programas de incentivos y beneficios flexibles a nivel regional.',
          'Referente regional en compensación y beneficios. Diseña filosofías de remuneración, asesora a la alta dirección en estrategias de retención y lidera benchmarks de mercado.',
        ],
      },
    ];

    for (const rol of rolesDesempeno) {
      const r = await client.query(
        `INSERT INTO roles(family_id, name) VALUES($1,$2)
         ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
        [f2, rol.name]
      );
      for (let i = 0; i < 5; i++) {
        await client.query(
          `INSERT INTO competency_levels(role_id, level, description) VALUES($1,$2,$3)
           ON CONFLICT(role_id,level) DO UPDATE SET description=EXCLUDED.description`,
          [r.rows[0].id, i + 1, rol.levels[i]]
        );
      }
    }

    // ══════════════════════════════════════════════════════════════
    // FAMILIA 3: COMUNICACIONES INTERNAS
    // ══════════════════════════════════════════════════════════════
    const fam3 = await client.query(
      `INSERT INTO role_families(name) VALUES('Comunicaciones Internas')
       ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id`
    );
    const f3 = fam3.rows[0].id;

    const rolesComunicaciones = [
      {
        name: 'Internal Communications Analyst',
        levels: [
          'Redacta y distribuye comunicaciones internas siguiendo lineamientos establecidos. Administra canales de comunicación y apoya la logística de eventos internos.',
          'Diseña e implementa campañas de comunicación interna con autonomía. Adapta mensajes a distintas audiencias y gestiona múltiples canales con criterio estratégico.',
          'Lidera la estrategia de comunicación interna para toda la organización. Gestiona crisis comunicacionales, mide el alcance y efectividad de los mensajes, y asesora a líderes.',
          'Define la estrategia de comunicación interna alineada a la cultura y el negocio. Lidera transformaciones comunicacionales y gestiona el cambio a través de la comunicación.',
          'Referente regional en comunicaciones internas. Diseña arquitecturas de comunicación organizacional, asesora a la alta dirección y lidera la evolución de la cultura comunicacional.',
        ],
      },
      {
        name: 'Employer Branding Specialist',
        levels: [
          'Apoya la creación de contenidos para canales de employer branding bajo supervisión. Conoce la propuesta de valor al empleado (EVP) y la aplica en materiales de comunicación.',
          'Diseña e implementa campañas de employer branding con autonomía. Gestiona redes sociales corporativas, produce contenidos atractivos y mide el alcance de las iniciativas.',
          'Lidera la estrategia de employer branding. Define y activa la EVP en todos los puntos de contacto con candidatos y colaboradores, y gestiona la reputación como empleador.',
          'Define la propuesta de valor al empleado y la estrategia de marca empleadora. Integra el employer branding con la cultura, el desempeño y la atracción de talento.',
          'Referente regional en employer branding. Diseña estrategias de posicionamiento como empleador preferido, asesora a la alta dirección y lidera iniciativas de reconocimiento.',
        ],
      },
      {
        name: 'Change Communication Specialist',
        levels: [
          'Apoya la elaboración de planes de comunicación para procesos de cambio bajo supervisión. Redacta mensajes claros y consistentes para distintas audiencias organizacionales.',
          'Diseña e implementa planes de comunicación del cambio de forma autónoma. Identifica impactos en distintas audiencias y adapta los mensajes para facilitar la adopción.',
          'Lidera la comunicación de transformaciones organizacionales complejas. Gestiona múltiples stakeholders, anticipa resistencias y diseña estrategias de comunicación adaptativas.',
          'Define la estrategia de comunicación del cambio a nivel organizacional. Integra comunicación, gestión del cambio y cultura para facilitar transformaciones de gran escala.',
          'Referente regional en comunicación del cambio. Diseña marcos de comunicación para transformaciones estratégicas y asesora a la alta dirección en gestión de narrativas.',
        ],
      },
      {
        name: 'Digital Communications Specialist',
        levels: [
          'Administra plataformas digitales de comunicación interna (intranet, newsletters, apps). Publica contenidos siguiendo lineamientos y apoya la gestión técnica de los canales.',
          'Diseña y gestiona la estrategia de comunicación digital interna con autonomía. Produce contenidos multimedia, optimiza la experiencia del usuario y mide el engagement.',
          'Lidera la transformación digital de los canales de comunicación interna. Implementa nuevas plataformas, integra tecnología con comunicación y gestiona comunidades digitales.',
          'Define la estrategia de comunicación digital organizacional. Integra canales digitales con la experiencia del colaborador y lidera la innovación comunicacional.',
          'Referente regional en comunicaciones digitales. Diseña ecosistemas de comunicación digital, asesora en experiencia del colaborador y lidera la evolución tecnológica del área.',
        ],
      },
      {
        name: 'Event & Engagement Coordinator',
        levels: [
          'Coordina la logística de eventos internos y actividades de engagement bajo supervisión. Gestiona proveedores, espacios y materiales con atención al detalle.',
          'Diseña e implementa programas de engagement y eventos con autonomía. Conecta las actividades con los objetivos culturales y mide la satisfacción de los participantes.',
          'Lidera la estrategia de engagement y experiencia del colaborador. Diseña el calendario de iniciativas, gestiona presupuestos y mide el impacto en el clima organizacional.',
          'Define la estrategia de experiencia del colaborador. Integra eventos, reconocimiento y comunicación en una propuesta coherente que impulsa el compromiso y la retención.',
          'Referente regional en engagement organizacional. Diseña marcos de experiencia del colaborador, asesora a la alta dirección y lidera benchmarks de mejores prácticas.',
        ],
      },
    ];

    for (const rol of rolesComunicaciones) {
      const r = await client.query(
        `INSERT INTO roles(family_id, name) VALUES($1,$2)
         ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
        [f3, rol.name]
      );
      for (let i = 0; i < 5; i++) {
        await client.query(
          `INSERT INTO competency_levels(role_id, level, description) VALUES($1,$2,$3)
           ON CONFLICT(role_id,level) DO UPDATE SET description=EXCLUDED.description`,
          [r.rows[0].id, i + 1, rol.levels[i]]
        );
      }
    }

    // ══════════════════════════════════════════════════════════════
    // FAMILIA 4: CULTURA ORGANIZACIONAL
    // ══════════════════════════════════════════════════════════════
    const fam4 = await client.query(
      `INSERT INTO role_families(name) VALUES('Cultura Organizacional')
       ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id`
    );
    const f4 = fam4.rows[0].id;

    const rolesCultura = [
      {
        name: 'Culture & Values Specialist',
        levels: [
          'Apoya la implementación de iniciativas culturales bajo supervisión. Conoce los valores organizacionales y los traduce en acciones concretas para equipos específicos.',
          'Diseña e implementa programas de cultura y valores con autonomía. Facilita talleres de alineamiento cultural y mide la adopción de los valores en el comportamiento.',
          'Lidera la estrategia de cultura organizacional. Diagnostica brechas culturales, diseña intervenciones sistémicas y conecta la cultura con los resultados del negocio.',
          'Define la cultura organizacional deseada y la hoja de ruta para alcanzarla. Lidera transformaciones culturales profundas y gestiona la alineación entre cultura y estrategia.',
          'Referente regional en cultura organizacional. Diseña marcos de evolución cultural, asesora a la alta dirección en transformaciones y lidera benchmarks de cultura de alto desempeño.',
        ],
      },
      {
        name: 'DEI Specialist',
        levels: [
          'Apoya la implementación de iniciativas de diversidad, equidad e inclusión bajo supervisión. Recopila datos de representación y organiza actividades de sensibilización.',
          'Diseña e implementa programas de DEI con autonomía. Analiza brechas de representación, facilita capacitaciones y gestiona redes de afinidad organizacionales.',
          'Lidera la estrategia de DEI de la organización. Integra la diversidad en los procesos de selección, desarrollo y compensación, y mide el impacto en la cultura.',
          'Define la estrategia de DEI alineada al negocio. Lidera transformaciones sistémicas hacia la equidad, gestiona compromisos con stakeholders externos y reporta avances.',
          'Referente regional en DEI. Diseña marcos de inclusión organizacional, asesora a la alta dirección en estrategia y lidera benchmarks de mejores prácticas internacionales.',
        ],
      },
      {
        name: 'Employee Experience Designer',
        levels: [
          'Apoya el mapeo de la experiencia del colaborador en puntos de contacto específicos. Recopila feedback y apoya la implementación de mejoras bajo supervisión.',
          'Diseña e implementa mejoras en la experiencia del colaborador con autonomía. Aplica metodologías de design thinking y gestiona el ciclo de vida completo del empleado.',
          'Lidera el diseño de la experiencia del colaborador a nivel organizacional. Integra todos los momentos que importan, gestiona múltiples stakeholders y mide el impacto en la retención.',
          'Define la estrategia de experiencia del colaborador. Integra EX con la cultura, el desempeño y la marca empleadora, y lidera la transformación de los procesos de personas.',
          'Referente regional en employee experience. Diseña arquitecturas de experiencia del colaborador, asesora a la alta dirección y lidera la innovación en gestión de personas.',
        ],
      },
      {
        name: 'Wellbeing & Climate Specialist',
        levels: [
          'Coordina programas de bienestar y administra encuestas de clima bajo supervisión. Analiza resultados básicos y apoya la implementación de planes de mejora.',
          'Diseña e implementa programas de bienestar y gestiona el ciclo completo de encuesta de clima con autonomía. Presenta resultados a líderes y facilita planes de acción.',
          'Lidera la estrategia de bienestar y clima organizacional. Diseña intervenciones sistémicas basadas en datos, gestiona múltiples stakeholders y mide el ROI de las iniciativas.',
          'Define la estrategia de bienestar organizacional. Integra salud física, mental y financiera en una propuesta de valor que impulsa la productividad y la retención.',
          'Referente regional en bienestar y clima. Diseña marcos de salud organizacional, asesora a la alta dirección y lidera benchmarks de mejores prácticas en bienestar corporativo.',
        ],
      },
      {
        name: 'HR Business Partner',
        levels: [
          'Apoya a líderes de negocio en procesos de RRHH bajo supervisión. Gestiona consultas operativas, coordina procesos de selección y acompaña la incorporación de nuevos colaboradores.',
          'Asesora a líderes de negocio de forma autónoma en la gestión de personas. Gestiona el ciclo de vida del colaborador, resuelve conflictos y acompaña cambios organizacionales.',
          'Actúa como socio estratégico de negocio para múltiples áreas. Diagnostica necesidades organizacionales, diseña soluciones de personas alineadas a la estrategia y gestiona el cambio.',
          'Define la estrategia de HRBP para la organización. Lidera la evolución del modelo de soporte de RRHH, desarrolla capacidades de los HRBPs y asesora a la alta dirección.',
          'Referente regional en HR Business Partnering. Diseña modelos de soporte estratégico de personas, asesora a ejecutivos en decisiones de talento y lidera la evolución del área.',
        ],
      },
    ];

    for (const rol of rolesCultura) {
      const r = await client.query(
        `INSERT INTO roles(family_id, name) VALUES($1,$2)
         ON CONFLICT(family_id,name) DO UPDATE SET name=EXCLUDED.name RETURNING id`,
        [f4, rol.name]
      );
      for (let i = 0; i < 5; i++) {
        await client.query(
          `INSERT INTO competency_levels(role_id, level, description) VALUES($1,$2,$3)
           ON CONFLICT(role_id,level) DO UPDATE SET description=EXCLUDED.description`,
          [r.rows[0].id, i + 1, rol.levels[i]]
        );
      }
    }

    await client.query('COMMIT');
    console.log('✅ Seed de Talent Manager completado exitosamente');
    console.log('   → 4 familias creadas');
    console.log('   → 20 roles creados');
    console.log('   → 100 niveles de competencia creados');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error en seed:', err.message);
    throw err;
  } finally {
    client.release();
    pool.end();
  }
}

seedTalentManager().catch(() => process.exit(1));
