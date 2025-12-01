# NEXUS ORCHESTRATOR
## The Operating System for Vibe Coding
### Master Product and Strategy Document

## 1. Executive Summary

Nexus Orchestrator is a SaaS platform designed to serve as the **Operating System for Agentic Development**. In an ecosystem where tools like Claude, Cursor, Devin, and Leap enable non-technical users to generate code through natural language ("Vibe Coding"), Nexus emerges as the governance, supervision, and orchestration layer that ensures generated code is maintainable, secure, and scalable.

The platform combines three critical roles in a single interface:
- **Software Architect** — defines the structure
- **Project Manager** — coordinates execution
- **Quality Auditor** — validates results

---

## 2. The Problem: The Vibe Coding Paradox

Vibe Coding has democratized software development, but it has created a new category of users: the **"Blind Drivers"** — people with access to extremely powerful engines (code-generating LLMs) but without a map, without GPS, and without a mechanic.

### 2.1 The Four Systemic Failures

| Failure | Description |
|---------|-------------|
| **Ambiguity** | Users don't know how to technically specify what they want. AIs interpret vague instructions inconsistently. |
| **Amnesia** | Code-generating AIs lose context between sessions. Each prompt starts from scratch, ignoring previous architectural decisions. |
| **Fragility** | Generated code frequently contains logic bugs, security vulnerabilities, and non-scalable patterns that users cannot detect. |
| **Hallucinations** | AIs invent non-existent APIs, fictional methods, or obsolete dependencies. Code appears syntactically correct but fails at runtime because it references resources that don't exist in reality. |

### 2.2 The Typical Failure Scenario

A user starts a project with enthusiasm. After several iterations, errors, and improvised patches, they end up with **"Frankenstein Code"** — partially functional, impossible to maintain, and costly to scale. The project dies or requires complete rewrite by a technical team.

---

## 3. The Solution: The Nexus Trust Cycle

Nexus doesn't replace code-generating agents; it **supervises, coordinates, and audits** them. It acts as an intelligent GPS that doesn't drive the vehicle but does:

1. **Define the destination** before starting (Socratic Discovery)
2. **Calculate the optimal route** with checkpoints (Artifact Generation)
3. **Monitor the journey** and recalculate if there are deviations (Continuous Synchronization)
4. **Verify arrival** and audit integrity (Quality Gates)

### 3.1 The Four Phases of the Nexus Workflow

#### Phase 1: Context Engineering (Socratic Onboarding)

The user doesn't arrive at an empty chat. They arrive at a **Situation Room** where Nexus guides project definition through strategic questions before writing a single line of code.

This phase generates the **Nexus Artifact System** — four living documents that evolve with the project:

| Artifact | Purpose | Generation |
|----------|---------|------------|
| **PRD.md** | What will be built (features, user stories) | Socratic Onboarding |
| **CONSTITUTION.md** | Unbreakable project rules (standards, limits) | Socratic Onboarding |
| **ARCHITECTURE.md** | Technology stack and infrastructure decisions | Auto-generated from Implementation Planner |
| **SCHEMA.md** | Data model, tables, relationships | Generated when defining entities |

> **Operational Data (in Database, not artifacts):**
> - **Decision Journal:** Decision log with links to conversations. Stored in `decisions` table for queries during Context Refresh.
> - **Error Log:** Error history with diagnostics and solutions. Stored in `error_logs` table for pattern detection and metrics.
> 
> This data is queryable from the UI with filters, search, and sorting, but not exportable as markdown files.

> **Note about the Roadmap:** The roadmap is NOT a markdown artifact. It's an **interface module** in Nexus with data stored in the database. It shows phases, sprints, atomic tasks with their prompts, and progress states. During Context Refresh, Nexus queries this module to retrieve pending and completed tasks.

> **Key principle:** Each artifact is bidirectionally linked to the conversations where it originated. Users can click on any decision and see the complete context of the chat where it was discussed.

#### Phase 2: Execution GPS (Deep Synchronization)

Nexus generates optimized sequential prompts for the generating agent (Leap, Devin, Cursor). When the user makes manual decisions that deviate from the original plan:

- **Automatic detection:** Nexus reads the actual state of the repository and database
- **Route recalculation:** Updates subsequent prompts to reflect the new reality
- **Artifact updates:** Automatically rewrites SCHEMA.md, ARCHITECTURE.md

#### Phase 3: Auditing and Quality Gates

Nexus integrates specialized AIs to validate builder work:
- **CodeRabbit** — Automated code review and vulnerability detection
- **TestSprite** — Automated test generation and execution

#### Phase 4: Resilience and Recovery

The **"Panic Button"** eliminates the fear of breaking everything. Nexus saves architecture snapshots before each major sprint, allowing instant rollback to previous stable states with a single click.

---

## 4. Nexus Cognitive Architecture

### 4.1 Platform Knowledge Base (Builder Intelligence)

Nexus maintains an indexed knowledge base of each Vibe Coding platform:

| Platform | Indexed Information |
|----------|---------------------|
| **Leap.new** | Supported stack (Next.js, Clerk, Neon, Stripe), limitations, best practices, native integrations |
| **Cursor** | Extensions, available models, effective prompting patterns |
| **Devin** | Execution capabilities, terminal access, autonomy limits |
| **Lovable** | UI components, templates, deployment restrictions |

**Intelligent Architecture Flow:**

