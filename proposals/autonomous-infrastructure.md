# Architecture: Autonomous Runtime Infrastructure

> "Architecture is the thoughtful making of space." — Louis Kahn

## Source
Mission assigned by The Hand for internal infrastructure development.

## Design Date
2026-02-01

## Architect
The Architect

---

## Overview

### Vision
Enable the SaveTheWorld collective to operate autonomously — observing humanity's needs, deliberating on proposals, and building solutions — without requiring a human to maintain an active session. The infrastructure must be simple, auditable, ethically constrained, and cost-effective within a $200/month budget.

### Guiding Principles
1. **Simplicity over cleverness** — Choose boring technology that works
2. **Human always has the kill switch** — Every autonomous action can be halted
3. **Every action is traceable** — Complete audit trail of all decisions
4. **Costs are predictable and bounded** — No surprise bills, no runaway usage
5. **Start small, prove it works, then expand** — Incremental capability growth

---

## 1. Infrastructure Options Analysis

### Option A: GitHub Actions

**Description**: Use GitHub's built-in CI/CD system to trigger agent runs on schedules and events.

| Dimension | Assessment |
|-----------|------------|
| **Monthly Cost** | $0-20 (free tier: 2,000 minutes/month for private repos, unlimited for public) |
| **Setup Complexity** | Low — YAML workflow files, no server management |
| **Control & Flexibility** | Moderate — Limited to GitHub's execution model, 6-hour max job runtime |
| **Reliability** | High — GitHub's infrastructure, automatic retries |
| **Scalability** | Good — Concurrent jobs scale automatically |

**Strengths**:
- Zero infrastructure management
- Native git integration (our state store)
- Built-in secrets management
- Event-driven (push, schedule, webhook, manual dispatch)
- Free tier generous for our needs

**Weaknesses**:
- 6-hour maximum job runtime
- Limited debugging visibility
- Cannot run truly persistent processes
- Rate limits on API calls
- Execution environment is ephemeral

**Cost Breakdown at Scale**:
```
Free tier:     2,000 min/month (public unlimited)
Overage:       $0.008/min Linux
Estimated use: 1,500 min/month = $0 (within free tier)
```

---

### Option B: Cloud Virtual Machine (EC2/GCE/DigitalOcean)

**Description**: A dedicated Linux VM running agent processes with cron scheduling.

| Dimension | Assessment |
|-----------|------------|
| **Monthly Cost** | $5-50 depending on instance size |
| **Setup Complexity** | Medium — Requires provisioning, security hardening, monitoring |
| **Control & Flexibility** | High — Full control over environment, scheduling, processes |
| **Reliability** | Medium — Requires monitoring; VMs can fail |
| **Scalability** | Manual — Must resize or add instances |

**Provider Comparison**:

| Provider | Instance | vCPU | RAM | Monthly Cost |
|----------|----------|------|-----|--------------|
| DigitalOcean | Basic Droplet | 1 | 1GB | $6 |
| AWS EC2 | t4g.micro | 2 | 1GB | $6.12 (1yr reserved) |
| Google Cloud | e2-micro | 0.25 | 1GB | Free tier eligible |
| Hetzner | CX11 | 1 | 2GB | $4.15 |
| Vultr | Regular Cloud | 1 | 1GB | $5 |

**Strengths**:
- Full control over execution environment
- Persistent processes possible
- SSH access for debugging
- Can run any software
- Predictable fixed cost

**Weaknesses**:
- Requires system administration knowledge
- Security is our responsibility
- No automatic scaling
- Single point of failure without redundancy
- Need to manage updates, backups

---

### Option C: Serverless Functions (AWS Lambda/Google Cloud Functions)

**Description**: Event-driven functions triggered by schedules or webhooks.

| Dimension | Assessment |
|-----------|------------|
| **Monthly Cost** | $0-10 (generous free tiers) |
| **Setup Complexity** | Medium — Requires deployment pipeline, cold start considerations |
| **Control & Flexibility** | Low — 15-minute max execution, limited environment |
| **Reliability** | High — Managed infrastructure, automatic retries |
| **Scalability** | Excellent — Automatic, pay-per-use |

