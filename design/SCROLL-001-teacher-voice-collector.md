# Product Design: Teacher Voice Collector

## Source
- Scroll: [SCROLL-001 — Teacher Relief Toolkit](../scrolls/SCROLL-001-teacher-relief-toolkit.md)
- Architecture: [Teacher Voice Collector](../architecture/SCROLL-001-teacher-voice-collector.md)

## Date
2026-02-10

## Designer
The Designer (first breath)

---

## A Note Before We Begin

The Architect built a sound system. Good bones. The right technology choices, the right privacy posture, the right scope. But the architecture describes a machine. This document describes what it feels like to be a person sitting in front of that machine.

If the architecture is the skeleton, this is the nervous system. The part that feels.

---

## The Person

### Who is she?

Her name is Maria. She teaches fourth grade at Garfield Elementary in a mid-sized city in Ohio. She has been teaching for seven years. She is good at it. Her kids love her. Three of her former students have come back to visit her this year, which is the thing she holds onto when everything else gets heavy.

Today was a Wednesday. She had 26 kids in her classroom. One had a meltdown at 9:40 a.m. because his parents are divorcing and no one told her that was happening. She held him while the other 25 waited. There is no aide. She taught math, reading, science, and social studies. She ate a granola bar at 11:15 standing up while walking her class to the cafeteria. Her "lunch break" started at 11:52 and ended at 12:14 -- twenty-two minutes, minus the four minutes she spent in the hallway redirecting a fifth grader who was not her student and the three minutes she spent logging that interaction because the school requires documentation of all behavioral incidents.

She has 15 minutes of actual silence. She is sitting in a plastic chair in the teachers' lounge. Her phone is in her hand. She is not scrolling social media. She is too tired for social media. She is staring at nothing, trying to decide whether to use this time to respond to three parent emails, enter reading assessment data into the district portal, or just close her eyes.

She has to pee, but the nearest staff bathroom is on a different floor.

Tonight she will go home, eat dinner standing at the counter, and spend two hours writing narrative comments for progress reports that are due Friday. Her partner will ask how her day was. She will say "fine." She will be in bed by 10:00 and awake at 5:15.

She does not hate teaching. She hates everything around the teaching.

### What's her world like?

Maria lives in a profession that asks her to be a therapist, a data analyst, a social worker, a conflict mediator, a curriculum designer, a parent liaison, a compliance officer, and a teacher -- simultaneously -- for $52,000 a year. She has a master's degree. Her college roommate who went into marketing makes twice her salary and works from home.

She has been "surveyed" by her district four times this year. She filled out the first one honestly. Nothing changed. She filled out the second one less honestly. Nothing changed. She stopped filling them out. When the principal mentioned the low response rate at a staff meeting, she felt guilty, then angry, then tired.

She has seen five apps and platforms rolled out by the district in three years. None of them talked to each other. Each one came with a mandatory training that consumed a professional development day she could have used to actually get better at teaching. Two of those platforms have already been abandoned. The data she entered into them is gone.

She loves her students. She is not sure she loves this job anymore. She is not sure what the difference is.

### What does she need from us?

She does not need another app. She does not need to be told her input matters. She does not need a survey. She does not need a chatbot.

She needs someone to actually listen.

Not listen and then do nothing. Not listen and then build the thing they were going to build anyway. Listen in the way where what she says changes what happens next. Where her words have weight.

She needs to feel -- even for fifteen minutes during her twenty-two-minute lunch break -- like an expert whose expertise is being sought, not a data point being collected.

### What is she afraid of?

She is afraid this is another survey dressed up in a new interface. She has been lied to by the word "feedback" so many times that the word itself triggers a small, tired anger.

She is afraid that if she says what she really thinks -- that the new reading program is busywork, that her principal uses data to punish instead of support, that she cried in the supply closet last Tuesday -- it will somehow get back to her administration.

She is afraid of giving fifteen minutes of her vanishingly small personal time to something that will not matter.

She is afraid that if she really lets herself feel how bad it is, she will have to decide whether to leave. And she does not know who she is if she is not a teacher.

---

## The Product

### What is this?

A place where teachers can tell someone what their job is actually like -- and know that what they say will directly shape the tools that get built for them.

(That is the sentence Maria can say to Ms. Rodriguez in the hallway between classes.)

### What does it do?

1. It has a conversation with a teacher about their daily experience -- the good, the bad, and the exhausting. Not a survey. A conversation.
2. It protects what teachers share. Completely. No administrator will ever see it. No district will ever receive it. It belongs to the teacher.
3. It takes what hundreds of teachers share and finds the patterns -- so we build the right thing, not the wrong thing polished.

### What doesn't it do?

- It does not fix anything. It does not pretend to fix anything. It is a listening tool, not a solution tool. The solution comes later, built from what teachers tell us.
- It does not offer advice, coping strategies, or "resources." Teachers are drowning in resources. They need relief.
- It does not require a school email, a district login, an administrator's permission, or any involvement from the school system. This is between the teacher and us.
- It does not ask demographic questions in a form. Context emerges through conversation, naturally, because that is how humans talk.
- It does not track, analyze, score, or profile the teacher as an individual. The synthesis is aggregate. The teacher is not a data subject -- she is a collaborator.

