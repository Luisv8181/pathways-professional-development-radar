# Opportunity Data Schema

| Field | Type | Meaning |
|---|---|---|
| id | string | Stable internal identifier |
| title | string | Opportunity title |
| organization | string | Host/provider |
| description | string | Source-derived summary |
| categories | string[] | Discovery categories |
| subcategories | string[] | Specific topics |
| audiences | string[] | Intended professions/roles |
| date_display | string/null | Event date |
| registration_deadline | string/null | Registration/submission deadline |
| format | string | Online, In-person, Hybrid |
| region | string | Geographic region |
| distance_miles | number/null | Approximate distance from Scranton |
| cost.amount | number/null | Known registration price |
| cost.display | string | Human-readable price |
| ce_available | boolean | CE/CME/etc. advertised |
| ce_types | string[] | CE types |
| abstract_or_cfp | boolean | Presentation/submission opportunity |
| pathways_relevance | string | high / medium / low / pending |
| pathways_reason | string | Internal interpretation, not source fact |
| official_url | string | Primary action/registration page |
| source_url | string | Verification source |
| verification.status | string | verified / needs_review / expired |
| verification.last_verified | string | ISO date |
| verification.verified_against | string | What was checked |\n\n## Recommended category vocabulary\n\nUse these discovery categories when applicable: `Pathway Programs`, `Medical School Advising`, `K-12 Health Careers`, `Health Professions Advising`, `Bridge Programs`, `Post-Baccalaureate`, `Student Success`, `Medical Education`, `Professionalism`, `Professional Readiness`, `Ethics`, `Coaching and Mentoring`, `Competency-Based Education`, `Faculty Development`, `Healthcare Education`, `Biomedical Sciences`, `Public Health`, `Nursing Education`, `Counseling`, `Health Informatics`, `AI in Healthcare`, `Simulation`, and `Research`.\n\nPathway records may serve students, advisors, educators, program staff, admissions professionals, faculty, or health-professions leaders. Professionalism should include professional identity formation, ethics, communication, accountability, relational skills, coaching, and readiness for health-professions training.

Never invent missing prices or deadlines. Keep source facts separate from interpretation.
