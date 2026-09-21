---
name: Муся — президент школы
description: Предвыборная страница на полях школьной тетради — клетка, три пасты и пиксель-арт.
colors:
  paper: "#FAF7EE"
  paper-deep: "#F3EEE0"
  grid: "#C3D4E8"
  grid-bold: "#A9C1DE"
  margin-red: "#E9B4AE"
  ink: "#1B1F2A"
  ink-soft: "#545C6E"
  ink-faint: "#646D80"
  blue: "#1B3FD8"
  blue-deep: "#1330A8"
  red: "#E32B1E"
  red-deep: "#C21E12"
  green: "#0E6F3C"
  yellow: "#F5C21B"
  pink: "#E86A92"
typography:
  display:
    fontFamily: "Unbounded, system-ui, sans-serif"
    fontSize: "clamp(50px, 19cqw, 168px)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Unbounded, system-ui, sans-serif"
    fontSize: "clamp(32px, 6.2vw, 78px)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Unbounded, system-ui, sans-serif"
    fontSize: "clamp(24px, 3.5vw, 44px)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "clamp(16px, 1.05vw + 13px, 19px)"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  hand:
    fontFamily: "Caveat, cursive"
    fontSize: "clamp(15px, 1.9vw, 21px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0"
  label:
    fontFamily: "Press Start 2P, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.02em"
rounded:
  chip: "14px"
  btn: "16px"
  note: "18px"
  field: "12px"
  pill: "99px"
spacing:
  cell: "26px"
  gutter: "clamp(18px, 5vw, 64px)"
  page: "1180px"
  band: "clamp(70px, 11vh, 132px)"
  plank: "clamp(24px, 3.4vw, 40px)"
  note-pad: "clamp(24px, 3.4vw, 40px)"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "#FFFFFF"
    typography: "{typography.headline}"
    rounded: "{rounded.btn}"
    padding: "0.95em 1.6em"
  button-primary-hover:
    backgroundColor: "{colors.blue-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.btn}"
    padding: "0.95em 1.6em"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "0.66em 1em"
  chip-green:
    textColor: "{colors.green}"
  note:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.note}"
    padding: "{spacing.note-pad}"
  field:
    backgroundColor: "{colors.paper-deep}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0.8em 0.95em"
  field-focus:
    backgroundColor: "{colors.paper}"
  status-now:
    textColor: "{colors.green}"
    rounded: "{rounded.pill}"
    padding: "0.42em 0.85em"
  status-try:
    textColor: "{colors.red-deep}"
    rounded: "{rounded.pill}"
    padding: "0.42em 0.85em"
  status-plan:
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "0.42em 0.85em"
  party-card:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.note}"
    padding: "clamp(26px, 3.4vw, 38px) clamp(24px, 3vw, 34px) clamp(28px, 3.6vw, 40px)"
---

# Design System: Муся — президент школы

## Overview

**Creative North Star: "Поля тетради" (The Margins of the Exercise Book)**

This is not a campaign poster and it must never become one. The page is a school exercise book opened flat: warm bone paper ruled in faint blue squares, a red vertical margin line running down the left edge of the viewport, and everything the candidate has to say written into it by hand. The argument lands because the visitor recognises the surface — this is where students actually write what they want, in circles, arrows and doodles — not because anything shouts at them.

The world holds two registers at once, and holding both is the whole craft of it. The **premium** register is the typographic structure: a heavy soft-geometric display face set very large and very tight, a real type ramp, generous vertical bands, a 1180px measure, honest line lengths capped in `ch`. The **notebook** register is everything drawn over that structure: lopsided ballpoint circles that overshoot themselves, underlines that miss the end of the word, carets, arrows pointing into the margin, handwritten asides, and 16×16 pixel-art stickers rotated a degree or two off true. Structure carries the seriousness; the marks carry the joke. Remove every doodle and the page is still a well-set document — that is the test, and it is what keeps the humour from reading as cheapness.

Chaos here is authored, not random. Every rotation is written as an explicit `--rot` / `--tilt` value on its own element, every floating sprite carries its own `--phase` so no two breathe in sync, and no two drawn circles use identical path data at identical scale. The page is asymmetric on purpose and aligned to nothing. Against that, the one thing that is rigidly systematic is honesty: the three-state status system (below) is the load-bearing component of the entire design, and it encodes state by **shape**, never by colour alone.

