# Pathways Professional Development Radar

A professional-development discovery and tracking system for healthcare education, biomedical sciences, nursing education, public health, counseling, rehabilitation, health informatics, AI in healthcare, simulation, research, health-professions pathways, medical-school advising, K–12 health-care career exploration, pathway and bridge programs, student success, and professionalism.

## Core discovery domains

The radar explicitly tracks opportunities and resources related to:

- Health-professions and medical-school pathway programs
- Premedical and health-professions advising
- K–12 health-care career exploration, STEM pipelines, HOSA, and educator resources
- Bridge, post-baccalaureate, enrichment, and student-transition programs
- Medical education, curriculum, assessment, and competency-based education
- Professionalism, professional readiness, ethics, coaching, mentoring, and learner development
- Faculty, staff, program leadership, and student-success development
- Biomedical sciences, public health, counseling, nursing, health informatics, AI, simulation, and research

## V1

- Structured opportunity database
- Search and filters
- Cost, format, geography, CE, and deadline fields
- Pathways relevance notes
- Official-source verification
- GitHub Pages dashboard
- Data model prepared for automated scanning

## Data principles

1. Official source URLs are authoritative for registration, price, dates, and deadlines.
2. Every opportunity records when it was last verified.
3. Unknown values are null, not guesses.
4. AI relevance notes are interpretation, not source fact.
5. Duplicate events should be merged using stable source URLs and normalized titles.

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

The daily radar task reviews the source registry, checks official sources for new or changed opportunities, verifies current details, and updates the opportunity database when substantive changes are found. See [docs/daily-radar-task.md](docs/daily-radar-task.md).

## Disclaimer

Prices, dates, CE eligibility, and deadlines can change. Verify details on the official source before registering or submitting an abstract.
