# Open Questions

Questions requiring human approval.

---

No open questions.

---

# Resolved Questions

## OQ-001 - Approval artifact directories

Should `docs/test-reports/`, `docs/review-reports/`, and `docs/deployment-reports/` be created as part of `BOLT-DOC-001`?

Resolution: Yes. Directories are part of the documentation approval baseline.

---

## OQ-002 - Traceability matrix

Should `docs/traceability-matrix.md` be created before the first implementation Bolt?

Resolution: Yes. The current documentation contains enough information for the initial traceability matrix.

---

## OQ-003 - Automatic completion API call

Should the frontend automatically call `POST /attempts/{id}/complete` when a puzzle reaches a solved state?

Resolution: Yes. The frontend automatically finalizes completion, while the backend remains authoritative for validation.

---

## OQ-004 - Draft document approval status

Should Draft product and architecture documents be marked Approved after `BOLT-DOC-001` closes, or remain Draft but accepted as the first-run baseline?

Resolution: Mark them Approved after `BOLT-DOC-001` closes.
