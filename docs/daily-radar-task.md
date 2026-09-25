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
7. Apply the active-date rule: remove opportunities from `data/opportunities.json` once their relevant event date has fully passed. Do not leave completed events in the active dashboard.
8. For multi-date opportunities, keep the record while at least one meaningful event date, application deadline, registration window, or submission deadline remains current. Remove it once all relevant dates/windows have passed.
9. Update `verification.last_verified` for opportunities that were actually checked.
9. Keep source facts separate from the Pathways relevance interpretation.
11. Commit substantive changes to `main`.

## Active-date rule

The active opportunity database is forward-looking. Completed events and fully closed opportunities should be removed from `data/opportunities.json`, not merely left visible with an old date. Historical records may be preserved elsewhere later if an archive is introduced.

## Quality rule

The radar should prefer fewer verified opportunities over a larger database containing guessed or stale information.

## Automation

A scheduled ChatGPT task runs this workflow daily. The repository should remain usable even if the scheduled task finds no changes.
