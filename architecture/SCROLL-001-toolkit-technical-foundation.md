# Architecture: Teacher Relief Toolkit

## Source Scroll
[scrolls/SCROLL-001-teacher-relief-toolkit.md](../scrolls/SCROLL-001-teacher-relief-toolkit.md)

## Design Date
2026-02-10

## Architect
The Architect (SaveTheWorld Collective)

---

## Overview

### Vision

The Teacher Relief Toolkit is a lightweight, open-source web application that reduces administrative burden for K-12 teachers. Phase 1 focuses exclusively on four capabilities: automated report generation, parent communication templates, data entry reduction, and scheduling assistance. The system is designed as a self-contained application that a single school district IT department can deploy and maintain, with no dependency on external services or cloud vendors. It runs on modest hardware, works on a phone, and treats teacher data as private by default.

The architecture is deliberately simple. A teacher opens a browser, logs in, and gets to work. There is no AI that decides things for teachers. There are no dashboards for administrators. There is a toolbox, and the teacher picks up the tools they need.

### Guiding Principles

1. **Teacher-first simplicity**: Every architectural decision is filtered through the question "does this make a teacher's day easier or harder?" If it adds complexity for the teacher, it does not ship.

2. **Deploy anywhere**: A school district with a single server and a part-time IT person must be able to run this. No Kubernetes. No microservices. No cloud-only dependencies.

3. **Privacy as structure, not policy**: Teacher data privacy is enforced by the architecture itself (data minimization, local-first storage, no telemetry) rather than by policy documents that can be ignored.

4. **Honest boundaries**: The tool clearly communicates what it is (administrative relief) and what it is not (a solution to systemic problems in education). This messaging is embedded in the UI, not just the README.

5. **Measured, not assumed**: The architecture includes lightweight, opt-in instrumentation so we can answer Moira's question: "Is this actually working?"

---

## System Architecture

### Component Diagram

```
+------------------------------------------------------------------+
|                        TEACHER'S DEVICE                           |
|                    (Browser — Desktop or Phone)                   |
+------------------------------------------------------------------+
                              |
                           HTTPS
                              |
+------------------------------------------------------------------+
|                       APPLICATION SERVER                          |
|                                                                   |
|  +--------------------+  +---------------------+                  |
|  |   Web Application  |  |     REST API         |                 |
|  |   (Server-rendered |  |   (JSON endpoints    |                 |
|  |    HTML + minimal  |  |    for async ops)     |                 |
|  |    JS)             |  |                       |                 |
|  +--------------------+  +---------------------+                  |
|            |                       |                              |
|  +--------------------------------------------------------+      |
|  |                  APPLICATION CORE                       |      |
|  |                                                         |      |
|  |  +---------------+  +----------------+  +------------+  |      |
|  |  | Report Engine |  | Template Engine|  | Scheduler  |  |      |
|  |  | (generate     |  | (parent comms, |  | (planning  |  |      |
|  |  |  progress     |  |  form letters, |  |  assistant)|  |      |
|  |  |  reports,     |  |  notices)      |  |            |  |      |
|  |  |  summaries)   |  |                |  |            |  |      |
|  |  +---------------+  +----------------+  +------------+  |      |
|  |                                                         |      |
|  |  +---------------+  +----------------+  +------------+  |      |
|  |  | Data Entry    |  | Auth Module    |  | Metrics    |  |      |
|  |  | Reducer       |  | (login, roles, |  | Collector  |  |      |
|  |  | (bulk ops,    |  |  sessions)     |  | (opt-in    |  |      |
|  |  |  CSV import,  |  |                |  |  usage     |  |      |
|  |  |  smart forms) |  |                |  |  stats)    |  |      |
|  |  +---------------+  +----------------+  +------------+  |      |
|  +--------------------------------------------------------+      |
|                              |                                    |
|  +--------------------------------------------------------+      |
|  |                     DATA LAYER                          |      |
|  |                                                         |      |
|  |  +------------------+  +-----------------------------+  |      |
|  |  | SQLite Database  |  | File Storage (local disk)   |  |      |
|  |  | (all app data)   |  | (generated PDFs, exports)   |  |      |
|  |  +------------------+  +-----------------------------+  |      |
|  +--------------------------------------------------------+      |
+------------------------------------------------------------------+

+------------------------------------------------------------------+
|                    OPTIONAL: SIS IMPORT BRIDGE                    |
|               (Reads from existing Student Info System)           |
|                    One-way data flow: SIS --> App                 |
+------------------------------------------------------------------+
```