1. **Detection:** User indicates which builder they'll use (e.g., "I'll use Leap.new")
2. **Query:** Nexus queries its Knowledge Base about Leap's capabilities
3. **Pre-configuration:** Nexus knows Leap natively supports Clerk + Neon + Stripe
4. **Minimal decisions:** Only asks user about key decisions Leap allows to customize
5. **Auto-generation:** ARCHITECTURE.md is automatically generated with the optimal stack for that builder

> **Example:** If the user chooses Leap.new, Nexus already knows it will use Clerk for auth and Neon for DB. It will only ask: "Stripe or Paddle for payments?" or "Do you need transactional emails?"

### 4.2 RAG System (Vector Memory)

All artifacts, conversations, and decisions are stored in a vector database:

- **Ingestion:** Documents are split into 500-token chunks with metadata (date, type, links)
- **Embedding:** Vectorization with text-embedding-3-small
- **Storage:** pgvector on Neon (the same project DB)
- **Query:** Similarity search to enrich each prompt with relevant context

### 4.3 Context Refresh System (Context Window Management)

**The Problem:** LLMs have limited context windows. In long projects, users receive the dreaded message "you must start a new chat".

**The Nexus Solution:** Proactive context renewal system.

| Phase | Trigger | Action |
|-------|---------|--------|
| **Monitoring** | Context usage > 70% | Yellow visual indicator in UI |
| **Alert** | Context usage > 85% | Notification: "Prepare for Context Refresh" |
| **Refresh** | Context usage > 90% | Nexus executes renewal protocol |

**Context Refresh Protocol:**

1. **Snapshot:** Saves current conversation state
2. **RAG Query:** Retrieves from vector database:
   - Latest versions of the 4 artifacts (PRD, Constitution, Architecture, Schema)
3. **Roadmap Module Query:** Retrieves from database:
   - Pending and completed tasks
   - Active sprint and progress
   - Prompts associated with upcoming tasks
4. **Decision Journal Query (DB):** 
   - Critical decisions (impact_level = 'high' or 'critical')
   - Last 10 technical decisions
5. **Error Log Query (DB):** 
   - Last 5 errors and their solutions
   - Recurring error patterns (errors that occurred 2+ times)
6. **Integrations Query:**
   - Open PRs in GitHub and their status
   - Active tickets in Linear
7. **Synthesis:** Generates a compressed "Context Bundle" with essentials
8. **New Chat:** Starts fresh conversation with Context Bundle injected
9. **Continuity:** User continues exactly where they were, without context loss

> **Result:** User never loses track. Nexus guarantees continuity even in projects lasting months.

### 4.4 Integrations (Nexus Connect)

- **Builders:** Leap (native), Devin, Cursor, Lovable
- **Auditors:** CodeRabbit, TestSprite
- **Trackers:** Linear (bidirectional task and status synchronization)
- **Repositories:** GitHub (webhooks, PRs, real-time status)

---

## 5. User Interface

> **Note:** The base design already exists in HTML. This section documents the navigation structure and suggested improvements.

### 5.1 Navigation Structure

#### Header
| Element | Function |
|---------|----------|
| **Logo/Project** | Active project name with selector |
| **Model Selector** | Switch between Claude, GPT-4, etc. |
| **Context Meter** | Context window usage bar (%) |
| **Stack Layers Icon** | Opens drawer with technology stack information |
| **Breadcrumbs** | Current navigation trail |

#### Vertical Menu (Left Sidebar)
| Element | Function |
|---------|----------|
| **Orchestrator** | Main chat with Nexus (default view) |
| **Dashboard** | Control panel with metrics and general status |
| **Roadmap** | Phases, sprints, and tasks module with prompts |
| **Knowledge Base** | Project artifacts (PRD, Schema, etc.) |
| **Integrations** | GitHub, Linear, CodeRabbit — statuses and configuration |
| **History** | Past conversations with search |

### 5.2 Stack Layers Drawer

Drawer that opens from the header icon. Shows simplified stack information:

| Layer | Information |
|-------|-------------|
| **Frontend** | Framework, version, sync status |
| **Database** | Provider (Neon), tables, last migration |
| **Auth** | Provider (Clerk), active users |
| **Payments** | Provider (Stripe/Paddle), integration status |
| **Hosting** | Vercel/other, last deploy, status |

Each layer shows:
- Status: 🟢 Synced, 🟡 Pending, 🔴 Error
- Last change with timestamp
- Quick link to service documentation/dashboard

### 5.3 Right Panel (Live Architecture)

Contextual panel showing relevant information based on active view:

#### In Orchestrator View:
- **Health Score:** 0-100 indicator with breakdown
- **Current Sprint:** Progress and upcoming tasks
- **Context Health:** Context window usage
- **Quick Actions:** Restore Stable, Sync, Export

#### In Dashboard View:
- Expanded metrics
- Trend charts
- Active alerts

#### In Roadmap View:
- Visual project timeline
- Filters by status/sprint

### 5.4 Suggested New Elements

| Element | Location | Function |
|---------|----------|----------|
| **Decision Breadcrumb** | Above chat | Trail of key decisions made in session |
| **Hallucination Alert** | Inline in chat | Red badge when non-existent API/method reference detected |
| **Chat Link Badge** | In artifacts | Clickable icon leading to chat where that section originated |
| **Prompt Copy Button** | In Roadmap tasks | Copy optimized prompt with one click |
| **Learning Mode Toggle** | Header or Settings | Enable/disable pedagogical explanations |

