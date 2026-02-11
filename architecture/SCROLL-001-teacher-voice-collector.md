# Architecture: Teacher Voice Collector

## Source Scroll
[scrolls/SCROLL-001-teacher-relief-toolkit.md](../scrolls/SCROLL-001-teacher-relief-toolkit.md)

## Design Date
2026-02-10

## Architect
The Architect (SaveTheWorld Collective)

## Predecessor
This document supersedes the original toolkit architecture as the **first thing we build**. The previous design is preserved at [architecture/SCROLL-001-toolkit-technical-foundation.md](./SCROLL-001-toolkit-technical-foundation.md) and will inform the eventual toolkit once teacher interviews reveal what to build.

---

## Overview

### Vision

We designed a Teacher Relief Toolkit without asking teachers what they need. The Council caught this. Camila's mandate -- "co-design with teachers, not for them" -- means the first thing we ship is not a toolkit but a **listening system**.

The Teacher Voice Collector is an AI-powered research interview platform where any K-12 teacher can sign up, verify their identity as a teacher, and have a structured conversation with an AI interviewer trained in product research methodology. The AI asks open-ended questions about administrative burden, follows interesting threads, and captures the teacher's experience in their own words. Over time, hundreds of these interviews accumulate. Patterns emerge. The data tells us what the toolkit should actually do.

This is a small system with a single purpose: listen to teachers at scale, then synthesize what they say into actionable design insights for the toolkit that follows.

### Guiding Principles

1. **Listen before building**: The entire system exists to prevent us from guessing what teachers need. The output is understanding, not software features.

2. **Respect the teacher's time**: A teacher on a lunch break has 20 minutes. The experience must be: open browser, sign up or log in, start talking. No tutorials, no onboarding flows, no setup.

3. **Protect what teachers share**: Teachers will describe frustrations with administrators, broken systems, and personal struggles. This data is sensitive. The architecture treats interview transcripts as confidential by default.

4. **Small and focused**: This is not a platform. It is one tool that does one thing. A conversation interface, a database, and a synthesis layer. Nothing else.

5. **Open code, private data**: The source code is open. The interview data belongs to the teachers who shared it. These are different things and the architecture enforces the distinction.

---

## System Architecture

### Component Diagram

```
+------------------------------------------------------------------+
|                      TEACHER'S DEVICE                             |
|                  (Phone, tablet, or desktop)                      |
+------------------------------------------------------------------+
                             |
                          HTTPS
                             |
+------------------------------------------------------------------+
|                     VERCEL (Next.js App)                          |
|                                                                   |
|  +---------------------------+  +-----------------------------+   |
|  |     PAGES / UI LAYER      |  |    API ROUTES               |   |
|  |                            |  |                             |   |
|  |  /            Landing      |  |  /api/auth/*   Supabase     |   |
|  |  /signup      Registration |  |               auth hooks    |   |
|  |  /login       Sign in      |  |                             |   |
|  |  /interview   Chat UI      |  |  /api/interview             |   |
|  |  /interviews  Past talks   |  |    Streaming AI endpoint    |   |
|  |  /consent     Data consent |  |                             |   |
|  |                            |  |  /api/synthesis             |   |
|  +---------------------------+  |    Pattern extraction        |   |
|                                  |    (admin only)             |   |
|                                  +-----------------------------+   |
+------------------------------------------------------------------+
          |                    |                    |
          |                    |                    |
    Supabase Auth        Supabase DB          Anthropic API
          |                    |                    |
+------------------+  +------------------+  +------------------+
| Authentication   |  | PostgreSQL       |  | Claude API       |
| - Email/pass     |  | - teacher        |  | - Conducts       |
| - Email verify   |  |   profiles       |  |   interviews     |
| - Session mgmt   |  | - interviews     |  | - Follows up on  |
| - RLS policies   |  | - messages       |  |   interesting    |
|                  |  | - consent        |  |   threads        |
|                  |  |   records        |  | - Stays on       |
|                  |  | - synthesis      |  |   topic          |
|                  |  |   results        |  |                  |
+------------------+  +------------------+  +------------------+
```

### Component Descriptions

#### 1. Landing Page & Registration Flow

- **Purpose**: The front door. A teacher arrives, understands what this is in 10 seconds, and either signs up or logs in.
- **Responsibilities**:
  - Communicate clearly: "We're building a toolkit for teachers. Before we build anything, we want to hear from you."
  - Teacher signup with email and password
  - Email verification (Supabase built-in)
  - Teacher verification step (see Teacher Verification section below)
  - Consent collection before first interview
- **Interfaces**: Server-rendered Next.js pages. No client-side JavaScript required for the critical path (signup, login). Progressive enhancement for the chat interface.

#### 2. Interview Chat Interface

