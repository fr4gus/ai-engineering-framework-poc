# Evaluation Framework

## Purpose

The Evaluation Framework defines how AI Engineering Runs are executed and compared.

Its objective is to ensure that experimental results are:

- Repeatable
- Fair
- Traceable
- Comparable

---

# Core Concepts

## Framework

The engineering methodology.

---

## Reference Application

The software being built.

---

## Experiment

A hypothesis being tested.

Example:

> Does using specialized models improve Reviewer quality?

---

## Run

One execution of the framework.

A Run is fully described by:

- framework version
- prompt version
- model configuration
- reference application
- Bolt set

---

# Reproducibility

Every Run must include:

- configuration
- timestamps
- prompts
- metrics
- outputs
- reports

---

# Run Manifest

Every Run must provide a manifest.

Example:

```yaml
run_id: RUN-001

framework_version: 1.0.0

reference_app:
  name: binary-puzzle
  version: 0.1.0

models:
  planner: gpt-5
  architect: gpt-5
  backend: qwen3
  frontend: gpt-5
  tester: gpt-5
  reviewer: gpt-5
```

---

# Success Metrics

Framework Metrics

- Bolt completion rate
- Average Bolt duration
- Rework rate
- Architecture violations
- Test pass rate

Agent Metrics

- Output quality
- Hallucination frequency
- Prompt adherence
- Context retention

Application Metrics

- Feature completion
- Defect density
- Performance
- Maintainability

---

# Guiding Principle

The objective is **not** to determine the "best model."

The objective is to determine which **agent configurations** produce the best engineering outcomes for a given workload.