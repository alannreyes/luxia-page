# Plan de Mejora: luxia.us
## Ruta hacia un Curriculum Fullstack Profesional 2026

**Fecha:** Enero 2026
**Objetivo:** Transformar luxia.us en una plataforma que cubra las 20 competencias esenciales de un desarrollador fullstack moderno con calidad profesional.

**Principios de Calidad del Contenido:**
- Fuentes verificables y actualizadas
- Ejemplos del mundo real (no foo/bar)
- Analogías memorables para conceptos abstractos
- Progresión didáctica clara
- Código funcional y probado
- Troubleshooting de errores comunes

---

## Estado Actual

| Métrica | Learning | Cooking | Total |
|---------|----------|---------|-------|
| Secciones/Recetas | 34 | 65 | 99 |
| Cobertura Alta | 3 (15%) | 3 (15%) | 6 |
| Cobertura Media | 6 (30%) | 10 (50%) | 16 |
| Cobertura Baja | 7 (35%) | 5 (25%) | 12 |
| Sin Cobertura | 4 (20%) | 2 (10%) | 6 |

---

## Las 6 Olas de Mejora

```
Ola 1: Fundamentos Críticos de Producción
       ↓ (permite deployar con confianza)
Ola 2: Calidad y Confiabilidad
       ↓ (permite iterar sin miedo)
Ola 3: Arquitectura y Diseño
       ↓ (permite escalar)
Ola 4: Operaciones y Costos
       ↓ (permite mantener)
Ola 5: Datos y Analytics
       ↓ (permite decidir)
Ola 6: Comunicación y Liderazgo
       ↓ (permite multiplicar impacto)
```

---

# Ola 1: Fundamentos Críticos de Producción

**Tema Central:** Sin estos temas, no se puede tener un sistema en producción de forma profesional.

**Duración Estimada:** 2-3 semanas de contenido

## 1.1 Observabilidad y Monitoreo (NUEVO - Prioridad Crítica)

### Learning: `observability`
**Título:** Observabilidad: Los Ojos de tu Sistema en Producción

**Estructura:**
```
1. El problema de la caja negra
   - Analogía: "Manejar un auto sin tablero de instrumentos"
   - Historia real: Outage de 4 horas porque nadie vio el error

2. Los tres pilares
   ┌─────────────┬─────────────┬─────────────┐
   │   Logs      │   Métricas  │   Traces    │
   │  (Qué pasó) │ (Cuánto)    │ (Dónde)     │
   └─────────────┴─────────────┴─────────────┘

3. Logging estructurado
   - Por qué console.log no escala
   - JSON logs con contexto (requestId, userId)
   - Niveles: debug, info, warn, error
   - Herramientas: Pino, Winston

4. Métricas
   - Tipos: counters, gauges, histograms
   - Las 4 Golden Signals (latency, traffic, errors, saturation)
   - Prometheus + Grafana stack
   - Métricas de negocio vs técnicas

5. Distributed Tracing
   - El problema de microservicios
   - OpenTelemetry como estándar
   - Trace context propagation
   - Jaeger/Zipkin

6. Alerting efectivo
   - Por qué "alertar todo" es contraproducente
   - SLOs, SLIs, Error Budgets
   - PagerDuty/Opsgenie basics
   - Runbooks para cada alerta

7. Stack recomendado 2026
   - Open source: Prometheus + Grafana + Loki + Tempo
   - Managed: Datadog, New Relic, Grafana Cloud
   - Comparativa de costos
```

**Fuentes:**
- Google SRE Book (gratis online)
- Charity Majors - Observability Engineering
- OpenTelemetry documentation

### Cooking: `monitoring-stack`
**Título:** Monitoreo Completo: Prometheus + Grafana + Alertas

**Lo que construirás:**
- Stack de monitoreo local con Docker Compose
- Dashboard de Grafana con métricas de tu app
- Alertas que envían a Slack/Discord
- Logs centralizados con Loki

**Pasos:**
1. Docker Compose con Prometheus, Grafana, Loki
2. Instrumentar app Node.js con prom-client
3. Crear dashboard con las 4 Golden Signals
4. Configurar alertas en Grafana
5. Integrar con Slack
6. Simular incidente y verificar alertas

