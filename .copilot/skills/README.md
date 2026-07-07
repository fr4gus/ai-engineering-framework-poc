# Project-Level Skills

This directory contains project-specific skills that orchestrate specialized agents for structured development workflows.

## Available Skills

### bolt-planning

**Purpose:** Orchestrate Planner and Engineering Manager agents to decompose features into executable Bolts.

**Location:** `./bolt-planning/`

**Invocation:**
```bash
copilot /bolt-planning bootstrap        # Plan all 8 initial Bolts
copilot /bolt-planning next             # Plan next sequential Bolt
copilot /bolt-planning feature:NAME     # Plan Bolts for specific feature
```

**Documentation:**
- [`bolt-planning/README.md`](./bolt-planning/README.md) - Overview & workflow
- [`bolt-planning/QUICK-REFERENCE.md`](./bolt-planning/QUICK-REFERENCE.md) - Quick start guide
- [`bolt-planning/bolt-planning-invoke.md`](./bolt-planning/bolt-planning-invoke.md) - Detailed guide

**Agents Involved:**
- Planner - Decomposes features into Bolt specifications
- Engineering Manager - Validates and approves Bolts

**Modes:**
- `bootstrap` - Plan BOLT-001 through BOLT-008
- `next` - Plan the next sequential Bolt
- `feature:NAME` - Plan Bolts for a specific feature

## Skill Development Guide

### Creating New Skills

To add a new project-level skill:

1. Create a directory: `mkdir -p .copilot/skills/my-skill/`
2. Add required files:
   - `README.md` - Skill documentation
   - `skill-config.json` - Metadata and configuration
   - Implementation files (scripts, prompts, etc.)

3. Update this README with skill information

### Skill Structure

Each skill should include:

```
my-skill/
├── README.md              # Overview & usage
├── skill-config.json      # Metadata & configuration
├── QUICK-REFERENCE.md     # Quick start guide (optional)
├── implementation files   # Scripts, prompts, etc.
└── docs/                  # Additional documentation (optional)
```

### skill-config.json Format

```json
{
  "name": "my-skill",
  "version": "1.0.0",
  "description": "Brief description",
  "agents_involved": ["Agent1", "Agent2"],
  "modes": ["mode1", "mode2"],
  "inputs": ["file1", "file2"],
  "outputs": ["output1", "output2"],
  "success_criteria": ["Criterion 1", "Criterion 2"],
  "related_skills": ["other-skill"]
}
```

## Integration with Framework

All skills integrate with:
- Framework verification documentation at `/VERIFICATION-REPORT.md`
- Phase 1-2 planning at `/NEXT-STEPS.md`
- Pre-flight checklist at `/READY-TO-BOLT-CHECKLIST.md`
- Agent logs at `/docs/agents-log.md`
- Bolt directory at `/docs/bols/`

## Metrics & Tracking

Skills automatically track:
- Execution time and performance
- Success/failure rates
- Agent interaction metrics
- Output quality indicators

Metrics are logged to `/docs/agents-log.md` and aggregated in the Engineering Manager Dashboard.

---

Last Updated: 2026-07-06