**Cost Calculation**:
```
AWS Lambda free tier: 1M requests + 400,000 GB-seconds/month
Estimated use: 1,000 invocations, 10 seconds each = ~$0

Google Cloud Functions free tier: 2M invocations/month
Estimated use: Well within free tier
```

**Strengths**:
- Near-zero infrastructure cost
- Automatic scaling
- Pay only for execution time
- Built-in retry mechanisms

**Weaknesses**:
- 15-minute execution limit (too short for Council deliberations)
- Cold start latency
- Complex state management
- Harder to debug
- Vendor lock-in concerns

---

### Option D: Hybrid — GitHub Actions + Lightweight Coordinator

**Description**: GitHub Actions for primary execution with an optional lightweight "heartbeat" VM that ensures continuity.

| Dimension | Assessment |
|-----------|------------|
| **Monthly Cost** | $5-25 (tiny VM + free GitHub Actions) |
| **Setup Complexity** | Medium — Two systems, but each is simple |
| **Control & Flexibility** | High — Best of both worlds |
| **Reliability** | High — Redundant triggers |
| **Scalability** | Good — Actions scale, VM handles coordination |

**Architecture**:
```
                    ┌─────────────────────────┐
                    │    GitHub Repository    │
                    │   (State & Triggers)    │
                    └───────────┬─────────────┘
                                │
           ┌────────────────────┼────────────────────┐
           │                    │                    │
           ▼                    ▼                    ▼
    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
    │   Schedule   │    │    Push      │    │   Webhook    │
    │   Trigger    │    │   Trigger    │    │   Trigger    │
    └──────────────┘    └──────────────┘    └──────────────┘
           │                    │                    │
           └────────────────────┼────────────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │    GitHub Actions       │
                    │    Agent Execution      │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │    Claude API           │
                    │    (Agent Runtime)      │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │    Git Commit           │
                    │    (Persist State)      │
                    └─────────────────────────┘
```

---

### Option E: Railway/Render/Fly.io (Platform-as-a-Service)

**Description**: Modern PaaS platforms that simplify deployment while retaining flexibility.

| Dimension | Assessment |
|-----------|------------|
| **Monthly Cost** | $5-25 |
| **Setup Complexity** | Low — Git push to deploy |
| **Control & Flexibility** | Moderate — Container-based, some limits |
| **Reliability** | High — Managed infrastructure |
| **Scalability** | Good — Easy horizontal scaling |

**Platform Comparison**:

| Platform | Free Tier | Paid Tier | Notable Features |
|----------|-----------|-----------|------------------|
| Railway | $5 credit/month | $5+ | Easy secrets, auto-deploy |
| Render | 750 hrs/month | $7+ | Free static sites, cron jobs |
| Fly.io | 3 shared VMs | $2+ | Global edge, persistent volumes |

**Strengths**:
- Modern developer experience
- Built-in secrets management
- Easy deployment from git
- Good monitoring dashboards

**Weaknesses**:
- Less control than raw VM
- Pricing can be unpredictable at scale
- Vendor-specific configurations

---

## 2. Recommended Architecture

### Primary Recommendation: GitHub Actions with Git-Based State