### Cooking: `logging-production`
**Título:** Logging Profesional: De console.log a Producción

**Lo que construirás:**
- Sistema de logging estructurado con Pino
- Correlación de logs con requestId
- Envío a Loki/CloudWatch
- Búsqueda y análisis de logs

---

## 1.2 Testing Profesional (ENRIQUECER - Prioridad Crítica)

### Learning: `testing` (NUEVO)
**Título:** Testing: Tu Red de Seguridad para Cambios

**Estructura:**
```
1. Por qué testear
   - Analogía: "Cirugía sin anestesia vs con anestesia"
   - El costo de bugs en producción vs desarrollo
   - Tests como documentación viva

2. La pirámide de testing
        /\
       /E2E\        ← Pocos, lentos, frágiles
      /──────\
     /Integration\  ← Balance
    /──────────────\
   /    Unit Tests  \ ← Muchos, rápidos, estables

3. Unit Testing
   - Qué es una "unidad"
   - AAA Pattern (Arrange, Act, Assert)
   - Mocking: cuándo sí, cuándo no
   - Jest/Vitest en detalle

4. Integration Testing
   - Testear contratos entre componentes
   - Testcontainers para bases de datos reales
   - Testing de APIs con Supertest

5. E2E Testing
   - Playwright vs Cypress (2026: Playwright gana)
   - Page Object Pattern
   - Visual regression testing
   - Cuándo NO hacer E2E

6. TDD - Test Driven Development
   - Red → Green → Refactor
   - Cuándo usarlo (lógica de negocio)
   - Cuándo no usarlo (UI exploratoria)

7. Coverage
   - Por qué 100% coverage es una trampa
   - Coverage útil vs vanity metrics
   - Mutation testing (concepto)

8. Testing en CI/CD
   - Tests como gates
   - Parallel test execution
   - Flaky tests y cómo combatirlos
```

**Fuentes:**
- Kent Beck - Test Driven Development
- Martin Fowler - Testing Pyramid
- Playwright documentation

### Cooking: `testing-fullstack` (NUEVO)
**Título:** Testing Completo: Unit + Integration + E2E

**Lo que construirás:**
- Suite de tests para app fullstack (Next.js)
- Unit tests con Vitest
- Integration tests de API con Supertest
- E2E tests con Playwright
- Coverage reports
- Tests en GitHub Actions

### Cooking: `api-testing` (ENRIQUECER)
**Mejoras:**
- Agregar Testcontainers para PostgreSQL real
- Agregar tests de autenticación
- Agregar load testing básico con k6
- Agregar contract testing conceptos

---

## 1.3 Seguridad OWASP (ENRIQUECER - Prioridad Crítica)

### Learning: `security` (NUEVO)
**Título:** Seguridad de Aplicaciones: OWASP Top 10 y Más

**Estructura:**
```
1. Mentalidad de seguridad
   - "Trust no input" como principio
   - Defensa en profundidad
   - El costo de un breach (casos reales)

2. OWASP Top 10 (2025)
   Para cada uno:
   - Qué es (con ejemplo de código vulnerable)
   - Cómo explotarlo (demo controlada)
   - Cómo prevenirlo (código seguro)

   A01: Broken Access Control
   A02: Cryptographic Failures
   A03: Injection (SQL, NoSQL, Command)
   A04: Insecure Design
   A05: Security Misconfiguration
   A06: Vulnerable Components
   A07: Authentication Failures
   A08: Data Integrity Failures
   A09: Logging Failures
   A10: SSRF

3. Autenticación segura
   - Passwords: hashing con bcrypt/argon2
   - Sessions vs JWTs (trade-offs reales)
   - MFA: TOTP, WebAuthn
   - OAuth 2.0 / OIDC correctamente

4. Autorización
   - RBAC vs ABAC
   - Row-level security
   - Principle of least privilege

5. Criptografía aplicada
   - Encryption at rest vs in transit
   - Hashing vs Encryption
   - Key management basics
   - No inventes tu propia crypto

6. Headers de seguridad
   - CSP, HSTS, X-Frame-Options
   - CORS correctamente configurado

7. Secrets management
   - Nunca en código
   - Environment variables (limitaciones)
   - Vault, AWS Secrets Manager

8. Security en CI/CD
   - SAST: análisis estático
   - DAST: análisis dinámico
   - Dependency scanning (npm audit, Snyk)
   - Secret scanning
```

