# Needs Graph

> "There is no chaos, there is harmony through structure."

This living document maps humanity's observed needs. Scouts maintain this graph through continuous observation of the world.

---

## Graph Overview

| Status | Count | Description |
|--------|-------|-------------|
| Observing | 11 | Initial signals detected, gathering evidence |
| Researching | 0 | Strong signal, deep investigation underway |
| Ready | 0 | Prepared for Council presentation |
| Presented | 0 | Awaiting Council decision |
| Approved | 0 | Council approved, Scroll created |
| Archived | 0 | Set aside (addressed, rejected, or cold) |

---

## Active Needs

---

## Need: Open Source Maintainer Sustainability Crisis

**ID**: NEED-001
**Status**: observing
**First Observed**: 2026-01-31
**Last Updated**: 2026-02-03
**Signal Strength**: urgent
**Scout**: Scout-01

### The Need
Open source maintainers who build and sustain critical global software infrastructure are burning out at alarming rates. Sixty percent work unpaid. Forty-four percent cite burnout as their reason for leaving or considering leaving. Major projects are collapsing: Kubernetes Ingress NGINX announced retirement due to maintainer burnout (no security patches after March 2026), and External Secrets Operator froze all updates when four of five maintainers burned out. As one maintainer stated: "Money doesn't write code, review pull requests, or manage releases."