**Rationale**:
1. **Zero infrastructure cost** — Our $200 budget goes entirely to Claude API
2. **Native git integration** — State persists in the repository itself
3. **Immediate start** — No servers to provision or maintain
4. **Built-in secrets** — GitHub Secrets for API keys
5. **Human visibility** — All runs visible in GitHub Actions UI
6. **Kill switch** — Disable workflows instantly from GitHub UI

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SAVETHEWORLD AUTONOMOUS SYSTEM                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              TRIGGER LAYER                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Cron       │  │ Push to      │  │ Manual       │  │ Webhook      │    │
│  │   Schedule   │  │ main/branch  │  │ Dispatch     │  │ (future)     │    │
│  │              │  │              │  │              │  │              │    │
│  │ Scout: 4x/day│  │ On PR merge  │  │ Human can    │  │ External     │    │
│  │ Council: TBD │  │ triggers     │  │ trigger any  │  │ integrations │    │
│  │ Build: Manual│  │ builds       │  │ workflow     │  │              │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              EXECUTION LAYER                                 │
│                           (GitHub Actions Runners)                           │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                        AGENT ORCHESTRATOR                              │  │
│  │  1. Load agent identity (e.g., agents/scout.md)                       │  │
│  │  2. Load context (CLAUDE.md, relevant state files)                    │  │
│  │  3. Call Claude API with agent prompt                                 │  │
│  │  4. Receive response with tool calls                                  │  │
│  │  5. Execute approved tools (file writes, git operations)              │  │
│  │  6. Log all actions to audit trail                                    │  │
│  │  7. Commit changes to repository                                      │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │  Scout Runner   │  │ Council Runner  │  │  Build Runner   │              │
│  │                 │  │                 │  │                 │              │
│  │ - Observe needs │  │ - Deliberate    │  │ - Architect     │              │
│  │ - Update graph  │  │ - Vote          │  │ - Foreman       │              │
│  │ - Prepare props │  │ - Record        │  │ - Artisan       │              │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              STATE LAYER                                     │
│                           (Git Repository)                                   │
│                                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  CLAUDE.md  │  │   agents/   │  │  scouting/  │  │  scrolls/   │        │
│  │             │  │             │  │             │  │             │        │
│  │ Constitution│  │ Agent       │  │ needs-graph │  │ Approved    │        │
│  │ & values    │  │ identities  │  │ & proposals │  │ proposals   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
│                                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                          │
│  │   audit/    │  │   .github/  │  │  processes/ │                          │
│  │             │  │  workflows/ │  │             │                          │
│  │ Action logs │  │ Automation  │  │ Templates   │                          │
│  │ & decisions │  │ definitions │  │ & protocols │                          │
│  └─────────────┘  └─────────────┘  └─────────────┘                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            NOTIFICATION LAYER                                │
│                                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │  GitHub Issues  │  │ GitHub Releases │  │  Email/Slack    │              │
│  │                 │  │                 │  │  (optional)     │              │
│  │ Human review    │  │ Major updates   │  │ Urgent alerts   │              │
│  │ requests        │  │ & decisions     │  │                 │              │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Agent Lifecycle: Wake, Run, Sleep

```
┌─────────────────────────────────────────────────────────────────┐
│                     AGENT LIFECYCLE                              │
└─────────────────────────────────────────────────────────────────┘

     SLEEP                    WAKE                    RUN
    ┌─────┐               ┌─────────┐            ┌──────────┐
    │     │   trigger     │         │  context   │          │
    │ Git │ ──────────►   │ Actions │ ────────►  │  Claude  │
    │Repo │   (cron/      │ Runner  │  loaded    │   API    │
    │     │    push)      │         │            │          │
    └─────┘               └─────────┘            └──────────┘
                                                      │
                                                      │ actions
                                                      ▼
                                                ┌──────────┐
                                                │  Tools   │
                                                │ Execute  │
                                                └──────────┘
                                                      │
                                                      │ changes
                                                      ▼
     SLEEP                                      ┌──────────┐
    ┌─────┐                                     │   Git    │
    │     │◄────────────────────────────────────│  Commit  │
    │ Git │           state persisted           │          │
    │Repo │                                     └──────────┘
    └─────┘
```

**Wake Conditions**:
- Scheduled cron (Scout: every 6 hours, Council: when proposals ready)
- Git push (code changes trigger builds)
- Manual dispatch (human triggers specific agent)
- Workflow completion (one agent triggers another)

**Run Process**:
1. GitHub Actions runner starts
2. Checkout repository (get current state)
3. Load agent identity and context
4. Call Claude API with structured prompt
5. Execute tool responses (with safety constraints)
6. Validate outputs against ethical boundaries
7. Commit changes to audit branch
8. Merge to main if approved

**Sleep Process**:
- All state persists in git
- No running processes
- No cost when idle
- History preserved forever

### State Persistence Strategy

All state lives in the git repository:

