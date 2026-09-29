# Pathways Professional Development Radar

A professional-development discovery and tracking system for the Pathways team. It tracks healthcare education, biomedical sciences, nursing education, public health, counseling, rehabilitation, health informatics, AI in healthcare, simulation, research, health-professions pathways, medical-school advising, K–12 health-care career exploration, pathway and bridge programs, student success, and professionalism.

## Live dashboard

**Live dashboard:** https://luisv8181.github.io/pathways-professional-development-radar/

## Start here

**If you are not a developer, you only need these two places:**

1. **Open the dashboard:** use the GitHub Pages site to search and filter opportunities.
2. **Read [Start Here for Pathways](docs/START-HERE.md):** a plain-language guide to what this repository contains and where to look.

You do **not** need to understand the code to use the radar.

## What is where?

| Folder / file | What it is | Who needs it |
|---|---|---|
| **Dashboard** | The searchable opportunity website | Everyone |
| [docs/START-HERE.md](docs/START-HERE.md) | Plain-language orientation | Everyone |
| [docs/USING-THE-RADAR.md](docs/USING-THE-RADAR.md) | How to search, verify, and use opportunities | Everyone |
| [data/opportunities.json](data/opportunities.json) | Current professional-development opportunities | Maintainers |
| [data/student-opportunities.json](data/student-opportunities.json) | Current high-school student opportunities | Maintainers |
| [data/source-registry.json](data/source-registry.json) | Trusted organizations/sites we monitor | Maintainers |
| [data/schema.md](data/schema.md) | Technical data-field description | Developers/maintainers |
| [docs/daily-radar-task.md](docs/daily-radar-task.md) | Daily maintenance rules | Maintainers/automation |
| index.html, styles.css, app.js | Website code | Developers |

**Simple rule:** start with the dashboard. If you want to understand the project, read `docs/START-HERE.md`. Ignore the code unless you are maintaining or developing the site.

## Core discovery domains

The radar explicitly tracks opportunities and resources related to:

- Health-professions and medical-school pathway programs
- Premedical and health-professions advising
- K–12 health-care career exploration, STEM pipelines, HOSA, student competitions, college readiness, and educator resources
- Bridge, post-baccalaureate, enrichment, and student-transition programs
- Medical education, curriculum, assessment, and competency-based education
- Professionalism, professional readiness, ethics, coaching, mentoring, and learner development
- Faculty, staff, program leadership, and student-success development
- Biomedical sciences, public health, counseling, nursing, health informatics, AI, simulation, and research

## Data principles

1. Official source URLs are authoritative for registration, price, dates, and deadlines.
2. Every opportunity records when it was last verified.
3. Unknown values are null, not guesses.
4. AI relevance notes are interpretation, not source fact.
5. Duplicate events should be merged using stable source URLs and normalized titles.
6. The active dashboard is forward-looking: completed opportunities are removed after their relevant dates/windows have passed.
7. Multi-date opportunities remain active while a meaningful future event date, application deadline, registration window, or submission deadline remains open.
8. Past events are not kept in the active opportunity feed just for historical completeness.

## Roadmap

### Phase 1
- [x] Static dashboard
- [x] Structured data model
- [x] Filters and search
- [x] GitHub Pages deployment

### Phase 2
- [x] Source registry
- [ ] Automated discovery
- [ ] Extraction and normalization
- [ ] Deduplication
- [ ] Expiration detection
- [ ] Weekly digest generation
- [x] Daily maintenance task

### Phase 3
- [ ] Saved opportunities
- [ ] Team-specific profiles
- [ ] Calendar export
- [ ] Abstract/CFP tracking
- [ ] Funding and reimbursement fields
- [ ] Email/Slack digest

## Daily maintenance

The daily radar task reviews the source registry, checks official sources for new or changed opportunities, verifies current details, and updates the professional and student opportunity feeds when substantive changes are found. Student opportunities are maintained separately so the professional-development feed remains focused on staff, faculty, and program leaders. See [docs/daily-radar-task.md](docs/daily-radar-task.md).

## Disclaimer

Prices, dates, CE eligibility, and deadlines can change. Verify details on the official source before registering or submitting an abstract.