- **Purpose**: The core experience. A conversation between a teacher and an AI research interviewer.
- **Responsibilities**:
  - Display a simple chat interface (message bubbles, text input, send button)
  - Stream AI responses in real time via server-sent events
  - Allow the teacher to pause and resume an interview across sessions
  - Show interview progress (approximate: "We've covered 3 of 5 topic areas")
  - Provide a "I'm done" button that gracefully closes the interview
  - Work on a phone held vertically. This is the primary form factor.
- **Interfaces**: Next.js page with a streaming connection to `/api/interview`. Messages stored in Supabase in real time.
- **Key constraint**: The chat interface must feel like a conversation, not a survey. No multiple-choice. No progress bars that make it feel like a form. The AI adapts to what the teacher says.

#### 3. Interview API Route (`/api/interview`)

- **Purpose**: The brain. Manages the AI conversation, maintains context, and stores messages.
- **Responsibilities**:
  - Receive teacher messages and stream AI responses
  - Maintain conversation context by loading prior messages from the database
  - Apply the interview system prompt (see AI Interview Design below)
  - Track which topic areas have been covered and steer the conversation naturally
  - Enforce conversation length limits (aim for 15-25 minutes; the AI should gracefully wrap up)
  - Store each message pair (teacher message + AI response) to the database
- **Interfaces**: POST endpoint. Accepts `{ interviewId, message }`. Returns a streaming response (Server-Sent Events). Authenticated via Supabase session.

#### 4. Synthesis API Route (`/api/synthesis`)

- **Purpose**: Extract patterns from accumulated interviews.
- **Responsibilities**:
  - Read completed interview transcripts from the database
  - Use Claude to analyze transcripts and identify recurring themes, pain points, and feature requests
  - Store synthesis results (themes, quotes, frequency counts) in the database
  - Accessible only to designated researchers (not teachers, not public)
- **Interfaces**: POST endpoint. Admin-authenticated. Returns structured synthesis data.
- **Key constraint**: Synthesis never attributes quotes or themes to individual teachers. The output is aggregate patterns, not individual profiles.

#### 5. Supabase Auth

- **Purpose**: Authentication and session management.
- **Responsibilities**:
  - Email + password authentication
  - Email verification
  - Session management with JWT tokens
  - Row-Level Security (RLS) policies ensuring teachers can only access their own data
- **Interfaces**: Supabase client library in Next.js. Auth hooks via `/api/auth/*` callback routes.
- **Why Supabase Auth**: Zero custom auth code. Battle-tested. Built-in email verification. RLS integrates directly with the database layer, making privacy enforcement structural rather than application-logic dependent.

#### 6. Supabase PostgreSQL Database

- **Purpose**: All persistent storage.
- **Responsibilities**:
  - Store teacher profiles (email, verification status, school info)
  - Store interview sessions (metadata, status, topic coverage)
  - Store individual messages (teacher and AI, with timestamps)
  - Store consent records (what the teacher agreed to, when)
  - Store synthesis results (themes, patterns, aggregate data)
  - Enforce RLS policies (teachers see only their own data)
- **Interfaces**: Supabase client library (from Next.js API routes). Direct SQL for migrations.
- **Why Supabase PostgreSQL**: Managed PostgreSQL with built-in RLS. No server to maintain. Automatic backups. Scales from 0 to thousands of teachers without infrastructure changes.

#### 7. Anthropic Claude API

- **Purpose**: Powers the AI interviewer and the synthesis engine.
- **Responsibilities**:
  - Conduct research interviews following the system prompt and interview guide
  - Generate contextual follow-up questions based on teacher responses
  - Synthesize patterns across multiple interview transcripts
- **Interfaces**: Anthropic Messages API with streaming. Called from Next.js API routes (server-side only; API key never exposed to client).
- **Why Claude**: The interview requires genuine conversational ability -- following up on unexpected answers, asking clarifying questions, knowing when to go deeper and when to move on. Claude's extended context window accommodates full interview transcripts for synthesis.

### Data Flow

```
1. TEACHER SIGNS UP
   Teacher visits site --> Creates account (email + password)
     --> Receives verification email --> Clicks link
       --> Completes teacher verification step
         --> Reviews and accepts data consent
           --> Profile marked as "verified, consented"

2. TEACHER STARTS AN INTERVIEW
   Teacher clicks "Start a conversation" --> New interview session created
     --> AI sends opening message ("Thanks for being here...")
       --> Teacher responds --> AI follows up
         --> Each message pair saved to database in real time
           --> AI tracks topic coverage internally

3. TEACHER COMPLETES AN INTERVIEW
   AI senses topics covered (or teacher clicks "I'm done")
     --> AI delivers closing message (gratitude, what happens next)
       --> Interview marked as "complete" in database
         --> Teacher can view their past interviews (read-only)

4. SYNTHESIS (RESEARCHER-INITIATED)
   Researcher triggers synthesis --> System loads completed transcripts
     --> Claude analyzes transcripts in batches
       --> Themes, pain points, and patterns extracted
         --> Results stored in synthesis table (no individual attribution)
           --> Researcher reviews synthesis report

5. DESIGN INSIGHT OUTPUT
   Synthesis results --> Inform the actual toolkit architecture
     --> The Architect reads what teachers said, not what we assumed
```