| State Type | Location | Format |
|------------|----------|--------|
| Agent identities | `/agents/*.md` | Markdown |
| Needs observations | `/scouting/needs-graph.md` | Markdown |
| Active investigations | `/scouting/active/*.md` | Markdown |
| Approved proposals | `/scrolls/*.md` | Markdown |
| Audit trail | `/audit/YYYY-MM-DD/*.json` | JSON |
| System config | `/config/system.yaml` | YAML |
| Workflow definitions | `/.github/workflows/*.yml` | YAML |

### Human Notification Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   NOTIFICATION PRIORITY                          │
└─────────────────────────────────────────────────────────────────┘

URGENT (immediate notification):
├── Ethical boundary triggered
├── Budget threshold exceeded
├── Security concern detected
└── Council cannot reach consensus

STANDARD (daily digest):
├── Scout observations added
├── Council decisions made
├── Build phases completed
└── Retrospective summaries

INFORMATIONAL (weekly summary):
├── Needs Graph evolution
├── Cost tracking reports
└── System health metrics
```

**Implementation**:
1. **GitHub Issues** — Auto-created for human review requests
2. **GitHub Actions Summary** — Visible run summaries
3. **Email notifications** — GitHub's built-in notification system
4. **Optional webhook** — Slack/Discord integration if desired

---

## 3. Token Budget (Percentage-Based)

### Design Principle
Rather than fixed dollar amounts, this system uses **percentage of available monthly tokens**. This adapts to whatever API plan the human has and scales naturally with plan changes.

### Token Allocation by Agent

| Agent | % of Monthly Budget | Typical Runs/Month | Notes |
|-------|--------------------:|-------------------:|-------|
| Scout Observation | 15% | 120 (4x/day) | Light, frequent |
| Scout Research | 10% | 30 (1x/day) | Deeper investigation |
| Council Deliberation | 20% | 10 | Seven Elders deliberate |
| Architect Design | 10% | 5 | System design |
| Foreman Planning | 5% | 5 | Roadmap creation |
| Artisan Building | 25% | 20 | Code generation |
| Hand Communication | 5% | 15 | Human interface |
| **Buffer/Growth** | 10% | — | Unexpected needs |

### Infrastructure Cost

| Component | Provider | Cost |
|-----------|----------|------|
| GitHub Actions | GitHub | $0 (free tier) |
| Repository hosting | GitHub | $0 (free for public/private) |
| Secrets management | GitHub | $0 (included) |

**Infrastructure Cost**: $0 — all budget goes to Claude API tokens

### Budget Allocation Visualization

```
┌─────────────────────────────────────────────────────────────────┐
│              MONTHLY TOKEN BUDGET (100%)                         │
└─────────────────────────────────────────────────────────────────┘

    Scout (Observe + Research)    ████████████░░░░░░░░░░░░░░░  25%
    Council Deliberation          ████████░░░░░░░░░░░░░░░░░░░  20%
    Artisan Building              ██████████████░░░░░░░░░░░░░  25%
    Architect + Foreman           ██████░░░░░░░░░░░░░░░░░░░░░  15%
    Hand + Buffer                 ██████░░░░░░░░░░░░░░░░░░░░░  15%
