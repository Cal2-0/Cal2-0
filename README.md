<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Calvin Jude Dsouza — Security × AI</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #050709;
    --bg2: #080c10;
    --surface: #0c1218;
    --surface2: #101820;
    --border: #1a2a3a;
    --accent: #00d4ff;
    --accent2: #ff3366;
    --accent3: #39ff14;
    --accent4: #ffaa00;
    --text: #c8d8e8;
    --muted: #4a6070;
    --glow: rgba(0,212,255,0.15);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    overflow-x: hidden;
    cursor: none;
  }

  /* CUSTOM CURSOR */
  #cursor {
    width: 12px; height: 12px;
    background: var(--accent);
    border-radius: 50%;
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s;
    mix-blend-mode: screen;
    box-shadow: 0 0 20px var(--accent), 0 0 40px var(--accent);
  }
  #cursor-ring {
    width: 36px; height: 36px;
    border: 1px solid rgba(0,212,255,0.4);
    border-radius: 50%;
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.15s ease, width 0.2s, height 0.2s;
  }
  body:has(a:hover) #cursor-ring,
  body:has(button:hover) #cursor-ring { width: 60px; height: 60px; border-color: var(--accent2); }

  /* MATRIX CANVAS */
  #matrix-bg {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    opacity: 0.025;
    z-index: 0;
    pointer-events: none;
  }

  /* SCANLINE OVERLAY */
  body::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(
      0deg, transparent, transparent 2px,
      rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px
    );
    pointer-events: none;
    z-index: 1;
  }

  /* NOISE GRAIN */
  body::after {
    content: '';
    position: fixed;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.06;
    pointer-events: none;
    z-index: 2;
    animation: grain 0.5s steps(1) infinite;
  }
  @keyframes grain {
    0%,100% { transform: translate(0,0); }
    10% { transform: translate(-2%,-3%); }
    30% { transform: translate(3%,-1%); }
    50% { transform: translate(-1%,2%); }
    70% { transform: translate(2%,3%); }
    90% { transform: translate(-3%,1%); }
  }

  /* LAYOUT */
  .wrapper { position: relative; z-index: 10; max-width: 900px; margin: 0 auto; padding: 0 24px; }

  /* ═══ HERO ═══ */
  #hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 0 60px;
    position: relative;
  }

  .hero-eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 4px;
    color: var(--accent);
    text-transform: uppercase;
    margin-bottom: 28px;
    opacity: 0;
    animation: fadeUp 0.8s 0.2s forwards;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .hero-eyebrow::before {
    content: '';
    width: 32px; height: 1px;
    background: var(--accent);
    display: inline-block;
  }

  .hero-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(72px, 12vw, 140px);
    line-height: 0.92;
    letter-spacing: -1px;
    color: #fff;
    margin-bottom: 24px;
    opacity: 0;
    animation: fadeUp 0.8s 0.4s forwards;
  }
  .hero-name span {
    display: block;
    -webkit-text-stroke: 1px rgba(0,212,255,0.5);
    color: transparent;
  }

  .hero-tagline {
    font-size: clamp(14px, 2vw, 18px);
    color: var(--muted);
    max-width: 480px;
    line-height: 1.7;
    margin-bottom: 40px;
    opacity: 0;
    animation: fadeUp 0.8s 0.6s forwards;
  }
  .hero-tagline strong { color: var(--text); font-weight: 500; }

  .hero-links {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    opacity: 0;
    animation: fadeUp 0.8s 0.8s forwards;
  }

  .btn {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 10px 20px;
    border: 1px solid var(--border);
    text-decoration: none;
    color: var(--text);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
    background: transparent;
    cursor: none;
  }
  .btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s;
    z-index: -1;
  }
  .btn:hover { color: #000; border-color: var(--accent); }
  .btn:hover::before { transform: scaleX(1); }
  .btn.accent { border-color: var(--accent); color: var(--accent); }
  .btn.red { border-color: var(--accent2); color: var(--accent2); }
  .btn.red::before { background: var(--accent2); }
  .btn.red:hover { color: #fff; }

  /* GLITCH TEXT */
  .glitch {
    position: relative;
    display: inline-block;
  }
  .glitch::before, .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    letter-spacing: inherit;
  }
  .glitch::before {
    color: var(--accent2);
    animation: glitch1 3s infinite;
    clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
  }
  .glitch::after {
    color: var(--accent);
    animation: glitch2 3s infinite;
    clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
  }
  @keyframes glitch1 {
    0%,90%,100% { transform: translate(0); opacity: 0; }
    92% { transform: translate(-3px, 1px); opacity: 1; }
    94% { transform: translate(3px, -1px); opacity: 1; }
    96% { transform: translate(-2px, 2px); opacity: 1; }
    98% { transform: translate(0); opacity: 0; }
  }
  @keyframes glitch2 {
    0%,90%,100% { transform: translate(0); opacity: 0; }
    93% { transform: translate(3px, -1px); opacity: 1; }
    95% { transform: translate(-3px, 1px); opacity: 1; }
    97% { transform: translate(2px, -2px); opacity: 1; }
    99% { transform: translate(0); opacity: 0; }
  }

  /* HERO DECORATION */
  .hero-grid {
    position: absolute;
    right: -100px;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.06;
    width: 400px;
    height: 400px;
    background-image:
      linear-gradient(var(--accent) 1px, transparent 1px),
      linear-gradient(90deg, var(--accent) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    padding: 6px 12px;
    border: 1px solid rgba(57,255,20,0.3);
    color: var(--accent3);
    margin-bottom: 48px;
    opacity: 0;
    animation: fadeUp 0.8s 1s forwards;
  }
  .status-dot {
    width: 6px; height: 6px;
    background: var(--accent3);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(57,255,20,0.7); }
    50% { box-shadow: 0 0 0 6px rgba(57,255,20,0); }
  }

  /* ═══ SECTIONS ═══ */
  section {
    padding: 100px 0;
    border-top: 1px solid var(--border);
  }

  .section-label {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--accent);
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 48px;
  }
  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, var(--border), transparent);
  }

  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(36px, 6vw, 64px);
    color: #fff;
    line-height: 1;
    margin-bottom: 16px;
  }

  /* ═══ SKILLS ═══ */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    margin-top: 48px;
  }
  @media(max-width: 600px) { .skills-grid { grid-template-columns: 1fr 1fr; } }

  .skill-cell {
    background: var(--bg2);
    padding: 24px;
    transition: background 0.3s;
    position: relative;
    overflow: hidden;
  }
  .skill-cell::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    height: 2px; width: 0;
    background: var(--accent);
    transition: width 0.4s;
  }
  .skill-cell:hover { background: var(--surface); }
  .skill-cell:hover::after { width: 100%; }

  .skill-icon { font-size: 20px; margin-bottom: 12px; display: block; }
  .skill-name {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--text);
    margin-bottom: 6px;
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 10px; }
  .tag {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    padding: 2px 6px;
    border: 1px solid var(--border);
    color: var(--muted);
    letter-spacing: 0.5px;
  }
  .tag.cyan { border-color: rgba(0,212,255,0.3); color: var(--accent); }
  .tag.red { border-color: rgba(255,51,102,0.3); color: var(--accent2); }
  .tag.green { border-color: rgba(57,255,20,0.3); color: var(--accent3); }
  .tag.gold { border-color: rgba(255,170,0,0.3); color: var(--accent4); }

  /* ═══ PROJECTS ═══ */
  .projects-list { display: flex; flex-direction: column; gap: 1px; background: var(--border); }

  .project-card {
    background: var(--bg2);
    padding: 32px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 20px;
    align-items: start;
    transition: background 0.3s, transform 0.3s;
    position: relative;
    overflow: hidden;
    cursor: none;
  }
  .project-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--accent);
    transform: scaleY(0);
    transition: transform 0.3s;
  }
  .project-card:hover { background: var(--surface); }
  .project-card:hover::before { transform: scaleY(1); }
  .project-card:hover { transform: translateX(4px); }

  .project-card.flagship::before { background: var(--accent2); }
  .project-card.security::before { background: var(--accent3); }
  .project-card.vision::before { background: var(--accent4); }

  .project-meta {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  .project-type {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 3px 8px;
    border: 1px solid;
  }
  .type-ai { border-color: rgba(0,212,255,0.4); color: var(--accent); }
  .type-cv { border-color: rgba(255,170,0,0.4); color: var(--accent4); }
  .type-sec { border-color: rgba(57,255,20,0.4); color: var(--accent3); }
  .type-fs { border-color: rgba(255,51,102,0.4); color: var(--accent2); }
  .type-crypto { border-color: rgba(255,170,0,0.4); color: var(--accent4); }

  .award-badge {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    background: rgba(255,170,0,0.1);
    border: 1px solid var(--accent4);
    color: var(--accent4);
    padding: 3px 8px;
    animation: shimmer 3s infinite;
  }
  @keyframes shimmer {
    0%,100% { box-shadow: 0 0 0 rgba(255,170,0,0); }
    50% { box-shadow: 0 0 12px rgba(255,170,0,0.3); }
  }

  .project-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    color: #fff;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }
  .project-desc {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }
  .project-stack { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
  .stack-item {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    padding: 2px 0;
  }
  .stack-item::after { content: ' /'; opacity: 0.4; }
  .stack-item:last-child::after { content: ''; }

  .project-arrow {
    font-size: 20px;
    color: var(--muted);
    transition: all 0.3s;
    padding-top: 4px;
  }
  .project-card:hover .project-arrow {
    color: var(--accent);
    transform: translate(4px, -4px);
  }

  /* ═══ EXPERIENCE ═══ */
  .exp-card {
    padding: 32px;
    border: 1px solid var(--border);
    margin-bottom: 16px;
    position: relative;
    transition: border-color 0.3s;
  }
  .exp-card:hover { border-color: var(--accent); }

  .exp-period {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    margin-bottom: 8px;
  }
  .exp-role {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px;
    color: #fff;
    margin-bottom: 4px;
  }
  .exp-org {
    font-size: 13px;
    color: var(--accent);
    margin-bottom: 16px;
    font-family: 'Space Mono', monospace;
    font-size: 11px;
  }
  .exp-bullets { list-style: none; }
  .exp-bullets li {
    font-size: 13px;
    color: var(--muted);
    padding: 4px 0 4px 16px;
    position: relative;
    line-height: 1.5;
  }
  .exp-bullets li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--accent);
  }

  /* ═══ ACHIEVEMENTS ═══ */
  .achieve-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  @media(max-width: 600px) { .achieve-grid { grid-template-columns: 1fr; } }

  .achieve-card {
    padding: 24px;
    border: 1px solid var(--border);
    position: relative;
    transition: all 0.3s;
    overflow: hidden;
  }
  .achieve-card::after {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 60px; height: 60px;
    background: radial-gradient(circle at top right, rgba(0,212,255,0.1), transparent);
    transition: opacity 0.3s;
    opacity: 0;
  }
  .achieve-card:hover { border-color: rgba(0,212,255,0.3); }
  .achieve-card:hover::after { opacity: 1; }

  .achieve-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 48px;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 4px;
    opacity: 0.7;
  }
  .achieve-label {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 1px;
    color: var(--text);
    margin-bottom: 8px;
  }
  .achieve-sub { font-size: 12px; color: var(--muted); line-height: 1.5; }

  /* ═══ TERMINAL EASTER EGG ═══ */
  #terminal-trigger {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    text-align: center;
    padding: 60px 0 20px;
    letter-spacing: 2px;
  }
  #terminal-trigger span { color: var(--accent); }

  #terminal {
    display: none;
    position: fixed;
    bottom: 20px; right: 20px;
    width: 500px; max-width: calc(100vw - 40px);
    background: rgba(5,7,9,0.97);
    border: 1px solid var(--accent);
    z-index: 1000;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    box-shadow: 0 0 40px rgba(0,212,255,0.2), inset 0 0 40px rgba(0,212,255,0.02);
    backdrop-filter: blur(10px);
    animation: terminalOpen 0.3s ease;
  }
  @keyframes terminalOpen {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  #terminal.active { display: block; }

  .terminal-bar {
    background: var(--surface);
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--border);
    cursor: move;
  }
  .t-dot { width: 10px; height: 10px; border-radius: 50%; }
  .t-dot:nth-child(1) { background: #ff5f57; }
  .t-dot:nth-child(2) { background: #febc2e; }
  .t-dot:nth-child(3) { background: #28c840; }
  .terminal-title {
    flex: 1;
    text-align: center;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 2px;
  }
  .t-close {
    cursor: none;
    color: var(--muted);
    font-size: 14px;
    line-height: 1;
    padding: 2px;
    transition: color 0.2s;
    background: none;
    border: none;
  }
  .t-close:hover { color: var(--accent2); }

  .terminal-body {
    padding: 20px;
    height: 320px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }
  .t-line {
    margin-bottom: 6px;
    line-height: 1.5;
    animation: typeIn 0.05s both;
  }
  @keyframes typeIn { from { opacity: 0; } to { opacity: 1; } }

  .t-prompt { color: var(--accent); }
  .t-output { color: var(--muted); padding-left: 16px; }
  .t-error { color: var(--accent2); padding-left: 16px; }
  .t-success { color: var(--accent3); padding-left: 16px; }
  .t-warn { color: var(--accent4); padding-left: 16px; }

  .terminal-input-row {
    padding: 12px 20px;
    border-top: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .t-input-prompt { color: var(--accent); user-select: none; }
  #t-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text);
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    cursor: none;
  }

  /* KONAMI hidden message */
  #konami-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.95);
    z-index: 2000;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Space Mono', monospace;
    text-align: center;
    padding: 40px;
  }
  #konami-overlay.active { display: flex; }
  #konami-overlay h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 10vw, 96px);
    color: var(--accent3);
    margin-bottom: 16px;
    text-shadow: 0 0 60px var(--accent3);
  }
  #konami-overlay p { color: var(--muted); font-size: 13px; line-height: 2; }
  #konami-overlay .dismiss {
    margin-top: 32px;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 3px;
    cursor: none;
    transition: color 0.2s;
  }
  #konami-overlay .dismiss:hover { color: var(--accent); }

  /* FOOTER */
  footer {
    padding: 60px 0;
    border-top: 1px solid var(--border);
    text-align: center;
  }
  footer .footer-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 80px;
    color: var(--border);
    letter-spacing: 4px;
    line-height: 1;
    margin-bottom: 24px;
    transition: color 0.3s;
  }
  footer:hover .footer-name { color: var(--surface2); }
  footer .footer-links {
    display: flex;
    gap: 24px;
    justify-content: center;
    flex-wrap: wrap;
  }
  footer a {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    color: var(--muted);
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  footer a:hover { color: var(--accent); }
  footer .footer-copy {
    margin-top: 32px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--border);
  }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s, transform 0.7s;
  }
  .reveal.visible { opacity: 1; transform: none; }

  /* SCROLL PROGRESS */
  #scroll-bar {
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: linear-gradient(to right, var(--accent), var(--accent2));
    z-index: 100;
    width: 0%;
    transition: width 0.1s;
  }

  /* NAV */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 50;
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(20px);
    background: rgba(5,7,9,0.8);
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s;
  }
  nav.scrolled { border-bottom-color: var(--border); }
  .nav-logo {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    color: var(--accent);
    letter-spacing: 1px;
  }
  .nav-links { display: flex; gap: 24px; }
  .nav-links a {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--accent); }

  /* TOOLTIP easter egg */
  [data-tip] {
    position: relative;
    cursor: none;
  }
  [data-tip]::after {
    content: attr(data-tip);
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 6px 12px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--accent);
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.2s;
    letter-spacing: 1px;
  }
  [data-tip]:hover::after {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  /* FLICKER */
  @keyframes flicker {
    0%,100% { opacity: 1; }
    92% { opacity: 1; }
    93% { opacity: 0.6; }
    94% { opacity: 1; }
    96% { opacity: 0.8; }
    97% { opacity: 1; }
  }

  .blink { animation: blink 1s step-end infinite; }
  @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

  /* HEX GRID DECORATION */
  .hex-deco {
    position: absolute;
    right: 0;
    opacity: 0.04;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--accent);
    line-height: 1.6;
    pointer-events: none;
    max-width: 200px;
    word-break: break-all;
  }