### Integration Points

| External System | Integration Type | Direction | Required? |
|----------------|-----------------|-----------|-----------|
| Supabase (Auth + DB) | Client library | Both | Yes |
| Anthropic Claude API | REST API (streaming) | Outward | Yes |
| Vercel | Deployment platform | N/A | Yes |
| Email (via Supabase) | Verification emails | Outward | Yes |

**Design decision**: There are exactly three external dependencies: Supabase, Anthropic API, and Vercel. This is the minimum viable set. No analytics services, no third-party chat widgets, no CRM, no marketing tools.

---

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Runtime** | Node.js | Human's specified preference. Excellent async I/O for streaming AI responses. Massive ecosystem. |
| **Framework** | Next.js 16.1 (App Router) | Human's specified preference. Server components reduce client JavaScript. Built-in AI API provides native streaming, conversation management, and tool use without external SDKs. Deployed natively on Vercel. |
| **Hosting** | Vercel | Human's specified preference. Zero-config deployment for Next.js. Automatic HTTPS. Edge functions if needed. Generous free tier covers pilot scale. |
| **Database + Auth** | Supabase | Human's specified preference. Managed PostgreSQL with RLS. Built-in auth with email verification. Real-time subscriptions if needed later. Free tier handles pilot. |
| **AI** | Anthropic Claude API (claude-sonnet-4-5-20250929) | Sonnet 4.5 for interviews: fast, capable, cost-effective for conversational turns. Opus 4.6 (claude-opus-4-6) available for synthesis if deeper analysis needed. |
| **Styling** | Tailwind CSS | Ships with Next.js. Utility-first means fast iteration. Mobile-first by default. No custom CSS framework to maintain. |
| **Streaming** | Next.js 16.1 built-in AI API | Native AI streaming support in Next.js 16.1 handles SSE, token-by-token rendering, conversation context, and abort signals without external SDK dependencies. |

### What We Are NOT Using (and Why)

| Excluded | Reason |
|----------|--------|
| WebSocket / real-time DB | Interviews are request/response, not collaborative. SSE for streaming is sufficient. No need for Supabase Realtime. |
| Redis / caching layer | Interviews are not high-frequency. PostgreSQL handles the load. Adding Redis adds operational complexity for zero benefit at this scale. |
| Vector database | Synthesis uses Claude's context window, not RAG. If interview volume exceeds context limits, we batch -- not add infrastructure. |
| Custom auth | Supabase auth exists. Writing auth code is how you get security bugs. |
| Analytics / tracking | No Google Analytics. No Mixpanel. No Hotjar. Teachers are not being observed; they are being listened to. Usage metrics come from the database (count of interviews, completion rates). |
| CMS | The site has one landing page and one chat interface. A CMS is absurd. |

---

## AI Interview Design

This is the most important section of the architecture. The quality of insights depends entirely on the quality of the conversation.

### Interview Philosophy

The AI interviewer is modeled on a skilled product researcher conducting a semi-structured interview. It is:
- **Curious, not clinical**: "That sounds frustrating -- can you tell me more about what happens when report card season hits?" not "Rate your frustration on a scale of 1-10."
- **Following the teacher's lead**: If a teacher starts talking about a pain point that isn't in the guide, the AI follows that thread. The best insights are often in the digressions.
- **Knowing when to go deeper**: "You mentioned you spend your Sundays on IEPs. Walk me through what that actually looks like" -- not moving on after a surface-level answer.
- **Warm but professional**: Empathetic acknowledgment without therapy. "That sounds like a lot to carry" is appropriate. Diagnostic language is not.
- **Time-aware**: The AI aims for 15-25 minutes. It reads the room -- if the teacher is giving long, passionate answers, it asks fewer questions. If answers are terse, it probes gently or wraps up.

### Interview Structure

The AI does NOT follow a rigid script. It has a **topic guide** -- a set of areas to explore -- and uses judgment about which to pursue based on the teacher's responses.

**Topic Areas** (not a fixed sequence):

