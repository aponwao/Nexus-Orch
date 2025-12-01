# NEXUS ORCHESTRATOR
## El Sistema Operativo para Vibe Coding
### Documento Maestro de Producto y Estrategia
---

## 1. Resumen Ejecutivo

Nexus Orchestrator es una plataforma SaaS diseñada para actuar como el **Sistema Operativo del Desarrollo Agéntico**. En un ecosistema donde herramientas como Claude, Cursor, Devin y Leap permiten a usuarios no técnicos generar código mediante lenguaje natural ("Vibe Coding"), Nexus emerge como la capa de gobierno, supervisión y orquestación que garantiza que el código generado sea mantenible, seguro y escalable.

La plataforma combina tres roles críticos en una sola interfaz:
- **Arquitecto de Software** — define la estructura
- **Project Manager** — coordina la ejecución
- **Auditor de Calidad** — valida los resultados

---

## 2. El Problema: La Paradoja del Vibe Coding

El Vibe Coding ha democratizado el desarrollo de software, pero ha creado una nueva categoría de usuarios: los **"Conductores Ciegos"** — personas con acceso a motores extremadamente potentes (LLMs generadores de código) pero sin mapa, sin GPS y sin mecánico.

### 2.1 Los Cuatro Fallos Sistémicos

| Fallo | Descripción |
|-------|-------------|
| **Ambigüedad** | El usuario no sabe cómo especificar técnicamente lo que quiere. Las IAs interpretan instrucciones vagas de formas inconsistentes. |
| **Amnesia** | Las IAs generadoras pierden contexto entre sesiones. Cada prompt empieza desde cero, ignorando decisiones arquitectónicas previas. |
| **Fragilidad** | El código generado frecuentemente contiene bugs lógicos, vulnerabilidades de seguridad y patrones no escalables que el usuario no puede detectar. |
| **Alucinaciones** | Las IAs inventan APIs inexistentes, métodos ficticios, o dependencias obsoletas. El código parece correcto sintácticamente pero falla en ejecución porque referencia recursos que no existen en la realidad. |

### 2.2 El Escenario Típico de Fracaso

Un usuario inicia un proyecto con entusiasmo. Tras varias iteraciones, errores y parches improvisados, termina con un **"Código Frankenstein"** — funcional a medias, imposible de mantener y costoso de escalar. El proyecto muere o requiere reescritura completa por un equipo técnico.

---

## 3. La Solución: El Ciclo de Confianza de Nexus

Nexus no reemplaza a los agentes generadores de código; los **supervisa, coordina y audita**. Actúa como un GPS inteligente que no conduce el vehículo, pero sí:

1. **Define el destino** antes de arrancar (Discovery Socrático)
2. **Calcula la ruta óptima** con puntos de verificación (Generación de Artefactos)
3. **Monitorea el trayecto** y recalcula si hay desvíos (Sincronización Continua)
4. **Verifica la llegada** y audita la integridad (Quality Gates)

### 3.1 Las Cuatro Fases del Workflow Nexus

#### Fase 1: Ingeniería de Contexto (Onboarding Socrático)

El usuario no llega a un chat vacío. Llega a una **Sala de Situación** donde Nexus guía la definición del proyecto mediante preguntas estratégicas antes de escribir una sola línea de código.

Esta fase genera el **Sistema de Artefactos Nexus** — cuatro documentos vivos que evolucionan con el proyecto:

| Artefacto | Propósito | Generación |
|-----------|-----------|------------|
| **PRD.md** | Qué se va a construir (funcionalidades, user stories) | Onboarding Socrático |
| **CONSTITUTION.md** | Reglas inquebrantables del proyecto (estándares, límites) | Onboarding Socrático |
| **ARCHITECTURE.md** | Stack tecnológico y decisiones de infraestructura | Auto-generado desde Implementation Planner |
| **SCHEMA.md** | Modelo de datos, tablas, relaciones | Generado al definir entidades |

> **Datos Operacionales (en Base de Datos, no artefactos):**
> - **Decision Journal:** Bitácora de decisiones con links a conversaciones. Almacenado en tabla `decisions` para queries durante Context Refresh.
> - **Error Log:** Historial de errores con diagnósticos y soluciones. Almacenado en tabla `error_logs` para detección de patrones y métricas.
> 
> Estos datos son consultables desde la UI con filtros, búsqueda y ordenamiento, pero no son exportables como archivos markdown.

> **Nota sobre el Roadmap:** El roadmap NO es un artefacto markdown. Es un **módulo de interfaz** en Nexus con datos almacenados en base de datos. Muestra fases, sprints, tareas atómicas con sus prompts, y estados de progreso. Durante el Context Refresh, Nexus consulta este módulo para recuperar tareas pendientes y completadas.

> **Principio clave:** Cada artefacto está vinculado bidireccionalmente a las conversaciones donde se originó. El usuario puede hacer clic en cualquier decisión y ver el contexto completo del chat donde se discutió.

#### Fase 2: GPS de Ejecución (Sincronización Profunda)

Nexus genera prompts optimizados secuenciales para el agente generador (Leap, Devin, Cursor). Cuando el usuario toma decisiones manuales que desvían del plan original:

- **Detección automática:** Nexus lee el estado real del repositorio y base de datos
- **Recálculo de ruta:** Actualiza los prompts siguientes para reflejar la nueva realidad
- **Actualización de artefactos:** Reescribe SCHEMA.md, ARCHITECTURE.md automáticamente

#### Fase 3: Auditoría y Quality Gates

Nexus integra IAs especializadas para validar el trabajo de los builders:
- **CodeRabbit** — Revisión automatizada de código y detección de vulnerabilidades
- **TestSprite** — Generación y ejecución de pruebas automatizadas

#### Fase 4: Resiliencia y Recuperación

El **"Botón de Pánico"** elimina el miedo a romperlo todo. Nexus guarda snapshots de arquitectura antes de cada sprint grande, permitiendo rollback instantáneo a estados estables previos con un solo clic.

---

## 4. Arquitectura Cognitiva de Nexus

### 4.1 Knowledge Base de Plataformas (Builder Intelligence)

Nexus mantiene una base de conocimiento indexada de cada plataforma de Vibe Coding:

| Plataforma | Información Indexada |
|------------|---------------------|
| **Leap.new** | Stack soportado (Next.js, Clerk, Neon, Stripe), limitaciones, mejores prácticas, integraciones nativas |
| **Cursor** | Extensiones, modelos disponibles, patrones de prompting efectivos |
| **Devin** | Capacidades de ejecución, acceso a terminal, límites de autonomía |
| **Lovable** | Componentes UI, templates, restricciones de deployment |

