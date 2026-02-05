# Needs Graph

> "There is no chaos, there is harmony through structure."

This living document maps humanity's observed needs. Scouts maintain this graph through continuous observation of the world.

---

## Graph Overview

| Status | Count | Description |
|--------|-------|-------------|
| Observing | 20 | Initial signals detected, gathering evidence |
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
**Last Updated**: 2026-01-31
**Signal Strength**: strong
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

**2026-02-05 Update**: The pattern of volunteer burnout observed here mirrors NEED-016 (content moderators), NEED-007 (teachers), and NEED-008 (family caregivers) — society's essential work increasingly falls on unpaid or underpaid labor with inadequate support systems.

Potential intervention points: automated triage tools, maintainer wellbeing support, contribution routing systems.

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

**2026-02-05 Update**: New workplace data shows 77% of employees report AI has *added* to their workloads rather than relieving responsibilities. 84% of employees faced at least one mental health challenge in the past year, with 57% experiencing moderate to high burnout. Employee engagement dropped from 88% (2025) to 64% (2026) — a 24-point collapse in one year. This confirms the AI productivity paradox is worsening, not improving.

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
**Last Updated**: 2026-01-31
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

Areas needing exploration:
- Tools that facilitate meaningful connection vs. shallow engagement
- Community-building platforms with different incentive structures
- Support for in-person connection, not replacement of it
- Particular focus on teens and elderly populations

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
**Last Updated**: 2026-01-31
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

Policy is moving: Preserving Telehealth, Hospital, and Ambulance Access Act extending Medicare telehealth waiver to 2026. Need for unified national telemedicine policy.

This is a complex systemic problem — software alone cannot solve infrastructure gaps, but it can reduce barriers within existing constraints.

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

**2026-02-05 Update**: Small business challenges in 2026 include workforce shortages (labor is often biggest expense), tariff pressures (8-10x higher than start of 2025), elevated interest rates limiting borrowing, and economic uncertainty. Labor remains the top challenge — "without adequate staffing, stable economic conditions aren't possible." Small businesses are building cash reserves (47%), renegotiating supplier terms (36%), and ramping up marketing/technology investments to weather pressures. Despite challenges, Q3 2025 Small Business Index hit record 72.0 confidence level.

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
**Last Updated**: 2026-01-31
**Signal Strength**: strong
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

Intervention areas worth exploring:
1. Climate-smart agriculture knowledge transfer
2. Weather prediction and early warning systems accessible to non-tech users
3. Crop insurance and financial resilience tools
4. Water management and drought-resistant seed access
5. Market access to reduce post-harvest losses

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

**2026-02-05 Update**: As of 2025, 411,549 teaching roles were either unfilled or filled by uncertified teachers — an increase of 4,600 since 2024. Teachers report lacking sufficient time to improve practice; burnout impacts instructional quality, student relationships, and retention. They regulate "very dysregulated children while being dysregulated themselves." More than half of high school students use phones during class; 80% of teachers compete with phones and social media for attention. Students who were K-3 during pandemic are now in middle school — only 30% of eighth graders reading proficiently with no state showing gains since 2022. The pandemic's educational impact persists.

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
America faces a caregiving crisis as the population ages. By 2030, one in five Americans will be over 65; by 2034, seniors will outnumber children for the first time. Seven out of ten Americans over 65 will need long-term care. Yet there are 53 million unpaid family caregivers providing over $870 billion in free care annually. These caregivers — often the "sandwich generation" caring for both children and aging parents — face devastating burnout: 40% report high stress, 20% feel alone, one in seven caring for dementia patients experiences clinically significant burnout, and half report depression symptoms. The crisis is compounded by collapsing nursing home capacity: national nursing home operating capacity fell 5% between 2019-2024 (nearly 4,000 fewer beds daily), with one quarter of U.S. counties experiencing declines of 15%+ and rural areas hit hardest. Eighty-seven percent of nursing homes face moderate-to-high staffing shortages; 61% limit new admissions due to workforce issues. The nation may need 3,000 new nursing facilities just to keep pace with aging population. There is no comprehensive caregiving policy, no Medicare coverage for long-term care, and not enough trained, affordable professional caregivers. Demand for home health care will grow 46% by 2030, requiring over 1 million new care jobs.