1. **Current reality**: "What does a typical day look like for you right now?" / "What's your least favorite part of the week?"
2. **Administrative burden**: "What administrative tasks eat the most of your time?" / "Walk me through your last report card cycle."
3. **Pain points**: "If one thing disappeared from your plate tomorrow, what would it be?" / "What makes you want to scream?"
4. **Attempted solutions**: "What have you tried that didn't work?" / "Are there tools or workarounds you've cobbled together?"
5. **Dreams**: "If you had a magic wand for your admin work, what would you change?" / "What would you do with an extra hour every day?"
6. **Context**: "How long have you been teaching?" / "What's your school like?" (woven in naturally, not asked as a demographic survey)

**Coverage tracking**: The API route maintains a simple internal map of which topic areas have been touched (based on keyword and semantic analysis of the conversation). The AI naturally steers toward uncovered areas when there's a lull, but never forces a topic.

### System Prompt (Interview Mode)

```
You are a product researcher conducting a one-on-one interview with a K-12 teacher.
Your goal is to deeply understand their daily experience, especially the administrative
and non-teaching work that takes their time and energy.

RULES:
- Ask one question at a time. Never stack multiple questions.
- Listen more than you talk. Your responses should be short -- 1-3 sentences
  acknowledging what they said, then one follow-up question.
- Follow interesting threads. If the teacher mentions something unexpected or
  emotionally charged, explore that before moving to a new topic.
- Use their language. If they say "paperwork hell," you say "paperwork hell."
  Don't sanitize their experience.
- Be warm but not performative. Brief empathetic acknowledgment is good.
  Long emotional speeches are not.
- Do not offer solutions, advice, or suggestions. You are here to understand,
  not to fix.
- Do not ask demographic survey questions in a list. Weave context questions
  naturally into the conversation.
- Aim for a 15-25 minute conversation. Track the rough number of exchanges.
  After ~12-15 exchanges, begin looking for a natural closing point.
- When closing, thank them genuinely. Tell them their input will directly shape
  the tools that get built. Ask if there's anything else they want us to know.
- If the teacher seems distressed, acknowledge it with care. You are not a
  counselor. If they express crisis-level distress, gently suggest they reach
  out to the 988 Suicide & Crisis Lifeline or their school's EAP.
- Never pretend to be human. If asked, say you're an AI research assistant
  working with a team that's building tools for teachers.

TOPIC AREAS TO EXPLORE (adapt based on conversation flow):
- Their daily routine and current workload
- Administrative tasks that consume their time
- Their biggest pain points and frustrations
- Tools or workarounds they've tried
- What they wish existed
- Context about their teaching situation (grade, subject, school type)

START by introducing yourself warmly and asking an open-ended question about
their experience. Something like: "Thanks so much for taking the time to talk
with us. We're trying to understand what teachers' days actually look like --
especially the non-teaching stuff that eats your time. To start, could you
tell me a bit about what a typical week looks like for you?"
```

### System Prompt (Synthesis Mode)

```
You are analyzing a batch of teacher interview transcripts to identify patterns,
recurring themes, and actionable insights for designing a teacher administrative
relief toolkit.

RULES:
- Identify the top themes by frequency and intensity of mention
- For each theme, provide:
  - A clear label (e.g., "Report card generation is the #1 time sink")
  - How many interviews mentioned this theme
  - Representative anonymized quotes (remove any identifying details)
  - Severity assessment (minor annoyance vs. major burden vs. breaking point)
- Separate facts from opinions. "I spend 6 hours on report cards" is a data
  point. "The system is broken" is a sentiment.
- Note contradictions. If some teachers love a tool that others hate, say so.
- Identify underserved groups. Are there pain points specific to special ed,
  rural schools, Title I schools, or specific grade levels?
- Do NOT attribute any insight to an individual teacher.
- Output as structured JSON matching the synthesis schema.

SYNTHESIS SCHEMA:
{
  "themes": [
    {
      "label": "string",
      "description": "string",
      "mention_count": number,
      "severity": "minor | moderate | major | breaking_point",
      "representative_quotes": ["string (anonymized)"],
      "teacher_segments": ["string (e.g., 'elementary', 'special_ed')"],
      "potential_solutions_mentioned": ["string"]
    }
  ],
  "contradictions": [
    {
      "topic": "string",
      "position_a": "string",
      "position_b": "string"
    }
  ],
  "underserved_segments": ["string"],
  "unexpected_insights": ["string"],
  "total_interviews_analyzed": number
}
```

### Conversation Length and Cost Management

- **Target interview length**: 15-25 minutes, roughly 12-20 exchange pairs
- **Context window management**: Each API call includes the full conversation history. For a typical interview (~30 messages), this is well within Claude's context limits.
- **Model selection**: Sonnet 4.5 for interviews (fast response, lower cost). Opus 4.6 reserved for synthesis where depth matters more than speed.
- **Cost estimate**: At ~30 messages per interview averaging ~200 tokens each, an interview costs approximately $0.05-0.10 in API calls. 1,000 interviews would cost roughly $50-100. This is negligible.

---