### Component Descriptions

#### 1. Web Application (Server-Rendered Frontend)

- **Purpose**: The primary interface teachers interact with. Server-rendered HTML ensures it works on any device, any browser, any connection speed.
- **Responsibilities**:
  - Render pages for all four Phase 1 capabilities
  - Handle form submissions
  - Provide responsive layout that works on phones, tablets, and desktops
  - Display anti-appropriation messaging in the application footer and about page
  - Support English and Spanish (most common second language in US K-12)
- **Interfaces**: Serves HTML over HTTPS. Minimal JavaScript for progressive enhancement only (e.g., inline form validation, auto-save). The application must be fully functional with JavaScript disabled.

#### 2. REST API

- **Purpose**: Handles asynchronous operations that benefit from background processing (e.g., generating a batch of 30 report cards).
- **Responsibilities**:
  - Accept requests for batch report generation
  - Return job status for long-running operations
  - Serve data for the few interactive UI elements that benefit from async updates
- **Interfaces**: JSON over HTTPS. Authenticated with the same session as the web application. No separate API keys or tokens.

#### 3. Report Engine

- **Purpose**: Generates progress reports, student summaries, and administrative documents from structured data.
- **Responsibilities**:
  - Accept structured data (student records, grades, attendance) and produce formatted documents
  - Output to PDF and plain text
  - Support customizable report templates per district
  - Batch generation (e.g., all 30 students in a class at once)
- **Interfaces**: Internal module. Called by the web application and REST API. No external interface.
- **Key constraint**: Reports are generated from data the teacher has already entered. The engine does not infer, predict, or "fill in" data.

#### 4. Template Engine (Parent Communications)

- **Purpose**: Provides reusable, customizable templates for parent/guardian communications.
- **Responsibilities**:
  - Store a library of communication templates (progress updates, behavior notices, event announcements, IEP meeting notices, etc.)
  - Allow teachers to customize templates with student-specific data via mail-merge
  - Output to email-ready text, printable PDF, or plain text (for SMS pasting)
  - Support district-level template customization
- **Interfaces**: Internal module. Teachers interact through the web application.
- **Key constraint**: Templates are starting points, not mandated language. Teachers always have final edit control.

#### 5. Scheduler (Planning Assistant)

- **Purpose**: Helps teachers organize their non-instructional time (grading blocks, parent meetings, administrative deadlines).
- **Responsibilities**:
  - Display a simple calendar view of upcoming deadlines and commitments
  - Allow teachers to block time for administrative tasks
  - Send optional reminders (email or browser notification)
  - Import district calendar events via iCal format
- **Interfaces**: Internal module. Web application interface. iCal import (standard `.ics` files).
- **Key constraint**: This is a planning aid, not a mandatory scheduling system. No one besides the teacher sees their schedule.

#### 6. Data Entry Reducer

- **Purpose**: Minimizes repetitive data entry through bulk operations, CSV import/export, and smart form defaults.
- **Responsibilities**:
  - CSV import for student rosters and grade data
  - Bulk update operations (e.g., mark attendance for full class)
  - Smart form defaults based on teacher's previous entries
  - Copy-forward for recurring data patterns
- **Interfaces**: Internal module. Web application interface. CSV file format for import/export.
- **Key constraint**: The system never auto-submits data. All bulk operations require explicit teacher confirmation before saving.

#### 7. Auth Module

- **Purpose**: Authentication and session management.
- **Responsibilities**:
  - Teacher login with email and password
  - Session management with configurable timeout
  - Role distinction: teacher (primary user), district admin (manages templates and district settings only)
  - Password reset via email
- **Interfaces**: Internal module. Standard session-cookie authentication.
- **Key constraint**: District admins can manage templates and district-level settings. They cannot view individual teacher data, schedules, or usage patterns. This boundary is enforced in code, not configuration.

#### 8. Metrics Collector