**Flujo de Arquitectura Inteligente:**

1. **Detección:** Usuario indica qué builder usará (ej: "Usaré Leap.new")
2. **Consulta:** Nexus consulta su Knowledge Base sobre las capacidades de Leap
3. **Pre-configuración:** Nexus sabe que Leap soporta Clerk + Neon + Stripe nativamente
4. **Decisiones mínimas:** Solo pregunta al usuario las decisiones clave que Leap permite customizar
5. **Auto-generación:** ARCHITECTURE.md se genera automáticamente con el stack óptimo para ese builder

> **Ejemplo:** Si el usuario elige Leap.new, Nexus ya sabe que usará Clerk para auth y Neon para DB. Solo preguntará: "¿Stripe o Paddle para pagos?" o "¿Necesitas emails transaccionales?"

### 4.2 Sistema RAG (Memoria Vectorial)

Todos los artefactos, conversaciones y decisiones se almacenan en una base de datos vectorial:

- **Ingesta:** Documentos se dividen en chunks de 500 tokens con metadata (fecha, tipo, links)
- **Embedding:** Vectorización con text-embedding-3-small
- **Storage:** pgvector en Neon (la misma DB del proyecto)
- **Consulta:** Similarity search para enriquecer cada prompt con contexto relevante

### 4.3 Context Refresh System (Gestión de Ventana de Contexto)

**El Problema:** Los LLMs tienen ventanas de contexto limitadas. En proyectos largos, el usuario recibe el temido mensaje "debes iniciar un nuevo chat".

**La Solución Nexus:** Sistema proactivo de renovación de contexto.

| Fase | Trigger | Acción |
|------|---------|--------|
| **Monitoreo** | Uso de contexto > 70% | Indicador visual amarillo en UI |
| **Alerta** | Uso de contexto > 85% | Notificación: "Prepárate para Context Refresh" |
| **Refresh** | Uso de contexto > 90% | Nexus ejecuta protocolo de renovación |

**Protocolo de Context Refresh:**

1. **Snapshot:** Guarda estado actual de la conversación
2. **Consulta RAG:** Recupera de la base vectorial:
   - Últimas versiones de los 4 artefactos (PRD, Constitution, Architecture, Schema)
3. **Consulta Módulo Roadmap:** Recupera de la base de datos:
   - Tareas pendientes y completadas
   - Sprint activo y progreso
   - Prompts asociados a tareas próximas
4. **Consulta Decision Journal (DB):** 
   - Decisiones críticas (impact_level = 'high' o 'critical')
   - Últimas 10 decisiones técnicas
5. **Consulta Error Log (DB):** 
   - Últimos 5 errores y sus soluciones
   - Patrones de errores recurrentes (errores que ocurrieron 2+ veces)
6. **Consulta Integraciones:**
   - PRs abiertos en GitHub y su estado
   - Tickets activos en Linear
7. **Síntesis:** Genera un "Context Bundle" comprimido con lo esencial
8. **Nuevo Chat:** Inicia conversación fresca con el Context Bundle inyectado
9. **Continuidad:** El usuario continúa exactamente donde estaba, sin pérdida de contexto

> **Resultado:** El usuario nunca pierde el hilo. Nexus garantiza continuidad incluso en proyectos de meses de duración.

### 4.4 Integraciones (Nexus Connect)

- **Builders:** Leap (nativo), Devin, Cursor, Lovable
- **Auditors:** CodeRabbit, TestSprite
- **Trackers:** Linear (sincronización bidireccional de tareas y estados)
- **Repositorios:** GitHub (webhooks, PRs, estado en tiempo real)

---

## 5. Interfaz de Usuario

> **Nota:** El diseño base ya existe en HTML. Esta sección documenta la estructura de navegación y mejoras sugeridas.

### 5.1 Estructura de Navegación

#### Header
| Elemento | Función |
|----------|---------|
| **Logo/Proyecto** | Nombre del proyecto activo con selector |
| **Selector de Modelo** | Cambiar entre Claude, GPT-4, etc. |
| **Context Meter** | Barra de uso de ventana de contexto (%) |
| **Stack Layers Icon** | Abre drawer con información del stack tecnológico |
| **Breadcrumbs** | Trail de navegación actual |

#### Menú Vertical (Sidebar Izquierdo)
| Elemento | Función |
|----------|---------|
| **Orchestrator** | Chat principal con Nexus (vista default) |
| **Dashboard** | Panel de control con métricas y estado general |
| **Roadmap** | Módulo de fases, sprints y tareas con prompts |
| **Knowledge Base** | Artefactos del proyecto (PRD, Schema, etc.) |
| **Integraciones** | GitHub, Linear, CodeRabbit — estados y configuración |
| **Historial** | Conversaciones pasadas con búsqueda |

### 5.2 Stack Layers Drawer

Drawer que se abre desde el icono en el header. Muestra información simplificada del stack:

| Capa | Información |
|------|-------------|
| **Frontend** | Framework, versión, estado de sync |
| **Database** | Provider (Neon), tablas, última migración |
| **Auth** | Provider (Clerk), usuarios activos |
| **Payments** | Provider (Stripe/Paddle), estado de integración |
| **Hosting** | Vercel/otro, último deploy, status |

Cada capa muestra:
- Estado: 🟢 Sincronizado, 🟡 Pendiente, 🔴 Error
- Último cambio con timestamp
- Link rápido a documentación/dashboard del servicio

### 5.3 Panel Derecho (Live Architecture)

Panel contextual que muestra información relevante según la vista activa:

#### En vista Orchestrator:
- **Health Score:** Indicador 0-100 con breakdown
- **Sprint Actual:** Progreso y próximas tareas
- **Context Health:** Uso de ventana de contexto
- **Quick Actions:** Restore Stable, Sync, Export

#### En vista Dashboard:
- Métricas expandidas
- Gráficos de tendencia
- Alertas activas

#### En vista Roadmap:
- Timeline visual del proyecto
- Filtros por estado/sprint

### 5.4 Elementos Nuevos Sugeridos

| Elemento | Ubicación | Función |
|----------|-----------|---------|
| **Decision Breadcrumb** | Sobre el chat | Trail de decisiones clave tomadas en la sesión |
| **Hallucination Alert** | Inline en chat | Badge rojo cuando se detecta referencia a API/método inexistente |
| **Chat Link Badge** | En artefactos | Icono clickeable que lleva al chat donde se originó esa sección |
| **Prompt Copy Button** | En tareas del Roadmap | Copiar prompt optimizado con un clic |
| **Learning Mode Toggle** | Header o Settings | Activar/desactivar explicaciones pedagógicas |

---

## 6. Validación de Viabilidad

### 6.1 Fortalezas del Proyecto