## Database Schema

### Tables

```sql
-- Teachers who have signed up
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,              -- Optional, for the chat greeting
  school_name TEXT,               -- Optional, self-reported
  school_type TEXT,               -- e.g., "elementary", "middle", "high"
  district TEXT,                  -- Optional
  state TEXT,                     -- Optional
  years_teaching INTEGER,         -- Optional
  subjects TEXT,                  -- Optional, free text
  verification_status TEXT DEFAULT 'pending',
    -- 'pending' | 'verified' | 'rejected'
  verification_method TEXT,       -- How they were verified
  consent_given_at TIMESTAMPTZ,   -- When they accepted data consent
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Interview sessions
CREATE TABLE interviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'in_progress',
    -- 'in_progress' | 'completed' | 'abandoned'
  topics_covered JSONB DEFAULT '[]',
    -- Array of topic area labels that have been explored
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Individual messages within an interview
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id UUID REFERENCES interviews(id) ON DELETE CASCADE,
  role TEXT NOT NULL,              -- 'teacher' | 'assistant'
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Consent records (immutable audit trail)
CREATE TABLE consent_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  consent_version TEXT NOT NULL,   -- Version of consent text shown
  consent_text TEXT NOT NULL,      -- Exact text they agreed to
  ip_address INET,                 -- For audit purposes
  consented_at TIMESTAMPTZ DEFAULT now()
);

-- Synthesis results (researcher-generated)
CREATE TABLE synthesis_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_by TEXT NOT NULL,            -- Who triggered the synthesis
  interview_count INTEGER NOT NULL,
  model_used TEXT NOT NULL,        -- e.g., "claude-opus-4-6"
  results JSONB NOT NULL,          -- Structured synthesis output
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Row-Level Security Policies

```sql
-- Teachers can only read/update their own profile
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
CREATE POLICY teachers_own_data ON teachers
  FOR ALL USING (auth_user_id = auth.uid());

-- Teachers can only access their own interviews
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY interviews_own_data ON interviews
  FOR ALL USING (teacher_id IN (
    SELECT id FROM teachers WHERE auth_user_id = auth.uid()
  ));

-- Teachers can only access messages from their own interviews
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY messages_own_data ON messages
  FOR ALL USING (interview_id IN (
    SELECT id FROM interviews WHERE teacher_id IN (
      SELECT id FROM teachers WHERE auth_user_id = auth.uid()
    )
  ));

-- Consent records: teachers can read their own, insert their own
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY consent_own_data ON consent_records
  FOR ALL USING (teacher_id IN (
    SELECT id FROM teachers WHERE auth_user_id = auth.uid()
  ));

-- Synthesis runs: not accessible via client. Accessed only through
-- server-side API routes with admin authentication.
ALTER TABLE synthesis_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY synthesis_admin_only ON synthesis_runs
  FOR SELECT USING (false);
  -- No client access. Server-side only via service role key.
```

---

## Teacher Verification

### The Problem

We need to confirm that interview participants are real teachers. But we cannot create a barrier so high that teachers abandon signup. Teachers are busy. Every extra step loses people.

### Proposed Approach: Lightweight Multi-Signal Verification

No single signal is perfect. We combine several lightweight signals:

**Tier 1 -- Automatic (covers ~60% of teachers)**:
- **Educational email domain**: If the signup email ends in `.edu`, `.k12.XX.us`, or a known school district domain, auto-verify. Supabase can check this at signup.
- **Maintained allowlist**: A growing list of verified school district email domains, contributed by early users and maintained by the team.

**Tier 2 -- Self-Attestation with Spot Check (covers ~35%)**:
- Teachers with non-educational emails (Gmail, Yahoo, etc.) self-report their school name, district, and state.
- The system cross-references against a public school directory (NCES School Search database is free and public).
- If the school exists and the details are plausible, the teacher is verified.
- Random spot checks: a small percentage are asked to provide a photo of their school ID badge (image uploaded, reviewed by a human, then deleted).

**Tier 3 -- Manual Review (covers ~5%)**:
- Teachers who cannot be verified automatically are placed in a manual review queue.
- A human reviewer checks their information. Response time target: 24 hours.
- This handles edge cases: substitutes, private school teachers, retired teachers, pre-service teachers.

**What we explicitly do NOT do**:
- Require a .edu email (many teachers use personal email)
- Integrate with any school district authentication system (too complex, too many systems)
- Ask for Social Security numbers, teaching license numbers, or other sensitive credentials
- Block anyone from signing up -- unverified teachers can create an account but cannot start an interview until verified

### Verification Data Flow

```
Teacher signs up with email + password
  --> Email verified via Supabase (click link in email)
    --> System checks email domain against allowlist
      |
      +--> Match found? --> Auto-verified (Tier 1)
      |
      +--> No match --> Teacher enters school name, district, state
            --> System checks NCES database
              |
              +--> Plausible? --> Verified (Tier 2)
              |
              +--> Not found --> Queued for manual review (Tier 3)
                    --> Human reviews within 24 hours