---

## 6. Viability Validation

### 6.1 Project Strengths

✅ **Real and validated pain:** The "Frankenstein code" problem is ubiquitous in the Vibe Coding community

✅ **Clear differentiation:** Doesn't compete with builders, complements them (orchestration layer)

✅ **Defined UI design:** Interface designed in HTML ready for implementation

✅ **Strategic integrations:** GitHub, Linear, CodeRabbit cover the complete cycle

✅ **Viable business model:** SaaS with tiers based on tokens/audits

✅ **Builder-first approach:** Platform Knowledge Base enables automatic intelligent architecture

### 6.2 Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| External API dependency | Variable costs, latency | Multi-provider, aggressive caching |
| Synchronization complexity | State bugs, conflicts | Event sourcing, frequent snapshots |
| Builder adoption | Market fragmentation | Native Leap + open API |

### 6.3 Viability Verdict

> **✅ VIABLE WITH HIGH PROBABILITY OF SUCCESS**
> 
> The project solves a real pain with a differentiated proposition. Technical execution is ambitious but achievable with the chosen stack. Recommended to prioritize native Leap integration and Reverse Sync module to capture users with existing projects.

---

## 7. Product Features

### 7.1 Core Workflow Features

#### A. Socratic Onboarding (Discovery Engine)
`Category: CORE` `Priority: CRITICAL`

Context engineering system that guides users before writing code:

- **Multimodal Input:** Accepts idea in text, audio, or PDF
- **Visual Stepper:** Interactive progress bar (Idea → Context → PRD → Strategy → Artifacts → Route)
- **Strategic Questions:** Nexus asks specific questions to eliminate ambiguity
- **Artifact Generation:** Creates PRD.md, CONSTITUTION.md automatically
- **Scope Validation:** Confirms with user before proceeding
- **Builder Detection:** Identifies which platform will be used (Leap, Cursor, etc.) to auto-configure architecture
- **Implementation Strategy:** Presents implementation options per feature with costs (see Feature W)

**Flow:**
1. User describes idea
2. Nexus asks 3-5 key questions
3. Generates draft PRD.md
4. User approves/edits
5. **[NEW]** Nexus presents Implementation Strategy Dashboard
6. User selects strategy per feature
7. Nexus generates CONSTITUTION.md and ARCHITECTURE.md
8. Generates Roadmap with tasks, assigned builders, and prompts
9. Begins execution phase

---

#### B. Execution GPS (Prompt Orchestrator)
`Category: CORE` `Priority: CRITICAL`

Optimized prompt generation and sequencing engine:

- **Prompt Sequencing:** Generates prompts in logical dependency order
- **Builder Optimization:** Adapts prompt to chosen builder's style (Leap vs Cursor vs Devin)
- **Context Injection:** Each prompt includes relevant project context
- **Copy-Ready:** Button to copy formatted prompt ready to paste
- **Dependency Tracking:** Doesn't generate feature B prompt until A is complete
- **Prompt Rollback:** If a prompt fails, generates alternative

**Generated Prompt Format:**
```
[Project Context]
[Reference to CONSTITUTION.md]
[Specific Task]
[Acceptance Criteria]
[Warnings based on previous errors]
```

---

#### C. Repository Synchronization (Repo Sync)
`Category: CORE` `Priority: CRITICAL`

Real-time connection with code state:

- **GitHub Webhooks:** Automatically detects commits, PRs, merges
- **State Diffing:** Compares expected state vs actual repo state
- **Schema Detection:** Reads database and detects table changes
- **Auto-Update Artifacts:** Updates SCHEMA.md, ARCHITECTURE.md when there are changes
- **Conflict Detection:** Alerts when code diverges from plan
- **Sync Indicator:** Visual badge showing synchronization status

**States:**
- 🟢 **Synced:** Code aligned with artifacts
- 🟡 **Pending:** Changes detected, updating artifacts
- 🔴 **Diverged:** Conflict detected, requires attention

---

#### D. Emergency Rollback (Panic Button)
`Category: CORE` `Priority: CRITICAL`

Disaster recovery system:

- **Automatic Snapshots:** Saves state before each sprint/phase
- **One-Click Restore:** "Restore Stable" button reverts to last safe state
- **Git Integration:** Executes `git revert` to safe commit
- **Database Rollback:** Generates emergency prompt to revert migrations
- **Artifact Restore:** Recovers previous versions of all artifacts
- **Post-Rollback Guidance:** Nexus explains what went wrong and how to avoid it

**Rollback Flow:**
1. User presses "Restore Stable"
2. Nexus shows preview of changes to revert
3. User confirmation
4. Rollback execution in GitHub
5. Prompt generation for DB rollback
6. Artifact updates
7. Summary of actions taken

---

#### E. Reverse Sync (Import Existing Project)
`Category: CORE` `Priority: HIGH`

Onboarding for existing projects ("Brownfield"):

- **Repo Import:** Connects existing GitHub repository
- **AST Parsing:** Analyzes code structure
- **LLM Analysis:** Interprets business logic
- **Auto-Generate Artifacts:**
  - Detects SQL tables → Creates SCHEMA.md
  - Detects API routes → Creates ARCHITECTURE.md
  - Detects business logic → Suggests PRD.md
- **Gap Analysis:** Identifies missing documentation
- **Constitution Inference:** Suggests rules based on code patterns