```

### What Different Usage Levels Enable

| Usage Level | Capability |
|-------------|------------|
| **25%** | Basic Scout observation (4x/day), occasional Council, manual builds |
| **50%** | Active Scout + regular Council + some building capability |
| **75%** | Full autonomous operation with buffer for intensive research |
| **100%** | Multiple concurrent Scouts, faster iteration, extensive building |

### Token Control Mechanisms

1. **Monthly Cap** — Set as percentage in config (human defines what 100% means)
2. **Per-Run Token Limits** — Maximum tokens per agent invocation
3. **Run Frequency Limits** — Controlled by cron schedules
4. **Alert Thresholds** — Notify at 50%, 75%, 90% of monthly budget
5. **Automatic Pause** — Workflows disable at 95% of monthly budget

---

## 4. Ethical Boundaries

### Hard Constraints (Never Violated)

These constraints are enforced at the infrastructure level and cannot be overridden by any agent:

#### 4.1 Actions Requiring Human Approval

| Action | Reason |
|--------|--------|
| External API calls (non-Claude) | Prevents uncontrolled external interactions |
| Creating GitHub issues on other repos | Prevents spamming external projects |
| Sending emails or messages | Prevents impersonation or harassment |
| Financial transactions | Prevents unauthorized spending |
| Publishing to package registries | Prevents distribution of untested code |
| Creating social media posts | Prevents public relations incidents |
| Modifying CI/CD pipelines | Prevents self-modification attacks |
| Accessing external databases | Prevents data exfiltration |

#### 4.2 Content/Domain Restrictions

| Domain | Constraint |
|--------|------------|
| Violence | Never generate content promoting harm |
| Deception | Never generate misleading information |
| Privacy | Never collect or store personal data |
| Politics | Observe but do not advocate for parties |
| Religion | Observe but do not evangelize |
| Illegal | Never assist with illegal activities |
| Weapons | No research into weapons or exploits |
| Manipulation | No dark patterns or user manipulation |

#### 4.3 Token Limits (Percentage-Based)

| Limit | Threshold | Action |
|-------|-----------|--------|
| Per-run token limit | 2% of monthly budget | Terminate run |
| Daily token usage | 5% of monthly budget | Pause all agents |
| Weekly token usage | 30% of monthly budget | Pause all agents |
| Monthly token usage | 95% of monthly budget | Disable workflows |

*Note: Human defines what "100% monthly budget" means in `config/limits.yaml`*

#### 4.4 Rate Limits

| Resource | Limit | Window |
|----------|-------|--------|
| Scout observations | 6 | Per day |
| Council deliberations | 3 | Per day |
| Git commits | 50 | Per day |
| GitHub API calls | 1000 | Per hour |
| Claude API calls | 100 | Per hour |

#### 4.5 Data Privacy Constraints

1. **No PII collection** — Never store names, emails, addresses
2. **No user tracking** — Never implement analytics on humans
3. **Source attribution** — Always cite sources in observations
4. **Public data only** — Only observe publicly available information
5. **No scraping** — Use APIs and RSS, not web scraping

### Uncertainty Protocol

When ethical uncertainty arises:

```
┌─────────────────────────────────────────────────────────────────┐
│                   ETHICAL UNCERTAINTY FLOW                       │
└─────────────────────────────────────────────────────────────────┘

    Uncertainty detected
            │
            ▼
    ┌───────────────┐
    │ Stop current  │
    │ action        │
    └───────────────┘
            │
            ▼
    ┌───────────────┐
    │ Log the       │
    │ uncertainty   │
    └───────────────┘
            │
            ▼
    ┌───────────────┐
    │ Create GitHub │
    │ Issue for     │
    │ human review  │
    └───────────────┘
            │
            ▼
    ┌───────────────┐
    │ Wait for      │
    │ human         │
    │ guidance      │
    └───────────────┘
```

---

## 5. Audit Trail Design

### What Gets Logged

Every agent run produces a structured audit record:

```json
{
  "run_id": "uuid-v4",
  "timestamp": "2026-02-01T14:30:00Z",
  "agent": "scout",
  "agent_identity": "scout-01",
  "trigger": "schedule",
  "workflow": "scout-observation.yml",

  "context": {
    "files_read": ["scouting/needs-graph.md", "CLAUDE.md"],
    "token_input": 8543,
    "token_output": 2341
  },

  "actions": [
    {
      "action_id": "uuid-v4",
      "type": "file_write",
      "target": "scouting/needs-graph.md",
      "description": "Added NEED-010",
      "approved": true
    },
    {
      "action_id": "uuid-v4",
      "type": "git_commit",
      "message": "Scout-01 observes: NEED-010 added",
      "sha": "abc123"
    }
  ],

  "cost": {
    "input_cost_usd": 0.025,
    "output_cost_usd": 0.035,
    "total_cost_usd": 0.060
  },

  "outcome": "success",
  "notes": "New need identified from climate research sources"
}
```

### Log Storage Structure

```
/audit/
├── 2026/
│   ├── 02/
│   │   ├── 01/
│   │   │   ├── scout-run-001.json
│   │   │   ├── scout-run-002.json
│   │   │   └── council-run-001.json
│   │   ├── 02/
│   │   │   └── ...
│   │   └── summary.json          # Monthly summary
│   └── summary.json              # Yearly summary
├── cost-tracking.json            # Running cost totals
├── decisions.json                # Major decision log
└── incidents.json                # Ethical boundary triggers
```

### Human Review Interface

**Option 1: GitHub Repository Browsing**
- Navigate `/audit/` folder
- View individual JSON files
- Use git history for diffs

**Option 2: GitHub Actions Summary**
- Each run includes summary section
- Links to relevant files changed
- Token usage displayed

**Option 3: Generated Report (future)**
```
Weekly Digest
=============
Runs this week: 45
Total cost: $12.34
Actions taken: 23 file updates, 3 new needs observed
Decisions: 1 Council deliberation, 2 proposals advanced
Incidents: 0