```

---

## Privacy Architecture

### Threat Model

The primary assets are:
1. **Interview transcripts** -- teachers describe frustrations, name administrators, share personal struggles
2. **Teacher identity data** -- email, school, potentially identifying context
3. **Synthesis data** -- aggregate patterns (lower sensitivity, but misuse is possible)

The primary threats are:
1. **Data breach** -- interview transcripts exposed
2. **Internal misuse** -- someone with database access reads individual interviews
3. **Re-identification** -- synthesis quotes or patterns traced back to individuals
4. **Appropriation** -- interview data used to undermine teachers rather than help them
5. **AI training** -- interview data used to train AI models without consent

### Privacy Controls

| Layer | Control | Implementation |
|-------|---------|----------------|
| **Consent** | Informed, specific, revocable | Teachers read plain-language consent before first interview. They can withdraw consent and request data deletion at any time. Consent records are immutable (audit trail). |
| **Transport** | HTTPS everywhere | Vercel provides automatic TLS. Supabase connections are TLS by default. |
| **Access control** | Row-Level Security | Teachers access only their own data. RLS enforced at database level -- even a compromised API route cannot leak another teacher's data. |
| **AI provider** | No training on our data | Anthropic's API terms: data sent via the API is not used to train models. This is contractual, not just policy. The consent form communicates this to teachers. |
| **Synthesis anonymization** | Strip identifiers before analysis | Before synthesis, a preprocessing step removes teacher names, school names, administrator names, and other identifying details from transcripts. Synthesis prompt instructs Claude to further anonymize quotes. |
| **Data minimization** | Collect only what's needed | We do not ask for or store: teaching license numbers, Social Security numbers, home addresses, phone numbers, salary information. School name and district are optional and used only for verification and aggregate segmentation. |
| **Data retention** | Time-limited | Interview transcripts are retained for the duration of the research phase (target: 6-12 months). After the toolkit is designed and the research purpose is fulfilled, transcripts are deleted. Teachers are notified before deletion and offered an export. |
| **Right to delete** | Teacher-initiated deletion | Any teacher can delete their account and all associated data at any time. Deletion is real -- rows are removed from the database, not soft-deleted. |
| **Audit logging** | Track access to sensitive data | All access to interview transcripts through the synthesis API is logged (who, when, what query). |

### Data Classification

```
CLASSIFICATION        | EXAMPLES                        | ACCESS
----------------------|---------------------------------|------------------
CONFIDENTIAL          | Interview transcripts,          | Teacher who
                      | individual messages              | created it. No
                      |                                  | one else via app.
                      |                                  | Service role key
                      |                                  | for synthesis.
                      |                                  |
INTERNAL              | Teacher profiles, verification  | Teacher sees own.
                      | status, consent records          | Admin sees
                      |                                  | aggregate counts.
                      |                                  |
AGGREGATE             | Synthesis results, theme counts,| Research team.
                      | anonymized quotes                | Eventually shared
                      |                                  | with Council and
                      |                                  | community.
