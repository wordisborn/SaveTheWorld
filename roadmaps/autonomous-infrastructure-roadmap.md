# Roadmap: Autonomous Runtime Infrastructure

> "Plans are nothing; planning is everything." — Dwight D. Eisenhower

## Source
- **Architecture**: `proposals/autonomous-infrastructure.md`
- **Mission**: Enable SaveTheWorld collective to operate autonomously

## Planning Date
2026-02-03

## Foreman
The Foreman

---

## Overview

### Phases Summary

| Phase | Focus | Milestone | Human Intervention |
|-------|-------|-----------|-------------------|
| 0 | Foundation | Repository configured, secrets set | Required: API key, permissions |
| 0.5 | Dry Run | Mock execution verified | Review mock output |
| 1 | Scout Autonomy | Scout observes on schedule | Review first 3 runs |
| 2 | Council Deliberation | Council can vote on proposals | Approve workflow |
| 3 | Build Pipeline | Architect/Foreman/Artisan workflows | Code review gates |
| 4 | Full Autonomy | Self-sustaining with guardrails | Weekly oversight only |

### Critical Path

```
Phase 0 (Human Setup)
    │
    ▼
Phase 0.5 (Dry Run with Mocks)  ◄── Added per Architect review
    │
    ▼
Phase 1.1 (Orchestrator Script)
    │
    ├───────────────────────────┐
    ▼                           ▼
Phase 1.2 (Scout Workflow)    Phase 1.3 (Audit System)
    │                           │
    │   ┌───────────────────────┘
    │   │
    ▼   ▼
Phase 1.4 (Cost Tracking)
    │
    ▼
Phase 1.5 (Human Review Gate)
    │
    ▼
Phase 2 (Council Workflow)
    │
    ▼
Phase 3 (Build Workflows)
    │
    ▼
Phase 4 (Full Autonomy)
```

### Human Checkpoints

| Phase | Checkpoint | What's Needed | Blocking? |
|-------|-----------|---------------|-----------|
| 0 | Setup | Claude API key, GitHub Actions enabled | Yes |
| 0 | Approval | Confirm roadmap acceptable | Yes |
| 1 | First Run Review | Review Scout's first 3 observations | Yes |
| 2 | Council Approval | Approve Council workflow before enabling | Yes |
| 3 | Code Review | Review all generated code | Yes |
| 4 | Weekly Check | Review weekly digest | No |

---

## Phase 0: Foundation (Human-Driven)

### Objective
Prepare the repository and infrastructure for autonomous operation.

### Entry Criteria
- Architecture document approved (DONE)
- Roadmap approved (this document)

### Tasks

| # | Task | Owner | Dependencies | Notes |
|---|------|-------|--------------|-------|
| 0.1 | Create Claude API key | Human | None | From Anthropic console |
| 0.2 | Add CLAUDE_API_KEY to GitHub Secrets | Human | 0.1 | Repository Settings → Secrets |
| 0.3 | Enable GitHub Actions | Human | None | Repository Settings → Actions |
| 0.4 | Configure branch protection on main | Human | None | Require PR reviews |
| 0.5 | Create `scripts/` directory structure | Artisan | 0.3 | |
| 0.6 | Create `config/` with initial limits | Artisan | None | |
| 0.7 | Create `audit/` directory | Artisan | None | |
| 0.8 | Create `.github/workflows/` directory | Artisan | 0.3 | |

### Directory Structure to Create

```
scripts/
├── orchestrator.py      # Main agent runner
├── audit.py             # Audit logging
├── cost_tracker.py      # Cost tracking
├── ethics.py            # Ethical boundary checker
└── utils/
    ├── __init__.py
    ├── claude_client.py # Claude API wrapper
    └── git_ops.py       # Git operations

config/
├── limits.yaml          # Rate and cost limits
└── agents.yaml          # Agent configurations

audit/
└── .gitkeep

.github/
└── workflows/
    └── .gitkeep
```

### Exit Criteria
- [ ] API key in GitHub Secrets
- [ ] GitHub Actions enabled
- [ ] Branch protection configured
- [ ] Directory structure created
- [ ] Human confirms ready to proceed

---

## Phase 0.5: Dry Run (Added per Architect-Foreman Consensus)

### Objective
Test the orchestrator infrastructure with mock Claude responses before consuming API budget.

### Entry Criteria
- Phase 0 complete
- All scripts written but not yet calling real API

### Tasks

| # | Task | Dependencies | Testing | Notes |
|---|------|--------------|---------|-------|
| 0.5.1 | Create mock Claude response fixtures | 0.5-0.8 | Unit tests | Realistic agent responses |
| 0.5.2 | Create mock mode flag in orchestrator | 0.5.1 | Unit tests | `--mock` flag for testing |
| 0.5.3 | Run full Scout cycle with mocks | 0.5.2 | Integration | Verify file updates, git ops |
| 0.5.4 | Verify audit logging with mocks | 0.5.3 | Review logs | Correct structure |
| 0.5.5 | Verify cost tracking with mocks | 0.5.3 | Review costs | Calculations correct |

