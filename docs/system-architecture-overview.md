# System Architecture Overview

This document describes the full relationship between agents, artifacts, and system layers.

---

# 1. High-Level System Structure

```mermaid
flowchart TD

PO[Product Owner] --> EM[Engineering Manager]

EM --> PL[Planner]
EM --> ARCH[Architect]

PL --> BOLT[Bolt Specification]
ARCH --> BOLT

BOLT --> ASSIGN[EM Assignment]

ASSIGN --> BE[Backend Agent]
ASSIGN --> FE[Frontend Agent]
ASSIGN --> DO[DevOps Agent]

BE --> TESTER[Tester Agent]
FE --> TESTER
DO --> TESTER

TESTER --> REVIEWER[Reviewer Agent]

REVIEWER -->|Approved| ACCEPTED[Accepted]
REVIEWER -->|Rework| BE

ACCEPTED --> EM[Engineering Manager]
EM --> PO[Product Owner Closure]
PO --> CLOSE[Close Bolt]
```

---

# 2. System Layers

## 2.1 Control Layer (Decision Makers)

- Engineering Manager (EM)
- Planner
- Architect

These define:
- what is built
- how it is structured
- how it is decomposed

---

## 2.2 Execution Layer (Builders)

- Backend Agent
- Frontend Agent
- DevOps Agent

These implement:
- functionality
- infrastructure
- UI

---

## 2.3 Validation Layer (Truth System)

- Tester Agent
- Reviewer Agent

These ensure:
- correctness (Tester)
- quality & architecture (Reviewer)

---

## 2.4 Observability Layer

- EM Dashboard
- Agent Logs
- Reports

These provide:
- system visibility
- traceability
- metrics

---

# 3. Artifact Relationships

```mermaid
flowchart LR

INTENT[Product Intent] --> BOLT[Bolt Spec]

BOLT --> CODE[Implementation]
CODE --> TEST[Test Report]
TEST --> REVIEW[Review Report]

REVIEW --> DECISION[Approve / Rework / Reject]

DECISION --> EM[Engineering Manager]
EM --> DASH[EM Dashboard]
```

---

# 4. State Flow Across System

```mermaid
stateDiagram-v2

Draft --> Planned
Planned --> Approved
Approved --> Assigned
Assigned --> InProgress
InProgress --> Testing
Testing --> Review
Review --> Rework
Review --> Accepted
Accepted --> Closed
```

---

# 5. Key Insight

This system is designed as a:

> multi-layer deterministic engineering pipeline

Where:

- Control Layer defines intent
- Execution Layer produces artifacts
- Validation Layer enforces correctness
- Observability Layer provides truth

---

# 6. Why This Matters

This diagram represents the core innovation of the system:

- separation of concerns across agents
- strict lifecycle enforcement via Bolts
- independent validation layers
- observable AI-driven engineering pipeline

---

# End of System Architecture Overview