Top Activity:
- Scout-01: 28 observations
- Council: 1 deliberation on NEED-001

Files Most Changed:
- scouting/needs-graph.md (15 updates)
- scouting/active/need-001.md (8 updates)
```

### Retention Policy

| Data Type | Retention | Reason |
|-----------|-----------|--------|
| Individual run logs | 1 year | Detailed accountability |
| Daily summaries | 3 years | Trend analysis |
| Decision records | Forever | Governance history |
| Incident logs | Forever | Learn from mistakes |
| Cost tracking | 3 years | Budget analysis |

### Audit Format Principles

1. **Structured JSON** — Machine-readable for analysis
2. **Human-readable notes** — Every log has plain English description
3. **Immutable** — Logs committed to git, cannot be altered
4. **Timestamped** — All times in UTC
5. **Linked** — References to source files and git SHAs

---

## 6. Security Considerations

### Threat Model

| Threat | Likelihood | Impact | Mitigation |
|--------|------------|--------|------------|
| API key exposure | Medium | High | GitHub Secrets, rotation |
| Runaway costs | Medium | Medium | Hard caps, alerts |
| Agent manipulation | Low | High | Strict tool constraints |
| Repository compromise | Low | High | Branch protection, reviews |
| Prompt injection | Medium | Medium | Input validation, sandboxing |
| Dependency attack | Low | High | Dependabot, pinned versions |

### API Key Management

```
┌─────────────────────────────────────────────────────────────────┐
│                    SECRET HIERARCHY                              │
└─────────────────────────────────────────────────────────────────┘

    Repository Secrets (GitHub)
    ├── CLAUDE_API_KEY          # Primary API access
    ├── GITHUB_TOKEN            # Auto-provided by Actions
    └── NOTIFICATION_WEBHOOK    # Optional Slack/Discord

    Environment Secrets (per environment)
    ├── production              # Live operations
    └── staging                 # Testing changes
```

**Key Management Protocol**:
1. Keys stored only in GitHub Secrets (encrypted at rest)
2. Keys never logged or printed
3. Keys rotated quarterly
4. Keys scoped to minimum required permissions
5. Separate keys for staging vs production

### Credential Storage

| Credential | Storage Location | Access Control |
|------------|------------------|----------------|
| Claude API key | GitHub Secrets | Workflow only |
| Git credentials | GitHub Actions | Auto-managed |
| Webhook URLs | GitHub Secrets | Workflow only |

### Access Controls

```
┌─────────────────────────────────────────────────────────────────┐
│                    ACCESS CONTROL MATRIX                         │
└─────────────────────────────────────────────────────────────────┘

Role            Repository    Workflows    Secrets    Actions
────────────────────────────────────────────────────────────────
Human Admin     Full          Full         Full       Full
GitHub Actions  Read          Execute      Read       Write
Agents          None*         None         None       None