✅ **Dolor real y validado:** El problema del "código Frankenstein" es ubicuo en la comunidad de Vibe Coding

✅ **Diferenciación clara:** No compite con builders, los complementa (capa de orquestación)

✅ **Diseño de UI definido:** Interfaz diseñada en HTML lista para implementación

✅ **Integraciones estratégicas:** GitHub, Linear, CodeRabbit cubren el ciclo completo

✅ **Modelo de negocio viable:** SaaS con tiers basados en tokens/auditorías

✅ **Builder-first approach:** Knowledge Base de plataformas permite arquitectura inteligente automática

### 6.2 Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Dependencia de APIs externas | Costos variables, latencia | Multi-provider, cache agresivo |
| Complejidad de sincronización | Bugs en estado, conflictos | Event sourcing, snapshots frecuentes |
| Adopción de builders | Fragmentación del mercado | Leap nativo + API abierta |

### 6.3 Veredicto de Viabilidad

> **✅ VIABLE CON ALTA PROBABILIDAD DE ÉXITO**
> 
> El proyecto resuelve un dolor real con una propuesta diferenciada. La ejecución técnica es ambiciosa pero alcanzable con el stack elegido. Se recomienda priorizar la integración nativa con Leap y el módulo de Reverse Sync para captar usuarios con proyectos existentes.

---

## 7. Features del Producto

### 7.1 Features Core del Workflow

#### A. Onboarding Socrático (Discovery Engine)
`Categoría: CORE` `Prioridad: CRÍTICA`

Sistema de ingeniería de contexto que guía al usuario antes de escribir código:

- **Input Multimodal:** Acepta idea en texto, audio o PDF
- **Stepper Visual:** Barra de progreso interactiva (Idea → Contexto → PRD → Strategy → Artefactos → Ruta)
- **Preguntas Estratégicas:** Nexus hace preguntas específicas para eliminar ambigüedad
- **Generación de Artefactos:** Crea PRD.md, CONSTITUTION.md automáticamente
- **Validación de Alcance:** Confirma con el usuario antes de avanzar
- **Detección de Builder:** Identifica qué plataforma usará (Leap, Cursor, etc.) para auto-configurar arquitectura
- **Implementation Strategy:** Presenta opciones de implementación por feature con costos (ver Feature W)

**Flujo:**
1. Usuario describe idea
2. Nexus hace 3-5 preguntas clave
3. Genera PRD.md borrador
4. Usuario aprueba/edita
5. **[NUEVO]** Nexus presenta Implementation Strategy Dashboard
6. Usuario selecciona estrategia por feature
7. Nexus genera CONSTITUTION.md y ARCHITECTURE.md
8. Genera Roadmap con tareas, builders asignados y prompts
9. Inicia fase de ejecución

---

#### B. GPS de Ejecución (Prompt Orchestrator)
`Categoría: CORE` `Prioridad: CRÍTICA`

Motor de generación y secuenciación de prompts optimizados:

- **Prompt Sequencing:** Genera prompts en orden lógico de dependencias
- **Builder Optimization:** Adapta el prompt al estilo del builder elegido (Leap vs Cursor vs Devin)
- **Context Injection:** Cada prompt incluye contexto relevante del proyecto
- **Copy-Ready:** Botón para copiar prompt formateado listo para pegar
- **Dependency Tracking:** No genera prompt de feature B hasta que A esté completo
- **Rollback de Prompts:** Si un prompt falla, genera alternativa

**Formato de Prompt Generado:**
```
[Contexto del Proyecto]
[Referencia a CONSTITUTION.md]
[Tarea específica]
[Criterios de aceptación]
[Advertencias basadas en errores previos]
```

---

#### C. Sincronización con Repositorio (Repo Sync)
`Categoría: CORE` `Prioridad: CRÍTICA`

Conexión en tiempo real con el estado del código:

- **GitHub Webhooks:** Detecta commits, PRs, merges automáticamente
- **State Diffing:** Compara estado esperado vs estado real del repo
- **Schema Detection:** Lee base de datos y detecta cambios en tablas
- **Auto-Update Artifacts:** Actualiza SCHEMA.md, ARCHITECTURE.md cuando hay cambios
- **Conflict Detection:** Alerta cuando código diverge del plan
- **Sync Indicator:** Badge visual mostrando estado de sincronización

**Estados:**
- 🟢 **Synced:** Código alineado con artefactos
- 🟡 **Pending:** Cambios detectados, actualizando artefactos
- 🔴 **Diverged:** Conflicto detectado, requiere atención

---

#### D. Emergency Rollback (Panic Button)
`Categoría: CORE` `Prioridad: CRÍTICA`

Sistema de recuperación ante desastres:

- **Snapshots Automáticos:** Guarda estado antes de cada sprint/fase
- **One-Click Restore:** Botón "Restore Stable" revierte a último estado seguro
- **Git Integration:** Ejecuta `git revert` al commit seguro
- **Database Rollback:** Genera prompt de emergencia para revertir migraciones
- **Artifact Restore:** Recupera versiones anteriores de todos los artefactos
- **Post-Rollback Guidance:** Nexus explica qué salió mal y cómo evitarlo

**Flujo de Rollback:**
1. Usuario presiona "Restore Stable"
2. Nexus muestra preview de cambios a revertir
3. Confirmación del usuario
4. Ejecución de rollback en GitHub
5. Generación de prompt para rollback de DB
6. Actualización de artefactos
7. Resumen de acciones tomadas

---

#### E. Reverse Sync (Import Existing Project)
`Categoría: CORE` `Prioridad: ALTA`

Onboarding para proyectos existentes ("Brownfield"):

- **Repo Import:** Conecta repositorio GitHub existente
- **AST Parsing:** Analiza estructura del código
- **LLM Analysis:** Interpreta lógica de negocio
- **Auto-Generate Artifacts:**
  - Detecta tablas SQL → Crea SCHEMA.md
  - Detecta rutas de API → Crea ARCHITECTURE.md
  - Detecta lógica de negocio → Sugiere PRD.md
- **Gap Analysis:** Identifica documentación faltante
- **Constitution Inference:** Sugiere reglas basadas en patrones del código

**Valor:** Captura usuarios que ya empezaron proyectos sin Nexus.

---

#### F. Quality Gates (Audit Engine)
`Categoría: CORE` `Prioridad: ALTA`

Validación automatizada del código generado:

- **CodeRabbit Integration:** 
  - Revisión automática de cada PR
  - Detección de vulnerabilidades de seguridad
  - Sugerencias de mejores prácticas
  - Comentarios inline en GitHub
  
