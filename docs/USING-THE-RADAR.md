# Using the Radar

## For everyday users

You do not need GitHub or programming knowledge.

Use the dashboard to:
1. Search for a topic or organization.
2. Apply filters.
3. Open the official source.
4. Check the current registration, cost, dates, and deadlines.
5. Decide whether the opportunity fits your role and needs.

## Suggested search approach

Start broad, then narrow.

For example:
- Search **AI** to see AI-related opportunities.
- Add **Medical Education** or another category if needed.
- Turn on **CE available** if continuing education matters.
- Turn on **CFP / abstract** if you are looking for opportunities to present or submit work.
- Use **Cost** when budget is a constraint.

## Understanding opportunity information

The dashboard separates source information from Pathways interpretation.

**Source facts** include official event date, registration deadline, published price, format, location, CE information, and abstract/CFP information.

**Pathways relevance** explains why the opportunity may connect to Pathways work. It should not be treated as an organizer's endorsement or as a recommendation to attend.

## Verification standard

Before an opportunity is added or materially updated, maintainers should verify important details against an official source whenever possible.

Never guess price, deadline, CE amount/type, event date, or registration status.

If the official source does not list a value, record it as unknown or not listed.

## Keeping the list current

The active database is not intended to become a historical archive.

Remove an opportunity from the active feed when its event date has fully passed and there is no remaining relevant future date or open window; its application deadline has passed and there is no remaining active opportunity; or its registration/submission window has closed and no meaningful future date remains.

Keep a multi-date opportunity active when at least one meaningful future date or open deadline/window remains.

## For maintainers

The main files you are likely to touch are:
- `data/opportunities.json` — active opportunities
- `data/source-registry.json` — organizations/sites to monitor
- `docs/daily-radar-task.md` — maintenance rules
- `data/schema.md` — field definitions

The website files (`index.html`, `styles.css`, `app.js`) should only need changes when the dashboard itself is being redesigned or its behavior is changing.