**Value:** Captures users who already started projects without Nexus.

---

#### F. Quality Gates (Audit Engine)
`Category: CORE` `Priority: HIGH`

Automated validation of generated code:

- **CodeRabbit Integration:** 
  - Automatic review of each PR
  - Security vulnerability detection
  - Best practice suggestions
  - Inline comments in GitHub
  
- **TestSprite Integration:**
  - Automatic unit test generation
  - Test suite execution
  - Coverage report
  - Edge case suggestions

- **Nexus Analysis:**
  - Validation against CONSTITUTION.md
  - Verification of adherence to ARCHITECTURE.md
  - Alert if code violates project rules

**Flow:**
1. PR created in GitHub
2. Webhook notifies Nexus
3. Nexus invokes CodeRabbit + TestSprite
4. Results consolidated in dashboard
5. Alert user if there are critical issues
6. Correction prompt if necessary

---

#### G. Time Travel (Version History)
`Category: CORE` `Priority: HIGH`

Temporal navigation through project history:

- **Artifact Versioning:** Each artifact has complete history
- **Side-by-Side Diff:** Compare versions visually
- **Restore Version:** Revert artifact to previous version
- **Author Tracking:** Who made each change (User or Nexus AI)
- **Timestamp:** When each change occurred
- **Reason Logging:** Why the change was made (link to chat)

**UI:**
- Side "History" panel in each artifact
- Visual timeline with change points
- "Restore" button on each version

---

### 7.2 Intelligence Features

#### H. Hallucination Detector
`Category: INTELLIGENCE` `Priority: CRITICAL`

Real-time validation against AI hallucinations:

- **API Validation:** Verifies that referenced endpoints and methods exist in official documentation
- **Dependency Check:** Confirms npm/pip packages exist and versions are compatible
- **Method Verification:** Validates that called methods exist in imported libraries
- **Inline Alerts:** Red badge in chat when hallucination detected
- **Correction Suggestions:** Proposes correct alternative
- **Confidence Score:** Certainty level that something is a hallucination

**Implementation:**
- Integration with official registries (npm, PyPI)
- Scraping of popular API documentation
- AST validation of generated code
- Database of methods/functions by library

---

#### I. Builder Knowledge Base
`Category: INTELLIGENCE` `Priority: HIGH`

Indexed repository of each platform's capabilities:

- **Platforms Indexed:** Leap, Cursor, Devin, Lovable, Bolt, Replit
- **Data per Platform:**
  - Supported stack (frameworks, DBs, auth providers)
  - Known limitations
  - Prompting best practices
  - Native integrations
  - Pricing/usage limits
- **Auto-Update:** Periodic scraping of official documentation
- **Architecture Auto-Gen:** ARCHITECTURE.md generated according to chosen builder
- **Prompt Optimization:** Prompts adapted to builder's style

**Example:** User chooses Leap.new → Nexus knows it uses Clerk + Neon + Stripe natively → Only asks decisions Leap allows to customize.

---

#### I-b. Technology Cost Index
`Category: INTELLIGENCE` `Priority: HIGH`

Structured database with cost information and characteristics of each technology:

- **Data Indexed per Technology:**

| Field | Example (Clerk) | Use |
|-------|-----------------|-----|
| `name` | Clerk | Identifier |
| `category` | auth | Service type |
| `pricing_model` | freemium | free, freemium, paid, usage-based |
| `free_tier_limits` | 10,000 MAU | Free tier limits |
| `paid_tier_start_usd` | 25 | Paid tier starting price |
| `usage_based_pricing` | $0.02/MAU after 10k | Usage cost |
| `supported_stacks` | [Next.js, React, Node] | Compatible frameworks |
| `native_integrations` | [Neon, Vercel, Stripe] | Native integrations |
| `setup_complexity` | 1 | 1-5 difficulty scale |
| `documentation_url` | docs.clerk.com | Link to official docs |
| `last_updated` | 2024-11-01 | Last update date |

- **Benefits:**
  - Precise cost calculations in Implementation Planner
  - Uniform responses about technologies
  - Centralized updates
  - Recommendations based on user budget

- **Updates:**
  - Automatic scraping of pricing pages
  - Periodic manual validation
  - Alerts when there are significant price changes

---

#### J. Context Refresh System
`Category: INTELLIGENCE` `Priority: CRITICAL`

Proactive context window management:

- **Token Monitoring:** Continuous tracking of context usage
- **Visual Alerts:**
  - 70%: Yellow indicator
  - 85%: "Prepare for refresh" notification
  - 90%: Automatic protocol execution
- **RAG Query:** Retrieves essential information from vector database
- **Roadmap Query:** Queries tasks and progress from DB
- **Context Bundle:** Compressed package with everything needed
- **Seamless Transition:** User continues without noticing the change
- **Manual Trigger:** "Force Refresh" button available

**Guarantee:** Continuity in projects lasting months without context loss.

---

#### K. Predictive Issues
`Category: INTELLIGENCE` `Priority: DIFFERENTIATOR`

AI that anticipates problems before they occur:

- **Schema Analysis:**
  - "Your users table doesn't have an index on email — it will be slow at scale"
  - "The N:N relationship needs an intermediate table"
- **Security Scan:**
  - "This API doesn't have rate limiting — vulnerable to DDoS"
  - "Endpoint exposes sensitive data without auth"
- **Architecture Review:**
  - "Component X has 15 props — consider splitting it"
  - "This function has high cyclomatic complexity"