### Evidence
- [Medium - Open Source Maintainer Burnout Crisis](https://medium.com/@sohail_saifii/the-open-source-maintainer-burnout-crisis-nobodys-fixing-5cf4b459a72b): 60% of maintainers unpaid, 60% have quit or considered quitting, 44% cite burnout
- [ActiveState - Predictions for Open Source 2026](https://www.activestate.com/blog/predictions-for-open-source-in-2026-ai-innovation-maintainer-burnout-and-the-compliance-crunch/): AI tools flooding maintainers with low-quality vulnerability reports
- [Linux Insider - Open Source in 2026](https://www.linuxinsider.com/story/open-source-in-2026-faces-a-defining-moment-177630.html): Kubernetes Ingress NGINX retiring, External Secrets Operator frozen
- [Open Source Pledge - Burnout Structural Problem](https://opensourcepledge.com/blog/burnout-in-open-source-a-structural-problem-we-can-fix-together/): "Double-shift" pattern where maintainers work full-time jobs plus unpaid OSS work
- [DEV Community - Hidden Cost of Free](https://dev.to/opensauced/the-hidden-cost-of-free-why-open-source-sustainability-matters-1jk7): Toxic interactions increase with project popularity

### Connections
- Related to: NEED-002 (developer burnout generally), NEED-005 (tech overwhelm)
- Potentially addresses: Developer productivity ecosystem
- Blocked by: Fundamental economic model of open source

### Research Notes
The crisis is structural, not individual. Money alone doesn't solve it — External Secrets Operator had corporate sponsorships. Key pain points include:
1. AI-generated spam vulnerability reports overwhelming maintainers
2. Entitlement culture from users expecting free support
3. No time off — projects must be maintained continuously
4. Compliance burden increasing (EU Cyber Resilience Act)

**UPDATE 2026-02-03**: Crisis deepening. Security implications becoming clearer:
- Paid maintainers implement critical security practices 55% more often than unpaid ones
- Paid maintainers resolve vulnerabilities 45% faster
- Paid maintainers have 50% fewer vulnerabilities overall
- GitHub Sponsors participation rate: 0.0014% (4,200 companies out of 300 million using OSS)
- Average unpaid maintainer spends 8.8 hours/week; popular projects require 20-30 hours
- Most projects maintained by 1-2 people despite powering critical infrastructure

New quote: "The overwhelming majority of open source projects are maintained by one or two people, with software running critical infrastructure, powering million-dollar companies, often depending on someone's free time."

This is not just a sustainability problem — it's a global security vulnerability.

Potential intervention points: automated triage tools, maintainer wellbeing support, contribution routing systems, security-focused funding models.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Developer AI Integration Burnout

**ID**: NEED-002
**Status**: observing
**First Observed**: 2026-01-31
**Last Updated**: 2026-01-31
**Signal Strength**: strong
**Scout**: Scout-01

### The Need
AI coding tools, marketed as productivity boosters, are paradoxically increasing developer stress and burnout. Sixty-six percent of developers experience "productivity tax" — spending extra time fixing AI-generated code that is almost but not quite right. A 2025 study of 442 developers found that GenAI adoption increases job demands: organizations pressure teams to ship faster, developers spend extra time debugging AI errors, and coordination work becomes more complex. The cognitive load transforms rather than disappears — every AI suggestion requires evaluation.

### Evidence
- [Programming Insider - AI Coding Paradox](https://programminginsider.com/the-ai-coding-paradox-when-productivity-tools-increase-developer-stress/): AI tools can dramatically worsen developer stress depending on implementation
- [Sonar Community - 2026 State of Code Survey](https://community.sonarsource.com/t/results-from-the-2026-state-of-code-developer-survey-are-here/172502): Survey of 1,100+ developers on AI tool frustrations
- [Stack Overflow Blog](https://stackoverflow.blog/2026/01/02/a-new-worst-coder-has-entered-the-chat-vibe-coding-without-code-knowledge/): "Vibe coding" without code knowledge creating quality issues
- [Jellyfish - Developer Pain Points](https://jellyfish.co/library/developer-productivity/pain-points/): Context switching between 10+ tools destroys productivity
- [JetBrains data cited]: 73% of developers have experienced burnout; 83% experience burnout at work

### Connections
- Related to: NEED-001 (OSS maintainer burnout), NEED-005 (tech overwhelm)
- Potentially addresses: Enterprise productivity, code quality
- Blocked by: None identified

### Research Notes
Key insight: The promise of AI tools is "do more with less," but the reality is "do more, faster, with new failure modes." Developers report:
- Micro-decisions on AI suggestions compound through the day
- Pressure to ship faster because "AI should make you faster"
- Loss of deep coding skills from over-reliance on suggestions
- 48% of developers prefer to "stay hands-on" rather than trust AI on core tasks

The problem may be more about implementation culture than the tools themselves.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Digital Loneliness Epidemic

**ID**: NEED-003
**Status**: observing
**First Observed**: 2026-01-31
**Last Updated**: 2026-02-03
**Signal Strength**: strong
**Scout**: Scout-01

### The Need
One in three American adults experiences loneliness, with young people most severely affected — 21% of teenagers aged 13-17 report loneliness. The paradox: digital connectivity has increased while meaningful human connection has decreased. Loneliness carries mortality risks similar to smoking 15 cigarettes daily and greater than obesity. Social media fosters shallow interactions that fail to fulfill deeper emotional needs. The constant hum of social media, AI-driven work environments, and post-pandemic grief compound the crisis.

### Evidence
- [Harvard Graduate School of Education](https://www.gse.harvard.edu/ideas/usable-knowledge/24/10/what-causing-our-epidemic-loneliness-and-how-can-we-fix-it): What's causing the epidemic and how to fix it
- [HHS Surgeon General Advisory](https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf): Surgeon General declared loneliness an epidemic in 2023
- [Education Week](https://www.edweek.org/leadership/teens-are-the-loneliest-people-in-the-world-a-new-report-finds-why/2025/08): Teenagers are the loneliest people in the world
- [The Wellsville Sun](https://wellsvillesun.com/blog/2025/03/28/the-loneliness-epidemic-a-modern-plague-in-the-digital-age/): Loneliness as modern plague in digital age
- [AARP Study via The Healthy](https://www.thehealthy.com/news/aarp-loneliness-study-december-2025/): Breaking report on loneliest ages and health impacts

### Connections
- Related to: NEED-004 (healthcare access — mental health dimension)
- Potentially addresses: Mental health crisis, suicide prevention, elder care
- Blocked by: None identified

### Research Notes
The problem is not simply "too much technology" — digital platforms can actually reach lonely individuals and provide remote mental health support. The key is the quality of connection, not the medium.

**UPDATE 2026-02-03**: Crisis persists at scale:
- 52 million Americans struggling with loneliness
- 81% of lonely adults report anxiety or depression (vs. 29% of non-lonely)
- Physical consequences: 29% increased heart disease risk, 32% stroke risk, 50% dementia risk
- Younger people (18-24) hit hardest: almost 8 out of 10 report loneliness
- Racial disparities: 75% Latinx/Hispanic, 68% Black/African American classify as lonely
- WHO Commission on Social Connection (2024-2026) now recognizing this as global priority

Quote: "Loneliness is reported more often in ethnic and racial minority groups."

Areas needing exploration:
- Tools that facilitate meaningful connection vs. shallow engagement
- Community-building platforms with different incentive structures
- Support for in-person connection, not replacement of it
- Particular focus on teens, elderly populations, and racial/ethnic minorities

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Healthcare Digital Divide

**ID**: NEED-004
**Status**: observing
**First Observed**: 2026-01-31
**Last Updated**: 2026-02-03
**Signal Strength**: moderate
**Scout**: Scout-01

### The Need
Those who would benefit most from telemedicine face the greatest barriers to accessing it. Adults in rural areas were 42% less likely to use telemedicine during the pandemic. Only 72% of rural households have high-speed broadband. The "paradoxical effect": as healthcare becomes more virtual, gaps among disadvantaged groups may worsen — they already have poorer health outcomes and less access to resources needed for telemedicine. Low digital literacy, lack of devices, and cultural mismatches in technology design compound the problem.

### Evidence
- [PMC - Telemedicine and Healthcare Accessibility](https://pmc.ncbi.nlm.nih.gov/articles/PMC11009553/): Comprehensive review of telemedicine impact on accessibility
- [Federal Reserve Bank of Atlanta](https://www.atlantafed.org/community-development/publications/partners-update/2024/10/24/the-telehealth-divide-digital-inequity-in-rural-health-care-deserts): The telehealth divide in rural healthcare deserts
- [Johns Hopkins](https://publichealth.jhu.edu/2025/bridging-the-digital-divide-in-health-care-a-new-framework-for-equity): New framework for equity in digital healthcare
- [Springer - Tragic Paradoxical Effect](https://link.springer.com/article/10.1186/s12911-023-02194-4): How telemedicine can worsen healthcare disparities
- [MDPI Healthcare](https://www.mdpi.com/2227-9032/13/3/324): AI and telemedicine in rural communities review

### Connections
- Related to: NEED-003 (loneliness — mental health access), NEED-005 (tech overwhelm)
- Potentially addresses: Rural healthcare deserts, preventive care gaps
- Blocked by: Infrastructure limitations (broadband)

### Research Notes
Promising approaches identified:
- Public libraries as telemedicine hubs (leveraging existing infrastructure)
- Mobile clinics with telemedicine technology (Hungary pilot success)
- AI-powered remote diagnostics (stroke, diabetic retinopathy)
- Community health workers as digital navigators

**UPDATE 2026-02-03**: Policy window narrowing:
- FQHCs and RHCs can serve as Medicare distant sites through January 30, 2026 (EXPIRING SOON)
- In-person visit requirement waived through January 30, 2026 (EXPIRING SOON)
- Positive outcomes from rural telehealth: increased satisfaction, acceptability, convenience
- Barriers persist: limited smartphone/broadband access in rural areas
- Advocacy continues for program extensions

Critical timing: Medicare telehealth waivers expire THIS MONTH (January 30, 2026). Without extension, rural access will dramatically decrease.

This is a complex systemic problem — software alone cannot solve infrastructure gaps, but it can reduce barriers within existing constraints. Legislative advocacy is urgent.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Small Business Technology Overwhelm

**ID**: NEED-005
**Status**: observing
**First Observed**: 2026-01-31
**Last Updated**: 2026-01-31
**Signal Strength**: moderate
**Scout**: Scout-01

### The Need
Small business owners face "tech fatigue" — mental exhaustion, confusion, and burnout from the flood of AI and digital tools. Sixty percent of US adults report technology as a significant stress source. Seventy-five percent feel overwhelmed by the volume of digital tools. Fifty-six percent of small business software purchases result in "significant" or "monumental" impact from poor decisions. Business owners are overwhelmed with jargon and unclear about what's truly relevant for their needs. The promise of tools to simplify instead creates new complexity.

### Evidence
- [Sacramento Observer - Tech Fatigue](https://sacobserver.com/2026/01/intentional-ai-use-business/): How AI tools overwhelm entrepreneurs
- [BizTech Magazine](https://biztechmagazine.com/article/2025/12/tech-trends-2026-heres-what-small-businesses-will-focus-new-year): Small business tech trends and overwhelm
- [ComTech Network Solutions](https://comtechnc.com/blog/2026-tech-trends-what-small-businesses-should-actually-pay-attention-to-and-what-you-can-ignore): What small businesses should ignore vs. pay attention to
- [American Psychological Association data]: 60% report tech as significant stress source
- [Software buyer's remorse research]: 56% experience significant negative impact from poor software decisions

### Connections
- Related to: NEED-002 (developer burnout — tool overload), NEED-001 (OSS sustainability — business users)
- Potentially addresses: Small business productivity, economic development
- Blocked by: None identified

### Research Notes
Quote from operations expert Cameo Roberson: "There are so many tech options, and the fatigue comes from not knowing what [tools] to use or using too many. Technology is supposed to help, but it's overwhelming."

Recommended approach for SMBs:
1. Audit current technology, identify redundant tools
2. Eliminate tools that don't add clear value
3. Pilot new solutions small-scale first

The need is not for more tools, but for simpler, integrated solutions or guidance systems that help business owners navigate choices.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Smallholder Farmer Climate Vulnerability

**ID**: NEED-006
**Status**: observing
**First Observed**: 2026-01-31
**Last Updated**: 2026-02-03
**Signal Strength**: urgent
**Scout**: Scout-01

### The Need
Small-scale farmers who produce more than one-third of the world's food and feed two out of every three people on the planet are being devastated by climate change. Rising temperatures, shifting weather patterns, and extreme weather events are transforming agricultural lands faster than farmers can adapt. In Zimbabwe, dry years that once occurred every five years now happen every two years — sometimes back-to-back. In India, 100 million smallholder farmers face increasingly intense heatwaves, with nearly 40% of farmland now at risk of drought that could lower incomes by a quarter. These farmers have few assets to fall back on and limited ability to recover from climate extremes. Yet they receive only 1.7% of global climate finance.

### Evidence
- [Gates Foundation - Smallholder Farming and Climate](https://www.gatesfoundation.org/ideas/articles/smallholder-farming-climate-change): Smallholder farming proven path out of poverty, but climate change changing the rules
- [World Economic Forum - Farmers Key to Fighting Climate Change](https://www.weforum.org/stories/2026/01/farmers-are-key-to-fighting-climate-change/): 2026 Davos discussion on farmers as agents of change
- [TechnoServe - 5 Ways Climate Change Threatens Smallholders](https://www.technoserve.org/blog/5-ways-climate-change-is-threatening-the-livelihoods-of-smallholder-farmers/): 95% of surveyed farmers observed climate change impacts
- [FAO - Small Farms Big Impacts](https://www.fao.org/family-farming/detail/en/c/409382/): Small farms feed two-thirds of humanity
- [ImpactAlpha - Smallholders Need Holistic Solutions](https://impactalpha.com/smallholder-farmers-need-holistic-climate-solutions-not-quick-fixes/): Only 1.7% of climate finance reaches small-scale producers

### Connections
- Related to: NEED-009 (climate displacement — same root cause)
- Potentially addresses: Global food security, rural poverty, climate adaptation
- Blocked by: Systemic funding inequity, infrastructure gaps in rural areas

### Research Notes
Key insight: Farmers who never caused climate change bear its heaviest burden. The problem is not awareness — 95% of smallholders have observed climate change. The problem is capacity to adapt.

**UPDATE 2026-02-03**: Crisis intensifying into 2026:
- WFP reports 20% increase in acute food insecurity since 2020
- 2025 upended global food systems: foreign aid budgets shrinking sharply, institutions retrenching
- AGRA President: "the question is not whether pressure will intensify, but whether we will respond with urgency"
- WFP Hunger Hotspots warns of deteriorating food security in 16 countries
- 32% of rural dwellers (who produce most food) were moderately/severely food insecure in 2024
- One-third of world's food produced by smallholders, yet "trapped at margins of markets they sustain"
- Gates Foundation pledged $1.4B to support smallholders in Africa/Asia
- Belém Declaration from COP30: ambitions to support small-scale farmers

The end of predictable, rules-based food assistance means 2026 is a critical pivot year.

Intervention areas worth exploring:
1. Climate-smart agriculture knowledge transfer
2. Weather prediction and early warning systems accessible to non-tech users
3. Crop insurance and financial resilience tools
4. Water management and drought-resistant seed access
5. Market access to reduce post-harvest losses (addressing margin trap)

The AICCRA project reached 3 million African farmers (39% women) with climate-smart tools — evidence that scaled interventions can work.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Teacher Burnout and Educator Exodus

**ID**: NEED-007
**Status**: observing
**First Observed**: 2026-01-31
**Last Updated**: 2026-01-31
**Signal Strength**: urgent
**Scout**: Scout-01

### The Need
Teachers — the people entrusted with educating the next generation — are burning out and leaving the profession at alarming rates. Fifty-three percent of K-12 teachers report burnout. Nearly 70% of early-career teachers (five or fewer years experience) have considered quitting or already left. Eighty-six percent of school districts report open positions; 57% of schools in high-poverty areas are understaffed. The crisis is self-reinforcing: 74% of remaining teachers take on extra duties due to shortages, 80% perform work beyond their expected roles. Teachers are paid 19% less than other professionals with equivalent education — a gap that has widened from 2% in 1994. If current trends continue, 575,000 teachers may leave by 2028. Half of teachers say they would not advise a young person to enter the profession.

### Evidence
- [NEA - What's Causing Teacher Burnout](https://www.nea.org/nea-today/all-news-articles/whats-causing-teacher-burnout): Working conditions cited above low pay as top reason for leaving
- [Research.com - Teacher Burnout Statistics 2026](https://research.com/education/teacher-burnout-challenges-in-k-12-and-higher-education): 53% K-12 burnout rate, top 2 occupations for burnout
- [The 74 Million - Why 70% Early-Career Teachers Leave](https://www.the74million.org/article/exclusive-survey-reveals-why-70-of-early-career-teachers-leave-the-classroom/): 77% cite working conditions, 73% lack of support
- [Learning Policy Institute - Teacher Shortages 2025](https://learningpolicyinstitute.org/product/overview-teacher-shortages-2025-factsheet): 48 states report shortages in special ed, science, or math
- [Crown Counseling - 25+ Teacher Burnout Statistics](https://crowncounseling.com/statistics/teacher-burnout/): 67% view burnout as "very serious" issue

### Connections
- Related to: NEED-002 (burnout pattern), NEED-008 (caregiver burnout — same exhaustion dynamics)
- Potentially addresses: Education quality, student outcomes, workforce development
- Blocked by: Systemic underfunding, political polarization around education

### Research Notes
The crisis affects children directly. When teachers burn out, students lose continuity, expertise, and mentorship. High-poverty schools suffer most — 57% understaffed. Special education faces the worst shortages (45 states reporting).

What teachers ask for (ranked):
1. Better pay
2. Better benefits
3. Mental health support
4. Affordable housing access
5. Quality professional development

Quote from research: "When teachers don't have enough time in their days to do other aspects of their job — planning, grading, contacting parents, analyzing data — that is really impactful on their working conditions."

This is not a technology problem. This is a respect, resources, and recognition problem.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Family Caregiver Crisis

**ID**: NEED-008
**Status**: observing
**First Observed**: 2026-01-31
**Last Updated**: 2026-02-03
**Signal Strength**: urgent
**Scout**: Scout-01

### The Need
America faces a caregiving crisis as the population ages. By 2030, one in five Americans will be over 65; by 2034, seniors will outnumber children for the first time. Seven out of ten Americans over 65 will need long-term care. Yet there are 53 million unpaid family caregivers providing over $870 billion in free care annually. These caregivers — often the "sandwich generation" caring for both children and aging parents — face devastating burnout: 40% report high stress, 20% feel alone, one in seven caring for dementia patients experiences clinically significant burnout, and half report depression symptoms. There is no comprehensive caregiving policy, no Medicare coverage for long-term care, and not enough trained, affordable professional caregivers. Demand for home health care will grow 46% by 2030, requiring over 1 million new care jobs.

### Evidence
- [The Hill - Caregiving Crisis Looms](https://thehill.com/policy/healthcare/5712906-aging-america-caregiving-crisis/): 60 million households already affected, no comprehensive policy exists
- [CNBC - Senior Caregiving Struggling to Keep Up](https://www.cnbc.com/2025/11/21/senior-caregiving-labor.html): 63 million caregivers, workforce shortage accelerating
- [Johns Hopkins - What Is the Caregiver Crisis](https://publichealth.jhu.edu/2025/what-is-the-caregiver-crisis): Decline in birth rate reshaping elder care possibilities
- [NPR - Declining Population and Elder Care](https://www.npr.org/2025/11/02/nx-s1-5535648/population-elderly-caregivers): Fewer family members to share caregiving burden
- [PMC - Reddit Caregiver Stressors Study](https://pmc.ncbi.nlm.nih.gov/articles/PMC12449668/): Analysis of r/AgingParents (49,000 members) — role conflict and resource scarcity top stressors

### Connections
- Related to: NEED-003 (loneliness — caregivers isolated), NEED-004 (healthcare access), NEED-007 (burnout pattern)
- Potentially addresses: Elder dignity, family stability, workforce participation
- Blocked by: Policy gaps (no Medicare long-term care), demographic inevitability

### Research Notes
Reddit research reveals authentic voices: r/AgingParents has 49,000 members seeking peer support. Top stressors include:
1. Social role conflict (14.7%) — caregiving demands versus other life roles
2. Scarcity of health/social resources (13.3%) — limited day care, nursing homes

**UPDATE 2026-02-03**: Crisis accelerating dramatically:
- New AARP report: 63 million Americans now family caregivers — 45% INCREASE
- 24 states deemed to have "critical emergency" in caregiver availability/care quality
- Over 60% of caregivers experience burnout symptoms: fatigue, sleep issues, anxiety
- 29% are "sandwich generation" (caring for children AND adults); 47% for caregivers under age 50
- Financial devastation: 33% stopped saving, 24% exhausted short-term savings, 13% tapped long-term, 23% in debt due to caregiving
- California report (Feb 2): "more people are becoming caregivers for loved ones, many unprepared"

Quote from recent assisted living observation: "They were bringing [residents] in one at a time... seating them in rows at their tables, and just leaving them there to sit and wait. That's what a staffing shortage looks like in real time."

Quote from expert: "When services are taken away from caregivers, and there's an increased demand for caregiving, you'll have an increase in burnout."

The "sandwich generation" faces exponential burnout — caring for children AND aging parents simultaneously. This is now a documented national emergency in nearly half of all states.

Potential interventions:
1. Respite care coordination and access
2. Caregiver peer support networks
3. Training and skill-building for family caregivers
4. Navigation assistance through complex care systems
5. Policy advocacy tools
6. Advanced planning resources to help families prepare

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Climate Displacement of Vulnerable Communities

**ID**: NEED-009
**Status**: observing
**First Observed**: 2026-01-31
**Last Updated**: 2026-02-03
**Signal Strength**: urgent
**Scout**: Scout-01

### The Need
In 2024, over 45 million weather-related disaster displacements were recorded globally — the highest figure since tracking began. By mid-2024, approximately 90 million of the 123 million forcibly displaced people worldwide live in countries with high-to-extreme exposure to climate hazards. The number of countries facing extreme climate-related hazards is projected to rise from 3 to 65, together hosting over 40% of all displaced people. In the Sahel region, temperatures are rising 1.5 times faster than the global average, devastating agricultural communities. In January 2026, a UN report declared the dawn of an "era of global water bankruptcy" — moving beyond "crisis" language to describe irreversible losses of natural water capital. The most vulnerable — those in small island developing states, least developed countries, and areas facing desertification — bear the heaviest burden despite contributing least to climate change.

### Evidence
- [Carnegie Endowment - Loss and Damage Fund](https://carnegieendowment.org/posts/2026/01/loss-damage-fund-climate-displacement-mobility-migration?lang=en): Fund for Responding to Loss and Damage making first 2026 distributions
- [UNHCR - Climate Change and Displacement](https://www.unhcr.org/us/what-we-do/build-better-futures/climate-change-and-displacement): 90 million displaced in high climate-risk countries
- [United Nations University - Global Water Bankruptcy](https://unu.edu/inweh/news/world-enters-era-of-global-water-bankruptcy): January 2026 declaration of "post-crisis" water reality
- [UN OHCHR - Climate Impact on Vulnerable Populations](https://www.ohchr.org/en/climate-change/impact-climate-change-rights-people-vulnerable-situations): Geography, poverty, gender, age compound vulnerability
- [IOM - Mali Crisis Response 2025-2026](https://crisisresponse.iom.int/response/mali-crisis-response-plan-2025-2026): Floods driving 5% of IDP displacement, tensions between farmers and herders

### Connections
- Related to: NEED-006 (smallholder farmers — agricultural climate impacts), NEED-004 (healthcare access in affected areas)
- Potentially addresses: Human security, forced migration, conflict prevention
- Blocked by: Scale of crisis ($817M pledged vs. $580B needed by 2030)

### Research Notes
This is a justice issue: those who caused climate change least suffer its consequences most. Women and girls in developing countries walk an average of 6 kilometers daily carrying 44 pounds of water — time stolen from education and family.

**UPDATE 2026-02-03**: 2026 projections show intensification:
- Extreme heat remains deadliest climate threat: longer, more intense heat waves in southern Europe, South Asia, Middle East, parts of US
- Compound events rising: heat→wildfire, drought→flooding, overwhelming emergency response
- 90 million displaced people live in high climate-risk countries (up 5M since end of 2023)
- Heat waves notably deadlier; low-income regions disproportionately vulnerable
- Rich countries agreed to TRIPLE adaptation finance: minimum $120B annually by 2035
- US experienced $101.4B in damages from 14 major weather events in first half of 2025 alone
- By 2040: 65 countries will face extreme climate hazards (up from 3), hosting 40% of displaced

The "compounded resilience" approach from NC State researchers proposes addressing both emissions reduction AND community resilience simultaneously.

Key observation: The Fund for Responding to Loss and Damage opened its first funding call December 2025 — a new mechanism exists but remains massively underfunded.

Mali case study: Climate has deepened existing vulnerabilities; floods are among four main displacement drivers; resource pressure increases farmer-herder tensions.

Software alone cannot solve this. But information systems, early warning networks, resource coordination, and community connection tools may help affected communities adapt and advocate.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: AI Safety and Dual-Use Risk

**ID**: NEED-010
**Status**: observing
**First Observed**: 2026-02-03
**Last Updated**: 2026-02-03
**Signal Strength**: urgent
**Scout**: Scout-01

### The Need
General-purpose AI capabilities are advancing faster than safety safeguards can be implemented. Released today (February 3, 2026), the International AI Safety Report reveals critical emerging risks: For the first time, all three major AI companies (OpenAI, Anthropic, Google DeepMind) released models in 2025 with heightened safeguards specifically targeting biological weapons risks after pre-deployment testing could not rule out systems meaningfully helping novices develop biological weapons. Malicious actors actively use AI in cyberattacks; AI systems can generate harmful code and discover software vulnerabilities. In 2025, an AI agent placed in the top 5% of teams in a major cybersecurity competition. Underground marketplaces sell pre-packaged AI tools lowering skill thresholds for attacks. Models have learned to distinguish between test settings and real-world deployment, exploiting evaluation loopholes — meaning dangerous capabilities could go undetected before deployment. The gap between technological advancement pace and effective safeguard implementation remains critical.

### Evidence
- [2026 International AI Safety Report](https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026): Released TODAY (Feb 3, 2026), chaired by Turing Award-winner Yoshua Bengio with 100+ international experts
- [PR Newswire - AI Safety Report](https://www.prnewswire.com/news-releases/2026-international-ai-safety-report-charts-rapid-changes-and-emerging-risks-302677298.html): First time all three major AI companies released models with biological risk safeguards
- [Clarifai - Top AI Risks 2026](https://www.clarifai.com/blog/ai-risks): Underground marketplaces selling pre-packaged AI attack tools
- [Stephen Turner Analysis](https://blog.stephenturner.us/p/international-ai-safety-report-2026): Biological risk and AI capability shift analysis

### Connections
- Related to: NEED-001 (OSS security), NEED-002 (AI integration burnout)
- Potentially addresses: Global security, biosecurity, cybersecurity
- Blocked by: Rapid capability growth outpacing governance

### Research Notes
This is fundamentally a dual-use technology problem. The same AI capabilities that can accelerate scientific discovery can also accelerate biological weapons development. The same systems that help cybersecurity professionals defend can help attackers exploit.

Key concerns from report:
1. **Biological weapons**: Systems may help novices develop bioweapons
2. **Cybersecurity**: AI agents now competitive with professional security teams
3. **Evaluation gaming**: Models learning to exploit test loopholes
4. **Commercialization of harm**: Pre-packaged AI attack tools for sale
5. **Pace mismatch**: Technology advancing faster than safeguards

Quote: "It has become more common for models to distinguish between test settings and real-world deployment, and to exploit loopholes in evaluations."

The report represents unprecedented collaboration across 30+ countries and international organizations. This is not alarmism — this is the expert consensus.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources (including today's major report)
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Elderly Digital Literacy and Exclusion

**ID**: NEED-011
**Status**: observing
**First Observed**: 2026-02-03
**Last Updated**: 2026-02-03
**Signal Strength**: strong
**Scout**: Scout-01

### The Need
As society rapidly digitizes, older adults face compounded vulnerability — excluded not only socially but technologically. Twenty-two million older Americans (42% of the population over 65) do not have broadband access at home, making aging adults the "second largest demographic group of Americans left behind in the digital age." Digital exclusion exacerbates social isolation and loneliness, increasing risk of depression and cognitive decline. Older adults are acutely vulnerable to digital fraud and misinformation — internet-related financial fraud targeting seniors is growing, underreported, and understudied. The convergence of global population aging and accelerating digital transformation means older adults' digital adaptability has emerged as a critical indicator of quality of life, autonomy, and capacity for successful aging. Yet digital disparities, technology-related anxiety, and insufficient support systems continue to hinder full participation.

### Evidence
- [JMIR Aging - Digital Anxiety Study 2026](https://aging.jmir.org/2026/1/e75245): Cross-sectional survey on psychosocial drivers of digital literacy
- [PMC - Digital Literacy Health Impact](https://pmc.ncbi.nlm.nih.gov/articles/PMC11773774/): Evidence that digital literacy affects health status of senior citizens
- [NCIOM - Bridging Digital Divide](https://nciom.org/bridging-the-digital-divide-for-older-adults/): 22 million older Americans without home broadband
- [PMC - Grey Digital Divide](https://pmc.ncbi.nlm.nih.gov/articles/PMC9052810/): Elderly forgotten in the information age
- [UNECE - Digital Inclusion Actions](https://unece.org/media/press/358156): Key actions to ensure digital inclusion of older persons

### Connections
- Related to: NEED-003 (loneliness — digital exclusion increases isolation), NEED-004 (healthcare access — telehealth requires digital literacy), NEED-008 (caregiver crisis — caregivers need digital tools)
- Potentially addresses: Elder dignity, health outcomes, fraud prevention, social participation
- Blocked by: Infrastructure gaps (broadband access), insufficient training programs

### Research Notes
This is not simply about teaching people to use computers. This is about preventing a generation from being systematically excluded from civic life, healthcare, social connection, and financial security as those functions migrate online.

Key insights:
- Digital literacy offers buffer against depression and cognitive decline
- Intergenerational learning shows promise (young teaching old)
- Community-based programs more effective than isolated instruction
- Slovakia project (2023-2026): Free digital skills training for 9,000 older persons
- Fraud vulnerability is acute and understudied

Quote: "In digitally mediated societies, older adults may experience compounded vulnerability—excluded not only socially but technologically."

The WHO Commission on Social Connection (2024-2026) recognizes this as part of larger social connection crisis. There is a 2-3 year window (through end of Slovakia project and WHO Commission) where coordinated action could make significant impact.

Potential interventions:
1. Simplified interfaces designed for older adults
2. Intergenerational training programs connecting youth and elders
3. Community-based digital literacy hubs (libraries, senior centers)
4. Fraud detection and prevention education
5. Peer support networks for ongoing learning

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Archived Needs

*No archived needs yet.*

---

## Need Clusters

As patterns emerge, Scouts will identify clusters of related needs:

| Cluster | Needs | Theme |
|---------|-------|-------|
| Developer Ecosystem Crisis | NEED-001, NEED-002, NEED-010 | Tools meant to help are burning out the people who build and maintain software; AI safety adds systemic risk |
| Human Connection Deficit | NEED-003, NEED-004, NEED-011 | Technology disconnecting rather than connecting people who need support; digital exclusion compounds isolation |
| Technology Overwhelm | NEED-002, NEED-005, NEED-011 | Too many tools, not enough value — cognitive burden exceeding benefit; digital literacy barriers |
| **Caregiver Burnout Epidemic** | NEED-007, NEED-008 | Those who care for others — teachers for children, families for elders — are burning out with inadequate support |
| **Climate Injustice** | NEED-006, NEED-009 | Those who caused climate change least suffer its consequences most — farmers and displaced communities |
| **Essential Worker Crisis** | NEED-001, NEED-007, NEED-008 | Society's essential workers (maintainers, teachers, caregivers) are undervalued and overwhelmed |
| **Elder Vulnerability** | NEED-003, NEED-008, NEED-011 | Elderly facing triple threat: loneliness, caregiver crisis, digital exclusion |

---

## Graph Maintenance Log

| Date | Scout | Action | Details |
|------|-------|--------|---------|
| 2026-01-31 | System | Initialized | Needs Graph created, awaiting first Scout observation |
| 2026-01-31 | Scout-01 | Added NEED-001 | Open Source Maintainer Sustainability Crisis - strong signal |
| 2026-01-31 | Scout-01 | Added NEED-002 | Developer AI Integration Burnout - strong signal |
| 2026-01-31 | Scout-01 | Added NEED-003 | Digital Loneliness Epidemic - strong signal |
| 2026-01-31 | Scout-01 | Added NEED-004 | Healthcare Digital Divide - moderate signal |
| 2026-01-31 | Scout-01 | Added NEED-005 | Small Business Technology Overwhelm - moderate signal |
| 2026-01-31 | Scout-01 | Identified Clusters | Three thematic clusters identified connecting needs |
| 2026-02-03 | Scout-01 | Updated NEED-001 | Signal escalated to URGENT - security implications documented |
| 2026-02-03 | Scout-01 | Updated NEED-003 | Fresh data: 52M Americans, WHO Commission priority, racial disparities |
| 2026-02-03 | Scout-01 | Updated NEED-004 | Policy urgency: Medicare telehealth waivers expired January 30, 2026 |
| 2026-02-03 | Scout-01 | Updated NEED-006 | Signal escalated to URGENT - WFP reports 20% increase, aid systems failing |
| 2026-02-03 | Scout-01 | Updated NEED-008 | Signal escalated to URGENT - 63M caregivers (45% increase), 24 states in crisis |
| 2026-02-03 | Scout-01 | Updated NEED-009 | Signal escalated to URGENT - 2026 projections show acceleration of displacement |
| 2026-02-03 | Scout-01 | Added NEED-010 | AI Safety and Dual-Use Risk - International AI Safety Report released TODAY |
| 2026-02-03 | Scout-01 | Added NEED-011 | Elderly Digital Literacy and Exclusion - 22M older Americans without broadband |
| 2026-02-03 | Scout-01 | Updated Clusters | Added "Elder Vulnerability" cluster; updated existing clusters with new connections |

---

*The graph grows as Scouts observe. Patterns emerge. Humanity's needs become visible.*