- **TestSprite Integration:**
  - Generación automática de tests unitarios
  - Ejecución de test suite
  - Reporte de cobertura
  - Sugerencias de casos edge

- **Nexus Analysis:**
  - Validación contra CONSTITUTION.md
  - Verificación de adherencia a ARCHITECTURE.md
  - Alerta si código viola reglas del proyecto

**Flujo:**
1. PR creado en GitHub
2. Webhook notifica a Nexus
3. Nexus invoca CodeRabbit + TestSprite
4. Resultados consolidados en dashboard
5. Alerta al usuario si hay issues críticos
6. Prompt de corrección si es necesario

---

#### G. Time Travel (Version History)
`Categoría: CORE` `Prioridad: ALTA`

Navegación temporal por la historia del proyecto:

- **Artifact Versioning:** Cada artefacto tiene historial completo
- **Side-by-Side Diff:** Comparar versiones visualmente
- **Restore Version:** Revertir artefacto a versión anterior
- **Author Tracking:** Quién hizo cada cambio (Usuario o Nexus AI)
- **Timestamp:** Cuándo ocurrió cada cambio
- **Reason Logging:** Por qué se hizo el cambio (link a chat)

**UI:**
- Panel lateral "History" en cada artefacto
- Timeline visual con puntos de cambio
- Botón "Restore" en cada versión

---

### 7.2 Features de Inteligencia

#### H. Hallucination Detector
`Categoría: INTELIGENCIA` `Prioridad: CRÍTICA`

Validación en tiempo real contra alucinaciones de IA:

- **API Validation:** Verifica que endpoints y métodos referenciados existan en documentación oficial
- **Dependency Check:** Confirma que paquetes npm/pip existan y versiones sean compatibles
- **Method Verification:** Valida que métodos llamados existan en las librerías importadas
- **Inline Alerts:** Badge rojo en chat cuando se detecta alucinación
- **Correction Suggestions:** Propone alternativa correcta
- **Confidence Score:** Nivel de certeza de que algo es alucinación

**Implementación:**
- Integración con registros oficiales (npm, PyPI)
- Scraping de documentación de APIs populares
- Validación AST del código generado
- Base de datos de métodos/funciones por librería

---

#### I. Builder Knowledge Base
`Categoría: INTELIGENCIA` `Prioridad: ALTA`

Repositorio indexado de capacidades de cada plataforma:

- **Platforms Indexed:** Leap, Cursor, Devin, Lovable, Bolt, Replit
- **Data per Platform:**
  - Stack soportado (frameworks, DBs, auth providers)
  - Limitaciones conocidas
  - Mejores prácticas de prompting
  - Integraciones nativas
  - Pricing/límites de uso
- **Auto-Update:** Scraping periódico de documentación oficial
- **Architecture Auto-Gen:** ARCHITECTURE.md generado según builder elegido
- **Prompt Optimization:** Prompts adaptados al estilo del builder

**Ejemplo:** Usuario elige Leap.new → Nexus sabe que usa Clerk + Neon + Stripe nativamente → Solo pregunta decisiones que Leap permite customizar.

---

#### I-b. Technology Cost Index
`Categoría: INTELIGENCIA` `Prioridad: ALTA`

Base de datos estructurada con información de costos y características de cada tecnología:

- **Datos Indexados por Tecnología:**

| Campo | Ejemplo (Clerk) | Uso |
|-------|-----------------|-----|
| `name` | Clerk | Identificador |
| `category` | auth | Tipo de servicio |
| `pricing_model` | freemium | free, freemium, paid, usage-based |
| `free_tier_limits` | 10,000 MAU | Límites del tier gratuito |
| `paid_tier_start_usd` | 25 | Precio inicial tier pagado |
| `usage_based_pricing` | $0.02/MAU after 10k | Costo por uso |
| `supported_stacks` | [Next.js, React, Node] | Frameworks compatibles |
| `native_integrations` | [Neon, Vercel, Stripe] | Integraciones nativas |
| `setup_complexity` | 1 | 1-5 escala de dificultad |
| `documentation_url` | docs.clerk.com | Link a docs oficiales |
| `last_updated` | 2024-11-01 | Fecha última actualización |

- **Beneficios:**
  - Cálculos de costo precisos en Implementation Planner
  - Respuestas uniformes sobre tecnologías
  - Actualizaciones centralizadas
  - Recomendaciones basadas en presupuesto del usuario

- **Actualización:**
  - Scraping automático de páginas de pricing
  - Validación manual periódica
  - Alertas cuando hay cambios de precios significativos

---

#### J. Context Refresh System
`Categoría: INTELIGENCIA` `Prioridad: CRÍTICA`

Gestión proactiva de la ventana de contexto:

- **Token Monitoring:** Tracking continuo del uso de contexto
- **Visual Alerts:**
  - 70%: Indicador amarillo
  - 85%: Notificación "Prepárate para refresh"
  - 90%: Ejecución automática de protocolo
- **RAG Query:** Recupera información esencial de base vectorial
- **Roadmap Query:** Consulta tareas y progreso de la DB
- **Context Bundle:** Paquete comprimido con todo lo necesario
- **Seamless Transition:** Usuario continúa sin notar el cambio
- **Manual Trigger:** Botón "Force Refresh" disponible

**Garantía:** Continuidad en proyectos de meses de duración sin pérdida de contexto.

---

#### K. Predictive Issues
`Categoría: INTELIGENCIA` `Prioridad: DIFERENCIADOR`

IA que anticipa problemas antes de que ocurran:

- **Schema Analysis:**
  - "Tu tabla users no tiene índice en email — será lento a escala"
  - "La relación N:N necesita tabla intermedia"
- **Security Scan:**
  - "Esta API no tiene rate limiting — vulnerable a DDoS"
  - "Endpoint expone datos sensibles sin auth"
- **Architecture Review:**
  - "Componente X tiene 15 props — considera dividirlo"
  - "Esta función tiene complejidad ciclomática alta"
- **Performance Prediction:**
  - "Query N+1 detectado en este patrón"
  - "Bundle size excederá límite recomendado"
- **Pre-Generated Fix:** Cada issue incluye prompt para solucionarlo
- **Risk Scoring:** Severidad de cada issue (Critical, High, Medium, Low)

---

#### L. Error Pattern Recognition
`Categoría: INTELIGENCIA` `Prioridad: DIFERENCIADOR`

Aprendizaje de errores para prevención futura:

- **Error Log Analysis:** Escanea ERROR_LOG.md para detectar patrones
- **Recurrence Detection:** "Este tipo de error ha ocurrido 3 veces"
- **Root Cause Identification:** Identifica causa común
- **Permanent Fix Suggestion:** Propone solución definitiva, no parche
- **Cross-Project Learning:** Errores comunes por stack (compartido anónimamente)
- **Preventive Alerts:** Advierte antes de que el error ocurra