</style>
</head>
<body>

<!-- CURSOR -->
<div id="cursor"></div>
<div id="cursor-ring"></div>

<!-- SCROLL PROGRESS -->
<div id="scroll-bar"></div>

<!-- MATRIX CANVAS -->
<canvas id="matrix-bg"></canvas>

<!-- NAV -->
<nav id="nav">
  <div class="nav-logo">cal2-0<span class="blink">_</span></div>
  <div class="nav-links">
    <a href="#projects">projects</a>
    <a href="#skills">skills</a>
    <a href="#about">about</a>
  </div>
</nav>

<!-- KONAMI OVERLAY -->
<div id="konami-overlay">
  <h1>ACCESS GRANTED</h1>
  <p>
    You found the Konami Code.<br>
    You clearly have the spirit of a hacker.<br><br>
    <span style="color:var(--accent)">↑ ↑ ↓ ↓ ← → ← → B A</span><br><br>
    <span style="color:var(--accent3)">Pro tip: try `whoami` in the terminal below.</span>
  </p>
  <div class="dismiss" onclick="document.getElementById('konami-overlay').classList.remove('active')">[ ESC TO DISMISS ]</div>
</div>

<!-- TERMINAL -->
<div id="terminal">
  <div class="terminal-bar" id="term-drag">
    <div class="t-dot"></div>
    <div class="t-dot"></div>
    <div class="t-dot"></div>
    <div class="terminal-title">calvin@kali ~ $</div>
    <button class="t-close" onclick="document.getElementById('terminal').classList.remove('active')">✕</button>
  </div>
  <div class="terminal-body" id="t-body">
    <div class="t-line"><span class="t-success">✓ Connection established — calvin@cal2-0</span></div>
    <div class="t-line t-output">Type <span style="color:var(--accent)">help</span> to see available commands</div>
  </div>
  <div class="terminal-input-row">
    <span class="t-input-prompt">❯</span>
    <input type="text" id="t-input" placeholder="enter command..." autocomplete="off" spellcheck="false">
  </div>