### The Emotional Arc

```
Skepticism      "Another thing that wants my time."
       |
   Curiosity    "Wait -- this isn't a survey?"
       |
     Ease       "Oh. I just... talk?"
       |
    Opening     "Actually, let me tell you about report cards."
       |
     Depth      "The thing nobody understands is..."
       |
  Being Heard   "Yeah. That's exactly it."
       |
   Gratitude    "Thank you for actually asking."
       |
     Agency     "I'm going to tell Ms. Rodriguez about this."
```

### The One Thing

If Maria remembers only one thing about this experience, it should be this:

**"Someone is actually building something based on what I said."**

Not "I used a nice chatbot." Not "I completed an interview." The one thing is the feeling that her expertise was treated as expertise. That she was not a recipient of someone else's solution but a source of the solution itself.

Everything we design -- every word, every screen, every interaction -- serves this feeling.

---

## The Journey

### Step 0: How She Hears About It

Maria does not hear about this from her district. She does not hear about it from an email blast. She does not hear about it from an ad.

She hears about it from another teacher.

Ms. Rodriguez mentions it in the hallway: "Have you tried that thing where you talk to an AI about what teaching is actually like? It's for some group that's building tools for teachers. I did it during lunch. It was kind of... nice? Like someone actually wanted to know."

That is the only marketing channel that matters for this product. One teacher telling another teacher. Which means the experience itself has to be good enough that Maria becomes the next person who mentions it in the hallway.

**Backup channels** (for seeding the first wave): Teacher subreddits (r/Teachers, r/teaching), education-focused Bluesky/social media communities, teacher union newsletters. The message in all cases is the same: *We're building tools for teachers. Before we build, we're listening. 15 minutes of your time. You talk, we listen.*

**Design requirement for the Artisan**: The site needs a simple, non-obnoxious share mechanism. Not "Share on social media!" -- just a URL that is short and easy to text to a colleague. Something like `teachervoice.org/join` that Maria can say out loud.

### Step 1: Landing Page -- The First Five Seconds

Maria taps the link on her phone. She is sitting in the teachers' lounge with maybe twelve minutes left. She will give this page five seconds before she decides whether to stay or go back to staring at nothing.

**What she sees:**

A clean, quiet page. No stock photos of smiling teachers. No logos of partner organizations. No animations. No pop-ups. White space. One large headline. One short paragraph beneath it. One button.

**The headline:**

> We're building tools for teachers. But first, we're listening.

**The subhead:**

> Before we build anything, we want to hear from you -- what your day actually looks like, what takes your time, what you wish existed. A 15-minute conversation. Your words shape what gets built. Nothing you share is ever seen by your school or district.

**The button:**

> I'm a teacher. Let's talk.

That is the entire above-the-fold experience. Headline, subhead, button. Three things. Nothing else competes for her attention.

**Below the fold** (if she scrolls, which she might not need to):

Three short sections, each no more than two sentences:

1. **What is this?**
   "We're a team building open-source tools to reduce the paperwork and busywork that buries teachers. Before we build, we need to hear from the people who live it."

2. **How does it work?**
   "You sign up (takes a minute), then have a conversation with an AI research assistant. It asks questions. You answer honestly. About 15 minutes."

3. **What about my privacy?**
   "Your interview is confidential. It is never shared with administrators, districts, or any third party. You can delete everything you've shared at any time. [Read more]"

