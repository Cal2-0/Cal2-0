/**
 * F1 Contribution Strip Generator
 *
 * Approach: Write from scratch (not forking snk).
 * Reason: snk's path-walking is tightly coupled to its snake renderer.
 * Extracting just the path-walking + rewiring the renderer would touch
 * ~40% of snk's codebase and require keeping up with its fork forever.
 * Writing the grid walker fresh is <150 lines and gives full control over
 * the animation model (proportional dwell-time per cell via keyTimes).
 *
 * Animation: Pure SVG SMIL (<animateMotion> + <animate>) — NO JavaScript.
 * GitHub's camo proxy strips <script> tags from SVGs. SMIL is supported
 * in all modern browsers on desktop. Known gap: GitHub mobile app has
 * inconsistent SMIL rendering (see Deliverable 5 for fallback notes).
 *
 * Grid model matches GitHub's contribution calendar exactly:
 *   - 7 rows (Sun=0 … Sat=6)
 *   - 52–53 columns (weeks), left = oldest, right = newest
 *   - Cell size: 11px, gutter: 3px → stride = 14px
 *   - Origin: top-left of first week column
 */

import { graphql } from "@octokit/graphql";
import fs from "fs";
import path from "path";

const USERNAME = process.env.GITHUB_USERNAME || "Cal2-0";
const TOKEN    = process.env.GITHUB_TOKEN;

// ─── Grid constants (match GitHub's calendar pixel geometry) ──────────────
const CELL      = 11;   // px
const GAP       = 3;    // px
const STRIDE    = CELL + GAP;  // 14px
const ROWS      = 7;
const PAD_LEFT  = 32;   // space for day labels
const PAD_TOP   = 24;   // space for month labels
const PAD_RIGHT = 16;
const PAD_BOT   = 8;

// ─── Color scales ─────────────────────────────────────────────────────────
const SCALES = {
  dark: {
    bg:        "#0A0E14",
    empty:     "#1C232C",
    levels:    ["#1C232C", "#1B3A5C", "#2563EB", "#3B82F6", "#5B8CFF"],
    trackLine: "#5B8CFF",
    trailBase: "#3DDC97",
    carBody:   "#E6EDF3",
    carAccent: "#5B8CFF",
    flagBg:    "#0F1419",
    text:      "#8B98A5",
  },
  light: {
    bg:        "#FFFFFF",
    empty:     "#EBEDF0",
    levels:    ["#EBEDF0", "#9BE9A8", "#40C463", "#30A14E", "#216E39"],
    trackLine: "#216E39",
    trailBase: "#30A14E",
    carBody:   "#0D1117",
    carAccent: "#216E39",
    flagBg:    "#F6F8FA",
    text:      "#57606A",
  },
};

// ─── Fetch contribution calendar via GraphQL ───────────────────────────────
async function fetchContributions() {
  const client = graphql.defaults({
    headers: { authorization: `token ${TOKEN}` },
  });

  const { user } = await client(`
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                weekday
              }
            }
          }
        }
      }
    }
  `, { login: USERNAME });

  return user.contributionsCollection.contributionCalendar.weeks;
}

// ─── Build flat cell array with (col, row, count, date) ───────────────────
function buildCells(weeks) {
  const cells = [];
  weeks.forEach((week, col) => {
    week.contributionDays.forEach((day) => {
      cells.push({
        col,
        row:   day.weekday,    // 0=Sun … 6=Sat
        count: day.contributionCount,
        date:  day.date,
      });
    });
  });
  return cells;
}

// ─── Map count → level (0–4) ──────────────────────────────────────────────
function countToLevel(count) {
  if (count === 0) return 0;
  if (count <= 2)  return 1;
  if (count <= 5)  return 2;
  if (count <= 10) return 3;
  return 4;
}

// ─── Build SVG path string for the car's racing line ─────────────────────
// We walk every cell in chronological order (col × STRIDE → x, row × STRIDE → y)
// and build an SVG polyline through their centers.
function buildRacingLinePath(cells, originX, originY) {
  const pts = cells.map(c => [
    originX + c.col * STRIDE + CELL / 2,
    originY + c.row * STRIDE + CELL / 2,
  ]);
  return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
}