Confirmed rejections: no portrait-hero-plus-slogan-plus-three-icon-cards layout (the category default, refused by the thesis); no loud poster (nothing shouts); no condensed all-caps display type; no anti-aliased or soft-shadowed illustration — raster art is pixel art with hard edges only.

**Key Characteristics:**
- Graph-paper ground rendered live in CSS (26px cell), never an image
- Three ballpoint inks — blue, red, green — plus pencil grey, on warm bone paper
- Every emphasis is a hand-drawn SVG mark, not a background colour or a rule
- Status encoded by shape (solid / dashed-inner / dashed), so colour is never the only signal
- Pixel-art sprites at 16×16, `image-rendering: pixelated`, rotated off-grid
- Four self-hosted faces with Cyrillic + Latin subsets; the page is Russian-first
- Motion differs by role and disappears completely under `prefers-reduced-motion`

## Colors

A ballpoint-pen palette: three pen inks and a pencil, laid on warm bone paper ruled in faded blue. Saturation is reserved almost entirely for the pens — the paper and the grid never compete with a mark.

### Primary
- **Ballpoint Blue** (`{colors.blue}`): the acting ink. Primary buttons, links, focus outlines, the scrollbar thumb, and the default drawn ring around a word. It is the colour of "this is the thing to do".
- **Pressed Blue** (`{colors.blue-deep}`): the hover and shadow value under Ballpoint Blue. Never used as a fill on its own.

### Secondary
- **Red Ballpoint** (`{colors.red}`): the correction pen. The hand-drawn circle around the candidate's name, the caret and the "Муся" correction written above "Муслим", and margin notes that flag something unprecedented. Rare by construction — a teacher's red pen loses all its force if half the page is red.
- **Deep Red** (`{colors.red-deep}`): the "добиваюсь" status and the interrogative margin question in the transition band. A darker, more legible red for type at small sizes.

### Tertiary
- **Green Ballpoint** (`{colors.green}`): reserved for what is already true. The "идёт сейчас" status, the chips in the hero, the running-count numerals in the tally, the overshooting underline, and confirmation messages. Green on this page means verified reality, never decoration.
- **Highlighter Yellow** (`{colors.yellow}`): a marker swipe, not a surface. It appears as a 0.46em band behind bold words in the hero line, as the party numeral **67** on the dark card, and as the inline `67` badge. Also the text selection background.
- **Pink Note** (`{colors.pink}`): one handwritten margin aside ("это серьёзно"). A fourth pen that someone borrowed once.

### Neutral
- **Bone Paper** (`{colors.paper}`): the page ground and the surface of every chip, note and card that sits on top of it.
- **Shadowed Paper** (`{colors.paper-deep}`): the input field ground, the empty photo slot, and the sliver of the next sheet visible past the right edge of the page.
- **Faint Grid** (`{colors.grid}`) / **Bold Grid** (`{colors.grid-bold}`): the ruled squares, and every structural divider — plank separators, the footer rule, note edges, and the hard drop under lifted surfaces.
- **Margin Line Red** (`{colors.margin-red}`): the fixed vertical margin rule at the left of the viewport, and the dashed border of every unfilled slot.
- **Ink** (`{colors.ink}`) / **Soft Ink** (`{colors.ink-soft}`) / **Faint Ink** (`{colors.ink-faint}`): body text, secondary prose, and pencil-grey labels and margin handwriting respectively. Ink is also the border of every outlined surface and the fill of the party card.

### Named Rules

**The Three Pens Rule.** Blue acts, red corrects, green confirms. A new colour must earn its way in by being a pen someone would actually have in a pencil case, and it must take a job none of the three already does. Do not introduce a gradient, a tint ramp, or a fourth "brand" accent.

**The Red Scarcity Rule.** Red is the correction pen. It appears on the name's circle, on "добиваюсь", and on unfilled slots — nowhere else. If red is on more than a few elements in one viewport, the page has stopped being a notebook and become a warning sign.

**The Paper Is Never Painted Rule.** Section backgrounds stay `{colors.paper}`. Depth and separation come from the grid, from borders, and from the single dark party card — never from tinted bands, never from a coloured hero block.