</div>

<!-- HERO -->
<section id="hero">
  <div class="wrapper" style="position:relative">
    <div class="hero-grid"></div>
    <div class="hex-deco" style="top:0;line-height:2">
      4355 4c56 494e 204a 5544 450a 4453 4f55 5a41 0a43 5942 4552 5345 4355 5249 5459 0a41 4920 454e 4749 4e45 4552
    </div>
    <div class="hero-eyebrow">B.Tech Cybersecurity · NMAMIT · Karkala, India</div>

    <div class="status-badge">
      <div class="status-dot"></div>
      AVAILABLE FOR OPPORTUNITIES · 2025
    </div>

    <h1 class="hero-name">
      <span class="glitch" data-text="CALVIN">CALVIN</span>
      JUDE<br>DSOUZA
    </h1>

    <p class="hero-tagline">
      Building <strong>MNC-Grade security systems</strong> and next-generation AI tools.
      Bridging offensive security with exceptional user experience —
      from deepfake forensics to crowd intelligence.
    </p>

    <div class="hero-links">
      <a href="https://github.com/Cal2-0" target="_blank" class="btn accent">↗ GitHub</a>
      <a href="https://linkedin.com/in/calvin-dsouza" target="_blank" class="btn">↗ LinkedIn</a>
      <a href="mailto:calvinja320@gmail.com" class="btn">✉ Email</a>
      <button class="btn red" onclick="document.getElementById('terminal').classList.add('active');document.getElementById('t-input').focus()">▸ Terminal</button>
    </div>
  </div>