// ─── Compute keyTimes for animateMotion ────────────────────────────────────
// Dwell time at each cell is proportional to its contribution count.
// Zero-count cells still get a minimum slice (constant speed feel on empty days).
function buildKeyTimes(cells) {
  const MIN_WEIGHT = 0.5;
  const weights = cells.map(c => Math.max(c.count, MIN_WEIGHT));
  const total   = weights.reduce((s, w) => s + w, 0);

  const keyTimes = [];
  let cumulative = 0;
  for (let i = 0; i < weights.length; i++) {
    keyTimes.push((cumulative / total).toFixed(4));
    cumulative += weights[i];
  }
  keyTimes.push("1");   // final keyTime must be "1"
  return keyTimes.join(";");
}

// ─── F1 car sprite (top-down, geometric, ~14px tall) ──────────────────────
// Defined at origin; the animateMotion transform positions it.
// Oriented to travel rightward (the dominant direction in the contribution grid).
function carSprite(theme) {
  const { carBody, carAccent } = SCALES[theme];
  return `
    <!-- F1 car body: wedge nose, cockpit, wide rear -->
    <g id="f1car" transform="translate(-7,-5)">
      <!-- main body -->
      <polygon points="14,5 10,2 2,3 0,5 2,7 10,8" fill="${carBody}" />
      <!-- cockpit -->
      <rect x="5" y="3.5" width="4" height="3" rx="1" fill="${carAccent}" opacity="0.9"/>
      <!-- front wing -->
      <rect x="11" y="4" width="3" height="2" rx="0.5" fill="${carAccent}"/>
      <!-- rear wing -->
      <rect x="0" y="2" width="2" height="6" rx="0.5" fill="${carAccent}"/>
      <!-- left rear tyre -->
      <rect x="1" y="1" width="3" height="3" rx="1" fill="${carBody}" opacity="0.8"/>
      <!-- right rear tyre -->
      <rect x="1" y="6" width="3" height="3" rx="1" fill="${carBody}" opacity="0.8"/>
      <!-- left front tyre -->
      <rect x="9" y="1.5" width="2.5" height="2.5" rx="1" fill="${carBody}" opacity="0.8"/>
      <!-- right front tyre -->
      <rect x="9" y="6" width="2.5" height="2.5" rx="1" fill="${carBody}" opacity="0.8"/>
    </g>`;
}

