# Engineering Manager Dashboard Specification

**Document ID:** EM-DASH-014
**Version:** 1.0.0  
**Status:** Active  
**Owner:** Engineering Manager  

---

# 1. Purpose

The Engineering Manager (EM) Dashboard provides a real-time visualization of the AI Engineering System.

It is designed to:

- Track Bolt lifecycle state
- Visualize workflow progress
- Display agent activity
- Highlight blockers and risks
- Provide system-level observability

---

# 2. Core Philosophy

The dashboard is NOT a product UI.

It is an **engineering observability tool** for:

- AI agents
- Human operators
- System evaluation

---

# 3. Primary Users

- Engineering Manager (primary)
- Product Owner (human oversight)
- Architect (design validation)
- Observers (for demo / education / research)

---

# 4. Core Entities Visualized

## 4.1 Bolts

Each Bolt must display:

- Bolt ID
- Title
- Bolt Branch
- Current State
- Assigned Agent(s)
- Complexity
- Blocker status
- Pull request status, when applicable

---

## 4.2 Agent Activity

Each agent displays:

- Current task
- Active Bolt
- Last action timestamp
- State transitions performed

---

## 4.3 System Flow

Visualization of:

```text
Planner → Architect → Implementation → Tester → Reviewer → EM
```

---

# 5. Dashboard Layout

## 5.1 Global View

- Total Bolts
- Active Bolts
- Blocked Bolts
- Completed Bolts

---

## 5.2 Bolt Board (Core View)

A Kanban-style board:

```
[ Draft ] → [ Planned ] → [ Approved ] → [ Assigned ] → [ In Progress ] → [ Testing ] → [ Review ] → [ Accepted ] → [ Closed ]
```

Each card includes:

- Bolt ID
- Title
- Bolt Branch
- Assigned agent
- Status indicators

---

## 5.3 Agent Panel

Shows:

- Active agents
- Current tasks
- Load distribution
- Idle vs active time

---

## 5.4 Workflow Timeline

Displays:

- Bolt lifecycle transitions over time
- Bottlenecks
- Average cycle time per stage

---

## 5.5 Blocker Panel

Shows:

- Blocked Bolts
- Reason for blockage
- Responsible agent
- Escalation status

---

# 6. Key Metrics

## 6.1 Delivery Metrics

- Total Bolts created
- Completed Bolts
- Average cycle time
- Rework rate

---

## 6.2 Quality Metrics

- Tester failure rate
- Reviewer rejection rate
- Rework loops per Bolt

---

## 6.3 Flow Metrics

- Time in each Bolt state
- Bottleneck detection
- Agent idle time

---

# 7. Event System

The dashboard is updated based on:

- Bolt state transitions
- Agent log entries
- Tester results
- Reviewer decisions
- EM assignments
- Bolt Branch creation or verification
- Pull request creation after acceptance

---

# 8. Data Sources

The dashboard consumes:

- `/docs/agents-log.md`
- Bolt specifications
- Test reports
- Review reports
- Deployment reports

---

# 9. Visualization Rules

## 9.1 Real-time updates preferred

Updates should reflect:

- State transitions immediately
- Agent actions as they occur

---

## 9.2 Traceability

Every UI element must be traceable to:

- Bolt ID
- Bolt Branch
- Agent action
- Log entry

---

## 9.3 Deterministic state

No ambiguous states allowed.

A Bolt MUST always be in exactly one state.

---

# 10. Suggested Technical Implementation

## Option A (MVP)

- React or Angular frontend
- Simple REST API backend
- File-based storage (initial phase)

---

## Option B (Production-like)

- React + WebSocket updates
- Node.js backend
- PostgreSQL for persistence
- Event-driven state updates

---

## Option C (AI-native observability)

- Event stream (Bolt lifecycle events)
- In-memory event bus
- Real-time agent simulation interface

---

# 11. Event Model

Each system event:

```json
{
  "timestamp": "UTC",
  "bolt_id": "BOLT-001",
  "agent": "Tester",
  "event_type": "STATE_CHANGE",
  "from": "InProgress",
  "to": "Testing",
  "message": "All tests passed"
}
```

---

# 12. Alerts

The system must highlight:

## Critical Alerts
- Blocked Bolts > 24h
- Repeated test failures
- Review rejection loops

---

# 13. Dashboard Philosophy

The EM Dashboard is the **truth layer of the system**.

It is the only place where:

- Execution reality is visible
- System health is observable
- Agent behavior becomes measurable

---

# 14. Success Criteria

The dashboard is successful if:

- Any Bolt state can be tracked end-to-end
- Bottlenecks are visible
- Agent activity is observable
- System flow is understandable within 30 seconds

---

# 15. System Dependency

The EM Dashboard is a required operational tool for the Engineering Manager.

It is used as a real-time source of truth for:

- Bolt lifecycle tracking
- System health monitoring
- Execution visibility

# End of EM Dashboard Specification