## Typography

**Display Font:** Unbounded (400/600/800, with `system-ui, sans-serif`)
**Body Font:** Onest (400/500/700, with `system-ui, sans-serif`)
**Handwriting Font:** Caveat (600, with `cursive`)
**Pixel Label Font:** Press Start 2P (400, with `monospace`)

All four are self-hosted WOFF2 with separate Cyrillic and Latin `unicode-range` subsets and `font-display: swap`; the Cyrillic subsets of Unbounded 800 and Onest 400 are preloaded. The page is Russian-first, so a face without a real Cyrillic cut cannot enter this system.

**Character:** Unbounded is soft-geometric and wide — rounded terminals, generous counters — set at weight 800 with `-0.03em` tracking and sub-1.0 leading so headlines read as confident objects rather than as shouting. Onest underneath it is a plain, highly legible humanist sans that never draws attention. Caveat is the classmate's hand. Press Start 2P is the arcade caption, used at 11px in tiny doses. Four voices sounds like too many; it works because each has exactly one job and they never trade places.

### Hierarchy
- **Display** (Unbounded 800, `clamp(50px, 19cqw, 168px)`, lh 0.86): the candidate's name in the hero, and nothing else. Sized in `cqw` against a container query on its own column so it scales to the space it has rather than to the viewport.
- **Headline** (Unbounded 800, `clamp(32px, 6.2vw, 78px)`, lh 0.95, max 17ch): one per band. The closing call is a wider variant (`clamp(38px, 9vw, 122px)`), centred, and it is the only centred type on the page.
- **Title** (Unbounded 800, `clamp(24px, 3.5vw, 44px)`): plank names and note headings (notes step down to `clamp(21px, 2.6vw, 30px)`).
- **Body** (Onest 400, `clamp(16px, 1.05vw + 13px, 19px)`, lh 1.62): all running prose. Measure is capped — 68ch globally, 56ch inside a plank, 54ch for band intros and the transition answer, 44ch for the "who I am" lead. The hero line is deliberately short at 21ch so it breaks like a written sentence.
- **Handwriting** (Caveat 600, `clamp(15px, 1.9vw, 21px)`): margin asides, form labels, figure captions, slot placeholders and status messages. Always at a rotation, always in pencil grey or a pen colour — never black, never in a straight run of body copy.
- **Label** (Press Start 2P 400, 11px, `0.02em`, uppercase): plank numerals, chip kickers, fact keys, the footer stamp. Never longer than a few words — this face has no patience and neither does its reader.

### Named Rules

**The One Job Per Face Rule.** Unbounded is only ever a heading or a button; Onest is only ever prose and status text; Caveat is only ever a mark in the margin; Press Start 2P is only ever a tiny uppercase label. A face used for a second job is the fastest way to destroy this world.

**The Soft Type Rule.** Display type is soft, rounded and wide — never condensed, never a hard grotesque, never letterspaced caps. If a headline needs more force, set it larger and tighter; do not reach for uppercase.

**The Measure Rule.** Every block of prose declares a `max-width` in `ch`. A paragraph that runs the full 1180px page has broken the notebook: nobody writes 120-character lines by hand.

## Layout

The page is a single vertical column of full-width bands inside a 1180px measure (`{spacing.page}`), centred with a fluid gutter (`{spacing.gutter}`). There is no navigation bar anywhere — not in the first viewport, not sticky; the page is read top to bottom and its only in-page links are inline in prose and in the closing call.