</section>

<!-- PROJECTS -->
<section id="projects">
  <div class="wrapper">
    <div class="section-label reveal">001 · Projects</div>
    <h2 class="section-title reveal">SELECTED<br>WORK</h2>

    <div class="projects-list reveal" style="transition-delay:0.1s">

      <div class="project-card flagship" data-tip="🥈 2nd Place · ACEathon">
        <div>
          <div class="project-meta">
            <span class="project-type type-ai">EdTech AI</span>
            <span class="award-badge">🥈 ACEathon 2nd Place</span>
          </div>
          <div class="project-title">OuchMyBrain.io</div>
          <div class="project-desc">AI study companion that transforms PDFs and notes into flashcards, quizzes, and adaptive audio lessons using spaced repetition. Features Professor Mode — a fully contextual AI tutor.</div>
          <div class="project-stack">
            <span class="stack-item">Python</span>
            <span class="stack-item">Flask</span>
            <span class="stack-item">OpenAI</span>
            <span class="stack-item">ElevenLabs</span>
            <span class="stack-item">TailwindCSS</span>
          </div>
        </div>
        <div class="project-arrow">↗</div>
      </div>

      <div class="project-card security">
        <div>
          <div class="project-meta">
            <span class="project-type type-sec">AI Forensics</span>
          </div>
          <div class="project-title">Lucent.ai</div>
          <div class="project-desc">Multi-layer deepfake detection combining spatial visual models, FFT frequency analysis, and reverse-diffusion checks. Generates legal-grade forensic audit reports via microservices.</div>
          <div class="project-stack">
            <span class="stack-item">PyTorch</span>
            <span class="stack-item">OpenCV</span>
            <span class="stack-item">FastAPI</span>
            <span class="stack-item">Redis</span>
            <span class="stack-item">Docker</span>
          </div>
        </div>
        <div class="project-arrow">↗</div>
      </div>

      <div class="project-card vision">
        <div>
          <div class="project-meta">
            <span class="project-type type-cv">Computer Vision</span>
          </div>
          <div class="project-title">MassEd.ex</div>
          <div class="project-desc">Real-time crowd intelligence platform tracking 50+ concurrent objects at 30 FPS. Automated danger-zone detection identified 4 distinct behavioral anomaly patterns in stress tests.</div>
          <div class="project-stack">
            <span class="stack-item">YOLOv8</span>
            <span class="stack-item">ByteTrack</span>
            <span class="stack-item">OpenCV</span>
            <span class="stack-item">NumPy</span>
          </div>
        </div>
        <div class="project-arrow">↗</div>
      </div>

      <div class="project-card">
        <div>
          <div class="project-meta">
            <span class="project-type type-ai">AI / Health</span>
          </div>
          <div class="project-title">NeuroMetric</div>
          <div class="project-desc">Multimodal psychiatric analysis extracting gaze stability, facial affect, speech rate, and psychomotor indicators. Generates longitudinal behavioral profiles for clinicians.</div>
          <div class="project-stack">
            <span class="stack-item">MediaPipe</span>
            <span class="stack-item">ClinicalBERT</span>
            <span class="stack-item">TF Lite</span>
            <span class="stack-item">WebAssembly</span>
          </div>
        </div>
        <div class="project-arrow">↗</div>
      </div>

      <div class="project-card">
        <div>
          <div class="project-meta">
            <span class="project-type type-fs">Full Stack</span>
          </div>
          <div class="project-title">CalHive</div>
          <div class="project-desc">AI-driven productivity platform with NLP task classification. Sentence-transformer embeddings power intelligent prioritization and scheduling for goals and jots.</div>
          <div class="project-stack">
            <span class="stack-item">React</span>
            <span class="stack-item">TypeScript</span>
            <span class="stack-item">FastAPI</span>
            <span class="stack-item">SpaCy</span>
          </div>
        </div>
        <div class="project-arrow">↗</div>
      </div>

      <div class="project-card security">
        <div>
          <div class="project-meta">
            <span class="project-type type-sec">Network Security</span>
          </div>
          <div class="project-title">NetRecon</div>
          <div class="project-desc">Deep-analysis LAN scanner mapping a /24 subnet (254 hosts) in under 12 seconds using raw Unix sockets. Identified 100% of injected rogue devices in ARP/ICMP tests.</div>
          <div class="project-stack">
            <span class="stack-item">C</span>
            <span class="stack-item">Unix Sockets</span>
            <span class="stack-item">Bash</span>
            <span class="stack-item">TCP/IP</span>
          </div>
        </div>
        <div class="project-arrow">↗</div>
      </div>

    </div>
  </div>
