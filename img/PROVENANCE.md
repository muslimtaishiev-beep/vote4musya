# Provenance — img/

All eight sprites are original work authored for this project. None are generated,
stock, or sourced. Each was specified pixel by pixel as a 16×16 character grid in a
Python script and rendered to PNG at 6× nearest-neighbour (96×96), so the pixel edges
stay hard.

Source script: `sprites.py`, shipped next to the images. Run `python3 img/sprites.py`
to regenerate every sprite from its grid. To add one, copy an existing grid block,
redraw the characters, and give it a palette entry.

| File | Grid | Used for |
|---|---|---|
| sprite-musya.png  | 16×16 | the candidate: margin sticker, favicon, empty-portrait slot |
| sprite-ballot.png | 16×16 | vote button + plank 04 (жалобы) |
| sprite-bubble.png | 16×16 | plank 01 (голос учеников) |
| sprite-cap.png    | 16×16 | plank 02 (профориентация) |
| sprite-heart.png  | 16×16 | plank 03 (анонимная поддержка) |
| sprite-cal.png    | 16×16 | plank 05 (две недели, одна профессия) |
| sprite-mic.png    | 16×16 | plank 06 (TEDx) |
| sprite-cup.png    | 16×16 | plank 07 (DECA) |
| sprite-globe.png  | 16×16 | plank 08 (портал возможностей) |
| sprite-rocket.png | 16×16 | plank 09 (бизнес-инкубатор) |
| sprite-phones.png | 16×16 | plank 10 (медиацентр и подкаст) |
| sprite-letter.png | 16×16 | plank 11 (Тайный ангел) |
| sprite-radio.png  | 16×16 | plank 12 (школьное радио) |
| sprite-pad.png    | 16×16 | plank 13 (кибертурнир) |
| sprite-shirt.png  | 16×16 | plank 14 (дни без формы) |
| sprite-food.png   | 16×16 | plank 15 (мероприятия и столовая) |
| sprite-star.png   | 16×16 | margin mark, hero chip |
| sprite-bolt.png   | 16×16 | margin mark |

Seventeen sprites ship. The first eight were authored in the first pass
(`sprites.py`); the nine added for planks 05–14 were authored the same way in a
second pass and are reproduced in the same script. Both passes use one method:
a 16×16 character grid, one character per palette entry, rendered to PNG at 6×
nearest-neighbour so the pixel edges stay hard.

Palette used across the set:
blue #1B3FD8 · red #E32B1E · green #128A4B · dark #141418 · white #FFFFFF
skin #F0C39A · hair #2A1C14 · yellow #F5C21B · pink #E86A92 · cyan #3AC6D8
orange #F28C28 · purple #7C5CE0

Note: the sprite palette is the *ink* palette at full saturation. It is
deliberately a step brighter than the page tokens in `:root`, because a 16px
sprite needs more chroma than a paragraph to read at all. Do not "correct"
sprite colours to match the CSS tokens.

## Fonts (fonts/)

Self-hosted from Google Fonts, Cyrillic + Latin subsets only:
- **Unbounded** (400/600/800) — display voice, soft and rounded
- **Onest** (400/500/700) — body
- **Caveat** (600) — handwritten corrections and margin notes
- **Press Start 2P** (400) — pixel labels

All four are licensed under the SIL Open Font License 1.1.