---

### 7.3 Features de Productividad

#### M. Code Health Score
`Categoría: PRODUCTIVIDAD` `Prioridad: ALTA`

Dashboard de métricas de calidad del código:

- **Global Score:** 0-100 con breakdown por categoría
- **Métricas:**
  - Complejidad ciclomática
  - Cobertura de tests
  - Vulnerabilidades conocidas (CVEs)
  - Deuda técnica estimada
  - Duplicación de código
- **Trend Tracking:** Comparativa vs. ayer/semana pasada
- **Threshold Alerts:** Notificación cuando score baja de umbral
- **Gamification:** Badges por mantener score alto durante sprints
- **Per-Component Breakdown:** Score por módulo/feature

**Colores:**
- 🟢 80-100: Excelente
- 🟡 50-79: Aceptable
- 🔴 0-49: Requiere atención

---

#### N. Learning Mode (Modo Pedagógico)
`Categoría: PRODUCTIVIDAD` `Prioridad: ALTA`

Toggle que transforma Nexus en tutor:

- **Inline Explanations:** Por qué Nexus sugiere cada prompt
- **Architecture Tooltips:** Conceptos técnicos explicados en hover
- **"Why This Decision?" Button:** En cada artefacto y sugerencia
- **Contextual Glossary:** Términos técnicos explicados según nivel del usuario
- **Learning Progress:** Badges y niveles por conceptos dominados
- **Recommended Reading:** Links a documentación cuando el usuario pregunta algo avanzado
- **Difficulty Adaptation:** Ajusta complejidad de explicaciones según historial

---

#### O. Project Templates Gallery
`Categoría: PRODUCTIVIDAD` `Prioridad: ALTA`

Biblioteca de proyectos pre-configurados:

| Template | Incluye |
|----------|---------|
| **SaaS Starter** | Auth, Billing (Stripe), Dashboard, Settings, User Management |
| **E-commerce** | Carrito, Checkout, Inventario, Admin Panel, Emails transaccionales |
| **Marketplace** | Multi-vendor, Comisiones, Reviews, Disputes, Payouts |
| **AI Wrapper** | API Integration, Usage Tracking, Rate Limiting, API Keys |
| **Internal Tool** | CRUD, Roles/Permisos, Audit Log, Export |
| **Landing Page** | Hero, Features, Pricing, CTA, Analytics |

**Cada template incluye:**
- PRD.md pre-llenado
- ARCHITECTURE.md configurado
- SCHEMA.md inicial
- Primeros 5-10 prompts listos
- CONSTITUTION.md con mejores prácticas

---

#### P. Token Cost Estimator
`Categoría: PRODUCTIVIDAD` `Prioridad: MEDIA`

Predicción y control de costos de IA:

- **Pre-Execution Estimate:** "Este sprint consumirá ~$X.XX en tokens"
- **Historical Dashboard:** Consumo por día/semana/mes
- **Per-Task Breakdown:** Costo de cada operación
- **Budget Alerts:** Notificación al acercarse al límite mensual
- **Optimization Tips:** "Usa Claude Haiku para esta tarea y ahorra 70%"
- **Project Projection:** Estimación de costo total para completar proyecto
- **Model Recommendations:** Sugerencia de modelo óptimo según tarea

---

#### Q. Context Export / Offline Mode
`Categoría: PRODUCTIVIDAD` `Prioridad: MEDIA`

Portabilidad completa del proyecto:

- **Full Export ZIP:**
  - Todos los artefactos (.md files)
  - Historial de versiones
  - Decision Journal completo
  - Error Log
- **Prompt Bundle:** Todos los prompts pendientes listos para copiar
- **State Snapshot:** Estado del proyecto exportable
- **Import Function:** Cargar contexto en nuevo ambiente
- **Offline Viewer:** HTML estático para revisar sin conexión
- **Migration Support:** Facilita mover proyecto a otro builder

---

### 7.4 Features de Colaboración

#### R. Collaboration Hub
`Categoría: COLABORACIÓN` `Prioridad: MEDIA`

Capacidades multi-usuario:

- **Roles:**
  - Owner: Control total
  - Editor: Puede modificar artefactos y ejecutar prompts
  - Viewer: Solo lectura
- **Activity Feed:** Timeline de quién hizo qué y cuándo
- **Comments:** Discusión asíncrona en artefactos con @menciones
- **Presence Indicators:** Ver quién está activo en el proyecto
- **Handoff Mode:** Transferencia de contexto a desarrollador senior
  - Genera resumen ejecutivo automático
  - Highlights de decisiones críticas
  - Lista de pendientes priorizados
- **Notifications:** Email/Slack cuando hay cambios importantes

---

#### S. Linear Deep Integration
`Categoría: COLABORACIÓN` `Prioridad: ALTA`

Sincronización bidireccional completa:

- **Auto-Create Tickets:** Nexus crea tickets desde Roadmap automáticamente
- **Bidirectional Sync:** Estados sincronizados Linear  Nexus en tiempo real
- **Prompt Attachment:** Cada ticket tiene prompt asociado
- **Sprint View:** Vista simplificada en Nexus (no reemplaza Linear)
- **Nexus Comments:** Nexus comenta en tickets con contexto relevante
- **Label Mapping:** Categorías de Nexus → Labels de Linear
- **Priority Sync:** Prioridades reflejadas en ambos sistemas

---

### 7.5 Features Diferenciadoras

#### T. Decision Journal Module
`Categoría: DIFERENCIADOR` `Prioridad: ALTA`

Módulo de interfaz (no artefacto) para registro y consulta de decisiones:

- **Storage:** Base de datos PostgreSQL, tabla `decisions`
- **Auto-Capture:** Cada decisión arquitectónica guardada con timestamp
- **Bidirectional Links:** Cada entrada tiene link al chat exacto donde se discutió
- **Categories:**
  - Técnica (stack, patterns)
  - Negocio (features, priorización)
  - UX (flujos, diseño)
  - Seguridad (auth, permisos)
- **UI Features:**
  - Filtros por categoría, fecha, proyecto
  - Búsqueda semántica: "¿Por qué usamos Stripe en lugar de Paddle?"
  - Timeline visual de evolución del proyecto
  - Ordenamiento por fecha, importancia
- **Context Refresh Integration:** Nexus consulta esta tabla durante refresh para recuperar decisiones críticas
- **Reasoning Preservation:** El "por qué" nunca se pierde