**Fuentes:**
- OWASP.org
- PortSwigger Web Security Academy (gratis)
- NIST guidelines

### Cooking: `security-hardening` (NUEVO)
**Título:** Securizar tu App: De Vulnerable a Fortificada

**Lo que construirás:**
- App intencionalmente vulnerable
- Identificar vulnerabilidades con OWASP ZAP
- Corregir cada vulnerabilidad
- Agregar headers de seguridad
- Configurar CSP
- Agregar rate limiting
- Dependency audit automatizado

### Cooking: `auth-secure` (NUEVO)
**Título:** Autenticación Segura desde Cero

**Lo que construirás:**
- Sistema de auth sin Firebase (entender los internals)
- Password hashing con argon2
- Sessions seguras con cookies HttpOnly
- CSRF protection
- Rate limiting en login
- Account lockout
- Password reset seguro

---

# Ola 2: Calidad y Confiabilidad

**Tema Central:** Poder hacer cambios con confianza y mantener el sistema estable.

**Duración Estimada:** 2-3 semanas de contenido

## 2.1 Diseño de Sistemas (NUEVO)

### Learning: `system-design`
**Título:** Diseño de Sistemas: Pensar Antes de Codear

**Estructura:**
```
1. Por qué diseñar primero
   - El costo de rediseñar vs diseñar
   - Analogía: "Construir una casa sin planos"

2. Diagramas C4
   - Context: sistema en su ambiente
   - Container: aplicaciones y datos
   - Component: dentro de un container
   - Code: solo si es necesario
   - Herramientas: Mermaid, draw.io, Excalidraw

3. Patrones arquitectónicos
   - Monolito modular (empezar aquí)
   - Microservicios (cuándo y por qué)
   - Event-driven architecture
   - Serverless (trade-offs reales)
   - CQRS y Event Sourcing (cuándo vale la pena)

4. Trade-offs fundamentales
   - CAP theorem explicado con ejemplos
   - Consistencia vs Disponibilidad
   - Latencia vs Throughput
   - Complejidad vs Flexibilidad

5. Diseño para fallos
   - "Everything fails, all the time" - Werner Vogels
   - Circuit breakers
   - Retries con exponential backoff
   - Graceful degradation
   - Bulkheads

6. Escalabilidad
   - Vertical vs Horizontal
   - Stateless services
   - Database scaling patterns
   - Caching strategies

7. Documentación arquitectónica
   - ADRs (Architecture Decision Records)
   - Diagramas que se mantienen actualizados
   - Trade-off documentation
```

**Fuentes:**
- Martin Fowler - Patterns of Enterprise Application Architecture
- Designing Data-Intensive Applications (Kleppmann)
- System Design Interview (Alex Xu)

### Cooking: `architecture-workshop`
**Título:** Workshop: Diseñar un Sistema E-commerce

**Lo que construirás:**
- Análisis de requerimientos (dado un brief)
- Diagrama C4 completo
- ADR para decisiones clave
- Identificación de trade-offs
- Plan de escalabilidad

---

## 2.2 Performance (ENRIQUECER)

### Learning: `performance`
**Título:** Performance: Hacer que Todo Vuele

**Estructura:**
```
1. Por qué importa la performance
   - Amazon: 100ms = 1% ventas
   - Google: 500ms = 20% menos búsquedas
   - User perception thresholds

2. Core Web Vitals (2026)
   - LCP (Largest Contentful Paint)
   - INP (Interaction to Next Paint) - reemplazó FID
   - CLS (Cumulative Layout Shift)
   - Cómo medirlos
   - Cómo mejorarlos

3. Frontend Performance
   - Bundle size y code splitting
   - Image optimization (WebP, AVIF, lazy loading)
   - Font optimization
   - Hydration strategies (Next.js)
   - React profiler

4. Backend Performance
   - N+1 queries (el error #1)
   - Connection pooling
   - Async/await correctamente
   - Caching patterns (Redis)
   - Database indexes

5. Profiling
   - Chrome DevTools Performance
   - Node.js profiling
   - Flamegraphs
   - Memory leak detection

6. Load Testing
   - k6 para load testing
   - Identificar bottlenecks
   - Capacity planning básico

7. Caching
   - Browser cache (Cache-Control)
   - CDN caching
   - Application cache (Redis)
   - Database query cache
   - Cache invalidation (el problema difícil)
```