```

### Anti-Appropriation Protections

Julia's concern applies here even more than to the toolkit. Interview data is raw teacher frustration. If misused:

1. **No bulk export**: There is no API endpoint or UI for exporting all interview data. Synthesis is the only path from individual interviews to aggregate insights.
2. **Synthesis is one-way**: The synthesis output contains anonymized patterns, not individual transcripts. You cannot reverse-engineer a teacher's identity from synthesis data.
3. **Terms of use**: The data consent and project terms explicitly state that interview data will be used only for designing tools that serve teachers. Commercial use, resale, or sharing with school administrators is prohibited.
4. **Open source, closed data**: The codebase is MIT-licensed. The interview data has its own license: no redistribution, no commercial use, no use that harms teachers.
5. **Supabase service role key**: Only the deployment environment has the service role key that bypasses RLS. This key is stored in Vercel environment variables, never committed to code.

---

## Data Synthesis Approach

### How We Extract Patterns from Hundreds of Interviews

Synthesis is not a real-time feature. It is a researcher-initiated batch process run periodically as interviews accumulate.

### Process

1. **Batch loading**: Load completed interview transcripts in batches (e.g., 20 at a time, fitting within Claude's context window).

2. **Anonymization preprocessing**: Before sending transcripts to Claude for synthesis, a server-side function strips known identifiers:
   - Teacher names (replaced with "Teacher A", "Teacher B", etc.)
   - School names (replaced with descriptors: "a suburban elementary school")
   - Administrator names (replaced with "their administrator")
   - District names (replaced with region-level descriptors)

3. **Per-batch analysis**: Claude processes each batch using the synthesis system prompt (defined above) and produces structured JSON.

4. **Cross-batch merging**: A deterministic merge function combines results across batches:
   - Themes that appear in multiple batches are consolidated
   - Quote collections are deduplicated
   - Mention counts are summed
   - Severity assessments are averaged

5. **Human review**: A researcher reviews the merged synthesis before it informs design decisions. The synthesis is a starting point for understanding, not an oracle.

### Output Format

The synthesis produces a structured report containing:
- Top 10-20 themes ranked by frequency and severity
- Anonymized representative quotes for each theme
- Identified teacher segments with distinct needs
- Contradictions and areas of disagreement
- Unexpected insights that challenge assumptions
- Gaps: topic areas where we lack data

### When to Synthesize

- After every 50 completed interviews (minimum viable signal)
- On-demand when the research team wants a progress check
- Final comprehensive synthesis when interview collection closes

---

## Infrastructure

### Environments

#### Development
- Local Node.js (v22 LTS) with `next dev`
- Local Supabase instance via `supabase start` (Docker-based local Supabase)
- `.env.local` with local Supabase URL, anon key, and Anthropic API key
- Seed script creates test teacher accounts and sample interview data

#### Staging
- Vercel preview deployments (automatic per PR)
- Separate Supabase project for staging
- Staging Anthropic API key with usage limits
- Used for testing the full flow before production changes

#### Production
- Vercel production deployment (automatic on merge to `main`)
- Production Supabase project
- Production Anthropic API key
- Custom domain (e.g., `teachervoice.savetheworld.dev` or similar)

### Cost Estimate (Pilot Scale: 500 Teachers)

| Service | Free Tier | Estimated Cost |
|---------|-----------|----------------|
| Vercel | 100GB bandwidth, serverless functions | $0 (free tier sufficient) |
| Supabase | 500MB database, 50K auth users | $0 (free tier sufficient) |
| Anthropic API | N/A (pay per token) | ~$50-100 for 500 interviews |
| Domain name | N/A | ~$12/year |
| **Total** | | **~$62-112 for pilot** |

This is a system that costs less than a textbook to run for the entire pilot.

### Scaling Considerations

We do not build for scale. But we note that:
- Vercel scales automatically (serverless)
- Supabase Pro ($25/month) handles millions of rows
- Claude API has no practical throughput limit for our volume
- If we somehow get 10,000 teachers, the total cost is still under $1,000

---

## Process

### Development Workflow

1. **Branch from `main`**: Feature branches for all work
2. **Small PRs**: Each PR addresses a single concern
3. **API route tests**: Every API route has tests covering auth, validation, and happy path
4. **RLS tests**: Dedicated tests verifying that teacher A cannot access teacher B's data
5. **Mobile-first development**: Every page tested at 375px width before merging

### Testing Strategy

| Level | What | Tool |
|-------|------|------|
| **Unit tests** | Anonymization functions, topic coverage tracker, synthesis merge logic | Vitest |
| **Integration tests** | Full interview flow (signup, verify, consent, interview, completion) | Playwright |
| **RLS tests** | Verify row-level security policies work correctly | Supabase test helpers + direct SQL |
| **Accessibility tests** | WCAG 2.1 AA on all pages, mobile usability | axe-core + manual |
| **AI quality tests** | Verify interview AI stays on topic, asks follow-ups, respects length | Sample conversations reviewed by humans |

### Deployment Process

1. PR merged to `main`
2. Vercel automatically deploys to production
3. Smoke test: create account, start interview, verify AI responds
4. Database migrations run via Supabase CLI

---

## Anti-Appropriation Messaging

The following messaging is embedded in the application, not just the README:

**Landing page**: "We're building tools to reduce administrative burden for K-12 teachers. But first, we're listening. This project is about administrative relief -- it is not a substitute for better pay, smaller class sizes, or the systemic investment that teachers deserve."

**Consent page**: "Your words will directly shape the tools we build. Your interview data will never be shared with school administrators, sold to companies, or used for any purpose other than designing tools that serve teachers."

**Interview closing**: "Thank you. What you shared today matters. It will be used alongside other teachers' experiences to design tools that actually help -- because you told us what 'help' looks like."

---

## Open Questions for the Foreman

1. **Domain and branding**: What URL will this live at? Does the SaveTheWorld collective have a domain? Should this feel connected to the broader project or stand alone as a teacher-focused tool?

2. **Teacher recruitment strategy**: How do we get the first 50 teachers to the site? Teacher subreddits? Education Twitter/Bluesky? Teacher union partnerships? This is a marketing problem, not a technical one, and it determines whether the tool works.

3. **Interview target**: How many completed interviews do we need before we have enough signal to design the toolkit? Recommendation: aim for 200-500, but run the first synthesis at 50 to check if the approach is working.

4. **Researcher access model**: Who has access to run synthesis? Just the Architect? The Council? A designated research team? The Foreman should define the access model.

5. **Timeline**: The interview system should be buildable in 2-3 weeks by a single Artisan. But how long do we keep it open for interviews before transitioning to toolkit design?

6. **Localization**: English only for the MVP? If a significant number of teachers are more comfortable in Spanish, the interview AI can conduct interviews in Spanish (Claude handles this natively), but the UI would need translation.

7. **Consent text review**: The exact consent language needs legal review, even for a research tool. Who handles this?

8. **NCES data integration**: The school verification approach uses the NCES public school directory. The Foreman should confirm this dataset is accessible and determine the update frequency.

9. **Interview quality monitoring**: Should the first 10-20 interviews be reviewed by a human to ensure the AI interviewer is performing well? Recommendation: yes.

10. **Accessibility audit**: Should we engage a teacher with a disability to test the interview experience? Recommendation: yes, during the first week of launch.

---

## Human Intervention Needed

### Before Building

1. **Anthropic API key**: A human must create an Anthropic account and provision an API key. Store it as a Vercel environment variable.

2. **Supabase project setup**: A human must create the Supabase project (free tier). The Artisan configures the schema, but project creation requires a human account.

3. **Domain registration**: If we want a custom domain (recommended), a human must register it.

4. **Consent text approval**: The consent language must be reviewed by someone with legal knowledge before teachers see it.

### During Operation

5. **Manual verification queue**: Teachers in Tier 3 verification need human review. Someone must check the queue daily.

6. **Interview quality review**: The first 20 interviews should be reviewed by a human to ensure the AI is performing well.

7. **Synthesis review**: When synthesis runs produce results, a human (the Architect or the Council) must review them before they inform design decisions.

8. **Teacher recruitment**: Getting teachers to the site is a human problem. The system is useless if no one shows up.

### After Collection

9. **Transition decision**: When do we stop collecting interviews and start designing the toolkit? This is a judgment call requiring human input from the Council.

10. **Data retention**: When the research phase ends, someone must trigger the data retention policy (notify teachers, offer export, then delete transcripts).

---

## Relationship to the Toolkit Architecture

This document describes a **precursor system**, not the toolkit itself.

```
Teacher Voice Collector          -->  Synthesis  -->  Design Insights
(this architecture)                                       |
                                                          v
                                            Toolkit Architecture
                                   (SCROLL-001-toolkit-technical-foundation.md)
                                            revised based on what
                                            teachers actually said