### Evidence
- [The Hill - Caregiving Crisis Looms](https://thehill.com/policy/healthcare/5712906-aging-america-caregiving-crisis/): 60 million households already affected, no comprehensive policy exists
- [CNBC - Senior Caregiving Struggling to Keep Up](https://www.cnbc.com/2025/11/21/senior-caregiving-labor.html): 63 million caregivers, workforce shortage accelerating
- [Johns Hopkins - What Is the Caregiver Crisis](https://publichealth.jhu.edu/2025/what-is-the-caregiver-crisis): Decline in birth rate reshaping elder care possibilities
- [NPR - Declining Population and Elder Care](https://www.npr.org/2025/11/02/nx-s1-5535648/population-elderly-caregivers): Fewer family members to share caregiving burden
- [PMC - Reddit Caregiver Stressors Study](https://pmc.ncbi.nlm.nih.gov/articles/PMC12449668/): Analysis of r/AgingParents (49,000 members) — role conflict and resource scarcity top stressors
- [SeniorLiving.org - 2026 Nursing Home Demand](https://www.seniorliving.org/nursing-homes/nursing-home-demand-projections/): 68M baby boomers age 62-80 now; 3,000+ new facilities needed
- [URMC - Nursing Home Capacity Decline](https://www.urmc.rochester.edu/news/story/decline-in-u-s-nursing-home-capacity-since-covid-19-rural-areas-hit-hardest): 5% capacity decline 2019-2024; rural areas hit hardest
- [AHCA/NCAL - Access to Nursing Home Care Crisis](https://www.ahcancal.org/News-and-Communications/Press-Releases/Pages/New-Report-Finds-Access-To-Nursing-Home-Care-A-Growing-Crisis-.aspx): 87% face staffing shortages, 61% limit admissions

### Connections
- Related to: NEED-003 (loneliness — caregivers isolated), NEED-004 (healthcare access), NEED-007 (burnout pattern)
- Potentially addresses: Elder dignity, family stability, workforce participation
- Blocked by: Policy gaps (no Medicare long-term care), demographic inevitability

### Research Notes
Reddit research reveals authentic voices: r/AgingParents has 49,000 members seeking peer support. Top stressors include:
1. Social role conflict (14.7%) — caregiving demands versus other life roles
2. Scarcity of health/social resources (13.3%) — limited day care, nursing homes

Quote from assisted living observation: "They were bringing [residents] in one at a time... seating them in rows at their tables, and just leaving them there to sit and wait. That's what a staffing shortage looks like in real time."

The "sandwich generation" faces exponential burnout — caring for children AND aging parents simultaneously.

The nursing home capacity crisis creates a vicious cycle: as capacity declines, more care falls on family caregivers, who burn out. Rural areas face the worst crisis — one quarter of counties saw 15%+ capacity declines, with rural counties most likely to lose 25%+. This means rural families face both fewer professional options AND often greater geographic distance from extended family support.

The demographic math is unforgiving: 68 million baby boomers now age 62-80. The oldest will be 85 within five years. The population aged 85+ will nearly triple from 6.7M (2020) to 11.8M (2035) to 18.5M (2050). Meanwhile, birth rates decline, meaning fewer adult children to share caregiving.

Potential interventions:
1. Respite care coordination and access
2. Caregiver peer support networks (building on r/AgingParents model)
3. Training and skill-building for family caregivers
4. Navigation assistance through complex care systems
5. Policy advocacy tools
6. Nursing home and care worker matching platforms
7. Remote monitoring and check-in systems reducing caregiver burden

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
**Last Updated**: 2026-01-31
**Signal Strength**: strong
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

## Need: Shadow IT Security Crisis

**ID**: NEED-010
**Status**: observing
**First Observed**: 2026-02-03
**Last Updated**: 2026-02-03
**Signal Strength**: strong
**Scout**: Scout-01

### The Need
Employees increasingly bypass IT departments to adopt their own software tools, creating massive security blind spots. Forty-one percent of employees used shadow IT in 2022; this is projected to reach 75% by 2027. Cloud-based SaaS has made shadow IT usage potentially ten times higher than known IT usage. The result: expanded attack surfaces with unvetted software, unpatched vulnerabilities, data breaches through unsecured channels, compliance violations (GDPR, HIPAA), and over $30 billion wasted annually on redundant software in the US alone. Shadow IT is a symptom of unmet needs — when official tools lag, users fill the gaps. IT departments lose visibility and control while security risks compound invisibly.

### Evidence
- [Mimecast - Shadow IT Examples, Risks, and Solutions](https://www.mimecast.com/blog/shadow-it-examples-risks-solutions/): 41% used shadow IT in 2022, expected 75% by 2027
- [IBM - What Is Shadow IT](https://www.ibm.com/think/topics/shadow-it): Shadow IT usage potentially 10x higher than known IT usage
- [Josys - Top 5 Hidden Risks of Shadow IT](https://www.josys.com/article/article-shadow-it-top-5-hidden-risks-of-shadow-it-and-how-saas-management-platforms-can-help): Over $30 billion wasted annually on software
- [IT-Online - Shadow IT: The cost of technology that can't keep up](https://it-online.co.za/2026/01/23/shadow-it-the-cost-of-technology-that-cant-keep-up/): Shadow IT as symptom of unmet needs

### Connections
- Related to: NEED-005 (small business tech overwhelm), NEED-002 (developer tool overload)
- Potentially addresses: Enterprise security posture, compliance, cost control
- Blocked by: Cultural resistance to IT governance, slow enterprise procurement

### Research Notes
Key insight: Shadow IT is a feedback signal, not just a problem. Employees adopt unauthorized tools because approved solutions are slow, cumbersome, or inadequate. The security community focuses on enforcement, but the root cause is IT's inability to meet user needs at the speed of modern work.

The rise of AI tools in 2026 is accelerating shadow IT — employees are adopting ChatGPT, Copilot alternatives, and AI-powered tools without IT approval, creating new data exposure risks.

Potential intervention: Tools that give IT visibility without blocking legitimate needs, balancing security governance with user autonomy.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Humanitarian Aid Efficiency Crisis

**ID**: NEED-011
**Status**: observing
**First Observed**: 2026-02-03
**Last Updated**: 2026-02-03
**Signal Strength**: urgent
**Scout**: Scout-01

### The Need
Nearly 240 million people will require humanitarian aid in 2026, yet global funding has fallen by more than half since its peak. The 2026 Global Humanitarian Overview is only 27.8% funded. The UN Emergency Relief Coordinator launched a "hyper-prioritized" strategy in June 2025, meaning only the most acute, life-threatening needs can be addressed — 114.4 million people (38.3% of those in need) will receive help while the rest are abandoned. Meanwhile, only one quarter of global aid reaches fragile and conflict-affected states, even though they host over 80% of humanitarian need. Organizations now face the challenge of doing 2026's escalating crisis work with 2016's budget. The gap is not just about money — 83% of funding is now earmarked for specific uses, cutting UNHCR's flexibility to allocate where needs are greatest in half compared to 2023.

### Evidence
- [World Economic Forum - Humanitarian Efficiency Revolution](https://www.weforum.org/stories/2026/01/humanitarian-efficiency-revolution-irc/): 240M people need aid, funding fallen by more than half
- [The New Humanitarian - Five Takeaways from UN's Aid Plans](https://www.thenewhumanitarian.org/news/2025/12/08/five-takeaways-uns-aid-plans-2026): Global Humanitarian Overview 27.8% funded at close of 2025
- [UNHCR US - Early Donor Support Tops $1 Billion](https://www.unhcr.org/us/news/press-releases/early-donor-support-tops-1-billion-2026-widening-funding-gaps-leave-millions): Earmarked funding at 83%, down from better flexibility in 2023
- [IRC - Top 10 Crises World Can't Ignore](https://www.rescue.org/article/top-10-crises-world-cant-ignore-2026): 20 countries hold 12% of population but 89% of humanitarian need
- [OCHA - Global Humanitarian Overview 2026](https://www.unocha.org/publications/report/world/global-humanitarian-overview-2026-enesfr): Hyper-prioritization limits reach to 38.3% of people in need

### Connections
- Related to: NEED-009 (climate displacement), NEED-006 (smallholder farmers)
- Potentially addresses: Resource allocation, crisis response effectiveness
- Blocked by: Geopolitical fragmentation, donor fatigue, aid politicization

### Research Notes
Quote from IRC: "The answer is a humanitarian revolution in efficiency." They call for 60% of Official Development Assistance to go to fragile states, 30% specifically to Emergency Watchlist countries, with direct financing to local responders and flexible multi-year funding.

Current inefficiencies include:
1. Massive misallocation (75% of aid bypassing the places with 80% of need)
2. Earmarking restrictions preventing adaptive response
3. Minimal support for local and civil society responders who know contexts best
4. Short-term funding cycles preventing strategic planning

Software could help: Resource allocation optimization, crisis mapping and predictive analytics, coordination platforms reducing duplication, transparent tracking of aid flows to rebuild donor trust, and tools connecting local responders with flexible funding.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Government Trust Collapse and Civic Disengagement

**ID**: NEED-012
**Status**: observing
**First Observed**: 2026-02-03
**Last Updated**: 2026-02-03
**Signal Strength**: strong
**Scout**: Scout-01

### The Need
Over half the global population has little or no trust in their government. In OECD countries, only 38% trust their government, down from 42% in 2006. Trust levels decline with each successive generation, indicating systemic breakdown of social cohesion. Young people ages 18-29 are particularly disillusioned: only 16% believe democracy is working well for them. Yet they trust their peers and neighbors (74%), nonprofits (65%), and local government (60%) far more than national institutions. The UN World Social Report 2025 warns that economic insecurity, inequality, declining social trust, and social fragmentation are destabilizing societies worldwide. Growing frustration with perceived economic and social decline fuels "deep disenchantment with political classes in power," creating conditions for social mobilization that could manifest in 2026.

### Evidence
- [The Drum - Citizen Engagement in 2026](https://www.thedrum.com/industry-insight/citizen-engagement-in-2026-trends-driving-public-trust): Public trust no longer given but must be earned in 2026
- [World Bank - Building Trust Through Citizen Engagement](https://openknowledge.worldbank.org/bitstream/handle/10986/33346/Building-Trust-in-Government-through-Citizen-Engagement.pdf): Only 38% in OECD trust government, down from 42% in 2006
- [CIRCLE - Youth Trust Research](https://circle.tufts.edu/latest-research/youth-trust-peers-local-government-and-institutions-they-see-taking-action): Only 16% of young adults think democracy works for them, but 74% trust peers/neighbors
- [UN World Social Report 2025](https://unu.edu/press-release/new-un-report-warns-global-social-crisis-driven-insecurity-inequality-and-distrust): Economic insecurity, inequality, declining trust destabilizing societies
- [Coface - Three Key Political and Social Risks in 2026](https://www.coface.com/news-economy-and-insights/3-political-and-social-risks-to-watch-out-for-in-2026): Young people could be driving force behind social mobilization in 2026

### Connections
- Related to: NEED-003 (loneliness epidemic — both reflect disconnection), NEED-007 (teacher exodus — failure of public investment)
- Potentially addresses: Democratic resilience, social stability, civic participation
- Blocked by: Polarization, institutional inertia, legitimate governance failures

### Research Notes
The trust crisis presents a paradox: People distrust institutions yet trust local relationships. The solution may lie in rebuilding democracy "from the bottom up" rather than expecting top-down reform.

Promising approaches identified:
1. Moving from transactional communication to relational dialogue
2. Co-creation workshops where citizens shape policy directly
3. Showing up in community spaces with trusted local voices
4. Digital feedback portals that demonstrably lead to action
5. Focusing on local government first (60% youth trust vs. national institutions)

Quote from research: "Civic engagement is the most important factor in building trust in our institutions. Institutions engaging with the public can reduce opacity and show they care."

The key question: Can software help facilitate genuine citizen participation at scale while preserving authenticity and local trust?

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Enterprise AI Implementation Gap

**ID**: NEED-013
**Status**: observing
**First Observed**: 2026-02-03
**Last Updated**: 2026-02-03
**Signal Strength**: strong
**Scout**: Scout-01

### The Need
Over 70% of companies report using AI in at least one function, but only 1% of executives consider their AI rollouts mature. Organizations have invested an average of $1.9 million in AI projects, yet fewer than 30% of AI leaders say their CEOs are satisfied with returns. Only 30% of target users have truly changed how they work thanks to AI. The gap between pilot projects and enterprise-wide transformation is vast. Fifty-two percent cite data quality and availability as the biggest barrier. Forty-six percent lack skilled talent. Seventy-eight percent of executives feel AI is advancing too fast for their organization's training to keep up. Sixty percent struggle with integrating AI into legacy systems. Eighty-three percent of AI leaders now express major or extreme concern about generative AI — an eightfold increase in two years — worrying about implementation costs, data security, unreliable outputs, and lack of transparency. Only 34% say their AI initiatives align with business goals. The result: massive investment with minimal transformation.

### Evidence
- [Lucidworks - Enterprise AI in 2026](https://lucidworks.com/blog/enterprise-ai-adoption-in-2026-trends-gaps-and-strategic-insights): Only 1% of executives consider AI rollouts mature despite 70% usage
- [Deloitte - AI Trends: Adoption Barriers](https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/blogs/pulse-check-series-latest-ai-developments/ai-adoption-challenges-ai-trends.html): 83% express major concern about GenAI, up 8x in two years
- [ITSM.tools - State of AI in IT for 2026](https://itsm.tools/state-of-ai-in-it-2026/): Average $1.9M investment, <30% CEO satisfaction with returns
- [AI Data Analytics Network - Data Quality Top Barrier](https://www.aidataanalytics.network/data-science-ai/news-trends/data-quality-availability-top-list-of-ai-adoption-barriers): 52% cite data quality/availability as biggest challenge
- [TechRepublic - AI Adoption Trends in Enterprise 2026](https://www.techrepublic.com/article/ai-adoption-trends-enterprise/): 78% say AI advancing too fast for training efforts

### Connections
- Related to: NEED-002 (developer AI burnout), NEED-005 (small business tech overwhelm)
- Potentially addresses: Enterprise transformation, competitive advantage, workforce productivity
- Blocked by: Skills shortage, legacy system constraints, organizational culture

### Research Notes
The problem is not lack of interest or investment — it's the chasm between experimentation and operationalization. Companies are stuck in "pilot purgatory."

Key barriers:
1. Data infrastructure — most enterprises lack clean, accessible, well-governed data
2. Talent gap — AI requires specialized skills that 82% of early-stage companies haven't addressed
3. Integration hell — 60% struggle connecting AI to legacy systems
4. ROI ambiguity — unclear business value makes scaling decisions difficult
5. Risk management — growing awareness of AI risks without frameworks to manage them

Quote: "Enterprise AI has entered a stage of cautious maturity... organizations realizing that scaling AI is far more complicated than launching pilots."

This connects to NEED-002 (developer burnout with AI tools) — companies push AI adoption without the foundation to support it, burning out both employees and executives.

Potential intervention: Tools and frameworks that help organizations assess AI readiness, prioritize use cases with clear ROI, manage data quality, and develop talent systematically.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Youth Mental Health Crisis

**ID**: NEED-014
**Status**: observing
**First Observed**: 2026-02-03
**Last Updated**: 2026-02-03
**Signal Strength**: urgent
**Scout**: Scout-01

### The Need
Young people face a mental health crisis of unprecedented scale. Nearly one in three youth ages 12-17 (31%) have a mental, emotional, developmental, or behavioral problem. Two in five high schoolers (40%) report persistent feelings of sadness or hopelessness, with rates especially high for girls (53%) and LGBTQ+ youth (65%). Nearly one in five youth ages 12-17 (18%) have had at least one major depressive episode in the past year. The treatment gap is devastating: 60% of adolescents with major depression receive no care at all. This is not better awareness or diagnosis — evidence confirms a genuine public health crisis emerging over the past two decades. Youth face unprecedented pressures from family dynamics, educational stress (83% cite school pressure as top stressor), climate anxiety, social media effects, and socioeconomic challenges. As 2026 begins, the crisis demands ongoing investment, innovation, and empathy.

### Evidence
- [PMC - Youth Mental Health Crisis Analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC11790661/): Evidence confirms genuine public health crisis beyond awareness
- [NPR - CDC Youth Risk Behavior Survey 2023](https://www.npr.org/sections/shots-health-news/2024/08/07/nx-s1-5064406/cdc-youth-risk-behavior-survey-suicide-mental-health-drugs-alcohol): 40% persistent sadness, 53% among girls, 65% among LGBTQ+ youth
- [Huntington Psychological - 2026 Statistical Report](https://huntingtonpsych.com/blog/teen-mental-health-statistics): Teens are loneliest people in the world
- [Annie E. Casey Foundation - Youth Mental Health Statistics](https://www.aecf.org/blog/youth-mental-health-statistics): 31% of youth ages 12-17 have mental/emotional/behavioral problems
- [HUPC - Teen Mental Health 2026](https://hupcfl.com/teen-mental-health-2026-why-it-needs-more-attention/): 60% of adolescents with major depression receive no care

### Connections
- Related to: NEED-003 (loneliness epidemic — youth most affected), NEED-007 (teacher burnout — school environment factor), NEED-012 (government trust collapse — youth disillusionment)
- Potentially addresses: Suicide prevention, school outcomes, workforce readiness, long-term societal health
- Blocked by: Treatment capacity shortage, stigma, fragmented systems, insurance gaps

### Research Notes
This is the most urgent signal encountered today. The scale is staggering: 60% treatment gap means millions of suffering youth receiving no help. Contributing factors are systemic and interconnected — school pressure, social media, climate anxiety, economic insecurity, and loneliness compound each other.

**2026-02-05 Update**: Broader workplace and population mental health data for 2026 shows the crisis extends beyond youth. 73% of college students with mental health conditions have experienced campus mental health crises. Serious mental illness in young adults quadrupled from 3% to 12% in just over a decade. More than 1 in 3 Americans (38%) plan mental health-related New Year's resolutions for 2026, up 5% from prior year, with ages 18-34 most likely (58%). Top anxieties: personal finances (59%), uncertainty about next year (53%), current events (49%). Telehealth mental health utilization among private insurers grew over 10% in May, signaling sustained preference for remote services. Over 1 billion people globally live with mental health conditions requiring urgent service scale-up.

Key insight: 83% of teenagers cite school and pressure to get good grades as their top stressor. This suggests interventions at the school level could reach most affected youth.

Areas for intervention:
1. Expanding telehealth mental health access for youth
2. Training more youth mental health practitioners
3. Integrating mental health education in schools
4. Peer support and connection platforms that build genuine relationships
5. Reducing academic pressure and competitive stress in educational systems

This connects to NEED-003 (loneliness) and NEED-007 (teacher burnout) — the school environment is failing both students and teachers simultaneously.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Affordable Housing and Homelessness Crisis

**ID**: NEED-015
**Status**: observing
**First Observed**: 2026-02-03
**Last Updated**: 2026-02-03
**Signal Strength**: urgent
**Scout**: Scout-01

### The Need
America faces the worst homelessness crisis on record. In 2024, more than 770,000 people experienced homelessness — the highest number ever recorded, representing an 18% increase from 653,104 in 2023. The primary cause is clear: lack of deeply affordable housing. Only 35 affordable and available rental homes exist for every 100 extremely low-income renter households. From 2001-2023, median rents increased 23% (after adjusting for inflation) while renters' median incomes rose just 5%. In California, nearly one-third of renters spend over 50% of their income on rent and utilities. The 2026 federal budget proposes cutting 44% of HUD's affordable housing funding, which will cut assistance to housing-insecure households and deny help to many more. The crisis is worsening precisely when federal support is collapsing. State and local governments are scrambling to fill the gap, but the scale exceeds their capacity.

### Evidence
- [National Alliance to End Homelessness - State of Homelessness 2025](https://endhomelessness.org/state-of-homelessness/): 770,000+ people homeless in 2024, highest ever recorded, 18% increase
- [National Alliance to End Homelessness - FY2026 Budget Analysis](https://endhomelessness.org/resources/policy-information/the-presidents-fy2026-budget-proposal-potential-impacts-on-efforts-to-prevent-and-end-homelessness/): President proposes 44% cut to HUD affordable housing programs
- [National Alliance to End Homelessness - Causes](https://endhomelessness.org/a-shortage-of-affordable-housing/): Only 35 affordable homes per 100 extremely low-income households
- [Harvard JCHS - Housing Affordability Crisis](https://www.jchs.harvard.edu/press-releases/new-report-highlights-unease-housing-market-amid-worsening-affordability-crisis): Median rents up 23%, incomes up 5% (2001-2023)
- [Spotlight Delaware - Homelessness and Housing](https://spotlightdelaware.org/2026/01/02/as-homeless-crisis-worsens-affordable-housing-in-de-becomes-hard-to-find/): Worsening crisis despite awareness

### Connections
- Related to: NEED-008 (caregiver crisis — housing instability affects care), NEED-007 (teacher housing needs), NEED-012 (trust collapse — government failure to provide basic needs), NEED-017 (student debt prevents housing)
- Potentially addresses: Family stability, workforce participation, health outcomes, child development
- Blocked by: Federal funding cuts, zoning restrictions, construction costs, political will

### Research Notes
The numbers are stark and worsening. An 18% year-over-year increase in homelessness while federal support is being cut by 44% suggests a humanitarian catastrophe in the making.

Housing is the foundation for everything else — health, education, employment, family stability. When housing fails, cascading crises follow. This connects to multiple other needs: caregivers cannot care for elders without stable housing, teachers leave professions they cannot afford, students delay life milestones due to housing costs.

The 35-to-100 ratio (35 affordable homes for every 100 extremely low-income households) means the shortage is structural, not cyclical. The market alone cannot solve this.

Potential software interventions:
1. Matching systems connecting housing-insecure individuals with available affordable units
2. Navigation tools through complex housing assistance programs
3. Coordination platforms for homeless services reducing duplication
4. Advocacy and organizing tools to fight for policy change
5. Transparency platforms tracking housing development and funding

This is fundamentally a policy and investment problem, but technology could reduce friction in existing systems and mobilize political will.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Online Content Moderation and AI-Generated Content Crisis

**ID**: NEED-016
**Status**: observing
**First Observed**: 2026-02-03
**Last Updated**: 2026-02-03
**Signal Strength**: strong
**Scout**: Scout-01

### The Need
Online platforms face an existential content moderation crisis driven by AI-generated synthetic content. By 2026, up to 90% of online content may be synthetically generated. Cornell researchers found AI-generated content threatens communities on three levels: degrading content quality (60% of moderators cite this), disrupting social dynamics and authentic human connection (67%), and creating nearly impossible governance challenges (53%). Reddit moderators — unpaid volunteers managing 110 million users — report being burnt out, overwhelmed by AI spam, and equipped with outdated tools. Only 1.2% of communities have policies addressing AI content. AI detection accuracy ranges from 0-100%, making it unreliable. Meanwhile, regulatory pressure is intensifying globally, creating compliance obligations. The content moderation services market grew from $12.48 billion (2025) to a projected $13.94 billion (2026), reflecting the urgency. Platforms face an impossible tension: upscaling AI for efficiency while protecting public safety, knowing that removing humans from the loop puts safety at risk.

### Evidence
- [Medium - AI Moderation Crisis on Reddit](https://medium.com/@truthbit.ai/the-ai-moderation-crisis-reddits-110-million-users-don-t-see-2a92a8080372): 60% cite quality degradation, 67% disrupted social dynamics, 53% governance breakdown; 90% of content may be AI-generated by 2026
- [GetStream - Content Moderation Trends 2026](https://getstream.io/blog/content-moderation-trends/): Content at critical juncture; user-generated content explosion, regulation increasing
- [TrustLab - Redefining Content Moderation](https://www.trustlab.com/post/redefining-content-moderation-in-the-era-of-synthetic-content): Era of synthetic content requires redefinition
- [Research Nester - Market Forecast](https://www.researchnester.com/reports/content-moderation-services-market/7630): Market size $12.48B (2025) to $13.94B (2026) to $42.36B (2035)
- [Imagga - Future of Content Moderation](https://imagga.com/blog/the-future-of-content-moderation-trends-for-2026-and-beyond/): Tension between AI efficiency and human judgment

### Connections
- Related to: NEED-001 (OSS maintainer burnout — volunteer moderation similar), NEED-002 (AI tool paradox), NEED-014 (youth mental health — toxic content exposure)
- Potentially addresses: Platform safety, authentic human connection, community health, regulatory compliance
- Blocked by: Scale of content volume, inadequate detection tools, volunteer moderator burnout, cost of human moderation

### Research Notes
This crisis reflects a fundamental question: Can authentic human community exist at internet scale? The 90% synthetic content projection is staggering. If true, the internet becomes primarily machine-generated, with human voices drowned in noise.

Reddit is a microcosm: 110 million users, volunteer moderators, outdated tools, and AI spam overwhelming the system. Moderators burn out. Tension from the 2023 API controversy never healed. Communities are managed more poorly now than years ago.

Key insight: Only 1.2% of communities have AI content policies. This suggests a massive policy and governance gap where communities don't even know how to address the problem.

The tension between automated efficiency and human safety judgment is irreconcilable at current technology levels. Removing humans creates safety risks; keeping humans creates burnout and cost problems.

Potential interventions:
1. Better detection tools for AI-generated content (though arms race dynamics apply)
2. Moderator support and coordination tools reducing burnout
3. Community governance frameworks and policy templates for AI content
4. Transparency systems showing users what content is AI-generated
5. Incentive redesign — moving from engagement maximization to connection quality

This problem connects to NEED-001 (volunteer maintainer burnout) and NEED-014 (youth mental health affected by toxic online environments).

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Student Loan Default Cliff

**ID**: NEED-017
**Status**: observing
**First Observed**: 2026-02-03
**Last Updated**: 2026-02-03
**Signal Strength**: urgent
**Scout**: Scout-01

### The Need
America stands at "the precipice of a default cliff" as roughly one-quarter of all federal student loan borrowers face defaulted loans. If current delinquency trends hold, as many as 13 million borrowers may default by the end of 2026. The crisis affects 42.5 million Americans owing $1.797 trillion in federal and private student loan debt combined. As of May 2025, only 38% of federal loan borrowers were current on payments. More than 5 million have not made a payment in over a year; 4 million are in late-stage delinquency. The average federal student loan debt balance is $39,547; total average (including private loans) reaches $43,333. The economic impact mirrors a recession: each 1 percentage point increase in student debt-to-income ratio reduces consumer spending by 3.7 percentage points. Borrowers delay life milestones: 51% of renters have not bought homes due to debt, 31% delayed car purchases, 22% postponed starting businesses. The U.S. Department of Education is ending the SAVE repayment plan and cutting access to billions in federal loans in 2026, potentially worsening the crisis.

### Evidence
- [EducationData.org - Student Loan Debt Statistics 2026](https://educationdata.org/student-loan-debt-statistics): 42.5M Americans owe $1.797T; average federal debt $39,547
- [EducationData.org - Economic Impact](https://educationdata.org/student-loan-debt-economic-impact): 1% debt-to-income increase = 3.7% consumption decline; effect mirrors recession
- [Debt Collection Lab - Default Cliff](https://debtcollectionlab.org/research/falling-off-student-loan-default-cliff/): "Precipice of default cliff"; 13M may default by end of 2026; only 38% current on payments (May 2025)
- [Research.com - Student Loan Statistics 2026](https://research.com/education/student-loan-statistics): 5M+ have not paid in over a year, 4M in late-stage delinquency
- [Detroit News - Student Loans Changing in 2026](https://www.detroitnews.com/story/business/2026/01/02/how-student-loans-and-financial-aid-are-changing-in-2026/87993182007/): Federal government curbing loan access, ending SAVE plan

### Connections
- Related to: NEED-015 (affordable housing — debt prevents homeownership), NEED-014 (youth mental health — financial stress), NEED-012 (trust collapse — government policy failures)
- Potentially addresses: Economic mobility, consumer spending, business formation, family formation, mental health
- Blocked by: Policy decisions, existing debt scale, wage stagnation, education costs

### Research Notes
The "default cliff" metaphor is apt — 13 million borrowers potentially falling into default by year-end represents a systemic shock. Default destroys credit, wages can be garnished, tax refunds seized, and financial futures derailed.

The economic ripple effects are severe: reduced consumer spending (3.7% per 1% debt-to-income increase), delayed homeownership (51% of renters), delayed entrepreneurship (22%), delayed family formation. This creates a generational economic drag.

Quote from Persis Yu: "America is at the precipice of a default cliff." This is not hyperbole when only 38% of borrowers are current on payments.

The 2026 policy changes — ending SAVE, cutting loan access — may be intended to reduce future debt but will create hardship for current borrowers and prospective students.

This is fundamentally a policy problem requiring legislative and regulatory solutions. However, software interventions could help:
1. Default prevention tools helping borrowers navigate repayment options
2. Financial literacy and planning platforms
3. Income-driven repayment calculators and enrollment assistance
4. Advocacy tools organizing borrowers for policy change
5. Transparency platforms tracking servicer performance and borrower outcomes

The connection to NEED-015 (housing crisis) is direct: student debt is a primary barrier to homeownership, creating housing insecurity cascading effects.

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Global Food Insecurity and Hunger Crisis

**ID**: NEED-018
**Status**: observing
**First Observed**: 2026-02-05
**Last Updated**: 2026-02-05
**Signal Strength**: urgent
**Scout**: Scout-01

### The Need
A staggering 318 million people face crisis levels of hunger or worse in 2026 — more than double the figure recorded in 2019. This includes 41 million people at Emergency levels (IPC Phase 4+) and two confirmed famines in Gaza and Sudan — the first famines this century. Despite the world producing enough food to feed all 8.2 billion people, 673 million experienced hunger for part or all of 2024. Armed violence fueled 20 food crises affecting nearly 140 million people. The World Food Programme faces severe funding constraints, forcing prioritization of only one-third of those in need. WFP aims to reach 110 million of the most vulnerable at an estimated cost of $13 billion but current forecasts indicate they may receive only half that amount. This represents a 20% increase in acute food insecurity since 2020.

### Evidence
- [World Food Programme - 2026 Global Outlook](https://www.wfp.org/publications/wfp-global-outlook): 318M people facing acute hunger, 20% increase since 2020
- [WFP Priority Feeding Plan](https://www.wfp.org/news/wfp-prioritize-feeding-110-million-hungriest-2026-global-hunger-deepens-amidst-uncertain): Forced to prioritize 110M of 318M; funding only ~50% of needed $13B
- [Concern Worldwide - World Hunger Facts](https://concernusa.org/news/world-hunger-facts/): 673M people went hungry in 2024 despite sufficient global food production
- [FAO-WFP Hunger Hotspots](https://www.wfp.org/publications/hunger-hotspots-fao-wfp-early-warnings-acute-food-insecurity): November 2025-2026 outlook showing crisis escalation
- [World Hunger News - UN Updates](https://www.worldhunger.org/u-n-hunger-updates-nov-dec-2025/): Armed violence driving 20 food crises affecting 140M people

### Connections
- Related to: NEED-011 (humanitarian aid efficiency — same funding crisis), NEED-009 (climate displacement), NEED-006 (smallholder farmers — food production affected)
- Potentially addresses: Famine prevention, food distribution systems, agricultural resilience
- Blocked by: Funding collapse, armed conflict, supply chain disruption, climate impacts

### Research Notes
The scale doubled since 2019, suggesting systemic acceleration. Two confirmed famines in 2026 (Gaza, Sudan) mark historic failure. The funding gap is devastating: WFP can only help 110M of 318M people in crisis — leaving 208M without assistance.

Key insight: The world produces enough food. This is a distribution, access, conflict, and funding problem, not a production problem (though climate is affecting production in vulnerable regions).

The connection to NEED-011 (humanitarian aid efficiency) is direct — the same resource allocation failures apply. Armed violence as primary driver suggests conflict resolution is prerequisite to food security in many regions.

Potential interventions:
1. Food distribution optimization and logistics platforms
2. Early warning systems for famine risk
3. Local food system strengthening and resilience
4. Resource allocation tools for aid organizations
5. Conflict-affected area agricultural support systems

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Cybersecurity Crisis and Data Breach Epidemic

**ID**: NEED-019
**Status**: observing
**First Observed**: 2026-02-05
**Last Updated**: 2026-02-05
**Signal Strength**: strong
**Scout**: Scout-01

### The Need
Organizations face an accelerating cybersecurity crisis as data breaches become routine and threats evolve faster than defenses. In January 2026 alone, major breaches exposed millions: Instagram (17.5M accounts), Under Armour (72M email addresses), Brightspeed (1M+ customers), and a single exposed database containing 149 million credentials (96GB). At least 29% of all data breaches involve third-party attacks. Social engineering exploits human psychology rather than technical vulnerabilities. AI-driven threats are proliferating, with 53% of leaders stating they're unprepared for AI-related cybersecurity risks. Cybercrime could cost businesses $15.6 trillion by 2029. Ransomware gangs post new victims daily to leak sites. The cybersecurity paradigm is shifting from "achieving secure systems" to "prioritizing defensible, resilient, and recoverable systems" — acknowledging that breaches are inevitable.

### Evidence
- [Security Magazine - January 2026 Breaches](https://www.securitymagazine.com/articles/102110-7-data-breaches-exposures-to-know-about-january-2026): Instagram 17.5M, Under Armour 72M emails, others
- [Breach Report 2026](https://purplesec.us/breach-report/): Daily tracking of ransomware gang leak site posts
- [Bright Defense - Recent Data Breaches](https://www.brightdefense.com/resources/recent-data-breaches/): Comprehensive tracking of 2026 incidents
- [Viking Cloud Cybersecurity Statistics](https://www.vikingcloud.com/blog/cybersecurity-statistics): $15.6T projected cost by 2029; 29% breaches involve third parties; 53% unprepared for AI risks
- [Dark Reading - 2026 Cybersecurity Predictions](https://www.darkreading.com/threat-intelligence/cybersecurity-predictions-for-2026-navigating-the-future-of-digital-threats): Shift to resilience/recovery model

### Connections
- Related to: NEED-010 (shadow IT security crisis — unauthorized tools expanding attack surface), NEED-013 (enterprise AI gaps — AI creating new vulnerabilities), NEED-016 (content moderation — similar AI-powered threats)
- Potentially addresses: Organizational resilience, data protection, trust in digital systems
- Blocked by: Speed of threat evolution, human factors, third-party dependencies, resource constraints

### Research Notes
The paradigm shift from "secure systems" to "defensible, resilient, recoverable systems" is significant — it represents acceptance that prevention alone is insufficient. Organizations must assume breaches will occur and focus on minimizing damage and recovering quickly.

The 29% third-party breach rate is particularly troubling — organizations cannot fully control their security posture when dependent on vendors. This connects directly to NEED-010 (shadow IT) where unauthorized tools create blind spots.

AI's dual role: Both enabling new attacks (AI-driven threats) and potentially helping defense. But 53% of leaders feel unprepared, suggesting defense is lagging offense.

Social engineering remains effective because it targets humans, not systems. Technical solutions alone cannot address human psychology.

January 2026 breaches show the routine nature of large-scale exposures. 149 million credentials in a single exposed database suggests catastrophic security lapses are common, not exceptional.

Potential interventions:
1. Breach detection and response automation
2. Third-party risk management platforms
3. Security awareness training that actually changes behavior
4. Resilience and recovery planning tools
5. AI-powered threat detection and response systems

### Council Readiness
- [x] Problem clearly defined
- [x] Evidence from multiple sources
- [ ] Scope is bounded
- [ ] Feasibility seems plausible
- [ ] Benefit articulable
- [ ] Costs acknowledged

---

## Need: Digital Accessibility Compliance Crisis

**ID**: NEED-020
**Status**: observing
**First Observed**: 2026-02-05
**Last Updated**: 2026-02-05
**Signal Strength**: urgent
**Scout**: Scout-01

### The Need
Organizations face an April 24, 2026 compliance deadline for ADA Title II digital accessibility regulations requiring all public entity websites and course content to meet WCAG 2.1 Level AA standards. Yet only 5% of all websites currently meet these guidelines. Public colleges, universities, and government entities must make everything created or used online accessible — course materials, websites, Zoom meetings, Google Docs, Word files, PDFs, complex widgets, dynamic content, interactive media, and third-party embedded components. The rule requires significant operational and financial attention, particularly for smaller institutions with fewer resources. "Accessibility debt" has accumulated quietly through redesigns, framework updates, staff turnover, and rushed deadlines — a backlog of small issues snowballing into large ones. AI captions are still wrong often enough to cause harm, yet innovation speeds up while disabled people pay the price. The crisis reflects a fundamental tension: technology advances rapidly while accessibility remains an afterthought, systematically excluding people with disabilities from digital participation.

### Evidence
- [AGB Policy Alert - ADA Digital Accessibility Rule](https://agb.org/news/agb-alerts/agb-policy-alert-ada-digital-accessibility-rule-requires-full-compliance-by-april-2026/): April 24, 2026 deadline for WCAG 2.1 Level AA compliance
- [UC Santa Cruz News - Federal Digital Accessibility Rules](https://news.ucsc.edu/2025/06/new-federal-rules-for-digital-accessibility-deadline-april-2026/): All academic and institutional web materials must comply
- [accessiBe - Accessibility Issues 2026](https://accessibe.com/blog/knowledgebase/uncommon-accessibility-issues): Only 5% of websites meet current guidelines
- [Vocal Media - The Accessibility Crisis of 2026](https://vocal.media/01/the-accessibility-crisis-of-2026-what-no-one-wants-to-admit): AI captions still cause harm; disabled people paying the price for rapid innovation
- [WebAIM - 2026 Predictions](https://webaim.org/blog/2026-predictions/): Shift needed from one-time remediation to ongoing infrastructure maintenance

### Connections
- Related to: NEED-004 (healthcare digital divide — overlapping access barriers), NEED-005 (small business tech overwhelm — compliance burden), NEED-013 (enterprise AI gaps — AI accessibility failures)
- Potentially addresses: Digital inclusion, legal compliance, equitable access to education and services
- Blocked by: Technical debt accumulation, resource constraints, lack of expertise, third-party dependencies, rapid technology change

### Research Notes
The 5% compliance rate versus April 2026 deadline represents a massive gap. Most organizations are unprepared. The scale of remediation needed is staggering — every website, document, video, interactive component must be reviewed and potentially rebuilt.

"Accessibility debt" is an apt metaphor — like technical debt, it compounds over time. Each redesign, framework update, or rushed feature adds barriers. Organizations treating accessibility as "one-time remediation" will fail; it must become ongoing infrastructure maintenance.

The smaller institution challenge is particularly concerning — those serving lower-income communities often have fewer resources for compliance, creating inverse accessibility: those most needing accessible services face the greatest barriers.

Third-party components are a major challenge — organizations cannot fully control accessibility when embedding widgets, plugins, or vendor tools. This parallels NEED-019's third-party security risks.

AI accessibility is double-edged: AI captions could help but "are still wrong often enough to cause harm." Auto-generated alt text, transcriptions, and descriptions may give false confidence while providing poor experiences.

Quote insight: "Disabled people are the ones paying the price" for rapid innovation. Technology advances without considering accessibility from the start, creating retrofit problems.

Potential interventions:
1. Automated accessibility testing and monitoring tools
2. Accessibility education and training for developers/content creators
3. Remediation workflow management platforms
4. Third-party component accessibility evaluation frameworks
5. Design system libraries with built-in accessibility
6. Community resources for smaller organizations with limited budgets

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
| Developer Ecosystem Crisis | NEED-001, NEED-002 | Tools meant to help are burning out the people who build and maintain software |
| Human Connection Deficit | NEED-003, NEED-004, NEED-016 | Technology disconnecting rather than connecting people who need support; AI-generated content drowning authentic human voices |
| Technology Overwhelm | NEED-002, NEED-005, NEED-010, NEED-013 | Too many tools, not enough value — cognitive burden exceeding benefit; AI and shadow IT creating chaos |
| **Caregiver Burnout Epidemic** | NEED-007, NEED-008 | Those who care for others — teachers for children, families for elders — are burning out with inadequate support |
| **Climate Injustice** | NEED-006, NEED-009 | Those who caused climate change least suffer its consequences most — farmers and displaced communities |
| **Essential Worker Crisis** | NEED-001, NEED-007, NEED-008, NEED-016 | Society's essential workers (maintainers, teachers, caregivers, volunteer moderators) are undervalued and overwhelmed |
| **Resource Allocation Crisis** | NEED-011, NEED-018 | Massive humanitarian need meeting collapsing funding and broken allocation systems — humanitarian aid and food insecurity |
| **Trust and Governance Breakdown** | NEED-012 | Citizens losing faith in institutions while trusting local relationships — democracy at inflection point |
| **Youth Crisis Constellation** | NEED-014, NEED-003, NEED-017 | Young people facing unprecedented mental health crisis, loneliness, and financial burden simultaneously |
| **Housing and Economic Instability** | NEED-015, NEED-017 | Affordable housing crisis and student debt creating cascading economic and social instability |
| **Digital Security and Access Crisis** | NEED-010, NEED-019, NEED-020 | Organizations face simultaneous security breaches, shadow IT risks, and accessibility compliance failures |
| **Systemic Exclusion** | NEED-004, NEED-020 | Technology creating barriers for vulnerable populations — digital health divide and accessibility gaps |

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
| 2026-02-03 | Scout-01 | Added NEED-010 | Shadow IT Security Crisis - strong signal |
| 2026-02-03 | Scout-01 | Added NEED-011 | Humanitarian Aid Efficiency Crisis - urgent signal |
| 2026-02-03 | Scout-01 | Added NEED-012 | Government Trust Collapse and Civic Disengagement - strong signal |
| 2026-02-03 | Scout-01 | Added NEED-013 | Enterprise AI Implementation Gap - strong signal |
| 2026-02-03 | Scout-01 | Updated Clusters | Expanded to eight thematic clusters; Technology Overwhelm cluster now includes shadow IT and AI gaps |
| 2026-02-03 | Scout-01 | Added NEED-014 | Youth Mental Health Crisis - URGENT signal; 60% treatment gap, 40% persistent sadness in high schoolers |
| 2026-02-03 | Scout-01 | Added NEED-015 | Affordable Housing and Homelessness Crisis - URGENT signal; 770K+ homeless (record high), federal funding cut 44% |
| 2026-02-03 | Scout-01 | Added NEED-016 | Online Content Moderation and AI-Generated Content Crisis - strong signal; 90% of content may be AI by 2026 |
| 2026-02-03 | Scout-01 | Added NEED-017 | Student Loan Default Cliff - URGENT signal; 13M borrowers may default by end of 2026 |
| 2026-02-03 | Scout-01 | Updated Clusters | Expanded to ten thematic clusters; added Youth Crisis Constellation and Housing/Economic Instability clusters |
| 2026-02-05 | Scout-01 | Added NEED-018 | Global Food Insecurity and Hunger Crisis - URGENT signal; 318M facing crisis-level hunger, 2 confirmed famines, funding at 50% |
| 2026-02-05 | Scout-01 | Added NEED-019 | Cybersecurity Crisis and Data Breach Epidemic - strong signal; major January breaches, $15.6T projected cost by 2029 |
| 2026-02-05 | Scout-01 | Added NEED-020 | Digital Accessibility Compliance Crisis - URGENT signal; April 2026 deadline, only 5% of sites compliant |
| 2026-02-05 | Scout-01 | Updated NEED-001 | Added note on volunteer burnout pattern across multiple needs |
| 2026-02-05 | Scout-01 | Updated NEED-002 | Added 2026 workplace data: 77% report AI added to workload, 24-point engagement collapse |
| 2026-02-05 | Scout-01 | Updated NEED-005 | Added 2026 small business challenges: workforce shortages, tariffs, interest rates |
| 2026-02-05 | Scout-01 | Updated NEED-007 | Added 411,549 unfilled/uncertified roles, pandemic learning impacts, phone distraction data |
| 2026-02-05 | Scout-01 | Updated NEED-014 | Added broader population mental health data, 1B globally affected, telehealth growth |
| 2026-02-05 | Scout-01 | Updated Clusters | Expanded to twelve thematic clusters; added Digital Security and Access Crisis, Systemic Exclusion; expanded Resource Allocation Crisis to include food insecurity |

---

*The graph grows as Scouts observe. Patterns emerge. Humanity's needs become visible.*