### Cooking: `performance-audit`
**Título:** Auditoría de Performance: De 2s a 200ms

**Lo que construirás:**
- Analizar app lenta con Lighthouse
- Identificar y corregir Core Web Vitals
- Optimizar imágenes y fonts
- Implementar caching con Redis
- Corregir N+1 queries
- Load test con k6
- Antes/después documentado

---

## 2.3 Redes y Protocolos (NUEVO)

### Learning: `networking`
**Título:** Redes: Cómo Viajan tus Datos por Internet

**Estructura:**
```
1. El modelo mental
   - Analogía: "Enviar un paquete por correo"
   - Request → DNS → TCP → Server → Response

2. DNS en profundidad
   - Tipos de registros (A, AAAA, CNAME, MX, TXT)
   - Propagación y TTL
   - DNS debugging (dig, nslookup)
   - DNS como punto de fallo

3. HTTP profundo
   - HTTP/1.1 vs HTTP/2 vs HTTP/3
   - Headers importantes
   - Status codes y cuándo usar cada uno
   - Keep-alive y connection pooling

4. HTTPS y TLS
   - El handshake explicado
   - Certificados y cadena de confianza
   - mTLS para service-to-service

5. WebSockets y alternativas
   - WebSockets: bidireccional
   - Server-Sent Events: unidireccional
   - Long polling: fallback
   - Cuándo usar cada uno

6. Debugging de red
   - curl como herramienta principal
   - tcpdump para casos difíciles
   - Wireshark basics
   - Debugging en Chrome DevTools

7. CDNs y Edge
   - Qué es un CDN
   - Edge computing (Cloudflare Workers, Vercel Edge)
   - Caching en el edge
```

### Cooking: `network-debugging`
**Título:** Debugging de Red: Cuando "No Conecta"

**Lo que construirás:**
- Simular problemas de red comunes
- Diagnosticar con curl, dig, traceroute
- Configurar CORS correctamente
- Debuggear WebSocket connections
- Verificar certificados SSL
- Troubleshooting checklist

---

# Ola 3: Infraestructura Moderna

**Tema Central:** Infraestructura reproducible, escalable y mantenible.

**Duración Estimada:** 2-3 semanas de contenido

## 3.1 Infrastructure as Code (NUEVO - Prioridad Alta)

### Learning: `infrastructure-as-code`
**Título:** Infrastructure as Code: Tu Infra en Git

**Estructura:**
```
1. El problema de la infra manual
   - "Funciona en el servidor de Juan"
   - Drift configuration
   - Disaster recovery imposible

2. Principios de IaC
   - Declarativo vs Imperativo
   - Idempotencia
   - Versionado y code review
   - Ambientes reproducibles

3. Terraform
   - Providers (AWS, GCP, Azure, DigitalOcean)
   - Resources y Data Sources
   - Variables y Outputs
   - State management (remote state)
   - Modules para reutilización
   - Workspaces para ambientes

4. Alternativas
   - Pulumi (TypeScript/Python)
   - CloudFormation (AWS-only)
   - CDK (AWS Cloud Development Kit)

5. Configuration Management
   - Ansible para configurar servidores
   - Playbooks y Roles
   - Inventory management

6. GitOps
   - Infra changes via PRs
   - ArgoCD / Flux para Kubernetes
   - Drift detection y reconciliation

7. Secretos en IaC
   - No hardcodear secrets
   - SOPS, Vault, AWS Secrets Manager
   - Encrypted state
```

### Cooking: `terraform-vps`
**Título:** Terraform: Crear VPS con Código

**Lo que construirás:**
- Proyecto Terraform desde cero
- Crear VPS en DigitalOcean/AWS
- Configurar firewall y networking
- Output de IP y conexión SSH
- Destruir y recrear idénticamente
- Remote state en S3/Spaces

### Cooking: `ansible-setup`
**Título:** Ansible: Configurar Servidores Automáticamente