</section>

<!-- SKILLS -->
<section id="skills">
  <div class="wrapper">
    <div class="section-label reveal">002 · Arsenal</div>
    <h2 class="section-title reveal">TECH<br>STACK</h2>

    <div class="skills-grid reveal" style="transition-delay:0.15s">
      <div class="skill-cell">
        <span class="skill-icon">🐍</span>
        <div class="skill-name">Languages</div>
        <div class="skill-tags">
          <span class="tag cyan">Python</span>
          <span class="tag">JavaScript</span>
          <span class="tag">TypeScript</span>
          <span class="tag">C</span>
          <span class="tag">Go</span>
          <span class="tag">SQL</span>
          <span class="tag">Bash</span>
        </div>
      </div>
      <div class="skill-cell">
        <span class="skill-icon">🤖</span>
        <div class="skill-name">AI & ML</div>
        <div class="skill-tags">
          <span class="tag cyan">PyTorch</span>
          <span class="tag cyan">YOLOv8</span>
          <span class="tag cyan">LLM APIs</span>
          <span class="tag">OpenCV</span>
          <span class="tag">TF Lite</span>
          <span class="tag">SpaCy</span>
        </div>
      </div>
      <div class="skill-cell">
        <span class="skill-icon">🔐</span>
        <div class="skill-name">Cybersecurity</div>
        <div class="skill-tags">
          <span class="tag green">Forensics</span>
          <span class="tag green">OSINT</span>
          <span class="tag green">Network Sec</span>
          <span class="tag">Cryptography</span>
          <span class="tag">CTF</span>
          <span class="tag">Nmap</span>
        </div>
      </div>
      <div class="skill-cell">
        <span class="skill-icon">⚡</span>
        <div class="skill-name">Frameworks</div>
        <div class="skill-tags">
          <span class="tag">Flask</span>
          <span class="tag">FastAPI</span>
          <span class="tag">React</span>
          <span class="tag">Node.js</span>
          <span class="tag">SQLAlchemy</span>
        </div>
      </div>
      <div class="skill-cell">
        <span class="skill-icon">🛠</span>
        <div class="skill-name">Dev Tools</div>
        <div class="skill-tags">
          <span class="tag">Docker</span>
          <span class="tag">Linux/Kali</span>
          <span class="tag">Git</span>
          <span class="tag">Wireshark</span>
          <span class="tag">Gobuster</span>
        </div>
      </div>
      <div class="skill-cell">
        <span class="skill-icon">🎯</span>
        <div class="skill-name">Specialisms</div>
        <div class="skill-tags">
          <span class="tag red">Deepfake Det.</span>
          <span class="tag gold">Crowd Vision</span>
          <span class="tag cyan">LLM Infra</span>
          <span class="tag">Multimodal AI</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT / EXPERIENCE -->