- **Purpose**: Lightweight, opt-in measurement to answer "is this working?" per Moira's directive.
- **Responsibilities**:
  - Track aggregate usage statistics (number of reports generated, templates used, etc.)
  - Record self-reported time savings (optional periodic prompt: "Did this save you time this week?")
  - All metrics are aggregated and anonymized before storage
  - Teachers can opt out entirely; the tool works identically with metrics disabled
- **Interfaces**: Internal module. Stores aggregated data in the same SQLite database. No external reporting. District administrators see only aggregate numbers, never individual teacher data.
- **Key constraint**: No individual teacher usage tracking. Metrics exist to measure whether the tool helps, not to monitor who uses it.

#### 9. Data Layer (SQLite + Local File Storage)

- **Purpose**: All persistent storage.
- **Responsibilities**:
  - SQLite database for all application data (users, templates, student data, schedules)
  - Local file system for generated documents (PDFs, exports)
  - Automated daily backup to a configurable local path
  - Data export: teachers can export all their data as a ZIP file at any time
- **Interfaces**: SQLite via application code. File system for document storage.
- **Why SQLite**: Zero-configuration. No separate database server. Backup is copying a file. A school district IT person does not need to be a DBA. SQLite handles the concurrency level of a single school or small district comfortably (hundreds of users, not millions).

#### 10. SIS Import Bridge (Optional)

- **Purpose**: One-way import of student roster data from existing Student Information Systems (SIS).
- **Responsibilities**:
  - Read student roster data from common SIS platforms (PowerSchool, Infinite Campus, etc.) via CSV export or, where available, standard APIs
  - Map SIS data fields to the toolkit's internal data model
  - One-way flow only: data flows from SIS into the toolkit, never back
  - Teacher initiates import manually; no automatic sync
- **Interfaces**: CSV file import (always available). Optional API connectors (built per-district need during pilot).
- **Key constraint**: The toolkit never writes to the SIS. It is a consumer of roster data, not a participant in the SIS ecosystem. This prevents the toolkit from becoming a critical path dependency for the school.

### Data Flow

```
1. TEACHER SETUP
   Teacher logs in --> Imports student roster (CSV or SIS bridge)
                       --> Data stored locally in SQLite

2. DAILY USE: REPORT GENERATION
   Teacher selects students --> Chooses report template
     --> Report Engine merges data + template --> PDF generated
       --> Teacher reviews, edits if needed --> Downloads or prints

3. DAILY USE: PARENT COMMUNICATION
   Teacher selects template --> Fills in student-specific details
     --> Template Engine produces formatted message
       --> Teacher copies to email/prints/sends via their own channels

4. DAILY USE: DATA ENTRY
   Teacher opens bulk entry form --> Enters data for class
     --> Reviews summary --> Confirms save --> Data persisted to SQLite

5. WEEKLY USE: SCHEDULING
   Teacher views upcoming week --> Blocks time for admin tasks
     --> Optional: receives reminder --> Completes tasks using toolkit

6. MEASUREMENT (OPT-IN)
   Weekly prompt: "Estimate time saved this week" --> Teacher responds
     --> Response aggregated anonymously --> Available to district as aggregate only
```

### Integration Points

| External System | Integration Type | Direction | Required? |
|----------------|-----------------|-----------|-----------|
| Student Information System (SIS) | CSV import or optional API | One-way IN | No |
| District email system | Teacher manually copies text; no direct integration | N/A | No |
| District calendar | iCal (.ics) file import | One-way IN | No |
| Print infrastructure | Standard browser print / PDF download | One-way OUT | No |

**Design decision**: Phase 1 has no required integrations. Every integration is optional, one-way, and initiated by the teacher. This means the toolkit works even if a school has no SIS, no standard calendar system, and spotty email. The teacher can still use templates, generate reports from manually entered data, and plan their schedule.