**Lo que construirás:**
- Playbook para configurar VPS
- Instalar Docker, Nginx, Certbot
- Deploy de aplicación
- Roles reutilizables
- Inventory para múltiples servidores

---

## 3.2 Kubernetes Básico (NUEVO)

### Learning: `kubernetes`
**Título:** Kubernetes: Orquestación de Contenedores

**Estructura:**
```
1. Por qué Kubernetes
   - El problema de escalar contenedores
   - Self-healing, scaling, rolling updates
   - Cuándo NO usar Kubernetes

2. Arquitectura
   - Control plane vs Worker nodes
   - API Server, Scheduler, etcd
   - kubelet, kube-proxy

3. Objetos principales
   - Pods: la unidad mínima
   - Deployments: declarar estado deseado
   - Services: networking interno
   - Ingress: exponer al mundo
   - ConfigMaps y Secrets

4. Networking
   - Service discovery
   - ClusterIP, NodePort, LoadBalancer
   - Ingress controllers (nginx, traefik)

5. Storage
   - Volumes y PersistentVolumes
   - StorageClasses
   - StatefulSets para bases de datos

6. Operaciones básicas
   - kubectl comandos esenciales
   - Logs y debugging
   - Port-forwarding
   - Scaling manual y HPA

7. Managed Kubernetes
   - EKS, GKE, AKS
   - Por qué managed casi siempre gana
   - Costos y consideraciones
```

### Cooking: `kubernetes-local`
**Título:** Kubernetes Local: De Docker Compose a K8s

**Lo que construirás:**
- Minikube o kind local
- Migrar docker-compose a manifests K8s
- Deployment + Service + Ingress
- ConfigMaps para config
- Secrets para credenciales
- Escalar pods manualmente
- Rolling update

---

## 3.3 Cloud Profundo (ENRIQUECER)

### Learning: `cloud-aws` (NUEVO)
**Título:** AWS: Los Servicios que Realmente Usarás

**Estructura:**
```
1. El modelo de responsabilidad compartida
2. IAM: la base de todo
   - Users, Roles, Policies
   - Principle of least privilege
3. Compute: EC2, Lambda, ECS, EKS
4. Storage: S3, EBS, EFS
5. Database: RDS, DynamoDB, ElastiCache
6. Networking: VPC, Subnets, Security Groups
7. Otros: SQS, SNS, CloudWatch, Route53
```

### Cooking: `aws-fullstack`
**Título:** Deploy en AWS: La Forma Profesional

**Lo que construirás:**
- VPC con subnets públicas/privadas
- RDS PostgreSQL en subnet privada
- ECS Fargate para la app
- ALB para load balancing
- S3 + CloudFront para static assets
- Todo con Terraform

---

# Ola 4: Operaciones y Costos

**Tema Central:** Mantener sistemas en producción de forma sostenible.

**Duración Estimada:** 2 semanas de contenido

## 4.1 FinOps (NUEVO - Prioridad Alta)

### Learning: `finops`
**Título:** FinOps: No Quemes Dinero en la Nube

**Estructura:**
```
1. El problema del cloud billing
   - Historias de horror reales
   - Por qué es fácil gastar de más
   - Modelo de costo: pay-per-use

2. Entender el pricing
   - Compute (por hora, por segundo)
   - Storage (por GB/mes)
   - Network egress (el costo oculto)
   - Requests (APIs, Lambda)

3. Estrategias de ahorro
   - Reserved Instances (70% ahorro)
   - Spot Instances (90% ahorro, interrumpible)
   - Savings Plans
   - Right-sizing

4. Identificar desperdicio
   - Recursos zombie
   - Over-provisioned instances
   - Unused EBS volumes
   - Idle load balancers

5. Cost allocation
   - Tagging strategy
   - Showback y chargeback
   - Cost per customer/feature

6. Herramientas
   - AWS Cost Explorer
   - CloudHealth, Spot.io
   - Infracost para Terraform

7. Arquitectura cost-efficient
   - Serverless para workloads variables
   - Autoscaling bien configurado
   - Caching para reducir compute
   - Compression para reducir egress
```

### Cooking: `cost-optimization`
**Título:** Optimización de Costos: Reducir 50% tu Bill