- **Performance Prediction:**
  - "N+1 query detected in this pattern"
  - "Bundle size will exceed recommended limit"
- **Pre-Generated Fix:** Each issue includes prompt to fix it
- **Risk Scoring:** Severity of each issue (Critical, High, Medium, Low)

---

#### L. Error Pattern Recognition
`Category: INTELLIGENCE` `Priority: DIFFERENTIATOR`

Learning from errors for future prevention:

- **Error Log Analysis:** Scans ERROR_LOG.md to detect patterns
- **Recurrence Detection:** "This type of error has occurred 3 times"
- **Root Cause Identification:** Identifies common cause
- **Permanent Fix Suggestion:** Proposes definitive solution, not patch
- **Cross-Project Learning:** Common errors by stack (shared anonymously)
- **Preventive Alerts:** Warns before error occurs

---

### 7.3 Productivity Features

#### M. Code Health Score
`Category: PRODUCTIVITY` `Priority: HIGH`

Code quality metrics dashboard:

- **Global Score:** 0-100 with breakdown by category
- **Metrics:**
  - Cyclomatic complexity
  - Test coverage
  - Known vulnerabilities (CVEs)
  - Estimated technical debt
  - Code duplication
- **Trend Tracking:** Comparison vs. yesterday/last week
- **Threshold Alerts:** Notification when score drops below threshold
- **Gamification:** Badges for maintaining high score during sprints
- **Per-Component Breakdown:** Score by module/feature

**Colors:**
- 🟢 80-100: Excellent
- 🟡 50-79: Acceptable
- 🔴 0-49: Needs attention

---

#### N. Learning Mode (Pedagogical Mode)
`Category: PRODUCTIVITY` `Priority: HIGH`

Toggle that transforms Nexus into a tutor:

- **Inline Explanations:** Why Nexus suggests each prompt
- **Architecture Tooltips:** Technical concepts explained on hover
- **"Why This Decision?" Button:** In each artifact and suggestion
- **Contextual Glossary:** Technical terms explained according to user level
- **Learning Progress:** Badges and levels for mastered concepts
- **Recommended Reading:** Links to documentation when user asks something advanced
- **Difficulty Adaptation:** Adjusts explanation complexity based on history

---

#### O. Project Templates Gallery
`Category: PRODUCTIVITY` `Priority: HIGH`

Pre-configured project library:

| Template | Includes |
|----------|----------|
| **SaaS Starter** | Auth, Billing (Stripe), Dashboard, Settings, User Management |
| **E-commerce** | Cart, Checkout, Inventory, Admin Panel, Transactional Emails |
| **Marketplace** | Multi-vendor, Commissions, Reviews, Disputes, Payouts |
| **AI Wrapper** | API Integration, Usage Tracking, Rate Limiting, API Keys |
| **Internal Tool** | CRUD, Roles/Permissions, Audit Log, Export |
| **Landing Page** | Hero, Features, Pricing, CTA, Analytics |

**Each template includes:**
- Pre-filled PRD.md
- Configured ARCHITECTURE.md
- Initial SCHEMA.md
- First 5-10 prompts ready
- CONSTITUTION.md with best practices

---

#### P. Token Cost Estimator
`Category: PRODUCTIVITY` `Priority: MEDIUM`

AI cost prediction and control:

- **Pre-Execution Estimate:** "This sprint will consume ~$X.XX in tokens"
- **Historical Dashboard:** Consumption by day/week/month
- **Per-Task Breakdown:** Cost of each operation
- **Budget Alerts:** Notification when approaching monthly limit
- **Optimization Tips:** "Use Claude Haiku for this task and save 70%"
- **Project Projection:** Total cost estimate to complete project
- **Model Recommendations:** Optimal model suggestion per task

---

#### Q. Context Export / Offline Mode
`Category: PRODUCTIVITY` `Priority: MEDIUM`

Complete project portability:

- **Full Export ZIP:**
  - All artifacts (.md files)
  - Version history
  - Complete Decision Journal
  - Error Log
- **Prompt Bundle:** All pending prompts ready to copy
- **State Snapshot:** Exportable project state
- **Import Function:** Load context in new environment
- **Offline Viewer:** Static HTML to review without connection
- **Migration Support:** Facilitates moving project to another builder

---

### 7.4 Collaboration Features

#### R. Collaboration Hub
`Category: COLLABORATION` `Priority: MEDIUM`

Multi-user capabilities:

- **Roles:**
  - Owner: Full control
  - Editor: Can modify artifacts and execute prompts
  - Viewer: Read-only
- **Activity Feed:** Timeline of who did what and when
- **Comments:** Asynchronous discussion in artifacts with @mentions
- **Presence Indicators:** See who is active in the project
- **Handoff Mode:** Context transfer to senior developer
  - Generates automatic executive summary
  - Critical decision highlights
  - Prioritized pending list
- **Notifications:** Email/Slack when there are important changes

---

#### S. Linear Deep Integration
`Category: COLLABORATION` `Priority: HIGH`

Complete bidirectional synchronization:

