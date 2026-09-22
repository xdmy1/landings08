#!/bin/sh
# Regenerates public/images/og.jpg (the link preview image: white background,
# logo + H1, five client sites in iPhone frames).
#   sh scripts/og/build.sh          # reshoot the client sites, then render
#   sh scripts/og/build.sh --render # render only, reuse scripts/og/shots/*.png
# To swap a phone: edit the <img src="shots/..."> in og.html and the matching
# status-bar color/tone (sampled from the top strip of that screenshot).
set -e
cd "$(dirname "$0")"

if [ "$1" != "--render" ]; then
  node shoot.mjs shots \
    glg=https://scoalaautoglg.com eurogard=https://eurogard.md davo=https://davo.md \
    radx=https://radx.solutions interbus=https://inter-bus.md \
    inauto=https://inauto.md infobac=https://infobac.md mobo=https://mobo.md
fi

node render-og.mjs og.html og-2x.png
# 2400x1260 -> 1200x630, JPEG q90 (~140 KB; WhatsApp needs a small file for the large preview)
sips -z 630 1200 -s format jpeg -s formatOptions 90 og-2x.png --out ../../public/images/og.jpg >/dev/null
echo "wrote public/images/og.jpg ($(du -k ../../public/images/og.jpg | cut -f1) KB)"