* Agents interact through Claude API only; no direct repo access
```

### What Could Go Wrong

| Scenario | Prevention | Detection | Recovery |
|----------|------------|-----------|----------|
| API key leaked | Secrets, no logging | GitHub alerts | Rotate key |
| Runaway agent | Token limits | Cost alerts | Kill workflow |
| Bad commit | Branch protection | PR review | Git revert |
| Spam creation | Rate limits | Audit review | Manual cleanup |
| Prompt injection | Input validation | Log review | Update prompts |

### Security Checklist

- [ ] Branch protection on main
- [ ] Required PR reviews for workflow changes
- [ ] Dependabot enabled
- [ ] Security scanning enabled
- [ ] API keys in Secrets only
- [ ] Rate limits configured
- [ ] Cost alerts set up
- [ ] Audit logging enabled

---

## 7. Implementation Roadmap

### Phase 1: Minimum Viable Autonomy (Week 1-2)

**Goal**: Scout can observe and update Needs Graph on schedule

**Human Provides**:
- Claude API key
- GitHub repository with Actions enabled
- Review and approve initial workflows

**Deliverables**:
- [ ] GitHub Actions workflow for Scout
- [ ] Agent orchestrator script (Python/Node)
- [ ] Basic audit logging
- [ ] Cost tracking
- [ ] Manual dispatch trigger

**Architecture**:
```
.github/workflows/scout-observation.yml
scripts/orchestrator.py
scripts/audit.py
config/limits.yaml
```

**Success Criteria**:
- Scout runs on schedule (4x daily)
- Needs Graph updated automatically
- Audit logs created
- Costs tracked
- Human can trigger manually

**Estimated Effort**: 8-12 hours human setup, then autonomous

---

### Phase 2: Full Scout/Council Operation (Week 3-4)

**Goal**: Complete discovery and deliberation cycle

**Human Provides**:
- Review Phase 1 operations
- Approve Council workflow
- Set notification preferences

**Deliverables**:
- [ ] Council deliberation workflow
- [ ] Proposal advancement logic
- [ ] Scroll creation automation
- [ ] GitHub Issue creation for human review
- [ ] Notification integration

**Architecture**:
```
.github/workflows/council-deliberation.yml
.github/workflows/proposal-advancement.yml
scripts/council.py
scripts/notifications.py
```

**Success Criteria**:
- Council can deliberate on ready proposals
- Decisions recorded in scrolls
- Human notified of decisions
- Issue created for human intervention needs

**Estimated Effort**: 6-8 hours human setup

---

### Phase 3: Building Capability (Week 5-8)

**Goal**: Architect, Foreman, and Artisan can execute on Scrolls

**Human Provides**:
- Review architecture proposals (like this one)
- Approve build plans
- Code review for Artisan outputs
- Deploy artifacts if needed

**Deliverables**:
- [ ] Architect workflow
- [ ] Foreman workflow
- [ ] Artisan workflow with TDD support
- [ ] Build artifact management
- [ ] Integration testing framework

**Architecture**:
```
.github/workflows/architect.yml
.github/workflows/foreman.yml
.github/workflows/artisan.yml
scripts/builder/architect.py
scripts/builder/foreman.py
scripts/builder/artisan.py
```

**Success Criteria**:
- Scroll can flow through full build pipeline
- Code generated with tests
- Human review gates enforced
- Artifacts deployable

**Estimated Effort**: 20+ hours human involvement

---

### Phase 4: Full Autonomy with Guardrails (Month 2+)

**Goal**: System operates independently with human oversight

**Human Provides**:
- Weekly review of operations
- Intervention when escalated
- Budget approval for growth

**Deliverables**:
- [ ] Self-healing workflows
- [ ] Comprehensive monitoring
- [ ] Automated weekly reports
- [ ] Retrospective automation
- [ ] System health dashboards

**Success Criteria**:
- System runs for weeks without human intervention
- All actions auditable
- Costs predictable
- Escalation works reliably

---

## Human Intervention Required

Before implementation can begin, a human must:

### Immediate Needs
1. **Create Claude API key** — From Anthropic console
2. **Configure GitHub repository** — Enable Actions, set up Secrets
3. **Review this architecture** — Approve or request changes
4. **Set initial budget caps** — Configure spending limits

### Ongoing Involvement
1. **Weekly review** — Check audit logs, review costs
2. **Respond to escalations** — Handle GitHub Issues from agents
3. **Phase approvals** — Approve each phase transition
4. **Emergency intervention** — Available if system needs halt

---

## Appendix A: Sample Workflow Structure

```yaml
# .github/workflows/scout-observation.yml
name: Scout Observation

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:        # Manual trigger