---

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Language** | Python 3.11+ | Widely known. Large contributor base for open source. School IT staff more likely to have Python experience than alternatives. Extensive library ecosystem for PDF generation, CSV handling, and web development. |
| **Web Framework** | Django 5.x | Batteries-included: authentication, ORM, admin interface, form handling, internationalization. Proven at scale but equally comfortable for small deployments. Excellent documentation. Large community. |
| **Database** | SQLite (via Django ORM) | Zero configuration. No separate server process. Backup is file copy. Handles hundreds of concurrent users. Django has first-class SQLite support. Can migrate to PostgreSQL later if needed (Django ORM abstraction), but likely never necessary for Phase 1 scope. |
| **Frontend** | Django templates + HTMX | Server-rendered HTML ensures accessibility and phone compatibility. HTMX provides interactive features (auto-save, inline updates) with minimal JavaScript. No build step. No npm. No webpack. Progressive enhancement: works without JS. |
| **PDF Generation** | WeasyPrint | Open-source. Generates PDF from HTML/CSS, meaning report templates can be designed using the same tools as the web interface. No proprietary dependencies. |
| **CSS Framework** | Pico CSS (classless) or MVP.css | Minimal, semantic, classless CSS that makes standard HTML look good on any device. No utility classes to learn. Accessibility built in. Tiny footprint. Teachers' phones download kilobytes, not megabytes. |
| **Deployment** | Single Linux server + systemd | One process (Gunicorn) behind a reverse proxy (Caddy or Nginx). Caddy provides automatic HTTPS. No Docker required for production (Docker available for development convenience). A district IT person runs `apt install` and follows a guide. |
| **Task Queue** | Django-Q2 (SQLite broker) | For batch report generation. Uses SQLite as the message broker (no Redis/RabbitMQ). Keeps the "one server, one database file" simplicity. |
| **Internationalization** | Django i18n (built-in) | English and Spanish for Phase 1. Django's translation framework is mature and well-documented. Extensible to other languages. |
| **Version Control** | Git + GitHub | Open-source home. Community contributions. Issue tracking. CI/CD via GitHub Actions. |

### Technology Decisions: What We Are NOT Using (and Why)