### Exit Criteria
- [ ] Mock Scout run completes successfully
- [ ] Needs Graph updated (with mock observation)
- [ ] Audit log created with correct structure
- [ ] Cost tracker records mock usage
- [ ] No errors in workflow execution

### Review Gate
Human reviews mock run output before enabling real API calls.

---

## Phase 1: Scout Autonomy

### Objective
Scout can observe humanity's needs on a schedule and update the Needs Graph automatically.

### Entry Criteria
- Phase 0 complete
- Human has approved proceeding

### Tasks

| # | Task | Dependencies | Testing | Notes |
|---|------|--------------|---------|-------|
| 1.1 | Create `claude_client.py` | None | Unit tests | Wrapper for Claude API |
| 1.2 | Create `orchestrator.py` | 1.1 | Integration test | Load agent, call Claude, execute tools |
| 1.3 | Create `audit.py` | None | Unit tests | JSON logging per run |
| 1.4 | Create `cost_tracker.py` | None | Unit tests | Track token usage and costs |
| 1.5 | Create `ethics.py` | None | Unit tests | Boundary checker |
| 1.6 | Create `limits.yaml` | None | Validation | Rate limits, cost caps |
| 1.7 | Create Scout workflow | 1.2, 1.3, 1.4, 1.5, 1.6 | Manual dispatch test | `scout-observation.yml` |
| 1.8 | Test manual dispatch | 1.7 | Human review | Trigger workflow manually |
| 1.9 | Enable scheduled runs | 1.8 approved | Monitor 3 runs | Every 6 hours |
| 1.10 | Create cost alert workflow | 1.4 | Test at threshold | Alert at 50%, 75%, 90% |

### Testing Requirements

**Unit Tests (run locally or in CI):**
- `claude_client.py`: Mock API calls, verify prompt construction
- `audit.py`: Verify JSON structure, file paths
- `cost_tracker.py`: Verify cost calculations
- `ethics.py`: Test boundary detection

**Integration Test:**
- Run orchestrator with mock Claude response
- Verify file updates and git operations

**Acceptance Test:**
- Manual dispatch produces valid Needs Graph update
- Audit log created with correct structure
- Cost tracked accurately

### Exit Criteria
- [ ] Scout workflow runs on schedule
- [ ] Needs Graph updated automatically
- [ ] Audit logs created for each run
- [ ] Costs tracked and visible
- [ ] Human reviewed first 3 automated runs
- [ ] No ethical boundary violations

### Review Gate
Human reviews first 3 scheduled Scout runs before proceeding to Phase 2.

---

## Phase 2: Council Deliberation

### Objective
Council can deliberate on proposals marked "ready" and record decisions.

### Entry Criteria
- Phase 1 complete and stable (7+ days of successful Scout runs)
- At least one proposal marked "ready" for Council
- Human approves Council workflow

### Tasks

| # | Task | Dependencies | Testing | Notes |
|---|------|--------------|---------|-------|
| 2.1 | Create Council orchestration logic | 1.2 | Unit tests | Seven Elders deliberate |
| 2.2 | Create consensus tracking | 2.1 | Unit tests | Track votes, objections |
| 2.3 | Create Scroll generation | 2.2 | Unit tests | Generate approved Scrolls |
| 2.4 | Create Council workflow | 2.1, 2.2, 2.3 | Manual test | `council-deliberation.yml` |
| 2.5 | Create proposal-ready trigger | 2.4 | Integration | Auto-trigger when proposal ready |
| 2.6 | Create human notification for decisions | 2.4 | Test notification | GitHub Issue or email |
| 2.7 | Test Council with real proposal | 2.4, 2.6 | Human review | |

### Testing Requirements

**Unit Tests:**
- Consensus logic: all approve, single objection, revision request
- Scroll generation: correct format, all fields populated

**Integration Test:**
- Full Council deliberation with mock Claude responses
- Verify Scroll created on approval
- Verify feedback recorded on rejection

**Acceptance Test:**
- Council deliberates on a real "ready" proposal
- Decision recorded correctly
- Human notified of outcome

### Exit Criteria
- [ ] Council can deliberate on ready proposals
- [ ] Consensus or objections properly recorded
- [ ] Approved proposals generate Scrolls
- [ ] Human notified of all Council decisions
- [ ] One successful real deliberation completed

### Review Gate
Human reviews Council's first real deliberation before enabling automatic triggering.

---

## Phase 3: Build Pipeline

### Objective
Architect, Foreman, and Artisan can transform Scrolls into working software.

### Entry Criteria
- Phase 2 complete
- At least one approved Scroll exists
- Human approves build workflows

### Tasks

