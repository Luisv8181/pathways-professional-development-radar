# Shadowing Network Build Log

## 2026-11-03 — Initial design and protocol

- Reviewed existing Pathways Professional Development Radar architecture: static GitHub Pages app with public opportunity data and student discovery area.
- Defined shadowing as a dedicated student pathway, separate from the general professional-development feed.
- Designed a staged workflow: discover → express interest via approved secure channel → coordinator review → requirements plan → readiness gate → experience → reflection/follow-up.
- Added partner vetting, partner outreach kit, student guide, requirements matrix, privacy/minor safeguards, host-specific paperwork rules, and pilot metrics.
- Security boundary: static GitHub Pages and public repository are not used to store student-level PII, health/immunization records, background-check results, signed documents, patient information, or private placement status.
- Next: connect the student-facing page to the program's approved secure student intake/record platform; implement staff-only partner and request management with role-based access and audit trails.

## 2026-11-03 — Pilot tools and student passport

- Added an in-page paperwork navigator with a general host-dependent checklist. The checklist is not a submission portal and does not prove clearance.
- Added a print-ready student career exploration passport for reflections after a career conversation, tour, simulation, research observation, or approved shadowing experience.
- Passport entries exist only in the current browser session; no student account, backend, database, local storage, or server submission is implemented.
- Added a 90-day pilot implementation plan with governance gates, partner recruitment, student matching, placement readiness, and evaluation criteria.
- Added a non-sensitive partner prospect pipeline template. Organization categories are prospecting ideas, not confirmed host partners.
- Next technical phase: select an institution-approved identity, secure document exchange, and case-management platform; then implement role-based coordinator workflows and auditable student-level status tracking there. Do not add student PII or sensitive records to GitHub Pages.