| Excluded | Reason |
|----------|--------|
| React / Vue / SPA framework | Adds build complexity, increases load time, breaks without JavaScript, requires more frontend expertise from contributors. Server-rendered HTML with HTMX provides sufficient interactivity. |
| PostgreSQL / MySQL | Requires separate server process, configuration, and maintenance. Overkill for Phase 1 scale. |
| Docker (in production) | Adds operational complexity for district IT. Available for development but not required for deployment. |
| AI/ML features | Phase 1 is deterministic automation. Teachers define what reports say. No predictions, no inference, no "smart" suggestions that could be wrong. |
| Cloud-only services (AWS, GCP, Azure) | Violates deploy-anywhere principle. Creates vendor lock-in (Julia's concern). Districts may have policies against cloud storage of student data. |
| Microservices | One application, one process, one database. Microservices solve organizational scaling problems we do not have. |

---

## Infrastructure

### Environments

#### Development
- Local machine with Python 3.11+, SQLite, and a text editor
- `manage.py runserver` for local development
- Docker Compose available for contributors who prefer containers
- Seed data script creates a realistic test dataset (fake school, fake students, fake teacher accounts)

#### Staging / Pilot
- Single Linux VM (Ubuntu LTS) per pilot district
- Minimum specs: 2 CPU cores, 4GB RAM, 40GB disk
- Caddy reverse proxy with automatic Let's Encrypt HTTPS
- Gunicorn application server (4 workers)
- SQLite database (single file)
- Automated daily backup: database file copied to a second local path or district-provided backup location
- Accessible via district network or, if district permits, public internet with HTTPS

#### Production (Post-Pilot)
- Same architecture as staging, scaled per district
- If a district serves 500+ teachers and SQLite becomes a bottleneck: migrate to PostgreSQL (Django ORM makes this a configuration change, not a rewrite)
- No centralized "cloud" deployment. Each district runs their own instance. This is a feature, not a limitation: data stays local, under district control.

### Security Architecture

#### Threat Model (Phase 1)

The primary assets are:
1. **Student roster data** (names, grades, attendance) — imported by teachers
2. **Teacher account data** (email, password hash, schedule) — created at signup
3. **Generated documents** (reports, communications) — created by the tool

The primary threats are:
1. Unauthorized access to student data
2. Unauthorized access to teacher data or usage patterns
3. Data exposure through misconfigured deployment

#### Security Controls

| Layer | Control | Implementation |
|-------|---------|----------------|
| **Transport** | HTTPS everywhere | Caddy provides automatic TLS certificates via Let's Encrypt. HTTP redirects to HTTPS. HSTS headers. |
| **Authentication** | Password-based login | Django's built-in auth with bcrypt password hashing. Session cookies with `HttpOnly`, `Secure`, `SameSite=Lax` flags. Configurable session timeout (default: 8 hours, matching a school day). |
| **Authorization** | Role-based access | Two roles: `teacher` and `district_admin`. Teachers see only their own data. District admins see only aggregate metrics and district-level settings. Enforced in application code with Django's permission framework. Tested with automated authorization tests. |
| **Data at rest** | File system permissions | SQLite file readable only by the application user. Generated documents stored in a directory with restricted permissions. For districts requiring encryption at rest: full-disk encryption on the server (standard practice, documented in deployment guide). |
| **Data minimization** | Collect only what's needed | No analytics trackers. No third-party scripts. No telemetry home. Student data limited to what teachers import. Metrics are aggregate only. |
| **Input validation** | Django forms + ORM | All user input validated through Django's form framework. ORM prevents SQL injection. CSRF protection on all forms. XSS prevention through Django's template auto-escaping. |
| **Backup security** | Encrypted backups | Daily backup script encrypts the SQLite file before writing to backup location. GPG encryption with a key managed by district IT. |
| **Dependency security** | Automated scanning | GitHub Dependabot for dependency vulnerability alerts. Minimal dependency tree (fewer deps = fewer attack surfaces). |
| **Admin boundary** | Structural separation | District admin access is limited by code, not configuration. Even with database access, individual teacher usage data is stored only in aggregate form. This is Tekla's requirement: the architecture makes surveillance difficult, not merely prohibited. |

#### Privacy Architecture

```
WHAT WE STORE              | WHO CAN SEE IT           | RETENTION
---------------------------|--------------------------|------------------
Student roster data        | The teacher who imported  | Deleted when teacher
(names, grades, etc.)      | it. No one else.         | removes it, or on
                           |                          | annual purge prompt.
                           |                          |
Teacher account data       | The teacher themselves.   | Until account is
(email, password hash)     | District admin sees only  | deleted by teacher
                           | that account exists.     | or district.
                           |                          |
Teacher schedule           | The teacher only.         | Rolling 12 months.
                           | Not visible to district   | Older data auto-
                           | admins.                  | deleted.
                           |                          |
Generated documents        | The teacher who created   | Until teacher
(reports, letters)         | them. Not visible to     | deletes. Prompted
                           | district admins.         | at end of school year.
                           |                          |
Aggregate metrics          | District admin dashboard. | Rolling 12 months.
(opt-in, anonymous)        | No individual teacher    |
                           | attribution.             |
```

**Data export**: Any teacher can export all their data (roster, documents, schedule) as a ZIP file at any time. This supports Tekla's data sovereignty requirement: teachers own their data and can leave with it.

**Data deletion**: Teachers can delete their account and all associated data. The deletion is real (data removed from SQLite), not a soft-delete that keeps data around.

### Resilience

This is a single-server application for a pilot. The resilience strategy is proportionate:

| Failure | Mitigation |
|---------|------------|
| Server crash | Systemd restarts the application automatically. SQLite database survives restarts (it is a file on disk). |
| Disk failure | Daily encrypted backups. Documented restoration procedure. Recovery time: hours, not minutes. Acceptable for Phase 1. |
| Application bug | Standard error handling. Django's error logging. Bug reports via GitHub Issues. |
| Data corruption | SQLite's built-in integrity checking. Backup restoration documented. |
| Server compromise | HTTPS, minimal attack surface, dependency scanning, OS-level updates. Incident response: take server offline, restore from backup, rotate credentials. |

**What we do NOT build for Phase 1**: High availability, load balancing, multi-region deployment, zero-downtime deploys. These are scaling concerns. If Phase 1 proves valuable and scales beyond a single-server deployment, the architecture can evolve. Django applications routinely serve large user bases with PostgreSQL and horizontal scaling when needed.

---

## Process

### Development Workflow

1. **Branch from `main`**: All work on feature branches
2. **Write tests first**: TDD for all business logic (report generation, template rendering, data import)
3. **Small pull requests**: Each PR addresses a single concern
4. **Co-design checkpoints**: Before building a feature, share a mockup or prototype with the teacher co-design group. This is not optional.
5. **Accessible by default**: Every page tested with a screen reader and at mobile viewport size before merging

### Testing Strategy

| Level | What | Tool | Coverage Target |
|-------|------|------|-----------------|
| **Unit tests** | Report engine, template engine, data import logic, auth rules | pytest + Django test client | All business logic. Every report template. Every authorization boundary. |
| **Integration tests** | Full request/response cycles. CSV import end-to-end. Batch report generation. | pytest + Django test client | All user-facing workflows. |
| **Authorization tests** | Verify that teachers cannot see other teachers' data. Verify that district admins cannot see individual teacher data. | Dedicated test suite | 100% coverage of every authorization boundary. This is Tekla's requirement. |
| **Accessibility tests** | WCAG 2.1 AA compliance. Screen reader compatibility. Mobile usability. | axe-core (automated), manual testing | Every page. |
| **Browser testing** | Works in Chrome, Firefox, Safari, and on iOS/Android browsers. Works without JavaScript. | Manual testing matrix during pilot | All user-facing pages. |
| **Load testing** | Verify SQLite handles pilot-scale concurrent access (50-100 simultaneous users per district). | Locust | Before pilot launch. |
| **Pilot user testing** | Real teachers using real workflows in the pilot districts. | Observation sessions, feedback surveys | During pilot. |

### Review Gates

| Gate | Who | Criteria |
|------|-----|----------|
| **Code review** | At least one other contributor | Tests pass. Code is clear. Accessibility verified. |
| **Co-design review** | Teacher co-design group | Feature matches what teachers actually need. Language is clear. Workflow makes sense. |
| **Security review** | Before pilot launch | Authorization tests pass. HTTPS configured. Backup working. Dependencies scanned. |
| **Pilot readiness** | The Hand + Foreman | Deployment guide tested. Seed data works. Backup/restore tested. Teacher onboarding materials ready. |

### Deployment Process

Phase 1 deployment is manual and intentional:

1. **Prepare release**: Tag a version in Git. Run full test suite. Build deployment package.
2. **Deploy to pilot server**: SSH to the district's server. Pull the tagged version. Run database migrations. Restart the application.
3. **Verify**: Smoke test the deployment (login, generate a report, create a communication, check schedule).
4. **Document**: Record the deployed version and any district-specific configuration.

**No continuous deployment for Phase 1**. Changes to a production system used by real teachers in real schools are deliberate, tested, and communicated to users in advance. Continuous integration (automated tests on every PR) is used. Continuous deployment is not.

---

## Phase 2 and Phase 3: Extension Points (Not Built Now)

The following notes describe how the Phase 1 architecture accommodates future phases without building anything for them now.

### Phase 2: Peer Support Network
- Django's app structure allows adding a new `peer_support` app alongside existing apps
- Authentication and user model are already in place
- Would require: messaging infrastructure (likely Django Channels for real-time), mentor matching logic, directory of mental health resources
- **Architectural decision for Phase 2**: Evaluate whether peer support should be a separate deployment or part of the same application. Separate deployment may be preferable for privacy reasons (a teacher's participation in a support network should not be visible to their district).

### Phase 3: Early Warning Dashboard
- Metrics collector in Phase 1 establishes the pattern of aggregate-only data
- Phase 3 would require a completely separate data privacy framework (Tekla's review)
- **Architectural decision for Phase 3**: This may require a fundamentally different data architecture where teachers explicitly opt in to sharing wellness indicators, data is encrypted such that only the teacher and their designated support person can decrypt it, and the system is auditable. These are Phase 3 design problems.

### What Phase 1 Does to Prepare (Without Over-Building)
- Clean separation of Django apps (each module is its own app)
- Well-defined data models with Django ORM migrations
- Authentication and authorization patterns established
- Deployment infrastructure that can be reused
- Community of teacher co-designers who can inform Phase 2 design

---

## Open Questions for the Foreman

1. **Pilot district selection**: Which 1-3 school districts will participate in the pilot? This determines deployment environment constraints (what servers they have, what SIS they use, whether they allow external hosting).

2. **Co-design recruitment**: How do we recruit 3-5 practicing teachers for the co-design group? Do we work through the pilot districts, through teacher unions, or through other channels?

3. **Timeline for co-design phase**: The co-design workshops need to happen before building begins. How long do we allocate for this? Recommendation: 2-4 weeks of structured conversations before any code is written.

4. **Report template inventory**: What are the most common report types that teachers spend time on? The co-design group should produce a prioritized list, but the Foreman should plan for 5-10 initial report templates.

5. **Localization scope**: English and Spanish are planned. Are there pilot districts where other languages are needed for parent communications?

6. **Anti-appropriation messaging**: The exact language for the in-app messaging needs to be drafted. Should this come from the co-design group, from the Council, or from The Hand?

7. **Hosting responsibility**: Who operates the pilot servers? The collective? The district IT team? A hybrid? This affects the deployment guide and support model.

8. **Pilot duration**: The Scroll specifies a six-month gate. Does the Foreman recommend a shorter initial pilot cycle (e.g., 8 weeks) with a check-in, followed by the full six-month evaluation?

9. **Contribution model**: How do we handle open-source contributions from the community during the pilot? Do we accept external PRs, or is the pilot a closed development period?

10. **Accessibility standards**: WCAG 2.1 AA is the target. Are there additional accessibility requirements from the pilot districts (e.g., specific screen reader compatibility, specific language needs)?

---

## Human Intervention Needed

### Before Building Begins

1. **Pilot district partnerships**: Humans must establish relationships with 1-3 school districts willing to participate. This requires outreach, trust-building, and formal agreement. The collective cannot do this autonomously.

2. **Teacher co-design group**: Humans must recruit 3-5 practicing teachers willing to participate in co-design. These should be teachers from the pilot districts, representing diverse grade levels, subjects, and school contexts (including at least one from a high-poverty school, per the Scroll's emphasis).

3. **Legal review**: Even though this is open source, deploying software that handles student data in a school district may trigger FERPA compliance requirements. A human with legal expertise should review the data handling approach before the pilot begins.

4. **Server provisioning**: Humans must arrange hosting for the pilot. Either the districts provide servers, or the collective arranges modest hosting (a $20/month VPS per district would suffice).

### During the Pilot

5. **Ongoing teacher feedback**: The co-design relationship is not a one-time consultation. Teachers should have a direct channel to report what is working and what is not. A human (The Hand or a designated liaison) should maintain this relationship.

6. **Monitoring appropriation risk**: Julia's concern requires human judgment. If a pilot district begins using the toolkit as a justification for not addressing systemic issues, a human must intervene with the district.

7. **Six-month gate assessment**: The decision to proceed to Phase 2 requires human judgment informed by the metrics, teacher feedback, and the Council's deliberation. This is not an automated gate.

---

## Summary of Elder Concern Resolution

| Elder | Concern | How This Architecture Addresses It |
|-------|---------|-----------------------------------|
| **Dinah** | Proof of concept. Clear patterns. Don't over-engineer. | Single-server Django + SQLite. No microservices, no cloud, no AI. Four focused features. Proven technology stack. |
| **Ivy** | Clear ownership, milestones, coordination. | Django app structure gives clear module ownership. Co-design gates before building. Pilot readiness gate before launch. Six-month assessment gate. |
| **Tekla** | Data privacy from day one. | Privacy enforced by architecture: teacher data visible only to the teacher. District admins see aggregates only. No telemetry. Data export and real deletion. Authorization tests with 100% boundary coverage. |
| **Moira** | Design for measurement. | Opt-in metrics collector. Self-reported time savings. Aggregate usage statistics. Six-month gate with defined success criteria. |
| **Aida** | Must survive real schools. Keep it minimal. | SQLite. No Docker required. Works on a phone. No JavaScript required. Deploys on modest hardware. Manual deployment. If the pilot fails, we stop. |
| **Camila** | Human-centered. Accessible. Welcoming. | Co-design before building. WCAG 2.1 AA. Classless CSS that works on any device. English + Spanish. Anti-appropriation messaging in the UI. |
| **Julia** | No vendor lock-in. Strategic optionality. | Open source. No cloud dependencies. No proprietary tools. SQLite-to-PostgreSQL migration path built into Django ORM. Each district owns their instance and data. |

---

*This Architecture is ready for the Foreman to plan.*

*"The structure must serve the people who inhabit it. A building that impresses but does not shelter has failed its purpose."*