<section id="about">
  <div class="wrapper">
    <div class="section-label reveal">003 · Experience</div>
    <h2 class="section-title reveal">BUILDING<br>THINGS THAT<br>MATTER</h2>

    <div class="exp-card reveal" style="transition-delay:0.1s">
      <div class="exp-period">JAN 2025 – MAY 2025</div>
      <div class="exp-role">Cybersecurity Developer Intern & Team Lead</div>
      <div class="exp-org">NMAM Institute of Technology — VisionEX Project</div>
      <ul class="exp-bullets">
        <li>Directed a 6-member team to engineer VisionEX, an enterprise-grade digital certification web suite</li>
        <li>Implemented Diffie-Hellman key exchange for secure authenticated communication channels</li>
        <li>Integrated Minimax algorithms to optimize platform cryptographic decision-making</li>
      </ul>
    </div>

    <div style="margin-top: 60px">
      <div class="section-label reveal">004 · Achievements</div>
      <div class="achieve-grid reveal" style="transition-delay:0.15s">
        <div class="achieve-card" data-tip="🧠 ACEathon Hackathon">
          <div class="achieve-num">🥈</div>
          <div class="achieve-label">HACKATHON FINALIST</div>
          <div class="achieve-sub">2nd Place at ACEathon for OuchMyBrain.io — AI study platform</div>
        </div>
        <div class="achieve-card" data-tip="🏆 200+ participants">
          <div class="achieve-num">10+</div>
          <div class="achieve-label">CTF COMPETITIONS</div>
          <div class="achieve-sub">7th at Code Intrusion · 14th at Enyugma out of 200+ teams</div>
        </div>
        <div class="achieve-card" data-tip="🎖 Judge commendation">
          <div class="achieve-num">∞</div>
          <div class="achieve-label">NATIONAL HACKATHONS</div>
          <div class="achieve-sub">SIH, Innovex, Protothon — special commendation at Innovex</div>
        </div>
        <div class="achieve-card" data-tip="📚 Currently studying">
          <div class="achieve-num">3</div>
          <div class="achieve-label">CERTS IN PROGRESS</div>
          <div class="achieve-sub">CompTIA Security+ · CHFI · eJPT</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TERMINAL HINT -->