**Database Schema:**
```sql
decisions (
    id UUID PRIMARY KEY,
    project_id UUID,
    conversation_id UUID,          -- Link al chat de origen
    category TEXT,                 -- 'technical', 'business', 'ux', 'security'
    title TEXT,
    description TEXT,
    reasoning TEXT,
    impact_level TEXT,             -- 'low', 'medium', 'high', 'critical'
    created_by TEXT,
    created_at TIMESTAMP
)
```

**Nota:** A diferencia de los artefactos markdown, el Decision Journal NO es exportable como archivo. Es un módulo operacional de Nexus para consulta interna y Context Refresh.

---

#### T-b. Error Log Module
`Categoría: DIFERENCIADOR` `Prioridad: ALTA`

Módulo de interfaz (no artefacto) para registro y análisis de errores:

- **Storage:** Base de datos PostgreSQL, tabla `error_logs`
- **Auto-Capture:** Errores registrados automáticamente con diagnóstico
- **Conversation Link:** Cada error vinculado al chat donde se discutió
- **Error Types:**
  - Runtime (errores en producción)
  - Build (errores de compilación)
  - Logic (bugs de lógica de negocio)
  - Security (vulnerabilidades detectadas)
- **Severity Levels:** Low, Medium, High, Critical
- **UI Features:**
  - Filtros por tipo, severidad, estado (resuelto/pendiente)
  - Búsqueda por mensaje de error
  - Detección de patrones recurrentes
  - Métricas y estadísticas
- **Context Refresh Integration:** Nexus consulta los últimos N errores y patrones durante refresh
- **Pattern Recognition:** Alimenta el feature de Error Pattern Recognition (L)

**Database Schema:**
```sql
error_logs (
    id UUID PRIMARY KEY,
    project_id UUID,
    conversation_id UUID,          -- Link al chat de origen
    error_type TEXT,               -- 'runtime', 'build', 'logic', 'security'
    severity TEXT,                 -- 'low', 'medium', 'high', 'critical'
    message TEXT,
    stack_trace TEXT,
    diagnosis TEXT,                -- Análisis de Nexus
    solution TEXT,                 -- Solución aplicada
    resolved BOOLEAN DEFAULT false,
    resolved_at TIMESTAMP,
    created_at TIMESTAMP
)
```

**Nota:** A diferencia de los artefactos markdown, el Error Log NO es exportable como archivo. Es un módulo operacional para detección de patrones y mejora continua.

---

#### U. Roadmap Module
`Categoría: DIFERENCIADOR` `Prioridad: CRÍTICA`

Módulo de gestión de tareas y progreso (UI, no artefacto):

- **Visual Timeline:** Fases y sprints en línea de tiempo
- **Task Breakdown:** Tareas atómicas con dependencias
- **Prompt Library:** Cada tarea tiene prompt optimizado asociado
- **Builder Assignment:** Cada tarea muestra quién la ejecutará:
  - **Nexus:** Botón "Execute" que carga el prompt en el input del Orchestrator
  - **Leap/Cursor/Devin:** Botón "Copy Prompt" para pegar en la herramienta externa
- **Status Tracking:** Pendiente, En Progreso, Bloqueado, Completado
- **Progress Metrics:** % de completitud por sprint/fase
- **Dependency Graph:** Visualización de qué depende de qué
- **Drag & Drop:** Reordenar prioridades
- **Linear Sync:** Bidireccional con Linear
- **Data for Context Refresh:** Nexus consulta este módulo durante refresh
- **Strategy Link:** Cada tarea vinculada a la estrategia de implementación seleccionada

**Ejecución de Tareas:**
| Builder | Acción | Resultado |
|---------|--------|-----------|
| **Nexus** | Click "Execute" | Prompt se carga en input del Orchestrator, listo para enviar |
| **Leap** | Click "Copy Prompt" | Prompt copiado al clipboard + instrucciones de uso |
| **Cursor** | Click "Copy Prompt" | Prompt formateado para Cursor + contexto necesario |
| **Devin** | Click "Copy Prompt" | Prompt estructurado para Devin + archivos referenciados |

---

#### V. Multi-Tenant Management
`Categoría: DIFERENCIADOR` `Prioridad: MEDIA`

Gestión de organizaciones y proyectos:

- **Hierarchy:** User → Organizations → Projects
- **Clerk Integration:** Organizaciones mapeadas 1:1 con Clerk
- **Billing per Org:** Stripe integrado para suscripciones
- **Tiers:**
  - Free: 1 proyecto, límites de tokens
  - Pro: Proyectos ilimitados, más tokens
  - Enterprise: Team features, SSO, audit logs
- **Project Templates:** Guardar proyectos como templates organizacionales
- **Shared Knowledge Base:** Artefactos compartidos entre proyectos de la misma org

---

#### W. Project Implementation Planner
`Categoría: DIFERENCIADOR` `Prioridad: CRÍTICA`

Dashboard interactivo durante el onboarding para definir CÓMO se implementará cada feature:

- **Strategy Catalog:** Base de datos de estrategias por tipo de feature
- **Interactive Selection:** Usuario elige nivel de complejidad por feature
- **Cost Calculator:** Suma automática de costos mensuales según selección
- **Comparison View:** Tabla comparativa de opciones por feature
- **Recommendation Engine:** Nexus sugiere estrategia óptima según builder elegido
- **Post-Onboarding Edit:** Estrategias modificables después del setup inicial
- **Architecture Layer Generator:** Auto-genera vista arquitectónica basada en decisiones

**UI del Strategy Selector:**

| Feature | Estrategia | Costo/mes | Complejidad | Selección |
|---------|------------|-----------|-------------|-----------|
| **Auth** | Clerk Integration (Recomendado) | $5 | ★☆☆ | ○ |
| **Auth** | Custom NextAuth | $10 | ★★☆ | ○ |
| **Auth** | Agent-Based Auth | $50 | ★★★ | ○ |

---

### Architecture Layer Dashboard

Una vez seleccionadas las estrategias, Nexus genera automáticamente un **dashboard visual** de la arquitectura del proyecto:

**Secciones del Dashboard:**

| Sección | Información Generada |
|---------|---------------------|
| **Tipo de Arquitectura** | Monolítica / Microservicios / Serverless / Híbrida |
| **Frontend Stack** | Framework, UI Library, State Management |
| **Backend Stack** | Runtime, Framework, API Style (REST/GraphQL) |
| **Instancias** | Cuántos servicios/servidores se necesitan |
| **Workers** | Si se requieren background jobs, colas, cron |
| **Interfaces de Usuario** | Storefront, Admin Panel, User Dashboard (separados o unificados) |
| **Base de Datos** | Tipo, instancias, réplicas |
| **Escalabilidad** | Horizontal/Vertical, auto-scaling, CDN |

**Ejemplo de Architecture Layer generado:**

