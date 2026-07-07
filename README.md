# AI Engineering Framework (Working Title)

> A framework for building software through specialized AI agents using structured engineering workflows.

## Vision

This project explores whether software engineering can be organized as a deterministic workflow executed by specialized AI agents instead of a single general-purpose assistant.

Rather than asking one model to "build an application", the framework separates responsibilities into distinct engineering roles such as:

- Product Owner
- Engineering Manager
- Planner
- Architect
- Backend Engineer
- Frontend Engineer
- DevOps Engineer
- Tester
- Reviewer

Each role operates within clearly defined boundaries and communicates through standardized artifacts called **Bolts**.

## Why?

Large Language Models are excellent at many software engineering tasks, but they often struggle with:

- Maintaining architectural consistency
- Preserving long-term context
- Separating concerns
- Following repeatable engineering processes

This framework investigates whether assigning specialized responsibilities to individual agents can produce more reliable software development.

## Repository Structure

```text
docs/
framework/
evaluation/
reference-apps/
scripts/
```

## Reference Applications

Current reference applications:

- Binary Puzzle (in development)

Future examples may include:

- Todo Application
- Inventory Management
- E-commerce
- IoT Dashboard

## Current Status

Framework Development

- ✅ Documentation
- ✅ Agent definitions
- ✅ Runtime protocol
- ✅ Prompt library
- ⏳ First execution run

Reference Application

- ⏳ Binary Puzzle MVP

## Goals

- Deterministic software development
- Reproducible AI experiments
- Model comparison
- Agent specialization
- Educational material
- Research platform

## License

MIT