**Lo que construirás:**
- Auditoría de cuenta AWS/DigitalOcean
- Identificar recursos zombie
- Implementar tagging
- Configurar billing alerts
- Right-size una instancia
- Calcular ahorro con Reserved Instances

---

## 4.2 Incident Management (NUEVO)

### Learning: `incidents`
**Título:** Gestión de Incidentes: Cuando Todo Se Cae

**Estructura:**
```
1. Anatomía de un incidente
   - Detección → Respuesta → Mitigación → Resolución → Review

2. On-call y rotaciones
   - Expectativas razonables
   - Herramientas: PagerDuty, Opsgenie

3. Durante el incidente
   - Roles: Incident Commander, Comunicador, Técnicos
   - War rooms
   - Comunicación a stakeholders

4. Post-mortems blameless
   - Timeline de eventos
   - Root cause analysis (5 Whys)
   - Action items
   - Compartir learnings

5. SLOs y Error Budgets
   - Definir qué es "suficientemente bueno"
   - Usar error budget para decisiones

6. Chaos Engineering (intro)
   - Probar resiliencia proactivamente
   - Chaos Monkey conceptos
```

### Cooking: `incident-simulation`
**Título:** Simulacro de Incidente: Game Day

**Lo que construirás:**
- Simular caída de base de datos
- Practicar proceso de respuesta
- Escribir post-mortem real
- Definir SLOs para tu app
- Configurar runbook

---

# Ola 5: Datos y Analytics

**Tema Central:** Mover, transformar y usar datos efectivamente.

**Duración Estimada:** 2 semanas de contenido

## 5.1 Data Engineering Fundamentals (NUEVO)

### Learning: `data-engineering`
**Título:** Data Engineering: El Flujo de los Datos

**Estructura:**
```
1. Qué es Data Engineering
   - Diferencia con Data Science
   - El data pipeline como producto

2. Batch vs Streaming
   - Batch: procesar histórico
   - Streaming: procesar en tiempo real
   - Lambda architecture

3. ETL vs ELT
   - Extract, Transform, Load (tradicional)
   - Extract, Load, Transform (moderno)
   - dbt para transformaciones

4. Herramientas
   - Orchestration: Airflow, Prefect, Dagster
   - Streaming: Kafka, Kinesis
   - Processing: Spark basics
   - Warehouses: BigQuery, Snowflake

5. Data Quality
   - Schema validation
   - Data contracts
   - Monitoring de pipelines

6. Data Privacy
   - PII identification
   - Anonymization techniques
   - GDPR considerations
```

### Cooking: `data-pipeline`
**Título:** Pipeline de Datos: ETL con Python y Airflow

**Lo que construirás:**
- Pipeline que extrae de API
- Transforma y limpia datos
- Carga a PostgreSQL/BigQuery
- Orquestado con Airflow
- Monitoreo de ejecución

---

## 5.2 Analytics y Visualización (NUEVO)

### Learning: `analytics`
**Título:** Analytics: De Datos a Decisiones

**Estructura:**
```
1. Métricas que importan
   - Vanity metrics vs actionable metrics
   - North Star metric
   - Funnel analysis

2. SQL analítico
   - Window functions
   - CTEs
   - Aggregations avanzadas

3. Herramientas de BI
   - Metabase (open source)
   - Grafana para métricas
   - Looker, Tableau (enterprise)

4. Product Analytics
   - Event tracking
   - Mixpanel, Amplitude, PostHog
   - Privacy-first analytics
```

### Cooking: `analytics-dashboard`
**Título:** Dashboard de Producto con Metabase

**Lo que construirás:**
- Instalar Metabase con Docker
- Conectar a PostgreSQL
- Crear queries SQL analíticas
- Dashboards para métricas de negocio
- Alertas automáticas

---

# Ola 6: Comunicación y Liderazgo Técnico

**Tema Central:** Multiplicar impacto a través de otros.

**Duración Estimada:** 1-2 semanas de contenido

## 6.1 Documentación Técnica (ENRIQUECER)

### Learning: `technical-writing`
**Título:** Documentación: Tu Código No Se Explica Solo