// ─── Generate full SVG string ──────────────────────────────────────────────
function generateSVG(weeks, theme) {
  const cells = buildCells(weeks);
  const cols  = weeks.length;
  const W     = PAD_LEFT + cols  * STRIDE + PAD_RIGHT;
  const H     = PAD_TOP  + ROWS * STRIDE  + PAD_BOT;
  const OX    = PAD_LEFT;
  const OY    = PAD_TOP;
  const sc    = SCALES[theme];

  const totalDuration = "8s";   // full animation loop duration

  // ── month labels ──
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let monthLabels = "";
  let lastMonth   = -1;
  weeks.forEach((week, col) => {
    if (week.contributionDays.length === 0) return;
    const m = new Date(week.contributionDays[0].date).getUTCMonth();
    if (m !== lastMonth) {
      monthLabels += `<text x="${OX + col * STRIDE}" y="${OY - 6}" 
        font-family="monospace" font-size="9" fill="${sc.text}">${monthNames[m]}</text>`;
      lastMonth = m;
    }
  });

  // ── day labels ──
  const dayLabels = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    .map((d, i) => i % 2 === 1
      ? `<text x="${OX - 6}" y="${OY + i * STRIDE + CELL}"
           font-family="monospace" font-size="9" fill="${sc.text}" text-anchor="end">${d}</text>`
      : "")
    .join("");

  // ── contribution cells ──
  let cellRects = "";
  cells.forEach(c => {
    const x = OX + c.col * STRIDE;
    const y = OY + c.row * STRIDE;
    const fill = sc.levels[countToLevel(c.count)];
    cellRects += `<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" 
      rx="2" fill="${fill}" />`;
  });

  // ── racing line (static path, renders even without animation) ──
  const linePath = buildRacingLinePath(cells, OX, OY);

  // ── speed trails: for each active cell, a small glow rect behind the car ──
  // We pre-render these as opacity-animated rects along the path.
  // (Full per-cell trail animation via SMIL keySplines would be verbose;
  //  instead we animate the entire trail as a gradient stroke on the path.)
  // The racing line itself acts as the permanent trail.

  // ── animateMotion keyTimes ──
  const keyTimes = buildKeyTimes(cells);
  const keyPoints = cells.map((_, i) => (i / (cells.length - 1)).toFixed(4)).join(";") + ";1";

  // ── checkered flag markers at first & last active cell ──
  const firstActive = cells.find(c => c.count > 0) || cells[0];
  const lastActive  = [...cells].reverse().find(c => c.count > 0) || cells[cells.length - 1];

  const flagSize = 8;
  function checkerFlag(cx, cy) {
    // 2×2 checkerboard pattern
    return `
      <rect x="${cx}" y="${cy}" width="${flagSize}" height="${flagSize}" fill="${sc.flagBg}" rx="1"/>
      <rect x="${cx}"               y="${cy}"               width="${flagSize/2}" height="${flagSize/2}" fill="#E6EDF3"/>
      <rect x="${cx+flagSize/2}"   y="${cy+flagSize/2}"   width="${flagSize/2}" height="${flagSize/2}" fill="#E6EDF3"/>
      <rect x="${cx}"               y="${cy+flagSize/2}"   width="${flagSize/2}" height="${flagSize/2}" fill="#0A0E14"/>
      <rect x="${cx+flagSize/2}"   y="${cy}"               width="${flagSize/2}" height="${flagSize/2}" fill="#0A0E14"/>`;
  }

  const f1x = OX + firstActive.col * STRIDE + CELL / 2 - flagSize / 2;
  const f1y = OY + firstActive.row * STRIDE + CELL / 2 - flagSize / 2;
  const l1x = OX + lastActive.col  * STRIDE + CELL / 2 - flagSize / 2;
  const l1y = OY + lastActive.row  * STRIDE + CELL / 2 - flagSize / 2;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" 
     xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="${sc.bg}" rx="6"/>

  <!-- Month labels -->
  ${monthLabels}

  <!-- Day labels -->
  ${dayLabels}

  <!-- Contribution cells -->
  ${cellRects}

  <!-- Racing line (static, always visible — acts as track) -->
  <path d="${linePath}" 
        fill="none" 
        stroke="${sc.trackLine}" 
        stroke-width="1" 
        stroke-opacity="0.25"
        stroke-linecap="round"
        stroke-linejoin="round"/>

  <!-- Animated glow trail: same path, brighter, follows car with delay -->
  <path id="trail" d="${linePath}"
        fill="none"
        stroke="${sc.trailBase}"
        stroke-width="2"
        stroke-opacity="0"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="${W * 2}"
        stroke-dashoffset="${W * 2}">
    <animate attributeName="stroke-opacity" 
             values="0;0.6;0" 
             dur="${totalDuration}" 
             repeatCount="indefinite" 
             begin="0s"/>
    <animate attributeName="stroke-dashoffset"
             values="${W * 2};0;0"
             dur="${totalDuration}"
             repeatCount="indefinite"
             begin="0s"
             calcMode="linear"/>
  </path>

  <!-- Checkered flag: career start -->
  ${checkerFlag(f1x, f1y)}

  <!-- Checkered flag: most recent activity -->
  ${checkerFlag(l1x, l1y)}

  <!-- F1 car sprite + animateMotion -->
  <g id="car">
    ${carSprite(theme)}
    <animateMotion
      dur="${totalDuration}"
      repeatCount="indefinite"
      rotate="auto"
      calcMode="linear"
      keyTimes="${keyTimes}"
      keyPoints="${keyPoints}">
      <mpath xlink:href="#racingLinePath"/>
    </animateMotion>
  </g>

  <!-- Named path for mpath reference (must have id, can be invisible) -->
  <path id="racingLinePath" d="${linePath}" fill="none" stroke="none"/>

</svg>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Fetching contributions for ${USERNAME}...`);
  const weeks = await fetchContributions();
  console.log(`Got ${weeks.length} weeks of data.`);

  const outDir = path.join(process.cwd(), "output");
  fs.mkdirSync(outDir, { recursive: true });

  for (const theme of ["dark", "light"]) {
    const svg = generateSVG(weeks, theme);
    const outPath = path.join(outDir, `f1-strip-${theme}.svg`);
    fs.writeFileSync(outPath, svg, "utf8");
    console.log(`Written: ${outPath}`);
  }

  console.log("Done.");
}

main().catch(err => { console.error(err); process.exit(1); });
