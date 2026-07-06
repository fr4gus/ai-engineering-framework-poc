# Project Narrative: Building an AI-Driven Engineering System

**Version:** 1.0.0  
**Status:** Living Document  
**Purpose:** Explain the evolution of the system from a simple game idea into an AI engineering framework

---

# 1. Origin: A Simple Game Idea

This project began with a simple goal:

> Build a small web-based puzzle game (Binary Puzzle) with authentication and a scoreboard.

The initial intent was practical:

- A small, complete web application
- Something achievable in ~1 month
- A real production-like stack
- A learning exercise for modern web architecture

At this stage, the system design included:
- React/Angular frontend
- Backend API
- Authentication (email + Google)
- PostgreSQL or lightweight persistence
- Scoreboard system

---

# 2. First Shift: From Application to Structured Development

As the design evolved, the focus shifted from *building the game* to *how the game should be built*.

This introduced a key idea:

> What if software development itself could be modeled as a deterministic system?

Instead of:
- “developers writing code”

We moved toward:
- “agents executing structured roles”

This led to the introduction of:
- Product Owner (PO)
- Engineering Manager (EM)
- Planner
- Architect
- Implementation Agents

At this point, the project stopped being just a game and became a **workflow system**.

---

# 3. Second Shift: Introducing the Bolt Concept

To enable structured execution, we introduced the concept of a:

> **Bolt = atomic unit of work**

Each Bolt represents:
- A single objective
- Clear scope boundaries
- Defined acceptance criteria
- Independent executability

This allowed the system to:
- Break down work deterministically
- Avoid ambiguity in execution
- Enable parallel agent reasoning

The game became secondary; the Bolt system became primary.

---

# 4. Third Shift: Validation as First-Class Citizens

As the system grew, we identified a critical gap:

> Execution alone is not enough — validation must be independent.

This led to the introduction of two validation layers:

## Tester Agent
- Validates functional correctness
- Ensures acceptance criteria are met
- Detects regressions

## Reviewer Agent
- Validates architecture and code quality
- Enforces conventions
- Acts as final technical gate

This created a separation between:
- “Does it work?” (Tester)
- “Should we accept it?” (Reviewer)

---

# 5. Fourth Shift: Observability Through the EM Dashboard

At this stage, the system was functional but not observable.

To solve this, we introduced:

> The Engineering Manager Dashboard (EM Dashboard)

A real-time visualization layer that provides:
- Bolt lifecycle tracking
- Agent activity monitoring
- Workflow state visualization
- Bottleneck detection

This transformed the system into something that is not only executable but **observable and measurable**.

---

# 6. Fifth Shift: Standardization Through Templates

To ensure consistency across all agents, we introduced:

- Bolt templates
- Test reports
- Review reports
- Deployment reports
- Agent logs
- ADRs

This step ensured:
- Deterministic outputs
- Structured evaluation
- Comparable agent performance

The system became **data-driven instead of narrative-driven**.

---

# 7. Sixth Shift: From Design to Executable Agents

The final major shift was defining agents not just as concepts, but as **prompt-based executable roles**.

Each agent now has:
- A strict system prompt
- Defined responsibilities
- Clear input/output contracts
- Hard operational boundaries

This makes the system compatible with:
- Local LLMs
- Multi-model comparison
- Agent orchestration frameworks
- AI evaluation pipelines

---

# 8. Current State: What This System Really Is

What started as a simple web application has evolved into:

> An AI-driven software engineering simulation framework

It includes:

## Execution Layer
- Backend Agent
- Frontend Agent
- DevOps Agent

## Coordination Layer
- Engineering Manager
- Planner
- Architect

## Validation Layer
- Tester Agent
- Reviewer Agent

## Observability Layer
- EM Dashboard
- Agent Logs
- Reports

---

# 9. Key Insight

The most important realization in this project was:

> The value is not the game itself, but the system that builds the game.

The Binary Puzzle game is now just:
- A reference implementation
- A test workload
- A demonstration target

The real product is the **engineering system itself**.

---

# 10. Why This Matters

This system enables:

- Reproducible AI-driven development workflows
- Structured evaluation of LLM capabilities
- Agent role specialization benchmarking
- End-to-end software lifecycle simulation

It is both:
- A software engineering framework
- A research environment for AI systems

---

# 11. Next Evolution Step

With the system now defined, the next phase is execution:

- First real Bolt (BOLT-001)
- End-to-end pipeline execution
- Agent performance evaluation
- Tech talk / blog narrative based on real results

---

