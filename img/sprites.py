# Authored pixel-art sprites, 16x16, hand-specified pixel by pixel.
# Palette indices -> hex. 0 = transparent.
import zlib, struct, os

OUT = "/Users/muslimtaishiev/Desktop/vote4musya/img"

def png(path, w, h, rows, palette, scale=1):
    # rows: list of strings, chars index into palette dict
    if scale > 1:
        rows = [ "".join(c*scale for c in r) for r in rows for _ in range(scale) ]
        w, h = w*scale, h*scale
    raw = b""
    for r in rows:
        raw += b"\x00"
        for ch in r:
            col = palette[ch]
            if col is None:
                raw += bytes((0,0,0,0))
            else:
                raw += bytes(col)
    def chunk(t, d):
        c = struct.pack(">I", len(d)) + t + d
        return c + struct.pack(">I", zlib.crc32(t+d) & 0xffffffff)
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0)
    data = zlib.compress(raw, 9)
    out = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", data) + chunk(b"IEND", b"")
    open(path, "wb").write(out)
    return path

BLUE  = (0x1B, 0x3F, 0xD8, 255)
RED   = (0xE3, 0x2B, 0x1E, 255)
GREEN = (0x12, 0x8A, 0x4B, 255)
DARK  = (0x14, 0x14, 0x18, 255)
WHITE = (0xFF, 0xFF, 0xFF, 255)
SKIN  = (0xF0, 0xC3, 0x9A, 255)
HAIR  = (0x2A, 0x1C, 0x14, 255)
YEL   = (0xF5, 0xC2, 0x1B, 255)
PINK  = (0xE8, 0x6A, 0x92, 255)
CYAN  = (0x3A, 0xC6, 0xD8, 255)

# ---- 1. Musya head sprite (16x16) : the candidate as a tiny pixel guy
musya = [
 "................",
 ".....hhhhhh.....",
 "....hhhhhhhh....",
 "...hhsssssshh...",
 "...hsssssssshh..",
 "...hssdssdsss...",
 "...hssssssss....",
 "...hsssddssss...",
 "....hssddsss....",
 ".....ssssss.....",
 "....bbbbbbbb....",
 "...bbbwwwwbbb...",
 "...bbbwwwwbbb...",
 "...bbbbbbbbbb...",
 "...bb......bb...",
 "..bbb......bbb..",
]
png(f"{OUT}/sprite-musya.png", 16,16, musya,
    {".":None,"h":HAIR,"s":SKIN,"d":DARK,"b":BLUE,"w":WHITE}, scale=6)

# ---- 2. Ballot box with a checkmark (16x16)
ballot = [
 "................",
 "....gggggggg....",
 "...g........g...",
 "...g......g.g...",
 "...g.....gg.g...",
 "...g.g..gg..g...",
 "...g.gg.g...g...",
 "...g..ggg...g...",
 "...g...g....g...",
 "...g........g...",
 "....gggggggg....",
 "..dddddddddddd..",
 "..d..........d..",
 "..d..dddddd..d..",
 "..d..........d..",
 "..dddddddddddd..",
]
png(f"{OUT}/sprite-ballot.png", 16,16, ballot,
    {".":None,"g":GREEN,"d":DARK}, scale=6)

# ---- 3. Plate of food (cafeteria plank) 16x16
food = [
 "................",
 "................",
 ".....rrrrrr.....",
 "....rryyyyrr....",
 "...ryyggggyyr...",
 "...ryggyyggyr...",
 "...ryggyyggyr...",
 "...ryyggggyyr...",
 "....rryyyyrr....",
 ".....rrrrrr.....",
 "..wwwwwwwwwwww..",
 ".wwwwwwwwwwwwww.",
 "..wwwwwwwwwwww..",
 "....dddddddd....",
 "................",
 "................",
]
png(f"{OUT}/sprite-food.png", 16,16, food,
    {".":None,"r":RED,"y":YEL,"g":GREEN,"w":WHITE,"d":DARK}, scale=6)

# ---- 4. Speech bubble (voice plank) 16x16
bubble = [
 "................",
 "..bbbbbbbbbbbb..",
 ".b............b.",
 ".b.wwww..wwww.b.",
 ".b............b.",
 ".b.wwwwwwwwww.b.",
 ".b............b.",
 ".b.wwwwww.....b.",
 ".b............b.",
 "..bbbbbbbbbbbb..",
 "...bb...........",
 "..bb............",
 ".bb.............",
 "................",
 "................",
 "................",
]
png(f"{OUT}/sprite-bubble.png", 16,16, bubble,
    {".":None,"b":BLUE,"w":WHITE}, scale=6)

# ---- 5. Heart (mental support plank) 16x16
heart = [
 "................",
 "..pppp...pppp...",
 ".pppppp.pppppp..",
 "pppppppppppppp..",
 "pppppppppppppp..",
 "pppppppppppppp..",
 ".pppppppppppp...",
 "..pppppppppp....",
 "...pppppppp.....",
 "....pppppp......",
 ".....pppp.......",
 "......pp........",
 "................",
 "................",
 "................",
 "................",
]
png(f"{OUT}/sprite-heart.png", 16,16, heart,
    {".":None,"p":PINK}, scale=6)

# ---- 6. Graduation cap (career / AP-SAT plank) 16x16
cap = [
 "................",
 ".......dd.......",
 "......dddd......",
 ".....dddddd.....",
 "....dddddddd....",
 "...dddddddddd...",
 "..dddddddddddd..",
 ".dddddddddddddd.",
 "..d..........d..",
 "..dd........dd..",
 "...dd......dd...",
 "....dddddddd..y.",
 "..............y.",
 "..............y.",
 ".............yy.",
 "................",
]
png(f"{OUT}/sprite-cap.png", 16,16, cap,
    {".":None,"d":DARK,"y":YEL}, scale=6)

# ---- 7. Lightning (events plank) 16x16
bolt = [
 "................",
 "........yyy.....",
 ".......yyy......",
 "......yyy.......",
 ".....yyy........",
 "....yyyyyyy.....",
 "...yyyyyyyy.....",
 "......yyy.......",
 ".....yyy........",
 "....yyy.........",
 "...yyy..........",
 "..yyy...........",
 "..yy............",
 "................",
 "................",
 "................",
]
png(f"{OUT}/sprite-bolt.png", 16,16, bolt,
    {".":None,"y":YEL}, scale=6)

# ---- 8. Star (16x16)
star = [
 "................",
 ".......yy.......",
 ".......yy.......",
 "......yyyy......",
 "......yyyy......",
 "yyyyyyyyyyyyyyyy",
 ".yyyyyyyyyyyyyy.",
 "..yyyyyyyyyyyy..",
 "...yyyyyyyyyy...",
 "....yyyyyyyy....",
 "...yyyy..yyyy...",
 "..yyyy....yyyy..",
 ".yyy........yyy.",
 "yy............yy",
 "................",
 "................",
]
png(f"{OUT}/sprite-star.png", 16,16, star,
    {".":None,"y":YEL}, scale=6)

print("ok")
