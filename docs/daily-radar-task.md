# Daily Radar Maintenance Task

The Pathways Professional Development Radar is maintained as a daily source-verification and discovery workflow.

## Daily objective

Find and verify professional-development opportunities that are relevant to healthcare education, biomedical sciences, nursing education, public health, counseling, rehabilitation, health informatics, AI in healthcare, simulation, research, workforce development, health equity, and community health.

## Daily workflow

1. Review the sources in `data/source-registry.json`.
2. Look for new opportunities and meaningful changes to existing opportunities.
3. Verify dates, prices, CE information, CFP/abstract status, and deadlines against the official source.
4. Do not infer missing values. Use `null` or an explicit "not listed" value when appropriate.
5. Normalize each opportunity to the schema in `data/schema.md`.
6. Deduplicate using stable official URLs and normalized titles.
7. Mark past opportunities as expired or remove them when appropriate.
8. Update `verification.last_verified` for opportunities that were actually checked.
9. Keep source facts separate from the Pathways relevance interpretation.
10. Commit substantive changes to `main`.

## Quality rule

The radar should prefer fewer verified opportunities over a larger database containing guessed or stale information.

## Automation

A scheduled ChatGPT task runs this workflow daily. The repository should remain usable even if the scheduled task finds no changes.