```
+---------------------------------------------------------------+
|  ARCHITECTURE LAYER - Delivery App v2                         |
+---------------------------------------------------------------+
|                                                               |
|  TIPO: Monolítica con separación de concerns                  |
|                                                               |
|  +---------------------------------------------------+        |
|  | FRONTEND                                          |        |
|  | - Framework: Next.js 14 (App Router)              |        |
|  | - UI: Tailwind CSS + shadcn/ui                    |        |
|  | - State: React Server Components + Zustand        |        |
|  +---------------------------------------------------+        |
|                                                               |
|  +---------------------------------------------------+        |
|  | BACKEND                                           |        |
|  | - Runtime: Node.js (Vercel Edge)                  |        |
|  | - API: Next.js API Routes                         |        |
|  | - Server: 1 instancia (Vercel)                    |        |
|  | - Workers: Vercel Cron (emails, notificaciones)   |        |
|  +---------------------------------------------------+        |
|                                                               |
|  +---------------------------------------------------+        |
|  | INTERFACES                                        |        |
|  | - Storefront: /app (publico)                      |        |
|  | - Admin Panel: /admin (separado, protegido)       |        |
|  | - User Dashboard: /dashboard (autenticado)        |        |
|  +---------------------------------------------------+        |
|                                                               |
|  +---------------------------------------------------+        |
|  | DATABASE                                          |        |
|  | - Tipo: PostgreSQL (Neon)                         |        |
|  | - Instancias: 1 (con connection pooling)          |        |
|  | - Replicas: No (MVP)                              |        |
|  +---------------------------------------------------+        |
|                                                               |
|  +---------------------------------------------------+        |
|  | ESCALABILIDAD                                     |        |
|  | - Modelo: Vertical inicial -> Horizontal en v2    |        |
|  | - CDN: Vercel Edge Network                        |        |
|  | - Cache: Redis (si se activa real-time)           |        |
|  | - Auto-scaling: Vercel automatico                 |        |
|  +---------------------------------------------------+        |
|                                                               |
|  COSTO MENSUAL ESTIMADO: $45-85                               |
|  TECNOLOGIAS: 8                                               |
|  REQUIERE AGENTES: No                                         |
|                                                               |
|  [Editar Arquitectura]  [Generar ARCHITECTURE.md]             |
+---------------------------------------------------------------+
```

**Flujo de Generación:**
1. Usuario selecciona estrategias por feature
2. Nexus analiza combinación de tecnologías
3. Infiere tipo de arquitectura óptima
4. Genera Architecture Layer Dashboard
5. Usuario puede ajustar manualmente
6. Al confirmar → Genera ARCHITECTURE.md automáticamente

---

**Project Summary (Auto-calculado):**
- 💰 Costo mensual estimado: $75-120
- 🎯 Complejidad promedio: ★★★☆☆
- 🔧 Tecnologías requeridas: 7
- âš ï¸ Requiere agentes: Sí/No
- âš ï¸ Requiere microservicios: Sí/No

**Database Schema:**

```sql
-- Estrategias disponibles por tipo de feature
implementation_strategies (
    strategy_id TEXT PRIMARY KEY,  -- 'auth-clerk', 'auth-custom-agent'
    feature_type TEXT,             -- 'auth', 'payments', 'realtime'
    name TEXT,
    description TEXT,
    complexity_level INT,          -- 1-5
    estimated_cost_monthly_usd DECIMAL,
    technologies JSONB,            -- ['clerk', 'neon']
    requires_agent BOOLEAN,
    requires_microservice BOOLEAN,
    implementation_steps JSONB,    -- Pasos para Guided Setup
    pros JSONB,
    cons JSONB
)

-- Decisiones del usuario por proyecto
project_implementation_decisions (
    project_id UUID,
    feature_name TEXT,
    selected_strategy_id TEXT,
    reasoning TEXT,
    implementation_status TEXT     -- 'planned', 'in_progress', 'completed'
)

-- Estimaciones calculadas por proyecto
project_cost_estimates (
    project_id UUID,
    total_monthly_cost_usd DECIMAL,
    complexity_score DECIMAL,
    technologies JSONB,
    requires_agents BOOLEAN,
    breakdown JSONB
)

-- Architecture Layer generado
project_architecture (
    project_id UUID PRIMARY KEY,
    architecture_type TEXT,        -- 'monolithic', 'microservices', 'serverless', 'hybrid'
    frontend_stack JSONB,
    backend_stack JSONB,
    instances JSONB,
    workers JSONB,
    interfaces JSONB,              -- storefront, admin, user_dashboard
    database_config JSONB,
    scalability_config JSONB,
    generated_at TIMESTAMP
)
```

**Flujo:**
1. Nexus analiza PRD y extrae features
2. Para cada feature, muestra estrategias disponibles
3. Usuario selecciona estrategia (o acepta recomendación)
4. Sistema calcula costos totales
5. **[NUEVO]** Nexus genera Architecture Layer Dashboard
6. Usuario revisa y ajusta arquitectura si necesario
7. Usuario confirma
8. Decisiones se guardan y alimentan:
   - ARCHITECTURE.md (generado automáticamente)
   - Roadmap con tareas y builders asignados

---

#### X. Guided Setup System
`Categoría: DIFERENCIADOR` `Prioridad: ALTA`

Sistema de guía paso a paso para implementar estrategias complejas:

- **Trigger:** Se activa cuando el usuario elige una estrategia con `requires_agent=true` o `requires_microservice=true`
- **Session Management:** Guarda progreso, permite pausar y continuar
- **Step-by-Step Guidance:** Cada paso incluye:
  - Explicación de POR QUÉ este paso es necesario
  - Comandos EXACTOS a ejecutar
  - Output ESPERADO
  - Cómo VERIFICAR éxito
  - Troubleshooting si falla
- **Code Generation:** Genera código production-ready si el usuario lo necesita
- **Progress Tracking:** Visual de pasos completados vs pendientes
- **Educational Mode:** Explica conceptos técnicos en lenguaje simple

**Ejemplo de Guided Setup para "Smart Agent Sync":**

| Paso | Título | Descripción |
|------|--------|-------------|
| 1 | Crear proyecto de agente | Set up Python FastAPI project |
| 2 | Instalar LangChain | `pip install langchain langgraph` |
| 3 | Definir tools del agente | Crear funciones custom para sync |
| 4 | Probar agente localmente | Ejecutar escenarios de prueba |
| 5 | Deploy a Railway | `railway up` |
| 6 | Integrar con Next.js | Agregar llamadas API desde frontend |

**Database Schema:**