<div class="wrapper">
  <div id="terminal-trigger" class="reveal">
    <span style="color:var(--muted)">// try the terminal ↓ &nbsp;</span>
    <span>▸ terminal</span>
    &nbsp; or press <span>K</span> for a secret
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div class="wrapper">
    <div class="footer-name">CALVIN</div>
    <div class="footer-links">
      <a href="https://github.com/Cal2-0" target="_blank">GitHub</a>
      <a href="https://linkedin.com/in/calvin-dsouza" target="_blank">LinkedIn</a>
      <a href="mailto:calvinja320@gmail.com">Email</a>
      <a href="mailto:nm24cb015@nmamit.in">College Mail</a>
    </div>
    <div class="footer-copy" style="margin-top:24px">
      // calvin jude dsouza · b.tech cybersecurity · nmamit · 2024–2028<br>
      // +971-505253861 · +91-8971192706
    </div>
    <div class="footer-copy" style="color:var(--border);margin-top:8px">// 🐣 easter eggs: konami code · terminal · hex decode · hover tooltips</div>
  </div>
</footer>

<script>
// ═══ CURSOR ═══
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animate() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animate);
})();

// ═══ MATRIX RAIN ═══
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
function resizeMatrix() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeMatrix();
window.addEventListener('resize', resizeMatrix);
const cols = Math.floor(window.innerWidth / 16);
const drops = Array(cols).fill(1);
const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>/\\{}[]#$%&';
setInterval(() => {
  ctx.fillStyle = 'rgba(5,7,9,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00d4ff';
  ctx.font = '12px Space Mono, monospace';
  drops.forEach((y, i) => {
    const c = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(c, i * 16, y * 16);
    if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}, 50);

// ═══ SCROLL PROGRESS ═══
const bar = document.getElementById('scroll-bar');
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  bar.style.width = pct + '%';
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ═══ REVEAL ON SCROLL ═══
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ═══ KONAMI CODE ═══
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let ki = 0;
document.addEventListener('keydown', e => {
  if (e.key === KONAMI[ki]) {
    ki++;
    if (ki === KONAMI.length) {
      document.getElementById('konami-overlay').classList.add('active');
      ki = 0;
    }
  } else ki = 0;
  if (e.key === 'Escape') {
    document.getElementById('konami-overlay').classList.remove('active');
    document.getElementById('terminal').classList.remove('active');
  }
  if (e.key === 'k' || e.key === 'K') {
    if (!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      document.getElementById('terminal').classList.add('active');
      document.getElementById('t-input').focus();
    }
  }
});

// ═══ TERMINAL ═══
const tbody = document.getElementById('t-body');
const tinput = document.getElementById('t-input');
let cmdHistory = [], histIdx = -1;

const COMMANDS = {
  help: () => [
    { type: 'output', text: 'Available commands:' },
    { type: 'success', text: '  whoami       — identity check' },
    { type: 'success', text: '  skills       — list technical skills' },
    { type: 'success', text: '  projects     — project manifest' },
    { type: 'success', text: '  contact      — contact information' },
    { type: 'success', text: '  status       — current status' },
    { type: 'success', text: '  ctf          — CTF stats' },
    { type: 'success', text: '  hack         — ???' },
    { type: 'success', text: '  clear        — clear terminal' },
    { type: 'warn',    text: '  sudo rm -rf / — definitely don\'t try this' },
  ],
  whoami: () => [
    { type: 'output', text: 'calvin jude dsouza' },
    { type: 'output', text: 'uid=1337(calvin) gid=1337(hackers) groups=1337(hackers),0(root)' },
    { type: 'output', text: 'Role: Cybersecurity Developer & AI Engineer' },
    { type: 'output', text: 'Origin: Dubai → Karkala, India' },
    { type: 'success', text: '✓ Threat level: builder' },
  ],
  skills: () => [
    { type: 'output', text: '$ cat /etc/skills.conf' },
    { type: 'success', text: '[python]      ████████████████████ 95%' },
    { type: 'success', text: '[pytorch]     ████████████████░░░░ 80%' },
    { type: 'success', text: '[yolov8]      █████████████████░░░ 85%' },
    { type: 'success', text: '[flask/api]   ████████████████████ 90%' },
    { type: 'warn',    text: '[c/systems]   ██████████████░░░░░░ 70%' },
    { type: 'output', text: '[ctf/hacking] █████████████████░░░ 85%' },
  ],
  projects: () => [
    { type: 'output', text: '$ ls ~/projects/' },
    { type: 'success', text: 'ouch-my-brain/    [🥈 ACEathon 2nd]' },
    { type: 'output', text: 'lucent-ai/        [deepfake forensics]' },
    { type: 'output', text: 'massed-ex/        [crowd intelligence]' },
    { type: 'output', text: 'neurometric/      [psychiatric AI]' },
    { type: 'output', text: 'calhive/          [AI productivity]' },
    { type: 'output', text: 'netrecon/         [LAN scanner]' },
    { type: 'warn',    text: 'kensho/           [classified 👁]' },
  ],
  contact: () => [
    { type: 'output', text: '$ cat ~/.contact' },
    { type: 'success', text: 'Email:    calvinja320@gmail.com' },
    { type: 'success', text: 'LinkedIn: linkedin.com/in/calvin-dsouza' },
    { type: 'success', text: 'GitHub:   github.com/Cal2-0' },
    { type: 'output', text: 'Phone:    +971-505253861 / +91-8971192706' },
  ],
  status: () => [
    { type: 'success', text: '● ONLINE — actively building' },
    { type: 'output', text: 'Current: B.Tech Cybersecurity @ NMAMIT (2024–2028)' },
    { type: 'output', text: 'GPA: 9.26 / 10.0' },
    { type: 'warn',    text: 'Certs:   Security+ · CHFI · eJPT [in progress]' },
    { type: 'output', text: 'Status:  Open to internships & collaborations' },
  ],
  ctf: () => [
    { type: 'output', text: '$ cat ~/ctf_stats.json' },
    { type: 'success', text: 'Competitions:  10+' },
    { type: 'success', text: 'Code Intrusion: 7th place' },
    { type: 'success', text: 'Enyugma CTF:    14th / 200+ teams' },
    { type: 'output', text: 'Specialisms: forensics · rev eng · web · OSINT' },
    { type: 'output', text: 'IISc Bangalore Cybersecurity Workshop ✓' },
    { type: 'output', text: 'CYSECK NITK CTF ✓' },
  ],
  hack: () => [
    { type: 'warn', text: 'Initiating...' },
    { type: 'error', text: 'ERROR: ethical_hacker.exe — target is localhost' },
    { type: 'success', text: '✓ Self-audit complete. No vulnerabilities found.' },
    { type: 'output', text: '(of course there aren\'t, i built the firewall 😎)' },
  ],
  'sudo rm -rf /': () => [
    { type: 'error', text: 'Are you sure you want to delete everything? [y/N]' },
    { type: 'output', text: '> N (auto-selected by sanity module)' },
    { type: 'success', text: '✓ Your files are safe. You\'re welcome.' },
  ],
  clear: () => { tbody.innerHTML = ''; return []; },
};

function addLines(lines) {
  lines.forEach((l, i) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = `t-line t-${l.type}`;
      div.textContent = l.text;
      tbody.appendChild(div);
      tbody.scrollTop = tbody.scrollHeight;
    }, i * 60);
  });
}