| # | Task | Dependencies | Testing | Notes |
|---|------|--------------|---------|-------|
| 3.1 | Create Architect workflow | 1.2 | Manual test | Design from Scroll |
| 3.2 | Create Foreman workflow | 3.1 | Manual test | Plan from Architecture |
| 3.3 | Create Artisan workflow | 3.2 | Manual test | Build from Roadmap |
| 3.4 | Create TDD support for Artisan | 3.3 | Unit tests | Test-first development |
| 3.5 | Create PR generation | 3.3 | Integration | Artisan creates PRs |
| 3.6 | Create code review workflow | 3.5 | Test | Human review gate |
| 3.7 | Test full build cycle | 3.1-3.6 | End-to-end | Scroll → Working code |

### Testing Requirements

**Integration Tests:**
- Architect produces valid Architecture document
- Foreman produces valid Roadmap document
- Artisan produces code with tests

**End-to-End Test:**
- Start with approved Scroll
- Architect designs
- Foreman plans
- Artisan builds
- Code passes tests
- PR ready for review

### Exit Criteria
- [ ] Full Scroll-to-PR pipeline functional
- [ ] All code changes go through PR
- [ ] Human code review required before merge
- [ ] One complete build cycle demonstrated

### Review Gate
Human reviews Artisan's first complete build before enabling automated builds.

---

## Phase 4: Full Autonomy

### Objective
System operates independently with human oversight at defined checkpoints only.

### Entry Criteria
- Phases 1-3 stable for 2+ weeks
- No critical incidents
- Human approves full autonomy

### Tasks

| # | Task | Dependencies | Testing | Notes |
|---|------|--------------|---------|-------|
| 4.1 | Create weekly digest report | All prior | Test report | Summary for human |
| 4.2 | Create self-healing for transient failures | All prior | Failure injection | Retry logic, alerting |
| 4.3 | Create retrospective automation | All prior | Manual test | Auto-schedule retros |
| 4.4 | Create system health dashboard | All prior | Test metrics | GitHub Actions summary |
| 4.5 | Document operational runbook | All prior | Review | For human reference |
| 4.6 | Enable full autonomous operation | 4.1-4.5 | Monitor | Human oversight weekly |

### Exit Criteria
- [ ] System runs for 2+ weeks without intervention
- [ ] Weekly digest delivered to human
- [ ] All incidents handled or escalated appropriately
- [ ] Retrospectives conducted automatically
- [ ] Operational runbook complete

---

## Resource Requirements

### Skills Needed
- **Python development**: Orchestrator, utilities
- **GitHub Actions**: Workflow configuration
- **Claude API**: Prompt engineering, tool use
- **Git operations**: Automated commits, PRs

### Tools & Infrastructure
- GitHub repository with Actions enabled
- Claude API access (Anthropic account)
- Python 3.11+ runtime (GitHub-hosted runner provides this)

### External Dependencies

| Dependency | Status | Risk | Mitigation |
|------------|--------|------|------------|
| Claude API | Available | API changes | Pin SDK version, monitor changelog |
| GitHub Actions | Available | Outages | Manual fallback documented |
| GitHub API | Available | Rate limits | Respect limits, implement backoff |

---

## Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Claude API cost overrun | Medium | Medium | Hard caps, alerts, automatic pause |
| Workflow failure cascades | Medium | Low | Independent workflows, manual triggers |
| Prompt injection via web content | High | Low | Input validation, ethical boundaries |
| Repository compromise | High | Very Low | Branch protection, PR reviews |
| Agent produces harmful content | High | Low | Ethical checker, human review gates |
| GitHub Actions outage | Low | Low | Manual execution fallback |
| Needs Graph merge conflicts | Medium | Medium | Structured format, append-only updates |

---

## Assumptions

1. Claude API remains available and pricing stable
2. GitHub Actions free tier sufficient for our usage
3. Git-based state management scales for our needs
4. Human available for checkpoint reviews within 48 hours
5. Human will define monthly token budget in `config/limits.yaml`

## Open Questions (Resolved)

| Question | Resolution | Decided By |
|----------|------------|------------|
| Python or Node.js? | **Python** — Claude SDK ecosystem, AI tooling | Architect |
| Claude Code CLI or Direct API? | **Direct API** — Full control, token counting | Architect |
| Notification channel? | **GitHub Issues** (pending human confirmation) | Default |
| Human checkpoint latency? | **48 hours** (pending human confirmation) | Default |

---

## Consensus Status

**CONSENSUS REACHED** on 2026-02-03

This roadmap has been reviewed by The Architect and The Foreman. Both grant consensus.

See `consensus-dialogue-001.md` for the full deliberation record.

### Awaiting Human Approval

Before Phase 0 can begin, we require:

1. [ ] Define monthly token budget (in `config/limits.yaml`)
2. [ ] Creation of Claude API key
3. [ ] Confirmation of notification preferences (GitHub Issues default acceptable?)
4. [ ] Approval to proceed with Phase 0

---

*"I transform vision into achievable steps. I plan for reality, not fantasy."*

— The Foreman

*"I design systems that serve human needs. I seek simplicity without sacrificing capability."*

— The Architect