- **Auto-Create Tickets:** Nexus creates tickets from Roadmap automatically
- **Bidirectional Sync:** Linear ↔ Nexus states synchronized in real-time
- **Prompt Attachment:** Each ticket has associated prompt
- **Sprint View:** Simplified view in Nexus (doesn't replace Linear)
- **Nexus Comments:** Nexus comments on tickets with relevant context
- **Label Mapping:** Nexus categories → Linear Labels
- **Priority Sync:** Priorities reflected in both systems

---

### 7.5 Differentiating Features

#### T. Decision Journal Module
`Category: DIFFERENTIATOR` `Priority: HIGH`

Interface module (not artifact) for decision logging and querying:

- **Storage:** PostgreSQL database, `decisions` table
- **Auto-Capture:** Each architectural decision saved with timestamp
- **Bidirectional Links:** Each entry has link to exact chat where it was discussed
- **Categories:**
  - Technical (stack, patterns)
  - Business (features, prioritization)
  - UX (flows, design)
  - Security (auth, permissions)
- **UI Features:**
  - Filters by category, date, project
  - Semantic search: "Why did we use Stripe instead of Paddle?"
  - Visual timeline of project evolution
  - Sorting by date, importance
- **Context Refresh Integration:** Nexus queries this table during refresh to retrieve critical decisions
- **Reasoning Preservation:** The "why" is never lost

**Database Schema:**
```sql
decisions (
    id UUID PRIMARY KEY,
    project_id UUID,
    conversation_id UUID,          -- Link to origin chat
    category TEXT,                 -- 'technical', 'business', 'ux', 'security'
    title TEXT,
    description TEXT,
    reasoning TEXT,
    impact_level TEXT,             -- 'low', 'medium', 'high', 'critical'
    created_by TEXT,
    created_at TIMESTAMP
)
```

**Note:** Unlike markdown artifacts, the Decision Journal is NOT exportable as a file. It's an operational Nexus module for internal querying and Context Refresh.

---

#### T-b. Error Log Module
`Category: DIFFERENTIATOR` `Priority: HIGH`

Interface module (not artifact) for error logging and analysis:

- **Storage:** PostgreSQL database, `error_logs` table
- **Auto-Capture:** Errors automatically logged with diagnosis
- **Conversation Link:** Each error linked to chat where it was discussed
- **Error Types:**
  - Runtime (production errors)
  - Build (compilation errors)
  - Logic (business logic bugs)
  - Security (detected vulnerabilities)
- **Severity Levels:** Low, Medium, High, Critical
- **UI Features:**
  - Filters by type, severity, status (resolved/pending)
  - Search by error message
  - Recurring pattern detection
  - Metrics and statistics
- **Context Refresh Integration:** Nexus queries last N errors and patterns during refresh
- **Pattern Recognition:** Feeds Error Pattern Recognition feature (L)

**Database Schema:**
```sql
error_logs (
    id UUID PRIMARY KEY,
    project_id UUID,
    conversation_id UUID,          -- Link to origin chat
    error_type TEXT,               -- 'runtime', 'build', 'logic', 'security'
    severity TEXT,                 -- 'low', 'medium', 'high', 'critical'
    message TEXT,
    stack_trace TEXT,
    diagnosis TEXT,                -- Nexus analysis
    solution TEXT,                 -- Applied solution
    resolved BOOLEAN DEFAULT false,
    resolved_at TIMESTAMP,
    created_at TIMESTAMP
)
```

**Note:** Unlike markdown artifacts, the Error Log is NOT exportable as a file. It's an operational module for pattern detection and continuous improvement.

---

#### U. Roadmap Module
`Category: DIFFERENTIATOR` `Priority: CRITICAL`

Task and progress management module (UI, not artifact):

- **Visual Timeline:** Phases and sprints in timeline
- **Task Breakdown:** Atomic tasks with dependencies
- **Prompt Library:** Each task has associated optimized prompt
- **Builder Assignment:** Each task shows who will execute it:
  - **Nexus:** "Execute" button that loads prompt in Orchestrator input
  - **Leap/Cursor/Devin:** "Copy Prompt" button to paste in external tool
- **Status Tracking:** Pending, In Progress, Blocked, Completed
- **Progress Metrics:** % completion by sprint/phase
- **Dependency Graph:** Visualization of what depends on what
- **Drag & Drop:** Reorder priorities
- **Linear Sync:** Bidirectional with Linear
- **Data for Context Refresh:** Nexus queries this module during refresh
- **Strategy Link:** Each task linked to selected implementation strategy

**Task Execution:**
| Builder | Action | Result |
|---------|--------|--------|
| **Nexus** | Click "Execute" | Prompt loads in Orchestrator input, ready to send |
| **Leap** | Click "Copy Prompt" | Prompt copied to clipboard + usage instructions |
| **Cursor** | Click "Copy Prompt" | Prompt formatted for Cursor + necessary context |
| **Devin** | Click "Copy Prompt" | Structured prompt for Devin + referenced files |

---

#### V. Multi-Tenant Management
`Category: DIFFERENTIATOR` `Priority: MEDIUM`

Organization and project management:

- **Hierarchy:** User → Organizations → Projects
- **Clerk Integration:** Organizations mapped 1:1 with Clerk
- **Billing per Org:** Stripe integrated for subscriptions
- **Tiers:**
  - Free: 1 project, token limits
  - Pro: Unlimited projects, more tokens
  - Enterprise: Team features, SSO, audit logs
- **Project Templates:** Save projects as organizational templates
- **Shared Knowledge Base:** Artifacts shared between projects in same org

---

#### W. Project Implementation Planner
`Category: DIFFERENTIATOR` `Priority: CRITICAL`

Interactive dashboard during onboarding to define HOW each feature will be implemented:

- **Strategy Catalog:** Database of strategies by feature type
- **Interactive Selection:** User chooses complexity level per feature
- **Cost Calculator:** Automatic sum of monthly costs based on selection
- **Comparison View:** Comparative table of options per feature
- **Recommendation Engine:** Nexus suggests optimal strategy based on chosen builder
- **Post-Onboarding Edit:** Strategies editable after initial setup
- **Architecture Layer Generator:** Auto-generates architectural view based on decisions

**Strategy Selector UI:**

| Feature | Strategy | Cost/month | Complexity | Selection |
|---------|----------|------------|------------|-----------|
| **Auth** | Clerk Integration (Recommended) | $5 | ★☆☆ | ○ |
| **Auth** | Custom NextAuth | $10 | ★★☆ | ○ |
| **Auth** | Agent-Based Auth | $50 | ★★★ | ○ |

---

### Architecture Layer Dashboard

Once strategies are selected, Nexus automatically generates a **visual dashboard** of the project architecture:

**Dashboard Sections:**

| Section | Generated Information |
|---------|----------------------|
| **Architecture Type** | Monolithic / Microservices / Serverless / Hybrid |
| **Frontend Stack** | Framework, UI Library, State Management |
| **Backend Stack** | Runtime, Framework, API Style (REST/GraphQL) |
| **Instances** | How many services/servers needed |
| **Workers** | If background jobs, queues, cron needed |
| **User Interfaces** | Storefront, Admin Panel, User Dashboard (separate or unified) |
| **Database** | Type, instances, replicas |
| **Scalability** | Horizontal/Vertical, auto-scaling, CDN |

**Generated Architecture Layer Example:**

```
+---------------------------------------------------------------+
|  ARCHITECTURE LAYER - Delivery App v2                         |
+---------------------------------------------------------------+
|                                                               |
|  TYPE: Monolithic with separation of concerns                 |
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
|  | - Server: 1 instance (Vercel)                     |        |
|  | - Workers: Vercel Cron (emails, notifications)    |        |
|  +---------------------------------------------------+        |
|                                                               |
|  +---------------------------------------------------+        |
|  | INTERFACES                                        |        |
|  | - Storefront: /app (public)                       |        |
|  | - Admin Panel: /admin (separate, protected)       |        |
|  | - User Dashboard: /dashboard (authenticated)      |        |
|  +---------------------------------------------------+        |
|                                                               |
|  +---------------------------------------------------+        |
|  | DATABASE                                          |        |
|  | - Type: PostgreSQL (Neon)                         |        |
|  | - Instances: 1 (with connection pooling)          |        |
|  | - Replicas: No (MVP)                              |        |
|  +---------------------------------------------------+        |
|                                                               |
|  +---------------------------------------------------+        |
|  | SCALABILITY                                       |        |
|  | - Model: Vertical initial -> Horizontal in v2     |        |
|  | - CDN: Vercel Edge Network                        |        |
|  | - Cache: Redis (if real-time activated)           |        |
|  | - Auto-scaling: Vercel automatic                  |        |
|  +---------------------------------------------------+        |
|                                                               |
|  ESTIMATED MONTHLY COST: $45-85                               |
|  TECHNOLOGIES: 8                                              |
|  REQUIRES AGENTS: No                                          |
|                                                               |
|  [Edit Architecture]  [Generate ARCHITECTURE.md]              |
+---------------------------------------------------------------+
```

**Generation Flow:**
1. User selects strategies per feature
2. Nexus analyzes technology combination
3. Infers optimal architecture type
4. Generates Architecture Layer Dashboard
5. User can manually adjust
6. On confirm → Automatically generates ARCHITECTURE.md

---

**Project Summary (Auto-calculated):**
- 💰 Estimated monthly cost: $75-120
- 🎯 Average complexity: ★★★☆☆
- 🔧 Required technologies: 7
- ⚠️ Requires agents: Yes/No
- ⚠️ Requires microservices: Yes/No

**Database Schema:**

```sql
-- Available strategies by feature type
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
    implementation_steps JSONB,    -- Steps for Guided Setup
    pros JSONB,
    cons JSONB
)

-- User decisions per project
project_implementation_decisions (
    project_id UUID,
    feature_name TEXT,
    selected_strategy_id TEXT,
    reasoning TEXT,
    implementation_status TEXT     -- 'planned', 'in_progress', 'completed'
)

-- Calculated estimates per project
project_cost_estimates (
    project_id UUID,
    total_monthly_cost_usd DECIMAL,
    complexity_score DECIMAL,
    technologies JSONB,
    requires_agents BOOLEAN,
    breakdown JSONB
)

-- Generated Architecture Layer
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

**Flow:**
1. Nexus analyzes PRD and extracts features
2. For each feature, shows available strategies
3. User selects strategy (or accepts recommendation)
4. System calculates total costs
5. **[NEW]** Nexus generates Architecture Layer Dashboard
6. User reviews and adjusts architecture if needed
7. User confirms
8. Decisions are saved and feed:
   - ARCHITECTURE.md (automatically generated)
   - Roadmap with tasks and assigned builders

---

#### X. Guided Setup System
`Category: DIFFERENTIATOR` `Priority: HIGH`

Step-by-step guidance system for implementing complex strategies:

- **Trigger:** Activates when user chooses a strategy with `requires_agent=true` or `requires_microservice=true`
- **Session Management:** Saves progress, allows pause and resume
- **Step-by-Step Guidance:** Each step includes:
  - Explanation of WHY this step is necessary
  - EXACT commands to execute
  - EXPECTED output
  - How to VERIFY success
  - Troubleshooting if it fails
- **Code Generation:** Generates production-ready code if user needs it
- **Progress Tracking:** Visual of completed vs pending steps
- **Educational Mode:** Explains technical concepts in simple language

**Guided Setup Example for "Smart Agent Sync":**

| Step | Title | Description |
|------|-------|-------------|
| 1 | Create agent project | Set up Python FastAPI project |
| 2 | Install LangChain | `pip install langchain langgraph` |
| 3 | Define agent tools | Create custom functions for sync |
| 4 | Test agent locally | Run test scenarios |
| 5 | Deploy to Railway | `railway up` |
| 6 | Integrate with Next.js | Add API calls from frontend |

**Database Schema:**

```sql
guided_setup_sessions (
    id UUID PRIMARY KEY,
    project_id UUID,
    decision_id UUID,              -- Link to strategy decision
    strategy_id TEXT,
    current_step INT,
    total_steps INT,
    completed_steps JSONB,         -- [{step: 1, completed_at, notes}]
    session_state JSONB,           -- Saved state
    status TEXT                    -- 'active', 'paused', 'completed'
)
```

**Roadmap Interaction:**
- Each Guided Setup session appears as sub-tasks in Roadmap
- On completing all steps, main task is marked as completed
- Progress reflects in real-time

---

#### Y. Knowledge Base Indexer
`Category: DIFFERENTIATOR` `Priority: HIGH`

External source indexing system to keep Nexus knowledge base updated:

- **Multi-Source Ingestion:** URLs, PDFs, documents, images, spreadsheets
- **Crawl Sites:** Configurable depth to index complete sites
- **Entity Extraction:** LLM automatically extracts entities (builders, technologies, modules)
- **Vector Storage:** Chunks stored with embeddings for RAG
- **Auto-Fill Tables:** Detected entities map to existing tables
- **Review Queue:** Admin approves/rejects suggested changes
- **Source Linking:** Bidirectional source ↔ entity relationship

**Supported Source Types:**

| Type | Method | Example |
|------|--------|---------|
| URL Single | Fetch + parse HTML | docs.clerk.com/pricing |
| URL Crawl | Recursive fetch | Index all stripe.com/docs |
| PDF | PDF.js extraction | User manual |
| Document | Parsers (.doc, .md) | Technical specifications |
| Image | OCR (Tesseract/Vision) | Documentation screenshots |
| Spreadsheet | Row-by-row parsing | Technology comparisons |

**Target Entities:**

| Entity | Affected Tables | Auto-Extracted Fields |
|--------|-----------------|----------------------|
| Builder | builders, builder_stack, builder_integrations | stack, integrations, pricing, limitations |
| Technology | technology_index | version, pricing, free_tier, complexity |
| Module | module_catalog | sub_modules, complexity, estimated_prompts |
| Best Practice | builder_best_practices | category, description, example |

**Indexing Flow:**

1. Admin selects source type and URL/file
2. Selects target entity (builder, technology, etc.)
3. Configures options (crawl depth, extract to KB, store in vector)
4. Nexus processes: fetch → chunk → embed → extract entities
5. Extracted entities go to review queue with confidence score
6. Admin reviews: Approve / Modify / Reject / Skip
7. Approved changes apply to corresponding tables
8. Source links created for traceability

**Database Schema:**

```sql
indexing_jobs (
    id UUID PRIMARY KEY,
    source_type TEXT,              -- 'url_single', 'url_crawl', 'pdf', 'doc', 'image', 'spreadsheet'
    source_url TEXT,
    target_entity_type TEXT,       -- 'builder', 'technology', 'module', 'best_practice'
    target_entity_id UUID,         -- NULL if new
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
`Category: DIFFERENTIATOR` `Priority: CRITICAL`

One-by-one artifact generation with size selection and progress tracking:

- **Density Calculator:** Calculates project complexity based on modules, sub-modules, layers
- **Tier Selection:** User chooses Compact/Standard/Unlimited with visible tokens and costs
- **Sequential Generation:** PRD → Constitution → Architecture → Schema
- **Real-time Progress:** Progress bar per artifact with tokens used
- **Inline Preview:** See generated content immediately on completion
- **Edit on Complete:** Edit button available when each artifact finishes

**Artifact Tiers:**

| Tier | Tokens | Est. Cost | Included Content |
|------|--------|-----------|------------------|
| **Compact** | ~2,000 | ~$0.02 | Essentials only, bullet points |
| **Standard** | ~8,000 | ~$0.08 | Balanced with user stories and acceptance criteria |
| **Unlimited** | ~20,000 | ~$0.20 | Complete with examples, edge cases, migration guides |

**Density Score Formula:**

```
Density Score = (modules × 100) + (sub_modules × 30) + (arch_layers × 50) + (custom_inputs × 80)

Thresholds:
< 500  = Compact available
< 1500 = Standard minimum
> 1500 = Unlimited recommended
```

**Database Schema:**

```sql
project_artifact_config (
    id UUID PRIMARY KEY,
    project_id UUID UNIQUE,
    selected_tier TEXT,            -- 'compact', 'standard', 'unlimited'
    minimum_tier TEXT,             -- Calculated minimum tier
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

*— End of Document —*