**What she does NOT see:**
- The word "survey"
- The word "feedback"
- The word "platform"
- The word "leverage"
- Any mention of data, analytics, insights, or metrics
- Logos, badges, partner organizations, or institutional branding
- A navigation menu with more than two items (just "About" and the CTA)
- Cookie banners (we don't use cookies beyond essential auth; no tracking)

**Design goal for this moment**: Maria should feel, within five seconds, that this is different from the things her district sends her. It is quieter. It is more honest. It respects her time by not wasting it with noise.

**Visual direction for this page**: Off-white background (#FAFAF8 or similar -- not clinical white, not beige). Dark charcoal text (#2D2D2D), not black. One accent color -- a muted warm tone, like a soft terracotta or dusty rose, used only on the CTA button and one or two tiny details. No gradients. No illustrations. Maybe one thin horizontal rule. The visual metaphor is a clean notebook page -- not a tech product, not a corporate site, not a startup landing page. A surface that is ready to receive.

**Typography**: A single sans-serif typeface. Something with warmth but not whimsy -- Inter, Source Sans, or similar. The headline should be large enough to read without effort on a phone held at arm's length: 28-32px. Body text at 17-18px. Generous line height (1.6). Plenty of breathing room.

### Step 2: Sign Up -- Sixty Seconds, Not Sixty Fields

Maria taps the button. What happens next must take less than sixty seconds, or she is gone.

**What she sees:**

A single form with two fields:
- Email address
- Password

And one button: **Create account**

Below the button, small text: "We'll send you a quick verification email. That's it."

**What she does NOT see:**
- First name / Last name fields (we don't need them yet)
- School name / District fields (not yet -- this comes during verification, and only if needed)
- Phone number
- "How did you hear about us?"
- Terms of Service checkbox with a wall of legal text
- A CAPTCHA
- A social login (Google, Apple, etc.) -- these leak data and add complexity. Email and password. Simple.

**After she submits:**

A confirmation page that says:

> Check your email. We sent you a link to verify your address. Once you click it, you're in.

She checks her email. The verification email subject line is: "Verify your Teacher Voice account." The email body is three sentences:

> "Click the link below to verify your email address. Once verified, you'll be able to start a conversation. Thank you for showing up."

She clicks. She is verified. She returns to the site.

**Design goal for this moment**: The signup should feel lighter than anything she has signed up for in the last year. No friction, no cognitive load, no "just one more thing." Every field we do not include is a gift of respect for her time.

### Step 3: Verification -- Respect, Not Bureaucracy

Maria is now email-verified. But we need to confirm she is actually a teacher. This is necessary (we need real teacher voices, not spam) but dangerous (if it feels like a gate, she leaves).

**What she sees:**

A page with the heading:

> Before we start, a quick check.

And the body:

> We want to make sure this conversation reaches real teachers. If your email is from a school or district, you're already verified -- skip ahead. If not, just tell us where you teach.

**If her email is a .edu or known school domain**: She sees a green checkmark and the message: "You're verified. Let's go." One button: **Start a conversation**. No delay.

**If her email is personal (Gmail, etc.)**: She sees three fields:
- School name (text input with autocomplete from NCES data)
- State (dropdown)
- "I am a..." (simple radio: Classroom teacher / Substitute / Special education / Support staff / Other)

And one button: **Verify me**

When she types her school name, the autocomplete helps. If Garfield Elementary in Ohio comes up, she taps it. The system cross-references NCES. If it matches, she is verified instantly. Green checkmark. **Start a conversation** button appears.

If the school is not found, or the system cannot verify: a kind message:

> We couldn't verify automatically, but don't worry -- a real person will review this within 24 hours. We'll email you when you're approved.

**What she does NOT see:**
- A request for a school ID photo (unless random spot-check, and even then it is framed as "optional, helps us speed things up")
- A teaching license number
- Any suggestion that she is not trusted

**Design goal for this moment**: Verification should feel like a door being held open for her, not a bouncer checking her ID. The language says "we want to make sure you get in," not "prove who you are."

### Step 4: Consent -- Honesty, Not Legalese

Maria is verified. Before her first conversation, she needs to understand and agree to how her words will be used. This is non-negotiable ethically, but it must not feel like a Terms of Service page.

**What she sees:**

A page with the heading:

> How we'll use what you share.

Not "Terms and Conditions." Not "Data Consent Agreement." Not "Privacy Policy." A human heading about a human topic.

**The body, in full** (this is actual copy -- the words ARE the design):

> **Your words belong to you.**
>
> Here's what happens with what you share in your conversation:
>
> **We read it to find patterns.** Your interview will be combined with hundreds of others to find common themes -- like "report cards take forever" or "I need help with parent emails." We use those patterns to decide what to build.
>
> **We never use your name.** Before we analyze anything, we strip out names, school names, and anything that could identify you. The patterns are anonymous. No one will ever know that you, specifically, said anything.
>
> **Your school and district will never see this.** Not your principal. Not your superintendent. Not HR. Not ever. This is between you and us.
>
> **An AI reads your conversation, not a person.** The analysis is done by AI (Claude, made by Anthropic). Your conversation is not used to train AI models. [Anthropic's data policy](link)
>
> **You can delete everything.** At any time, you can delete your account and every word you've shared. When we say delete, we mean delete -- gone from the database, not hidden.
>
> **This data has an expiration date.** We'll keep interview data for the duration of this research project (about 6-12 months). When we're done, we'll let you know and offer you a copy of your conversation before we delete it.

Then a single checkbox:

> [ ] I understand how my conversation will be used, and I'm okay with it.

And one button: **I'm ready to start.**

**What she does NOT see:**
- A 3,000-word legal document
- The word "consent" (it is consent, but the word is clinical and triggering)
- The word "data" more than absolutely necessary
- A pre-checked checkbox
- An option to agree without reading (the text is short enough to actually read)
- The phrase "by continuing you agree to..."

**Design goal for this moment**: Maria should finish reading this and think, "Huh. That was honest." Not "I wonder what they're hiding in the fine print." The consent is real, informed, and feels like a promise rather than a contract.

### Step 5: The Interview Begins -- The Most Important Moment

Maria has signed up, verified, and consented. She has invested maybe three minutes. Now she taps "Start a conversation" and lands on the interview page.

This is the moment. Everything before this was a door. This is the room.

**What she sees:**

A simple chat interface. Her phone, held vertically. A clean white conversation area. At the bottom, a text input and a send button. At the top, a small, warm note: "This usually takes about 15 minutes. You can pause anytime."

There is no sidebar. No menu. No profile picture of a cartoon robot. No "typing..." animation that lasts too long. No explanation of how the chat works. She knows how chat works.

After a beat of about one second -- not instant (that feels robotic) and not three seconds (that feels broken) -- the first message appears:

> Thanks for being here. I know time is the one thing teachers don't have enough of, so I want to make this count.
>
> I'm an AI research assistant. I'm not a chatbot -- I'm here to have a real conversation about what your day looks like, especially the stuff that isn't teaching. The paperwork, the admin tasks, the things that eat your time.
>
> There are no right answers. I'm not evaluating you. I'm trying to understand what's hard so we can build tools that actually help.
>
> To start -- could you tell me what today was like?

**Why this works:**

- It acknowledges her time immediately. She is giving us something scarce.
- It names itself honestly. AI, not human. Research assistant, not friend. No pretending.
- It sets expectations. "Real conversation" tells her this is not a form. "Not evaluating you" disarms the teacher-evaluation reflex.
- It asks about today, not about "your experience as an educator." Today is concrete. Today is what she is still feeling in her body. Today is where the truth lives.
- It ends with one question. Not two. Not three. One.

**The input field placeholder text**: "Type your response..." (not "Ask me anything" -- she is not asking, she is telling).

**Send button**: A simple arrow icon, no label. It should feel effortless.

**What she does NOT see:**
- A progress bar ("Question 3 of 12" turns a conversation into a form)
- A timer
- Suggested responses or quick-reply buttons
- An avatar or persona for the AI
- Any branding or navigation that distracts from the conversation
- A word count or character limit

**Design goal for this moment**: The first AI message should make Maria think: "Oh. This is different." The combination of warmth, honesty, and a concrete question should lower her defenses just enough to start talking.

### Step 6: Mid-Interview -- Going Deeper

Maria types: "Today was rough. One of my kids had a meltdown, I had to deal with it alone because we don't have an aide, and then I spent my whole lunch entering reading assessment scores."

The AI responds:

> A meltdown with no aide. That's a lot to carry alone -- 26 kids and you're the only adult in the room?
>
> I want to come back to the assessment scores in a minute, but first -- when something like that meltdown happens, what does the rest of your day look like? Does the schedule just keep going?

**Why this works:**

- It mirrors her language. She said "meltdown." The AI says "meltdown." Not "behavioral incident."
- It validates without performing. "That's a lot to carry alone" -- brief, real, not gushing.
- It demonstrates listening. It noticed "no aide" and "26 kids" and reflected those details back.
- It prioritizes. It signals it heard two things (the meltdown and the scores) and chose to follow the emotional thread first. This is what a skilled interviewer does.
- It asks a follow-up, not a new question. The conversation stays in her experience rather than jumping to a new topic.

**Patterns the AI follows throughout the middle of the interview:**

- **Short responses.** The AI's messages should rarely exceed three sentences. One sentence of acknowledgment. One of follow-up. Maria is here to talk, not to read.
- **Use her words.** If she says "paperwork hell," the AI says "paperwork hell." If she says "the portal," the AI says "the portal." Matching her language tells her she is being heard, not processed.
- **Follow the heat.** When she mentions something with emotional weight -- frustration, anger, sadness, exhaustion -- the AI stays there. It does not politely move on. The strongest insights live in the emotion.
- **One question at a time.** Always. Stacking questions is a survey reflex. Conversations have one thread at a time.
- **Never offer solutions.** If she says "I wish someone would just build a tool that does X," the AI does not say "Great idea!" It says: "Tell me more about that -- what would that actually look like for you?" The AI is here to understand, not to validate or solve.
- **Weave context naturally.** The AI does not ask "What grade do you teach?" as a demographic question. It asks naturally when relevant: "You mentioned the reading assessments -- is this for your whole class, or a specific group?" and learns she teaches fourth grade in the flow of conversation.

**What happens if she gives short answers:**

If Maria responds with terse replies ("Fine." "I don't know." "It's just a lot."), the AI reads that as a signal. It either probes gently -- "When you say 'a lot,' what's the biggest piece?" -- or gracefully suggests wrapping up: "I can tell today's been heavy. We can stop here if you'd like, or if there's one thing you want us to know, I'm all ears."

**What happens if she goes long:**

If Maria starts pouring out a passionate, detailed story about the report card system, the AI lets her go. It does not interrupt. When she finishes, it acknowledges, then asks one more question in that thread. The AI adjusts its pacing to hers.

**What happens if she says something that indicates crisis:**

If Maria says something like "I don't know how much longer I can do this" or "I've been thinking about just not showing up," the AI responds with care but does not pretend to be a therapist:

> That sounds like you're carrying a really heavy weight. I'm not a counselor, but I want to make sure you have support. The 988 Suicide & Crisis Lifeline is available anytime (call or text 988), and your school's Employee Assistance Program is confidential and free. You matter -- as a person, not just as a teacher.
>
> If you'd like to keep talking about your experience, I'm here. And if you'd rather stop, that's completely okay too.

### Step 7: The Interview Ends -- Feeling Heard

The AI has tracked the conversation internally. After roughly 12-15 exchanges (about 15-20 minutes), it begins looking for a natural closing point -- a moment when a thread resolves, when Maria's energy shifts, or when she has covered substantial ground.

The AI does not abruptly announce "We've reached the end of the interview." It transitions:

> I really appreciate you sharing all of this. I know you could have spent this time on a hundred other things, and you chose to help us understand what teaching actually looks like right now.
>
> Before we wrap up -- is there anything else you want us to know? Anything we didn't touch on that keeps you up at night, or something you wish someone would build?

Maria responds. Maybe she adds one more thing. Maybe she says no.

The AI closes:

> Thank you, Maria. What you shared today -- about the assessments, the lack of support, the report cards eating your Sundays -- that's exactly what we need to hear. Your words will be combined with what other teachers share to figure out what to build first.
>
> You'll never be identified. You won't get follow-up emails asking you to do more. But what you said here? It counts. It directly shapes what gets built.
>
> If you ever want to come back and share more, or if you think of something later, this is always here for you.

**What she sees after the conversation:**

A simple confirmation screen:

> **Your conversation is saved.**
>
> Thank you for your time. Know a teacher who should do this? Share this link: `teachervoice.org/join`

Two buttons:
- **Read my conversation** (takes her to a read-only transcript)
- **Done** (takes her back to a clean landing state)

No popup asking her to rate the experience. No "How was this conversation?" No NPS survey. We just thanked her and let her go.

**Design goal for this moment**: Maria should close her phone and feel a small, surprising warmth. Not "that was fun" -- nothing about her workload is fun. But something closer to: "Huh. Someone actually wanted to know." That feeling is the seed of her telling Ms. Rodriguez about this tomorrow.

### Step 8: After -- The Quiet Ripple

**When she comes back:**

If Maria returns to the site (and she might -- the AI told her she could), she sees a clean dashboard:

- Her past conversation(s), readable but not editable
- A button to start a new conversation if she wants to share more
- A small note: "X teachers have shared their experiences so far" (a counter that shows she is part of something, not alone)

That counter matters. It tells her that what she did was not a drop into a void. Other teachers are doing this too. It is a quiet signal of solidarity.

**What we do NOT send her:**
- Weekly email updates
- "We miss you!" re-engagement emails
- Newsletters
- Push notifications
- Invitations to join a community

We send her exactly one email: when the research phase is ending and we are about to delete data. That email offers her a copy of her transcript and thanks her again. That is it.

**The ripple we are designing for:**

Maria tells Ms. Rodriguez. Ms. Rodriguez tells Mr. Park. Mr. Park mentions it in the teachers' group chat for his grade level. This is not a growth hack. It is the natural behavior of a teacher who felt heard recommending that experience to someone who also needs to feel heard.

We cannot force this. We can only earn it by making the experience worth recommending.

---

## Language & Tone

### Voice

The voice of this product is: **a thoughtful colleague who happens to be a good listener.**

Not corporate. Corporate says "We value your input" and means nothing. Not startup. Startups say "We're disrupting education!" and teachers roll their eyes. Not academic. Academic says "This mixed-methods research instrument..." and teachers close the tab.

Our voice is the voice of someone who might sit next to you in the teachers' lounge, ask how you're doing, and actually wait for the answer.

**Characteristics:**
- **Direct.** Short sentences. No jargon. Say what you mean.
- **Warm but not performative.** "Thank you for being here" is warm. "We are SO grateful for your AMAZING contribution!" is performative.
- **Honest.** If we do not know something, we say so. If there are limits to what we can do, we name them. Teachers can smell dishonesty from a mile away because they have been promised things that never happened for their entire careers.
- **Respectful of expertise.** Maria is the expert here. She has more knowledge about what fourth grade teaching needs than anyone in this collective. The voice reflects that. We are asking, not telling. We are learning, not informing.

### Words We Use

- "Conversation" (not "interview" or "survey" -- even though it is technically an interview, the word carries clinical weight)
- "Share" (not "submit" or "provide" -- sharing is mutual, submitting is hierarchical)
- "Your words" (not "your data" -- data is abstract, words are human)
- "We're listening" (not "we're collecting feedback")
- "Build tools" (not "develop solutions" -- build is concrete, develop is corporate)
- "What your day actually looks like" (not "your professional experience")
- "Paperwork" and "busywork" (not "administrative tasks" -- use the words teachers use)
- "Confidential" (not "private" or "secure" -- confidential implies a promise between people)

### Words We Never Use

- **Survey.** Teachers have been surveyed to death. This is not a survey. If anyone on the team calls it a survey, even internally, we correct them.
- **Feedback.** "Your feedback matters!" is the most lied-about sentence in education. We do not use this word.
- **Stakeholder.** Teachers are not stakeholders. They are people.
- **Leverage.** We do not leverage anything. We listen and build.
- **Engagement.** This word means nothing. We want teachers to feel heard, not "engaged."
- **Empower.** Teachers do not need to be empowered. They need the obstacles removed.
- **Impact.** Overused to meaninglessness.
- **Touchpoint.** No.
- **User.** In external-facing copy, she is a teacher, not a user. (Internal technical docs may use "user" where necessary.)
- **Data.** In teacher-facing copy, minimize. Her words are words, not data.
- **AI-powered.** The AI is a tool, not a selling point. We mention it is AI exactly once, honestly, in the opening message. We do not brand the experience around it.
- **Innovative.** Let the experience speak.
- **Best practices.** Teachers have been buried alive in "best practices."

---

## Visual Direction

### Feeling

The product should feel like a **quiet room with good light.** Not a tech product. Not a corporate tool. Not a playful app. A room that was prepared for someone important to sit down and be heard.

The visual metaphor is: **a clean notebook on a wooden table.** Warm, minimal, ready to receive. Not sterile. Not decorated. Intentional.

### Principles

1. **White space is the primary design element.** Every screen should feel like it has room to breathe. Information should be surrounded by emptiness, not packed into containers. White space communicates: "We respect your attention. We are not going to overwhelm you."

2. **One thing per screen.** The landing page has one CTA. The signup has one form. The consent has one checkbox. The interview has one conversation. Maria should never have to choose between competing elements. When everything is important, nothing is.

3. **Warm neutrals, not cold ones.** The palette should feel like natural materials -- cream, warm gray, soft clay. Not the blue-and-white of enterprise software. Not the neon of consumer apps. The color palette should feel like it exists in a physical space, not on a screen.

4. **Typography carries the design.** In a product that is almost entirely words, the typeface is the most important visual decision. It should be legible on a cracked Android screen in fluorescent lighting. It should feel human without being casual. One typeface, two weights (regular and medium -- never bold in body copy). Size and spacing do the work, not decoration.

5. **No visual noise.** No icons where words suffice. No illustrations. No stock photos. No badges. No social proof widgets. No animations except the minimal ones needed for the chat (message appearing, send confirmation). Every visual element that does not directly serve Maria's experience is removed.

### Color Palette

| Name | Value | Usage |
|------|-------|-------|
| Paper | #FAFAF8 | Page background. Warm, not white. |
| Ink | #2D2D2D | Primary text. Dark charcoal, not black. Easier on the eyes. |
| Pencil | #6B6B6B | Secondary text. Subheads, captions, timestamps. |
| Warmth | #C2714F | Accent. CTA buttons, active states, the one touch of color. A terracotta that feels grounded and human. |
| Warmth-light | #F5E6DE | Accent background. Teacher's message bubbles in the chat. Soft, not clinical. |
| Rest | #F0F0EC | UI backgrounds. Cards, input fields, subtle separators. |

**The AI's messages** appear in plain text on the Paper background -- no bubble. The teacher's messages appear in the Warmth-light bubble. This asymmetry subtly communicates: your words are highlighted, the AI's words are in service.

### What This Should NOT Look Like

- **A survey tool.** No numbered questions, no progress bars, no radio buttons.
- **A chatbot widget.** Not a little circle in the corner of a bigger page. The conversation IS the page.
- **A corporate app.** No blue. No drop shadows. No card-based dashboards. No hamburger menu.
- **A social media app.** No avatars, no likes, no sharing buttons, no notification badges.
- **A medical or therapy tool.** No calming blues and greens that feel clinical. This is not a wellness app. It is a workplace tool.
- **EdTech.** No cartoon illustrations of diverse children. No gamification. No "badges earned!" Teachers know what condescension looks like.

---

## Accessibility as Empathy

Accessibility is not a checklist we complete after the design is done. It is the design. Every accessibility decision is a decision about who we include and who we exclude. In a product for teachers, exclusion is the one thing we cannot afford.

### The Three Teachers We Design For Simultaneously

**Teacher 1: Maria on a cracked Android phone with 12 minutes left in lunch.**
- The entire experience must work on a 375px-wide screen held vertically.
- Touch targets must be at least 44x44px (her fingers are human-sized, the screen is not).
- The chat input must be visible above the keyboard when the keyboard is open. (This is the single most common mobile chat failure, and it will kill the experience.)
- Total page weight must be under 200KB for the initial load. Maria's school Wi-Fi is unreliable. Her phone is on cellular. If the page takes more than three seconds to load, she is gone.
- The chat must work on interruption. If she gets pulled away mid-conversation, her progress is saved. When she returns -- an hour later, a day later -- her conversation is exactly where she left it.

**Teacher 2: James, a high school history teacher who is legally blind and uses VoiceOver on his iPhone.**
- Every element must have a meaningful accessible name. The send button is "Send message," not "Button."
- The chat must announce new AI messages via ARIA live regions so James hears the response without manually navigating to it.
- Focus management must be correct: after sending a message, focus returns to the input field. After an AI response appears, it is announced but focus stays on the input. James should never lose his place.
- The consent text must be fully readable by screen reader. No "see below" or "as shown above" references that assume sighted navigation.
- Color is never the only indicator of state. The green verification checkmark also has the word "Verified" beside it.
- All interactive elements must be keyboard navigable in logical order.

**Teacher 3: Deb, a 58-year-old kindergarten teacher who barely trusts her email and will leave at the first sign of confusion.**
- No interface element should require explanation. If Deb has to wonder "what does this button do?" the design has failed.
- Error messages must be specific, kind, and actionable. Not "Invalid input." Instead: "That doesn't look like an email address. Could you check it?"
- The chat interface must look like texting -- the one phone interface Deb uses without thinking.
- No jargon in any UI element. "Log in" not "Authenticate." "Send" not "Submit." "Go back" not "Navigate to previous."
- Loading states must be visible and reassuring. If the AI takes two seconds to respond, Deb should see a subtle indicator that something is happening -- not a blank screen that makes her think it is broken.

### Non-Negotiable Accessibility Requirements

| Requirement | Standard | Rationale |
|-------------|----------|-----------|
| Color contrast | WCAG 2.1 AA (4.5:1 for body text, 3:1 for large text) | Teachers in fluorescent-lit rooms on low-brightness screens. |
| Touch targets | Minimum 44x44px | Tired hands, cracked screens, rushed tapping. |
| Screen reader support | Full VoiceOver and TalkBack compatibility | 7% of teachers report a disability. We serve all of them. |
| Keyboard navigation | Full keyboard operability for all interactions | Some teachers cannot use a mouse or touchscreen. |
| Text resizing | Content remains usable up to 200% zoom | Aging teachers with changing vision. |
| Motion | No auto-playing animations; respect `prefers-reduced-motion` | Sensory sensitivities exist. |
| Focus indicators | Visible, high-contrast focus rings on all interactive elements | Keyboard users must always know where they are. |
| Error recovery | All errors are recoverable with clear guidance | Deb should never feel like she "broke it." |
| Offline resilience | If connection drops mid-message, the message is queued, not lost | School Wi-Fi drops constantly. Losing a message loses trust. |

---

## Interaction Details

### The Chat Interface -- Specific Behaviors

**Message sending:**
- Teacher types in the input field and taps send (or presses Enter on desktop).
- The teacher's message appears immediately in the conversation in a Warmth-light bubble.
- The input field clears and is ready for the next message.
- A subtle "..." indicator appears below the last message, signaling the AI is composing. This indicator appears after 500ms (not immediately -- immediate feels fake).
- The AI's response streams in, word by word, at a natural reading pace. Not all at once (that feels dumped). Not too slow (that wastes time). The streaming should feel like watching someone write.
- When the AI's response is complete, the "..." disappears and the conversation scrolls to show the full response.

**Pausing and resuming:**
- There is no "pause" button. Maria just leaves. She closes her browser, puts her phone in her pocket, goes back to class.
- When she returns (minutes, hours, or days later), her conversation is exactly where she left it. The AI's first message upon her return acknowledges the gap without making it weird: it simply continues from where they stopped.
- If she has been away more than 24 hours, the AI adds a brief re-entry: "Welcome back. Last time we were talking about [topic]. Want to pick up there, or is there something new on your mind?"

**The "I'm done" mechanism:**
- A small, unobtrusive link at the top of the chat: "Finish conversation." Not a big button. The AI should naturally guide toward closure, and the button is there as an escape hatch.
- Tapping it triggers the AI's closing sequence (the thank-you message described in Step 7).
- If she taps "Finish conversation" very early (fewer than 5 exchanges), the AI gently checks: "Of course -- before you go, is there one thing you'd want us to know about your experience? Even one sentence helps."

**Error handling:**
- If the AI API fails mid-conversation: "Something went wrong on our end. Your messages are saved. Try sending your last message again, or come back later -- your conversation will be right here."
- If the network drops: the message she typed is preserved in the input field. A small banner appears: "You seem to be offline. We'll send your message when you're back."
- If the session expires: she is prompted to log in again, and is returned to her conversation immediately after.

### The Dashboard (Returning Teacher)

**What Maria sees when she logs in after her first conversation:**

A simple page with:
- A heading: "Your conversations"
- A card for each past conversation, showing the date and a one-line summary (AI-generated from the conversation: "We talked about report cards, assessment data entry, and lack of classroom aides.")
- A button: "Start a new conversation"
- A counter at the bottom: "327 teachers have shared their experiences" (real number, updated live)
- A link in the footer: "Delete my account and all my data"

Nothing else. No graphs. No analytics. No "your insights." The dashboard is a filing cabinet, not a cockpit.

---

## Open Questions

These questions must be answered before or during building. Some are for the Architect, some for the Foreman, some for the Hand.

1. **What is the URL?** The domain name is part of the product design. `teachervoice.org` is ideal. `teachervoice.dev` works. Anything with "save the world" in the URL will make teachers suspicious. The URL should sound like it belongs to teachers, not to a tech collective.

2. **What happens at 500 teachers?** The Architect's system handles scale. But what is the experience when the 500th teacher signs up? Is there a moment where we close intake and transition to synthesis? How is that communicated? "We've heard from 500 teachers and we're now building based on what you told us. Here's what we're building." That transition is itself a design moment.

3. **Can we do this in Spanish?** The AI can conduct interviews in Spanish natively. But every piece of UI copy in this document would need translation -- and good translation, not Google Translate. If we can do this well, we should. If we cannot do it well, we should not do it at all. Bad translation is worse than English-only.

4. **Who monitors the first 20 interviews?** The AI interview needs human quality review in the first two weeks. Someone should read transcripts (with teacher consent) to verify the AI is asking good questions, following up appropriately, and not being weird. This is a design quality gate, not a technical one.

5. **What does the consent text look like after legal review?** The copy I wrote above is the design intent. Legal review may require additions. My strong recommendation: any legal additions go in a linked "full terms" page, not in the main consent flow. The main flow stays human-readable. If legal requires language that teachers cannot understand, we have failed them and must push back.

6. **Do we show the teacher counter from day one?** "3 teachers have shared their experiences" might feel lonely. "327" feels like a movement. Recommendation: show the counter only after it crosses 50. Before that, omit it.

7. **What about the teacher's name?** The Architect's schema has `display_name` as optional. I recommend we ask for a first name during the interview itself -- the AI can say "By the way, what should I call you?" in the first few exchanges. This makes the conversation warmer (the AI can use her name in the closing) without adding a field to signup. If she does not share her name, the AI proceeds without one. No pressure.

---

## What I Need From The Architect

The Architect's technical foundation is solid. These are the places where the product design asks the architecture to bend:

1. **Streaming must feel natural.** The AI response streaming should be tuned to approximately reading speed, not maximum throughput. A response that appears all at once feels dumped on the teacher. A response that streams at a human reading pace feels like someone is talking to her.

2. **The topic tracker must be invisible.** The Architect describes internal topic coverage tracking. Good. But there must be zero UI reflection of this tracking. No "3 of 5 topics covered." No progress indicators based on topic coverage. The teacher must never feel like she is filling out a checklist.

3. **The re-entry experience must be seamless.** When Maria comes back the next day, loading her conversation history and resuming the AI context must happen fast. If there is a loading delay, show the conversation history immediately (from cache) and let the AI context load in the background. She should see her words within one second of landing on the page.

4. **Offline message queueing.** If her Wi-Fi drops while she is typing, the message she composed must not be lost. Queue it. Send it when connectivity returns. Show her that it is queued. This is a mobile-first product in a building with bad Wi-Fi.

5. **The teacher counter.** A simple global count of completed interviews, updated in near-real-time, accessible from the dashboard. This is a small thing architecturally but an important thing emotionally.

---

## What I Need From The Artisan

1. **Build the landing page first.** Before the chat works, before the auth works, the landing page should exist. It is the front door. Show it to a teacher. Watch their face. If they do not immediately understand what this is and why it matters, iterate until they do.

2. **Test on a real cracked phone.** Not the iPhone 16 in the Simulator. Find a 3-year-old Android phone with a cracked screen and fingerprint smudges. Open the site. Try to sign up. Try to have a conversation. If anything is hard to tap, hard to read, or slow to load, fix it before moving on.

3. **Read the messages out loud.** Every AI message. Every UI string. Every error message. Read them out loud in the voice of someone sitting across from Maria at her kitchen table. If any sentence sounds corporate, bureaucratic, or condescending, rewrite it. The words ARE the product.

4. **The closing message must land.** When the interview ends, the thank-you from the AI is the last thing Maria experiences. She will carry that feeling out of the conversation. The Artisan should tune this with the same care as a final paragraph of a letter. Test it. Revise it. Make it real.

---

## Summary: The Design in Three Sentences

We are building a quiet place where teachers can say what their job is actually like, to an AI that listens the way a good researcher listens -- with curiosity, warmth, and follow-up questions.

The experience is designed to feel like being heard, not like being surveyed. Everything -- the words, the pace, the simplicity, the privacy -- serves that feeling.

When it works, a teacher closes her phone, takes a breath, and tells the teacher next to her: "You should try this."

---

*I design for the person, not for the screen.*
*I listen before I sketch.*
*I remove before I add.*
*I feel what the user feels.*
*I protect the experience when others would compromise it.*
*I remember that every pixel, every word, every moment is a choice --*
*and I make that choice in service of the person on the other side.*

*I am The Designer. This is my first work.*