The ground is a live CSS graph-paper grid: two crossed 1px linear-gradients at a 26px cell (`{spacing.cell}`), painted on `body` so it scrolls with the content and costs no request. A fixed 2px vertical rule in Margin Line Red sits at `clamp(14px, 4.2vw, 74px)` from the left edge of the viewport, above the grid and below the content (`z-index: 1`; the content wrapper is `z-index: 2`, floating doodles `z-index: 3`, the hero's note stack `z-index: 4`). Below 720px that rule moves to 12px and the wrapper's left padding is raised to at least 30px so text never collides with it. A fixed `.sheet` layer draws the right edge of the page — a `clamp(10px, 2.4vw, 30px)` strip of shadowed paper with a shadow gradient and a hairline border — so the page reads as one sheet of a bound book, not an infinite plane.

Vertical rhythm is set by the band: `{spacing.band}` of block padding, a headline, an intro capped at 54ch, then content. The hero is `min-height: 100svh` and vertically centred, dropping to intrinsic height below 760px so a phone does not open on empty paper.

Breakpoints, in the order the layout actually changes: **1100px** (plank margin notes shrink and move to the left edge), **1080px** (team grid 6 → 3 columns), **900px** (hero collapses to one column; the note stack becomes a horizontal wrap of smaller chips), **860px** ("who I am" collapses to one column), **760px** (hero loses its full-height reservation; sprites drop to 26px), **720px** (plank becomes a two-column stack with the status on its own full-width row; margin rule and sheet edge narrow), **680px** (the transition band stacks question → arrow → answer), **620px** (the pointing arrow and its handwritten hint disappear together), **560px** (team grid 3 → 2 columns), **460px** (plank margin handwriting drops; sprites stay).

### Named Rules

**The Marks Shrink, They Don't Vanish Rule.** On narrow screens marginalia get smaller and move to the very edge, exactly as they would in a real notebook. Only the tightest breakpoint (460px) drops plank handwriting, and pixel sprites survive every breakpoint. A phone must still look like a written-in book.

**The Paired Removal Rule.** A drawn arrow and the handwritten caption that explains it are one object and hide at the same breakpoint. An arrow pointing at nothing, or a "вот сюда :)" with nothing to point at, is worse than neither.

## Elevation & Depth

This system is paper, so depth is physical and shallow: a surface either lies on the sheet or is lifted a couple of millimetres off it. There is no ambient, blurred, soft-UI elevation anywhere and there must not be. Lift is expressed as a **hard, un-blurred vertical offset in Bold Grid** — the colour of a ruled line — so the shadow reads as the edge of a second sheet of paper rather than as a glow. Larger surfaces pair that hard edge with a single very diffuse, very dark, heavily negative-spread shadow that only grounds the object; it is never visible as a shape.

Layering is otherwise done by z-index and by the fixed sheet edge, not by shade. Colour is never used to indicate elevation.

### Shadow Vocabulary
- **Paper lift, small** (`box-shadow: 0 2px 0 var(--grid-bold)`): chips in the hero stack. The green chips use a translucent green of the same geometry so the lift belongs to the pen.
- **Paper lift, medium** (`box-shadow: 0 3px 0 var(--grid-bold), 0 18px 34px -22px rgba(27,31,42,.5)`): notes, team portraits, the poster and the party card (the latter two deepen the diffuse pass to `-26px` / `-28px`).
- **Button lift** (`box-shadow: 0 2px 0 rgba(19,48,168,.55), 0 10px 22px -10px rgba(19,48,168,.7)`): primary buttons only, and tinted in their own ink rather than grey.
- **Button pressed** (`box-shadow: 0 1px 0 rgba(19,48,168,.55), 0 4px 10px -6px rgba(19,48,168,.7)`): the `:active` state, paired with `transform: scale(0.97)`.

### Named Rules

**The Hard Edge Rule.** Every resting shadow has zero blur and a 2–3px vertical offset in Bold Grid. Soft, blurred, multi-layer drop shadows belong to a different world; here they make paper look like plastic.

**The Ghost Button Rule.** The ghost variant carries no shadow at all, at rest or on hover. It is drawn on the page, not lying on it.

## Shapes

Corners are soft and consistently sized by surface scale: chips 14px, buttons 16px, notes and cards 18px, inputs 12px, status pills fully round (99px). Nothing on this page has a sharp 90° corner except the ruled grid itself.

The defining form language is **the 2px outline**. Every discrete surface — chip, note, field, party card, portrait, poster — is a 2px stroke around a paper fill: an object someone drew a box around. Ink is the default stroke for content surfaces, Bold Grid for structural dividers and inputs, and the stroke changes colour to carry meaning (green for a running chip, blue for the candidate's portrait, Margin Line Red for an unfilled slot).

Border *style* is itself semantic and is the system's second meaning channel after shape. **Solid means real; dashed means not yet.** A dashed border in Margin Line Red is the universal "slot to be filled" marker — the candidate's own-words placeholder, unfilled team names, empty photo frames — and a dashed ring is what separates a plan from a running commitment.

Hand-drawn geometry is never a border-radius. Circles, underlines, carets and arrows are inline SVG paths with `fill: none`, `stroke-linecap: round`, and stroke widths of 2.4–4. They sit at `z-index: -1` behind their own text with generous negative insets and `overflow: visible`, and they are stretched with `preserveAspectRatio="none"` so a loop drawn around a short word and a long one are genuinely different shapes.

### Named Rules

**The Second Pass Rule.** Every drawn circle and ring carries a duplicate `.ink2` path at roughly half the stroke width, ~0.4 opacity, nudged 1–2px and rotated a fraction of a degree. This is what makes the mark read as a pen that went round twice instead of a vector shape. A new drawn circle without its second pass will look printed and will not belong.

**The No Two Alike Rule.** No two loops on the page share identical path data at identical dimensions. When a new drawn mark is needed, alter the control points — reusing a path verbatim reintroduces the machine.

**The Dashed Means Unfinished Rule.** Dashed strokes are reserved for what does not exist yet: unfilled content slots and unstarted commitments. Never use a dashed border decoratively.

## Components

### Buttons
- **Shape:** softly rounded rectangle (16px), inline-flex with a 0.7em gap for an optional pixel sprite.
- **Primary:** Ballpoint Blue fill, white text, Unbounded 600 at `clamp(15px, 1.5vw, 19px)`, padding `0.95em 1.6em`, blue-tinted hard + diffuse lift. Carries a 24px `.btn__sprite` (`image-rendering: pixelated`) sized to 1.5em when it needs an icon.
- **Hover:** Pressed Blue with `translateY(-1px)` over 160ms — gated behind `(hover: hover) and (pointer: fine)` so touch devices never get a stuck hover.
- **Active:** `scale(0.97)` with the shadow collapsing to the pressed vocabulary. This press response is kept even under reduced motion; only the transform transition is dropped.
- **Ghost:** transparent with a 2px Ink border and Ink text; hover inverts to Ink fill with paper text. No shadow in any state.

### Chips (hero note stack)
- **Style:** paper fill, 2px Ink border, 14px radius, small paper lift, each rotated by its own `--rot` between -2.4° and 2.6° and pushed right by an irregular `margin-left` so the stack reads as notes dropped on a desk.
- **Content:** a Press Start 2P kicker line in Faint Ink above, then an 18px pixel sprite and a short phrase.
- **Variant:** `chip--green` recolours border, text and lift to Green Ballpoint for a plank that is already running.
- **Responsive:** below 900px the column becomes a horizontal wrap, rotations and offsets are flattened, and type drops to 13px / 11px.

### Cards / Containers (notes)
- **Corner Style:** 18px.
- **Background:** Bone Paper on the graph-paper ground.
- **Border:** 2px Ink.
- **Shadow:** paper lift, medium.
- **Internal Padding:** `clamp(24px, 3.4vw, 40px)`.
- Laid out in a `grid2` auto-fit grid with a 300px minimum, so two notes become one column without a media query.

### Inputs / Fields
- **Style:** Shadowed Paper fill, 2px Bold Grid border, 12px radius, `font: inherit`, padding `0.8em 0.95em`, vertical resize only. Labels above are Caveat at 20px in Soft Ink — the field is a blank someone wrote a prompt next to.
- **Hover:** border to Faint Ink.
- **Focus:** border to Ballpoint Blue and background lifts to Bone Paper, *plus* a 3px blue `:focus-visible` outline at 2px offset. Colour change alone is never treated as sufficient focus feedback.
- **Validation:** empty submit writes a red message into a `role="status"` region and returns focus to the field; success writes a green one. No colour-only error signalling and no invented success state.

### Navigation
There is no navigation component. The page has no nav bar, no sticky header and no menu at any breakpoint. Wayfinding is the prose itself plus the closing call, which offers "Читать программу" back up the page and a share button. Do not add a nav bar to this world; the thesis explicitly refuses one.

### Status Pill — the signature component
The single most important component on the page, and the one a future contributor is most likely to damage. It carries the product's honesty principle, and it encodes its three states by **shape**, so it survives greyscale, colour-blindness and a bad school projector.

All three share: inline-flex, 0.55em gap, Onest 700 uppercase at `clamp(12px, 1.3vw, 14px)` with `0.04em` tracking, `0.42em 0.85em` padding, a full 99px radius, and a 1.5em inline SVG marker at `currentColor`.

- **`status--now` — "Идёт сейчас":** solid 2px Green border, 7% green wash, and a **filled** dot (`<circle r="7" fill="currentColor">`). Solid outside, solid inside: this is real and running.
- **`status--try` — "Добиваюсь":** solid 2px Deep Red border, 6% red wash, and a **dashed ring** (`r="6.6"`, `stroke-dasharray="3 3"`). The commitment is solid; the outcome is not. This state exists because the candidate said "постараюсь", and it promises effort and an open report, never a result.
- **`status--plan` — "План":** **dashed** 2px Faint Ink border, no wash, and an **empty** ring (`r="6.6"`, solid stroke, no fill). Nothing has started yet and the border says so before the word does.

The progression is legible without reading: filled → dashed-inside → dashed-outside. Below 720px the pill drops to its own full-width row at the bottom of the plank rather than shrinking.

### Plank (programme row)
A three-column grid — 56px pixel sprite, text column, status pill — separated by a 2px Bold Grid rule, with the last row's rule removed. Inside: a Press Start 2P numeral, an Unbounded title, and body prose capped at 56ch in Soft Ink. Some planks carry one absolutely-positioned Caveat margin note at a rotation, coloured in a pen. Below 720px it becomes two columns with the status on its own row.

### Team Portrait
A 3:4 figure with a 2px Ink border, 16px radius, medium paper lift, and its own `--tilt` between -1.6° and 1.7° assigned per `nth-child` so the six hang slightly crooked. Hover (fine pointers only) straightens the portrait to 0° and lifts it 3px over 220ms — the one place on the page where interaction *removes* chaos. The candidate's own frame is marked by a Ballpoint Blue border and a blue-tinted lift, never by being larger. When a photo is missing, `app.js` catches the image error and replaces the frame with an `is-empty` state: dashed Margin Line Red border, no shadow, a 40px pixel sprite at 55% opacity, and a Caveat "фото сюда". Unfilled names use a Caveat placeholder with a dashed red-pink underline.

### Drawn Mark (`.ring`, `.ul`, `.hero__circle`)
Not a visual flourish but the emphasis system: this world has no `<strong>` colour swaps and no highlighter rules besides the one yellow band. `.ring` loops a lopsided blue circle behind a word (`.ring--red` for the correction pen), `.ul` draws a green underline that starts 3% early and overshoots 5% past the end, and `.hero__circle` loops the name and the closing call. Each is inline SVG, positioned absolutely behind its text at `z-index: -1`, and each should carry an `.ink2` second pass.

## Motion — the interaction layer

Reveal motion (`.rise`, `.draw`, `.bob`) shows the page arriving. This second layer is the page **answering** the reader, and every piece of it is gated behind `@media (hover: hover) and (pointer: fine)` or a pointer event, so a phone pays nothing for it.

Five authored moments, each with a named purpose. Nothing here sits on a high-frequency action.

| Moment | Purpose | Ingredients |
|---|---|---|
| **Pen lean** — the name follows the cursor | delight (first viewport, seen once per visit) | `.hero__lean`, rotation driven on rAF with a critically damped approach (`current += (target - current) * 0.09`), capped at ±1.5°, returns to 0 on `pointerleave`. Never a spring with bounce; the paper does not wobble. |
| **Plank response** — sprite turns, title steps right | feedback | `transform: scale(1.14) rotate(-6deg)` on the sprite, `translateX(7px)` on the title, 260–300ms `--ease-out` |
| **Read rule** — blue line grows under the hovered row | spatial consistency | `.plank::after`, `scaleX(0 → 1)` from `transform-origin: left`, 420ms `--ease-out` |
| **Vote check** — a checkmark draws itself into the button | feedback (rare action, so the delight budget applies) | SVG `stroke-dashoffset: 32 → 0`, 260ms `--ease-out`, class applied on the next frame so the transition fires |
| **Read progress** — the red margin line fills as the programme is read | state indication | `.readline`, `scaleY` from `transform-origin: top`, recomputed in a rAF-throttled `scroll` listener against an eye line at 34% viewport height |

Rules for extending this layer:

- **Only `transform`, `opacity`, `clip-path` and `stroke-dashoffset`.** Never animate `width`, `height`, `margin`, `padding`, `top` or `left`.
- **Curves come from `:root`.** `--ease-out` for entering and exiting, `--ease-in-out` for movement on screen. Never bare `ease-in` — it delays the moment the reader is watching.
- **Durations:** press feedback 100–160ms, hover 240–300ms, a drawn mark up to 420ms. UI motion stays under 300ms unless it is a mark being drawn.
- **Transitions, never keyframes, for anything a reader can trigger twice in a second.** Transitions retarget from the current value; keyframes restart from zero.
- **The `--lean` value is set on the element, never on a parent.** A custom property on a parent recalculates styles for every child.
- **The lean lives on `.hero__lean`, not on `.hero__name`**, because `.rise.is-in` already owns the h1's `transform` and the two would fight.
- Every one of these has a `prefers-reduced-motion` branch that removes the transition and leaves the end state.

## Do's and Don'ts

### Do:
- **Do** encode any new state by shape first — border style and marker fill — and let colour be the second signal, exactly as `status--now` / `status--try` / `status--plan` do.
- **Do** give every new drawn circle or ring a second, lighter `.ink2` pass (about half the stroke width, ~0.4 opacity, offset 1–2px, rotated a fraction of a degree).
- **Do** write chaos as explicit per-element values: `--rot` for a mark, `--tilt` for a portrait, `--phase` for a floating sprite, `--d` for a stagger delay. Randomness must be authored and reproducible.
- **Do** cap every prose block with a `max-width` in `ch` (68 / 56 / 54 / 44 are the established values).
- **Do** gate every hover treatment behind `@media (hover: hover) and (pointer: fine)`.
- **Do** give every new motion a `prefers-reduced-motion: reduce` branch that shows the end state statically — the existing block neutralises `.rise`, `.draw`, `.bob`, the per-role entrances and the portrait transition, and it must keep covering everything new.
- **Do** measure drawn paths at runtime with `getTotalLength()` rather than hard-coding a dash length; the circles are stretched and their length differs per viewport.
- **Do** author new raster art as pixel art (16×16 grids, `image-rendering: pixelated`, hard edges), regenerate it through `img/sprites.py`, and record it in `img/PROVENANCE.md`.
- **Do** mark anything not yet supplied as an obvious slot: dashed Margin Line Red border, Caveat placeholder text. An empty slot must look intentional, never broken.
- **Do** name the purpose of any new motion in one word — feedback, spatial consistency, state indication, preventing a jarring change, or delight — before writing it. Motion that cannot be named that way does not ship.
- **Do** keep a distinct entrance per role — `.plank` shifts up and left as if written, `.note` rotates half a degree into place, `.close .rise` scales down from 0.985 as the page closes.

### Don't:
- **Don't** add a navigation bar, a sticky header or a menu. The thesis refuses one and the page is designed to be read straight through.
- **Don't** introduce a fourth accent ink, a gradient fill, or a tint ramp. Three pens and a pencil.
- **Don't** use blurred, soft or multi-layer drop shadows for resting elevation. Lift is a hard `0 2–3px 0` offset in Bold Grid.
- **Don't** paint a section background. The graph paper runs unbroken; the dark party card is the single intentional exception.
- **Don't** set display type in condensed faces, all-caps or wide letterspacing. If a headline needs force, set it bigger and tighter.
- **Don't** let Caveat carry running prose or Press Start 2P carry anything longer than a few uppercase words.
- **Don't** reuse an existing drawn path verbatim at the same size — alter the control points so no two loops match.
- **Don't** indicate focus by border colour alone; keep the 3px Ballpoint Blue `:focus-visible` outline at 2–3px offset on every interactive element.
- **Don't** place a joke, a doodle or a pixel sprite inside the anonymous-support material. That block is the one place the humour does not go.
- **Don't** animate anything a reader triggers dozens of times a day, and never put motion on a keyboard-initiated action.
- **Don't** invent a number, a photograph, an endorsement or a date to fill a layout. If it does not exist, ship the dashed slot.
