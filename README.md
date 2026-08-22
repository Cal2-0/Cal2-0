### Calvin Dsouza

Cybersecurity engineer building systems that establish *what happened*, not just that something did. B.Tech Cybersecurity, NMAM Institute of Technology. Currently Team Lead, Cybersecurity Intern at Army Cyber Group, New Delhi.

[Email](mailto:calvinja320@gmail.com) · [LinkedIn](https://linkedin.com/in/calvin-jude-dsouza) · [Portfolio](https://courageous-pithivier-cb9e32.netlify.app)

---

**Right now:** extending AXON's behavioural forensics engine, running signal-anomaly experiments for Lucent.ai, and finishing coursework toward CompTIA Security+.

---

### AXON — `active`
Blockchain behavioural forensics platform. Instead of matching wallets against a blocklist, it scores repeated on-chain behaviour through a five-layer risk model and a prosecution/defense/judge multi-agent architecture, checked against a corpus of 13,847 threat entities across BTC, SOL, and EVM.

```
$ axon --analyze wallet --mode behavioral
> 5-layer forensics engine · D3 force-graphs + Sankey flow tracing
> agents: prosecution / defense / judge → adversarial verdict
```

`React · D3.js · FastAPI · Etherscan · Alchemy RPC` — [github.com/Cal2-0/Axon](https://github.com/Cal2-0/Axon)

### SentinelAI — `active`
Linux incident-response engine. Three independent analyses — auth-log anomaly scoring (Isolation Forest), dependency risk against NVD/EPSS, and AST-level inspection of installed packages for suspicious behaviour without executing them — consolidated into one prioritised report.

`Python · Streamlit · Isolation Forest · Gemini 2.0` — [github.com/Cal2-0/Sentinel-IP](https://github.com/Cal2-0/Sentinel-IP-)

### Lucent.ai — `research`
No public repo yet — this is an open question, not a shipped tool. **Which mathematically interpretable frequency-domain signals actually distinguish real media from deepfakes across generation methods a model has never seen, and does combining several weak, interpretable signals beat one strong opaque one?** Currently testing FFT anomaly analysis and diffusion reconstruction error as candidate signals.

`PyTorch · OpenCV · FFT · Diffusion Reconstruction`

### Kalera — `prototype`
Hybrid post-quantum encryption: ML-KEM-1024 and Classic McEliece for key establishment, SPHINCS+ for signing, payload hidden inside an ordinary image via chaos-positioned steganography rather than sent as visible ciphertext.

`ML-KEM-1024 · SPHINCS+ · HKDF-SHA3` — [github.com/betrayed1996/Kalera](https://github.com/betrayed1996/Kalera)

---

<details>
<summary><b>Also shipped</b> — SecureCI, VisionEX, NetScope X, NetRecon, MassEd.ex, Lyra, VaidikaAI, OuchMyBrain.io, VibeAlchemy, Kenshō, NeuroMetric, FinTera, and 10 smaller builds</summary>
<br>

| Project | What it does | Status |
|---|---|---|
| [SecureCI](https://github.com/Danish4h-135/SecureCI) | Audits GitHub Actions for unpinned actions, poisoned-pipeline patterns, exposed secrets — AI-assisted remediation | active |
| VisionEX | Zero-trust auth suite led for a 6-engineer team; 3 external audits, zero criticals | private |
| [NetScope X](https://github.com/Cal2-0/Projects/tree/main/netscope) | Live device discovery, ARP-spoof/port-scan/DNS-tunnel detection, D3 topology | active |
| NetRecon | LAN scanner built on raw sockets — hand-crafted ICMP/ARP/TCP, no scanning library | private |
| [MassEd.ex](https://github.com/Cal2-0/Projects/tree/main/Massex) | Real-time crowd-density heatmaps and danger-zone detection from live video | active |
| [Lyra](https://github.com/Cal2-0/guide) | 640+ dev tools, fuzzy search, ⌘K navigation | active |
| [VaidikaAI](https://github.com/NITHINKR06/Qwerty201_Protothon) | Multilingual hospital triage — built in 48 hours | hackathon |
| [OuchMyBrain.io](https://github.com/ACEathon-2025/Team-39) | Notes → flashcards/audio via "Professor Mode" — 2nd place, ACEathon | hackathon |
| [VibeAlchemy](https://github.com/Cal2-0/VibeAlchemy) | Recommends films from mood language, reads the active tab as context | active |
| Kenshō | Captures tacit workplace knowledge, made searchable | research |
| NeuroMetric | Fuses gaze/affect/speech into behavioural signals — exploratory, not diagnostic | research |
| FinTera | SIP/EMI/tax calculators feeding a personal-finance dashboard | private |
| CalHive, Warehouse Inventory System, The Health Compass, Movieszbt, Secure Rooms Chat, Universal Studio & Pic Editor, Melkit, ai.co, SnapShop, Cipher Lab | Smaller builds across NLP, forensics, computer vision, and cryptography | archived |

</details>

---

**Working style:** static/behavioural analysis before trusting a live-execution result; research kept visibly separate from shipped work so status is never ambiguous; every claim above traces to a real repo or a stated research question — nothing here is a projected result.

**Record:** 4th, HackFest '26 CTF · 7th, Code Intrusion CTF · 14th/200+, Enyugma CTF · Class Representative, NMAMIT Cybersecurity (60+ students) · Core member, PROTON

→ Open to internships and security research collaboration — [reach out](mailto:calvinja320@gmail.com).
