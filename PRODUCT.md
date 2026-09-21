# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: static single-page site (HTML + CSS + vanilla JS, no build step). Chosen because the deliverable is one campaign landing page that must open instantly on school Wi-Fi and phones, and be deployable by dropping a folder anywhere (GitHub Pages, Netlify, or a USB stick). No framework overhead is justified.

## Users

Primary: students of the school (roughly ages 13–18) who will vote for school president. They will mostly open the link on a phone, between lessons, in under a minute, likely from a chat message. They are skeptical of empty promises and reward personality.

Secondary: teachers and administration, who will see the site and must find it serious enough to take the candidacy seriously.

## Product Purpose

A campaign landing page for Muslim ("Musya"), candidate for school president. Success is a visitor who (a) understands what he will actually do, (b) believes it is realistic, and (c) is motivated to vote and to send the link to a classmate.

## Positioning

The school already has an international-admissions focus (AP, SAT, study-abroad track). Most candidates promise the same generic things. Musya's position: the existing academic track is a foundation, not the finish line — he adds the layer around it that the school currently lacks, and he starts during the campaign period rather than after winning. Proof-by-doing is the differentiator: career-guidance week with real professionals running trainings is being organized now, not promised for later.

## Operating Context

- Discovery is via a link shared in student chats; the first viewport on a phone decides everything.
- Voting happens at school on a fixed election date (date not yet confirmed by the user).
- The campaign period itself is being used to deliver, so the site must be able to show "already running" versus "planned" as distinct states.

## The candidate

Muslim ("Musya"), student of class D. Runs as part of a party, **67** (written exactly as the numeral on the site), which shares his goals — he is not running alone, and the site must say so.

Confirmed background, in his own words: IELTS 80; organizer of MUNs, hackathons, a study-free forum; intern at Logos; economics and AI student; founder.

The three things he wants said about himself, supplied verbatim and now shipping as the core of that block:

1. **He is a pastry chef** — genuinely cooks good desserts, "так что со вкусом всё в порядке" (a pun: taste, both culinary and aesthetic). Keep the pun; it is the block's one joke and it is his.
2. **He is funny in person**, even though in the corridor he looks like he is off to conquer the world.
3. **He always backs his people** — if you chose him, he will stand up for you to anyone, to the end. This is the closing claim and the emotional argument of the whole candidacy; it carries the most weight of the three.

He closes by inviting people to come talk at break. Photos of him and five party members were supplied (six portraits, one wall, one framing) and are cropped by `crop-team.sh`. He asked that party members' names NOT be published yet — only his own. The portraits therefore ship unnamed, with no placeholder standing in for a name.

Positioning of the person: an organizer who already ships projects, not a candidate whose record starts after the election.

## Capabilities and Constraints

Program commitments confirmed by the candidate. **AP classes and SAT are explicitly NOT part of the program** — the school already provides them, and the candidate removed that plank.

Already running during the campaign period:

1. **Voice of students** — surveys, an idea box, an open backlog of what students ask for.
2. **Complaints resolved immediately** — a fast, tracked route instead of problems disappearing.
3. **Anonymous mental-health support** — a confidential channel.

Secured but not yet delivered — the "добиваюсь" status, where effort is promised and reported, not an outcome:

4. **Days without uniform, and themed days** — the administration has already approved these; only the dates remain. This is the campaign's one concrete win to date and the proof that the method works.
5. **DECA** — an attempt to bring DECA to Central Asia for the first time, stated by the candidate as an attempt.
6. **A single portal of global opportunities** — prestigious ones only, explicitly not pay-to-play. Also an attempt.

Planned:

7. **Career guidance week** — visiting professionals running real trainings. NOT yet running: the candidate corrected this, it is planned.
8. **Two weeks, one profession** — a sustained format rather than a single talk.
9. **TEDx** — bringing a TEDx event to the school.
10. **School radio and news.**
11. **Business incubator / startup fair** — students build mini-projects (merch, handmade, services) and pitch them; winners receive budget from the school fund.
12. **Podcast studio / media centre** — a school podcast where seniors discuss trends, interview teachers, and talk about teenage problems.
13. **Secret angel (professional)** — a month in which school alumni, now university students, anonymously correspond with seniors, helping them choose a university and sharing practical advice.
14. **School cyber tournament** — Brawl Stars / Minecraft competitions on Saturdays, on phones or in the computer room; intended to be the main event of the year for younger students.
15. **More events and better cafeteria food** — student-driven, more choice, fair prices.

Explicitly open / not yet decided (must not be invented): election date, photos of the candidate, school name, contact handles, the other members of party 67, any numbers such as signature counts or poll results, and the final wording of the candidate's own "who I am" text.

## Brand Commitments

- Name used publicly: **Муслим** / **Муся** (both; "Муся" is the friendly form and can carry the humor).
- Party name on the site: **67**, exactly that numeral.
- Language: Russian.
- Tone: premium first, funny second. It must look expensive and well-made, and the humor lands as a reward for paying attention — memes, easter eggs, micro-copy — never as the reason the page looks cheap. The user's words: "премиум плюс мемы в очень ярком стиле".

## Evidence on Hand

None supplied yet. No photos, logos, testimonials, poll numbers, endorsements, or school assets have been provided. The site must not fabricate any of these; placeholders must be obviously marked as slots for the user to fill.

## Product Principles

1. **Proof over promise.** Anything already in motion is shown as in motion; anything not started is labeled honestly as planned. Never blur the two.
2. **Additive, not dismissive.** The school's existing international track — including AP and SAT, which it already provides — is respected and never claimed as the candidate's own. The program adds what is missing around it.
6. **An attempt is labeled an attempt.** Where the candidate said "постараюсь" (DECA, the opportunities portal), the site says so too. Overclaiming an unsecured partnership would break principle 1.
3. **Phone-first, one-minute read.** The whole argument must land on a phone screen without effort. Depth is available but never required.
4. **Expensive by default, funny on purpose.** Craft carries the page; humor is placed deliberately and can be removed without the page collapsing.
5. **Care is a platform plank, not decoration.** Mental-health support and complaint handling are treated with the seriousness their subject deserves — no jokes inside those sections.

## Accessibility & Inclusion

Must work on low-end phones and school Wi-Fi. Respect `prefers-reduced-motion` — the site is animation-heavy and every motion must have a still fallback. Sufficient contrast in a bright-colored palette; keyboard-navigable; the anonymous-support section must be readable and findable without irony.