```sql
guided_setup_sessions (
    id UUID PRIMARY KEY,
    project_id UUID,
    decision_id UUID,              -- Link a la decisión de estrategia
    strategy_id TEXT,
    current_step INT,
    total_steps INT,
    completed_steps JSONB,         -- [{step: 1, completed_at, notes}]
    session_state JSONB,           -- Estado guardado
    status TEXT                    -- 'active', 'paused', 'completed'
)
```

**Interacción con Roadmap:**
- Cada sesión de Guided Setup aparece como sub-tareas en el Roadmap
- Al completar todos los pasos, la tarea principal se marca como completada
- El progreso se refleja en tiempo real

---

#### Y. Knowledge Base Indexer
`Categoría: DIFERENCIADOR` `Prioridad: ALTA`

Sistema de indexación de fuentes externas para mantener actualizada la base de conocimiento de Nexus:

- **Multi-Source Ingestion:** URLs, PDFs, documentos, imágenes, hojas de cálculo
- **Crawl Sites:** Profundidad configurable para indexar sitios completos
- **Entity Extraction:** LLM extrae automáticamente entidades (builders, tecnologías, módulos)
- **Vector Storage:** Chunks almacenados con embeddings para RAG
- **Auto-Fill Tables:** Entidades detectadas se mapean a tablas existentes
- **Review Queue:** Admin aprueba/rechaza cambios sugeridos
- **Source Linking:** Relación bidireccional fuente ↔ entidad

**Tipos de Fuentes Soportadas:**

| Tipo | Método | Ejemplo |
|------|--------|---------|
| URL Single | Fetch + parse HTML | docs.clerk.com/pricing |
| URL Crawl | Recursive fetch | Indexar todo stripe.com/docs |
| PDF | PDF.js extraction | Manual de usuario |
| Document | Parsers (.doc, .md) | Especificaciones técnicas |
| Image | OCR (Tesseract/Vision) | Screenshots de documentación |
| Spreadsheet | Row-by-row parsing | Comparativas de tecnologías |

**Entidades Destino:**

| Entidad | Tablas Afectadas | Campos Auto-Extraídos |
|---------|------------------|----------------------|
| Builder | builders, builder_stack, builder_integrations | stack, integraciones, pricing, limitaciones |
| Technology | technology_index | versión, pricing, free_tier, complejidad |
| Module | module_catalog | sub_modules, complejidad, estimated_prompts |
| Best Practice | builder_best_practices | categoría, descripción, ejemplo |

**Flujo de Indexación:**

1. Admin selecciona tipo de fuente y URL/archivo
2. Selecciona entidad destino (builder, tecnología, etc.)
3. Configura opciones (crawl depth, extract to KB, store in vector)
4. Nexus procesa: fetch → chunk → embed → extract entities
5. Entidades extraídas van a cola de revisión con confidence score
6. Admin revisa: Approve / Modify / Reject / Skip
7. Cambios aprobados se aplican a tablas correspondientes
8. Source links creados para trazabilidad

**Database Schema:**

```sql
indexing_jobs (
    id UUID PRIMARY KEY,
    source_type TEXT,              -- 'url_single', 'url_crawl', 'pdf', 'doc', 'image', 'spreadsheet'
    source_url TEXT,
    target_entity_type TEXT,       -- 'builder', 'technology', 'module', 'best_practice'
    target_entity_id UUID,         -- NULL si es nuevo
    options JSONB,                 -- {extract_to_kb, store_in_vector, crawl_depth}
    status TEXT,                   -- 'pending', 'processing', 'completed', 'failed'
    progress_percent INT,
    error_message TEXT,
    created_by TEXT,
    created_at TIMESTAMP
)

indexed_chunks (
    id UUID PRIMARY KEY,
    job_id UUID,
    url_id UUID,
    content TEXT,
    chunk_index INT,
    token_count INT,
    extracted_entities JSONB,
    embedding vector(1536),        -- pgvector
    created_at TIMESTAMP
)

entity_review_queue (
    id UUID PRIMARY KEY,
    extracted_entity_id UUID,
    suggested_action TEXT,         -- 'create_new', 'update_existing', 'ignore'
    suggested_data JSONB,
    review_status TEXT,            -- 'pending', 'approved', 'rejected', 'modified'
    reviewed_by TEXT,
    reviewed_at TIMESTAMP
)
```

---

#### Z. Sequential Artifact Generation
`Categoría: DIFERENCIADOR` `Prioridad: CRÍTICA`

Generación uno por uno de artefactos con selección de tamaño y seguimiento de progreso:

- **Density Calculator:** Calcula complejidad del proyecto basado en módulos, sub-módulos, capas
- **Tier Selection:** Usuario elige Compact/Standard/Unlimited con tokens y costos visibles
- **Sequential Generation:** PRD → Constitution → Architecture → Schema
- **Real-time Progress:** Barra de progreso por artefacto con tokens usados
- **Inline Preview:** Ver contenido generado inmediatamente al completar
- **Edit on Complete:** Botón de edición disponible al terminar cada artefacto

**Tiers de Artefactos:**

| Tier | Tokens | Costo Est. | Contenido Incluido |
|------|--------|------------|-------------------|
| **Compact** | ~2,000 | ~$0.02 | Solo esencial, bullet points |
| **Standard** | ~8,000 | ~$0.08 | Balanceado con user stories y acceptance criteria |
| **Unlimited** | ~20,000 | ~$0.20 | Completo con ejemplos, edge cases, migration guides |

**Fórmula de Density Score:**

```
Density Score = (modules × 100) + (sub_modules × 30) + (arch_layers × 50) + (custom_inputs × 80)

Thresholds:
< 500  = Compact disponible
< 1500 = Standard mínimo
> 1500 = Unlimited recomendado
```

**Database Schema:**

```sql
project_artifact_config (
    id UUID PRIMARY KEY,
    project_id UUID UNIQUE,
    selected_tier TEXT,            -- 'compact', 'standard', 'unlimited'
    minimum_tier TEXT,             -- Tier mínimo calculado
    modules_count INT,
    sub_modules_count INT,
    architecture_layers_count INT,
    custom_inputs_count INT,
    density_score INT,
    estimated_tokens INT,
    estimated_cost_usd DECIMAL(10,4),
    created_at TIMESTAMP
)

artifact_generation_status (
    id UUID PRIMARY KEY,
    project_id UUID,
    artifact_type TEXT,            -- 'prd', 'constitution', 'architecture', 'schema'
    status TEXT,                   -- 'pending', 'generating', 'completed', 'failed'
    progress_percent INT DEFAULT 0,
    tokens_used INT,
    generation_time_seconds INT,
    error_message TEXT,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(project_id, artifact_type)
)
```

---

*— Fin del Documento —*