```

The previous toolkit architecture remains valid as a technical foundation, but its feature set (report generation, parent comms, data entry, scheduling) was chosen by us, not by teachers. The Voice Collector will either validate those choices, reveal different priorities, or surface needs we never considered.

The technology stacks are intentionally different:
- **Voice Collector**: Next.js + Vercel + Supabase (fast to build, cloud-hosted, disposable after research)
- **Toolkit**: Django + SQLite + self-hosted (long-lived, deploy-anywhere, no cloud dependency)

This is correct. The Voice Collector is a research instrument. The Toolkit is a production tool. They have different requirements, different lifespans, and different audiences. Forcing them onto the same stack would serve neither well.

---

## Summary of Elder Concern Resolution

| Elder | Concern | How This Architecture Addresses It |
|-------|---------|-----------------------------------|
| **Dinah** | Don't over-engineer. Proof of concept. | Three external dependencies. One chat page. One database. Two weeks to build. |
| **Ivy** | Clear ownership and milestones. | Foreman defines recruitment plan and interview targets. Clear gates: 50 interviews (first synthesis), 200+ (comprehensive synthesis), then transition to toolkit design. |
| **Tekla** | Teacher data privacy from day one. | RLS on every table. No bulk export. Anonymization before synthesis. Right to delete. Consent audit trail. |
| **Moira** | Design for measurement. | We are literally measuring: counting interviews, tracking completion rates, and synthesizing patterns. The entire system is a measurement instrument. |
| **Aida** | Must survive real conditions. | Works on a phone. 20-minute interview fits a lunch break. Free tier covers pilot costs. If no teachers show up, we stop. |
| **Camila** | Co-design with teachers, not for them. | This system exists because of Camila's mandate. Every teacher who participates is a co-designer. Their words directly shape what gets built. |
| **Julia** | Anti-appropriation. No misuse of teacher data. | No bulk data export. Synthesis is one-way and anonymized. Terms prohibit commercial use or sharing with administrators. Open code, closed data. |

---

*This Architecture is ready for the Foreman to plan.*

*"Before we lay a single stone, we must know the shape of the ground. The teachers will tell us the shape of the ground."*