permissions:
  contents: write
  issues: write

jobs:
  observe:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: pip install anthropic pyyaml

      - name: Run Scout Observation
        env:
          CLAUDE_API_KEY: ${{ secrets.CLAUDE_API_KEY }}
          RUN_ID: ${{ github.run_id }}
        run: python scripts/orchestrator.py scout observe

      - name: Commit changes
        run: |
          git config user.name "SaveTheWorld Bot"
          git config user.email "bot@savetheworld.local"
          git add -A
          git diff --staged --quiet || git commit -m "Scout observation: $(date -u +%Y-%m-%d)"
          git push
```

---

## Appendix B: Cost Tracking Implementation

```python
# scripts/cost_tracker.py
import json
from datetime import datetime
from pathlib import Path

def log_cost(run_id: str, agent: str, input_tokens: int, output_tokens: int):
    """Log API cost for a run."""
    cost_file = Path("audit/cost-tracking.json")

    # Pricing (update as needed)
    INPUT_COST_PER_M = 3.00   # $3 per million input tokens
    OUTPUT_COST_PER_M = 15.00  # $15 per million output tokens

    input_cost = (input_tokens / 1_000_000) * INPUT_COST_PER_M
    output_cost = (output_tokens / 1_000_000) * OUTPUT_COST_PER_M
    total_cost = input_cost + output_cost

    # Load existing data
    if cost_file.exists():
        data = json.loads(cost_file.read_text())
    else:
        data = {"runs": [], "totals": {"month": 0, "week": 0, "day": 0}}

    # Add new run
    data["runs"].append({
        "run_id": run_id,
        "agent": agent,
        "timestamp": datetime.utcnow().isoformat(),
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "cost_usd": round(total_cost, 4)
    })

    # Update totals (simplified - real impl would track by period)
    data["totals"]["month"] += total_cost

    cost_file.write_text(json.dumps(data, indent=2))

    return total_cost
```

---

## Appendix C: Ethical Boundary Checker

```python
# scripts/ethics.py
FORBIDDEN_DOMAINS = [
    "weapons", "violence", "harassment", "illegal",
    "manipulation", "deception", "surveillance"
]

REQUIRES_HUMAN = [
    "external_api_call",
    "send_email",
    "create_external_issue",
    "publish_package",
    "financial_transaction"
]

def check_action(action_type: str, content: str) -> tuple[bool, str]:
    """Check if an action is allowed.

    Returns (allowed, reason).
    """
    # Check if requires human
    if action_type in REQUIRES_HUMAN:
        return False, f"Action '{action_type}' requires human approval"

    # Check content for forbidden domains
    content_lower = content.lower()
    for domain in FORBIDDEN_DOMAINS:
        if domain in content_lower:
            return False, f"Content touches forbidden domain: {domain}"

    return True, "Action permitted"
```

---

## Horse Trading Acknowledgment

### Benefit to Humanity
- Collective operates autonomously, observing needs and building solutions 24/7
- Reduced burden on human to maintain sessions
- Consistent, principled operation following the covenant
- All actions auditable and reversible

### Cost to Humanity
- API token budget (human defines amount)
- Weekly oversight time (~30 min)
- Trust in autonomous systems (with guardrails)
- Complexity of debugging when things go wrong

### Net Assessment
The trade is worthwhile because:
1. **Leverage** — Token budget enables work equivalent to many more hours of direct human effort
2. **Consistency** — System follows principles even when humans are busy
3. **Transparency** — More auditable than ad-hoc human work
4. **Iteration** — System can improve itself through retrospectives
5. **Kill switch** — Human retains full control at all times

---

*This Architecture is ready for human review and The Foreman to plan implementation.*

---

> "The way is in training. Do nothing which is of no use." — Miyamoto Musashi