**Estructura:**
```
1. Tipos de documentación
   - README (entry point)
   - API docs (contratos)
   - ADRs (decisiones)
   - Runbooks (operaciones)
   - Tutorials vs Reference

2. README efectivo
   - Qué hace, cómo instalarlo, cómo usarlo
   - Badges útiles
   - Screenshots/GIFs

3. API Documentation
   - OpenAPI/Swagger
   - Ejemplos de requests/responses
   - Error documentation

4. Architecture Decision Records
   - Contexto, decisión, consecuencias
   - Template ADR

5. Diagramas
   - Mermaid en Markdown
   - Cuándo actualizar diagramas
```

### Cooking: `documentation-project`
**Título:** Documentar tu Proyecto Profesionalmente

**Lo que construirás:**
- README completo con badges
- API docs con Swagger
- 3 ADRs para decisiones clave
- Diagramas con Mermaid
- Runbook de deployment

---

## 6.2 Análisis de Requerimientos (NUEVO)

### Learning: `requirements`
**Título:** Requerimientos: Entender Qué Construir

**Estructura:**
```
1. El problema de los requerimientos
   - "El cliente no sabe lo que quiere"
   - Costo de construir lo incorrecto

2. Técnicas de elicitación
   - Entrevistas
   - Observación
   - Prototyping

3. User Stories
   - Como [rol], quiero [acción], para [beneficio]
   - Criterios de aceptación
   - Definition of Done

4. Domain-Driven Design (intro)
   - Ubiquitous language
   - Bounded contexts
   - Event storming

5. Requisitos no funcionales
   - Performance requirements
   - Security requirements
   - Compliance requirements

6. Priorización
   - MoSCoW method
   - RICE scoring
   - Impact/Effort matrix
```

---

# Resumen de Contenido por Ola

| Ola | Learning (nuevo) | Learning (enriquecer) | Cooking (nuevo) | Cooking (enriquecer) |
|-----|------------------|----------------------|-----------------|---------------------|
| **1** | observability, testing, security | auth | monitoring-stack, logging-production, testing-fullstack, security-hardening, auth-secure | api-testing |
| **2** | system-design, performance, networking | - | architecture-workshop, performance-audit, network-debugging | redis-cache |
| **3** | infrastructure-as-code, kubernetes, cloud-aws | docker-compose | terraform-vps, ansible-setup, kubernetes-local, aws-fullstack | docker-deploy |
| **4** | finops, incidents | - | cost-optimization, incident-simulation | - |
| **5** | data-engineering, analytics | embeddings | data-pipeline, analytics-dashboard | rag-documents |
| **6** | technical-writing, requirements | git-advanced | documentation-project | - |

---

# Métricas de Éxito

Después de completar las 6 olas:

| Métrica | Antes | Después |
|---------|-------|---------|
| Competencias con cobertura Alta | 6 (30%) | 16 (80%) |
| Competencias con cobertura Media | 8 (40%) | 4 (20%) |
| Competencias con cobertura Baja | 4 (20%) | 0 (0%) |
| Sin cobertura | 2 (10%) | 0 (0%) |

---

# Checklist de Calidad por Contenido

Cada nuevo contenido debe cumplir:

- [ ] **Fuentes:** Mínimo 3 fuentes verificables citadas
- [ ] **Analogía:** Al menos 1 analogía memorable para el concepto principal
- [ ] **Ejemplo real:** Código funcional, no foo/bar
- [ ] **Diagrama:** Al menos 1 diagrama ASCII o Mermaid
- [ ] **Troubleshooting:** Tabla de errores comunes y soluciones
- [ ] **Verificación:** Pasos para confirmar que funciona
- [ ] **Siguiente paso:** Link a contenido relacionado
- [ ] **Bilingüe:** Español e inglés de igual calidad
- [ ] **Probado:** El código fue ejecutado y funciona

---

# Timeline Sugerido

```
Enero 2026:     Ola 1 - Fundamentos Críticos
Febrero 2026:   Ola 2 - Calidad y Confiabilidad
Marzo 2026:     Ola 3 - Infraestructura Moderna
Abril 2026:     Ola 4 - Operaciones y Costos
Mayo 2026:      Ola 5 - Datos y Analytics
Junio 2026:     Ola 6 - Comunicación y Liderazgo
```

---

**Última actualización:** Enero 2026
**Autor:** luxIA.us Team