tinput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const cmd = tinput.value.trim().toLowerCase();
    if (!cmd) return;
    cmdHistory.unshift(cmd);
    histIdx = -1;

    const prompt = document.createElement('div');
    prompt.className = 't-line';
    prompt.innerHTML = `<span class="t-prompt">❯</span> ${cmd}`;
    tbody.appendChild(prompt);

    const fn = COMMANDS[cmd];
    if (fn) {
      addLines(fn());
    } else {
      addLines([{ type: 'error', text: `command not found: ${cmd}` },
                { type: 'output', text: 'type "help" for available commands' }]);
    }
    tinput.value = '';
    tbody.scrollTop = tbody.scrollHeight;
  }
  if (e.key === 'ArrowUp') {
    histIdx = Math.min(histIdx + 1, cmdHistory.length - 1);
    tinput.value = cmdHistory[histIdx] || '';
  }
  if (e.key === 'ArrowDown') {
    histIdx = Math.max(histIdx - 1, -1);
    tinput.value = histIdx >= 0 ? cmdHistory[histIdx] : '';
  }
});

// ═══ DRAGGABLE TERMINAL ═══
const termEl = document.getElementById('terminal');
const dragBar = document.getElementById('term-drag');
let dragging = false, dragOffX = 0, dragOffY = 0;
dragBar.addEventListener('mousedown', e => {
  dragging = true;
  const r = termEl.getBoundingClientRect();
  dragOffX = e.clientX - r.left;
  dragOffY = e.clientY - r.top;
});
document.addEventListener('mousemove', e => {
  if (!dragging) return;
  termEl.style.right = 'auto';
  termEl.style.bottom = 'auto';
  termEl.style.left = (e.clientX - dragOffX) + 'px';
  termEl.style.top = (e.clientY - dragOffY) + 'px';
});
document.addEventListener('mouseup', () => dragging = false);

// ═══ CLICK SPARKS ═══
document.addEventListener('click', e => {
  for (let i = 0; i < 6; i++) {
    const spark = document.createElement('div');
    const angle = (i / 6) * Math.PI * 2;
    const dist = 30 + Math.random() * 30;
    spark.style.cssText = `
      position:fixed; left:${e.clientX}px; top:${e.clientY}px;
      width:3px; height:3px; border-radius:50%;
      background:var(--accent); pointer-events:none; z-index:9999;
      transition: transform 0.6s ease-out, opacity 0.6s ease-out;
    `;
    document.body.appendChild(spark);
    requestAnimationFrame(() => {
      spark.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
      spark.style.opacity = '0';
    });
    setTimeout(() => spark.remove(), 600);
  }
});

// ═══ HEX EASTER EGG — decode footer hint ═══
// The hex in the hero decodes to: CALVIN JUDE\nDSOUZA\nCYBERSECURITY\nAI ENGINEER
</script>
</body>
</html>
