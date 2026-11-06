# Cyberpunk 2077 × Edgerunners Portfolio
## Universe Research, Visual Direction, 21st.dev Component Audit and Experience Blueprint

**Research snapshot:** 6 November 2026  
**Purpose:** Replace the previous Pokémon GO-inspired portfolio direction with a cinematic, scroll-driven, 3D cyberpunk portfolio.  
**Creative reference:** *Cyberpunk 2077* and *Cyberpunk: Edgerunners*.  
**Implementation audience:** Antigravity / React frontend engineering team.

> **Important boundary:** This is an unofficial fan-inspired portfolio design direction, not an official Cyberpunk product. Use original city geometry, original interface artwork, original avatar/character imagery and appropriately licensed media. Do not imply affiliation with CD PROJEKT RED, Studio TRIGGER or Netflix. Do not reuse the example portfolio owner's identity or content.

---

# 1. Executive direction

Scrap the previous Pokémon GO visual concept completely. The new experience should feel like a personal dossier discovered inside a living cyberpunk city: cinematic at first contact, highly interactive while exploring, and professional and easy to evaluate once visitors reach the portfolio content.

The core experience is a **3D Night City-inspired landing page with scroll-driven storytelling**. A custom cyberpunk metropolis, not an existing game map, establishes the atmosphere. As visitors scroll, the camera, lighting, typography and interface layers transition through the story of the portfolio owner.

The website should balance three creative sources:

1. **Cyberpunk 2077:** dense urban verticality, corporate scale, industrial machinery, layered signage, neon, rain, reflective streets, HUD language, cyberware and netrunning metaphors.
2. **Cyberpunk: Edgerunners:** expressive colour, bold composition, dynamic motion, strong silhouettes, kinetic typography and a human story underneath the technology.
3. **High-end digital product design:** readable information architecture, accessible controls, fast navigation, deliberate motion, responsive layouts and well-structured project case studies.

The site is not a game clone. It is a professional portfolio expressed through a cyberpunk world.

## Desired first impression

A visitor should land inside a dark, rain-soaked, vertically layered city at night. A cinematic camera move introduces the world. Neon signs and building lights respond subtly. The portfolio owner's name and professional role appear as part of a custom HUD/dossier layer. A scroll cue invites the visitor deeper into the experience.

The visitor should be able to skip the cinematic introduction and reach Projects, Resume or Contact immediately.

## Product rule

**Explore it like a cinematic world. Read it like a professional dossier. Evaluate it like a recruiter.**

---

# 2. Research: the Cyberpunk universe

## 2.1 Cyberpunk 2077 and Night City

The official Cyberpunk 2077 universe presents Night City, California, in 2077 as a city shaped by megacorporations, inequality, street gangs, tech hustlers, cyber-enhancement and the pursuit of becoming an urban legend. CD PROJEKT RED's official introduction contrasts corporate towers above the city with the activity and violence of the streets below.

The official *Cyberpunk 2077: Ultimate Edition* booklet describes Night City as visually intense: persistent neon, pulsating lighting, machinery, advertising, megabuildings, skyscrapers, street canyons and corporate havens. It also highlights the city's verticality and the distinct histories, architecture, attitudes and identities of its districts.

### Night City geography

The familiar Cyberpunk 2077 city geography includes six principal districts:

- **Watson:** industrial and densely populated urban fabric; a strong reference for cramped alleys, factories and signage.
- **Westbrook:** entertainment, nightlife and affluent enclaves; useful reference for glossy high-rise streets and high-end interiors.
- **City Center:** corporate power, skyscrapers and imposing institutional architecture.
- **Heywood:** crowded residential and commercial neighbourhoods with strong local identity.
- **Santo Domingo:** industrial infrastructure and working-class urban environments.
- **Pacifica:** incomplete development and neglected resort ambitions; the Phantom Liberty expansion adds the fortified Dogtown area within the wider Pacifica region.
- **Badlands:** the desert surrounding the city; visually distinct from the dense urban core.

These are creative references only. Do not trace or reproduce the actual game map for the portfolio. Build an original city composition with a coherent skyline, districts and landmarks.

### City design principles to borrow

- **Verticality:** foreground streets, mid-level walkways, elevated roads, bridges and distant corporate towers should create depth.
- **Layered urban history:** not every block should look like a luxury future. Mix corporate facades, industrial surfaces, old concrete, cables, service corridors and street-level density.
- **Visual hierarchy:** the skyline should establish place; closer signage and animated lights should guide the eye; interface elements should remain readable above all of it.
- **Environmental storytelling:** small signs, transit lines, windows, antennas, air-conditioning units, advertising panels and distant movement make the city feel inhabited.
- **Contrast:** beauty and visual excess coexist with grime, inequality and industrial wear.
- **Motion with a source:** traffic trails, animated billboards, rain, steam, distant aircraft, flickering signs and holographic projections should feel like part of the world rather than random particle effects.

## 2.2 Cyberpunk society and key concepts

The universe's useful concepts for a developer portfolio include:

| Universe concept | Meaning in the fiction | Portfolio translation |
|---|---|---|
| Edgerunner / Merc | A mercenary operating in the city's underworld | Independent builder / engineer identity, without falsely claiming mercenary work |
| Fixer | A broker who connects clients and mercenaries to gigs | Project discovery and opportunity navigation |
| Gigs | Contracted work with an objective | Individual project case studies |
| Street Cred | Reputation earned through work | Evidence-backed achievements, contributions and public work |
| Eddies | In-world currency | Do not turn this into fake money or fake salary metrics; decorative language only if clearly fictional |
| Cyberware / Chrome | Body augmentation and specialised capability | Skill / technology capability system |
| Cyberdeck | Hardware used for netrunning and hacking | Interactive technical skill stack / engineering toolkit |
| Netrunner | Specialist in network intrusion and digital systems | AI/ML, backend, systems and automation capability metaphor |
| Quickhack | A fast digital action | Small interactive UI actions, not claims of real hacking capability |
| Braindance | Recorded, immersive sensory experience | Optional media-led project storytelling; do not imitate protected game assets |
| Ripperdoc | Specialist who installs and modifies cyberware | No direct portfolio equivalent needed; avoid overusing lore metaphors |
| Megacorp | Powerful corporation shaping city life | Visual antagonist / worldbuilding reference, not a portfolio section unless there is a real corporate case study |

Do not turn every section into a lore pun. Use the language selectively so that visitors understand the site without needing to know the franchise.

## 2.3 Cyberpunk 2077 gameplay systems worth borrowing as interface metaphors

- **Character build / attributes:** use a compact technical capability matrix rather than invented RPG stats.
- **Cyberware:** represent tools and technical skills as modular augmentations or capability modules.
- **Netrunning:** use terminal panels, network-node diagrams and data-flow visualisations for actual technical work.
- **Gigs / Fixer board:** present projects as discoverable contracts with clear status, purpose, technology and evidence.
- **Journal / shards / database:** make deeper project documentation, engineering notes and learning entries browseable.
- **Map / districts:** use as a navigation metaphor only if an actual city-map scene materially improves the experience. The page's primary navigation must remain clear.
- **Scanner:** use subtle scan and highlight feedback on interactive elements, not a permanent screen overlay.
- **Reputation:** show only verifiable awards, credentials and public contributions.

## 2.4 Cyberpunk: Edgerunners

The original *Cyberpunk: Edgerunners* is an animated, ten-episode standalone story set in Night City. It was produced by CD PROJEKT RED in collaboration with Studio TRIGGER and released through Netflix. The official description centres on a street kid trying to survive in a city obsessed with technology and body modification by becoming an edgerunner.

The official character material identifies key figures including David, Lucy, Rebecca, Maine, Faraday and Adam Smasher. Their descriptions establish distinct archetypes: the ambitious young mercenary, skilled netrunner, volatile ally, mentor/crew leader, fixer and highly cyber-enhanced adversary.

### Story and thematic ideas (spoiler-light)

- **Ambition and survival:** people attempt to define themselves in a system that often treats them as disposable.
- **Found family and crew bonds:** relationships give emotional weight to otherwise high-tech, violent environments.
- **Identity and augmentation:** technology changes bodies, abilities and perceptions of self.
- **Fame and reputation:** becoming a legend is seductive but carries costs.
- **Corporate power and inequality:** individual lives exist inside structures much larger than themselves.
- **Human cost of optimisation:** more power is not always a better outcome; pushing beyond limits can cause harm.
- **Dreams and consequence:** the city is not merely a backdrop; it pressures every character's choices.

Use these themes as storytelling inspiration for a professional portfolio: learning, building, setbacks, collaboration, ambition and growth. Do not make the portfolio owner a fictional character or invent a tragic backstory.

### Edgerunners visual language

- More expressive and kinetic than a realistic game HUD.
- Bold graphic shapes and confident silhouettes.
- Saturated colour contrasts against dark urban backgrounds.
- Large, deliberate typography.
- Speed lines, hard cuts and aggressive movement used selectively.
- Emotional close-up moments contrasted with wide city views.
- Use yellow, cyan, magenta, violet, red and deep blue as controlled accents, not as a full-screen rainbow gradient.

### Sound

Music and sound are a powerful part of the universe, but the portfolio must not reuse the Edgerunners soundtrack, Cyberpunk 2077 radio tracks, official sound effects or audio rips without permission. Use silence by default, or commissioned/original ambience with independent controls.

## 2.5 Visual design synthesis

The recommended design should combine the game's environmental depth with the anime's graphic confidence.

**Base environment:** deep charcoal, blackened navy, wet asphalt, concrete, smoke, glass, metal and city haze.

**Accent language:** one dominant signal-yellow accent, supported by cyan and magenta. Use red/orange sparingly for warnings, active states or high-energy transitions.

**Typography:**
- Display headline: condensed, geometric or angular sans-serif with strong uppercase character.
- Interface labels: monospaced or technical sans-serif.
- Body text: readable neutral sans-serif; do not use a sci-fi display font for paragraphs.
- Numerals: tabular/monospaced where used for metrics or IDs.

Potential fonts to evaluate: Oxanium, Rajdhani, Space Grotesk, IBM Plex Mono, Barlow Condensed and Inter. Verify font licensing and loading behaviour before adoption. Avoid pretending these are official Cyberpunk fonts.

**Surface language:**
- Dark translucent surfaces with carefully measured blur.
- Hard-edged or chamfered panel corners in selected locations.
- Thin technical dividers and segmented borders.
- Small metadata labels and section indices.
- Restrained neon edge-lighting.
- Subtle grain, scanlines or chromatic separation only as an atmosphere layer.
- Clear focus states and high text contrast.

---

# 3. Uploaded portfolio reference analysis

The uploaded `sukrut07-portfolio_final` text dump is a useful structural reference, not a source of identity or content for this portfolio.

## 3.1 Useful structure in the reference

The available source dump shows a multi-page portfolio structure with:

- Home / landing page.
- About page.
- Projects page.
- Skills page.
- Experience and education page.
- Competitions / participation page.
- Certifications archive.
- Contact page.

The homepage contains a professional hero, role descriptor, calls to action, profile card, compact capability stack, currently-building projects, navigation cards, GitHub proof section, shared footer and contact modal.

The projects page uses category filters and a data-driven project grid. The source includes a separate project data model. The experience and education content also uses structured data arrays. Other pages organise skills, credentials and contact information.

## 3.2 What to preserve as an information architecture pattern

- Clear home/about/projects/skills/experience/achievements/certifications/contact destinations.
- Shared navigation and footer.
- A prominent professional identity and resume/contact actions.
- Projects in a structured, data-driven catalogue.
- Project category filters.
- Detailed project case studies.
- Experience and education timeline.
- Skills grouped by domain.
- Certificates and competitions as separate evidence collections.
- Accessible contact dialog or dedicated contact page.
- Responsive layouts and sensible page hierarchy.

## 3.3 What not to copy

The uploaded reference belongs to Sukrut Dusane. Do not reuse the name, photo, phone, email, links, education, projects, statistics, achievements, certificates, timelines or claims. Use only the general site structure and patterns.

The uploaded text dump lists HTML pages and JavaScript data files, but it does not include the referenced `style.css` or `script.js` source files in its directory listing. Therefore, the full visual system and runtime behaviour of the reference cannot be independently evaluated from this dump alone. Use it as an information architecture reference, not as a pixel-perfect styling source.

---

# 4. 21st.dev research and component strategy

## 4.1 Library overview

At the research snapshot, 21st.dev's public component library described itself as a React and Next.js community component library with approximately 12,000 components. It exposes categories such as Heroes, Shaders, Backgrounds, Buttons, Cards, Navigation, Footers, Dashboards, Text, CTAs, Galleries and Forms, plus a much broader set of interaction primitives.

The library is a discovery and adaptation source. A component appearing in the catalogue is not proof that it is compatible with the current project, accessible, performant or visually appropriate. Every component must be previewed, source-inspected and adapted before use.

## 4.2 Strongest 21st.dev references for this project

| Component / collection | What it does | Recommended use | Important caveat |
|---|---|---|---|
| [Scroll media expansion hero](https://21st.dev/@arunachalam/components/scroll-expansion-hero) | Expands a media area as the user scrolls | Main cinematic city reveal | Listed as Next.js + React + Tailwind and Framer Motion; adapt for current app, do not paste Next-specific code blindly |
| [Scroll Morph Hero](https://21st.dev/@prashantsom75/components/scroll-morph-hero) | Morphs a scattered composition into a changing form as the page scrolls | Opening title / city-to-dossier transition inspiration | Uses Framer Motion; simplify to fit the brand |
| [Story scroll](https://21st.dev/@boudjadjasamira/components/story-scroll) | Full-screen narrative sections with large typography and section transitions | Chapter-based storytelling | Avoid over-pinning the entire page |
| [Spline Scene](https://21st.dev/@serafimcloud/components/splite) | React wrapper for an interactive Spline scene, with lazy-load support in its example | Hero city, holographic signage or floating cyberdeck | Requires Spline runtime packages and a properly authored scene; external scene hosting and mobile performance must be checked |
| [HolographicCard](https://21st.dev/@dhileepkumargm/components/holographic-card) | Cursor-reactive 3D tilt, glow and iridescent sheen | Featured project cards and dossier panels | Use sparingly; preserve normal cursor and touch functionality |
| [Animated Shader Hero](https://21st.dev/@ravikatiyar162/components/animated-shader-hero) | WebGL shader background with animated hero content | Ambient atmosphere or transition layer | One shader layer is enough; do not stack many competing effects |
| [3D Stacked Website Cards Scroll](https://docs.21st.dev/@kedhareswer/components/case-stack-scroll) | Scroll-driven 3D case-study cards that stack and file away | Project showcase / contract board | Requires GSAP; test performance and mobile interaction |
| [Glitch Text Loader](https://docs.21st.dev/@elements-/components/loader-glitch-text) | Text loader with RGB splitting, clip-path distortion and character scrambling | Short preloader or transition label | Do not make the entire site glitch continuously |
| [On-scroll animation collection](https://21st.dev/community/components/explore/on-scroll-animation) | Reveal, parallax and scroll effects | Section transitions and content reveals | Select only effects with clear hierarchy and purpose |
| [Sticky scroll reveal collection](https://21st.dev/community/components/explore/sticky-scroll-reveal) | Pinned content with progressive reveal | One signature storytelling sequence | Pinning is expensive in scroll time; use only for high-value scenes |
| [Custom cursor collection](https://21st.dev/community/components/explore/cursor-custom) | Cursor-following visual treatments | Optional desktop targeting reticle | Do not hide the native pointer without a fallback; disable on touch |
| [Motion Footer / footer collection](https://21st.dev/community/components/explore/react-footer) | Animated and structured footer patterns | Final contact / Afterlife section | Footer should remain quick to scan |
| [Website navigation collection](https://21st.dev/community/components/explore/website-navigation-bar) | Docks, floating nav, tabs, sidebars and menu patterns | Compact persistent HUD navigation | Keep nav labels comprehensible and recruiter-friendly |

## 4.3 Other component libraries and inspiration sources

### React Bits

[React Bits](https://reactbits.dev/) provides source-owned animated React components, with options in text animations, backgrounds, 3D/shaders, cursor effects and UI/cards. Useful patterns include:

- Scroll Stack.
- Frame Scrub.
- Scroll Mask.
- Scroll Portal.
- Particle Text.
- 3D Text Reveal.
- Glitch Text.
- Custom Cursor.
- Rotating Cards.
- Circle Gallery.
- Shader Card.
- Long Exposure light trails.

Use these as inspiration and inspect current component APIs before adopting.

### Codrops Creative Hub

[Codrops Creative Hub](https://tympanus.net/codrops/hub/) is a design and engineering inspiration archive for WebGL, Three.js, GSAP, scroll effects, image sequences, interactive grids and 3D storytelling. It is best treated as a reference for techniques and visual quality, not as a component package to import wholesale.

### GSAP ScrollTrigger

[GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) provides scroll-linked timelines, pinned scenes, scrubbed animations and progress-driven transitions. It is suitable for the signature camera/story sequence. It should not hijack the wheel or block native scrolling.

### Three.js / React Three Fiber / Spline

Use one primary 3D rendering path:

- **React Three Fiber + Three.js:** most flexible when the scene is procedural and tightly integrated with React state.
- **Spline:** convenient for a pre-authored interactive scene; scene design and asset size still need optimisation.
- **Vanilla Three.js:** appropriate if the app is not React or if a single self-contained canvas is simpler.

Do not combine multiple 3D engines in the same hero without a specific reason.

## 4.4 Component category adoption matrix

The user listed a broad set of 21st.dev categories. This is the recommended adoption plan—not an instruction to install every category.

### High-fit categories

| Category | Fit | Portfolio use |
|---|---|---|
| Backgrounds | High | Night City atmosphere, rain, grain and subtle environmental layers |
| Borders | High | HUD segmentation, chamfered panels, status frames |
| Calls to Action | High | View Projects, Download Resume, Contact |
| Docks | High | Compact fixed navigation / cyberdeck dock |
| Features | High | Capability highlights and selected project value |
| Footers | High | Afterlife / contact footer with clear links |
| Galleries | High | Project imagery, certificates, architecture snapshots |
| Gradients | High | Restrained lighting and panel accents |
| Heroes | Essential | 3D cinematic landing sequence |
| Images | High | Project screenshots, portrait and original scene textures |
| Maps | Conditional | Stylised Night City navigation only if it improves wayfinding |
| Marquees | High | One or two technology / status ticker strips |
| Navigation Menus | Essential | Persistent nav, chapter links and mobile menu |
| Scroll Areas | High | Long case studies, terminal windows and modal content |
| Shaders | High | Hero atmosphere, rain/refraction or signal distortion |
| Stats & KPIs | Conditional | Only real, verified project or career metrics |
| Steppers | High | Project process, career chronology or implementation flow |
| Videos | High | Original background loops or demo clips, muted and optional |
| Accordions | Medium | FAQ, case-study details, technical notes |
| Alerts | Medium | System notices, project status and form feedback |
| Avatars | High | Real profile portrait or clearly stylised original avatar |
| Badges | High | Project status, skill domains and verified credentials |
| Buttons | Essential | All primary/secondary actions |
| Cards | Essential | Projects, skills, credentials and experience |
| Carousels | Medium | Project media, certificate gallery; do not hide all projects in a carousel |
| Charts & Data Viz | Conditional | Real measurable data only; no decorative fake charts |
| Cursors | Medium | Desktop-only reticle/spotlight response, with native fallback |
| Dashboards | High | Compact professional HUD / status panels |
| Dialogs / Modals | High | Project details, contact, quick-view panels |
| Dropdowns | Medium | Project category and skill filters |
| Empty States | High | No projects match, missing media, unavailable demo states |
| File Trees | Medium | Repository structure or technical case-study panel |
| Forms | High | Contact form, with working delivery path |
| Grids & Bento | High | Skills overview, projects overview, achievements |
| Icons | Essential | Consistent UI iconography |
| Inputs | High | Search, contact and command palette |
| Links | Essential | Repositories, demos, resume and professional profiles |
| Lists | High | Technologies, features and experience bullet points |
| Menus | High | Navigation, context and command actions |
| Notifications | Medium | Toasts for form state and copy feedback |
| Numbers | Medium | Real stats or section counters only |
| Onboarding | Medium | Optional one-time intro / skip prompt |
| Paginations | Medium | Large projects or certification collections |
| Popovers | Medium | Tooltips, status definitions and small contextual info |
| Profiles | High | About / operator dossier |
| Progress | High | Scroll chapter progress or actual process progress |
| Search Bars | High | Command palette and project search |
| Sidebars | High | Dossier navigation / case-study index |
| Tabs | High | Project details, skills categories and media modes |
| Tags | High | Technology, category and status labels |
| Texts | Essential | Headings, kinetic typography and readable body text |
| Timelines | High | Experience, education and project milestones |
| Toasts | Medium | Feedback for small actions |
| Toggles | Medium | Sound, motion and theme controls |
| Tooltips | Medium | Abbreviations, icons and skill context |

### Conditional categories — use only when real content requires them

| Category | Decision |
|---|---|
| Clients | Use only if there are real client names/logos and permission to display them. |
| Comparisons | Use for genuine before/after or model comparison evidence, never invented improvements. |
| FAQs | Optional for practical recruiter questions or project deployment notes. |
| Team Sections | Use for real collaborators and clearly identified team contributions. |
| Testimonials | Only publish real, attributable testimonials with permission. Never generate fake praise. |
| AI Chats | Only if a useful, functioning portfolio assistant is actually implemented. Not required for the visual theme. |
| Calendars / Date Pickers | Not needed for an ordinary portfolio. Could support event archives only if useful. |
| Checkboxes / Radio Groups | Use only when the contact form or filter interaction requires them. |
| Sign Ins / Sign Ups | Not needed unless the site becomes a real authenticated product. |
| Sliders | Use only for a genuine comparison or user-controlled visual parameter. |
| Tables | Useful for concise architecture summaries, project stack comparisons or structured data. |
| File Uploads | Not needed for a recruiter contact flow unless a real use case exists. |
| Pricing Sections | Exclude. A personal portfolio is not a SaaS pricing page. |
| Globes | Usually exclude; a 3D globe is not automatically relevant to a Night City portfolio. |

### Explicit exclusions

Do not add a pricing table, fake client logo strip, generated testimonials, fake chat assistant, login page, fake live dashboard, made-up KPIs, irrelevant calendar, file-upload interaction with no backend, or generic SaaS feature grid merely because a component exists in the library.

---

# 5. Proposed site architecture

Use a long-form cinematic landing page with supporting detail routes/pages. The sample's dedicated page structure can be retained while the homepage becomes the scroll-driven story.

## 5.1 Global navigation

- Brand: `OM VYAS` or a restrained custom wordmark.
- Primary destinations: Home, About, Projects, Skills, Experience, Achievements, Certifications, Contact.
- Resume action always accessible.
- Desktop: compact HUD-like navigation that becomes more legible after the hero.
- Mobile: clear menu/drawer with large tap targets.
- Optional command palette: `Ctrl/Cmd + K` to search sections and projects.
- Scroll indicator: chapter number and progress rail; no fake geolocation, wanted level or user status.

## 5.2 Homepage story sequence

### Sequence 00 — Boot / Establishing connection

A very short optional preloader:
- "ESTABLISHING CONNECTION"
- Minimal progress/handshake animation.
- Skip/continue control.
- Must not delay the page or block recruiters.
- Do not create a fake multi-second loading wait when assets are already ready.

### Sequence 01 — Night City / 3D hero

- One genuine WebGL scene, ideally a custom procedural city or an original Spline scene.
- Tall building silhouettes, multi-level streets, holographic billboards, reflective road, atmospheric haze and moving light trails.
- Low-angle or aerial camera move.
- Original custom signs; no official Cyberpunk logo or copied game billboard.
- The main headline reveals the portfolio owner's name and role.
- Two key CTAs: `Explore Projects` and `Download Resume`.
- Small down-scroll cue.
- Professional summary remains accessible to search engines and screen readers; do not place all meaningful text inside WebGL.

### Sequence 02 — Operator dossier / About

- Portrait or existing profile photo if available; otherwise use a deliberate placeholder, not a fabricated realistic face.
- Name, degree/education, current focus and concise professional introduction.
- Compact identity metadata, but no fake character stats.
- Show a short "system profile" card with real details.
- Distinguish personal interests from verified credentials.

### Sequence 03 — Fixer board / Projects

Projects are the core proof of work.

Recommended project entries for the current owner portfolio, subject to verification against the existing data and repositories:
- FairLens.
- NautilusAI.
- Agentica.
- TravelSphere.
- OceanEmbed-X.
- NETRA.

Every project should show:
- Name and concise purpose.
- Project type/category.
- Current status (prototype, active, deployed, archived, etc. only when accurate).
- Actual technologies used.
- Actual owner contribution.
- Live demo and repository links where available.
- Evidence-backed outcomes only.
- A case-study route with problem, users, constraints, architecture, data flow, decisions, key features, testing, results, challenges and future improvements.

Use a mission-card / dossier format with one featured 3D project stack. Keep a normal grid/list view so visitors can browse quickly.

### Sequence 04 — Cyberdeck / Skills

Present technical skills as a system architecture / capability matrix rather than RPG points.

Domains can include:
- Programming and DSA.
- AI / Machine Learning.
- Generative AI and agentic systems.
- Frontend engineering.
- Backend engineering.
- Databases and data engineering.
- Cloud, deployment and tools.

Each technology needs an honest label such as:
- Currently Learning.
- Working Knowledge.
- Used in Projects.
- Comfortable Building With.
- Experienced With.

No arbitrary skill percentages or fake attribute points.

### Sequence 05 — Chronicle / Experience and Education

Use a vertical or horizontal timeline with:
- Education.
- Internships and work experience.
- Open-source contributions.
- Club/community roles.
- Relevant learning milestones.

Dates and titles must be verified. Distinguish roles, internships, project roles, volunteering and course completion.

### Sequence 06 — Reputation / Achievements and Certifications

- Awards, placements and finalist positions only with evidence.
- Participation is not a placement.
- Team results must be labelled as team outcomes.
- Certificates must be named accurately and linked to proof where possible.
- Certificate gallery should open a readable image/PDF preview.
- Use custom cards with holographic edge lighting, not a wall of random badges.

### Sequence 07 — Crew / Collaboration

Optional section for real communities, public-speaking, teams, clubs and collaborators.
- Only include actual memberships and roles.
- Team members should be named only when appropriate and publicly shareable.
- Do not include fake testimonials.

### Sequence 08 — Connect to the Net / Contact

- Contact form only if message delivery is implemented and tested.
- Otherwise offer a clear `mailto:` fallback and direct professional links.
- GitHub, LinkedIn, LeetCode, CodeChef and resume links should remain visible and functional.
- Use a final city-wide visual transition or neon sign-off, but keep the CTA obvious.

## 5.3 Dedicated supporting pages

- `/projects` — full project catalogue, filters and detailed cases.
- `/skills` — searchable technical skill catalogue.
- `/experience` — experience and education timeline.
- `/achievements` — competitions and awards.
- `/certifications` — certificates archive.
- `/contact` — contact methods and resume.

The homepage should not force all content into a single extremely long scroll. Use the cinematic sequence for discovery and dedicated pages for detailed evaluation.

---

# 6. 3D and scroll choreography

## 6.1 Hero 3D scene specification

Build an original Night City-inspired scene with:

- A small set of highly composed building masses with varied height and silhouette.
- Near, middle and far depth layers.
- A street canyon or elevated transit line.
- Reflective road plane with restrained procedural reflections.
- Fog/atmospheric perspective.
- A few bright signs and billboards with original text.
- Moving light streaks or distant traffic.
- A subtle rain/particle layer.
- A hero focal point: central tower, holographic signal, or original cyberdeck-inspired object.
- Lighting that creates clear silhouette and depth; do not fill the screen with glow.

This should be a real 3D scene, not a static background image with CSS transform pretending to be 3D.

## 6.2 Scroll-controlled cinematic timeline

Recommended choreography:

1. **Initial viewport:** wide establishing composition; name and role are readable immediately.
2. **First scroll:** camera descends between buildings; headline typography changes scale/position; navigation becomes a compact HUD.
3. **Second transition:** city signage and light trails become network paths or circuitry; scene transitions toward a dossier UI.
4. **About:** camera movement slows; identity panel appears in a more stable layout.
5. **Projects:** a featured project card approaches in depth; adjacent projects stack behind it; scroll selects/focuses the next case.
6. **Skills:** network nodes connect across the screen; selected domain reveals technologies and evidence.
7. **Timeline:** a vertical signal/path moves through milestones.
8. **Achievements:** cards or evidence sheets slide into a controlled gallery.
9. **Contact:** scene resolves to a quiet skyline / Afterlife-style closing panel.

Only one or two sections should use long pinned scroll sequences. All other sections should use natural scrolling with viewport-triggered reveals.

## 6.3 Motion principles

- Use easing with weight and inertia, but maintain responsiveness.
- Prefer opacity, transform and shader uniforms over layout-thrashing animation.
- Scroll-linked scene updates should be driven by scroll progress, not repeated state updates on every frame.
- Keep text motion short and purposeful.
- Use glitch distortion only for short transitions, not for body text.
- Use subtle parallax layers; avoid nausea-inducing camera movement.
- Stop or reduce off-screen animation.
- Respect `prefers-reduced-motion` and provide a static composition.
- Never prevent the visitor from using the browser's normal wheel/touch scrolling.

## 6.4 Technical implementation candidates

- React + TypeScript + Vite if that is the current project architecture.
- Three.js / React Three Fiber for custom procedural 3D.
- Spline only if a high-quality custom scene is authored and loading/hosting are acceptable.
- GSAP + ScrollTrigger for the signature camera sequence and limited pinned sections.
- Motion/Framer Motion for UI transitions, hover interactions and entrance/reveal effects.
- Lenis only if a real smooth-scroll need is demonstrated; synchronize it with GSAP and keep native accessibility/scroll behaviour intact.
- Do not add several animation libraries that solve the same problem.

---

# 7. Design system proposal

These are proposed original tokens, not official Cyberpunk brand colours.

## 7.1 Colour tokens

| Token | Proposed value | Use |
|---|---|---|
| `--city-void` | `#07090D` | Main background |
| `--city-carbon` | `#10151C` | Secondary surfaces |
| `--city-steel` | `#202832` | Panel outlines and dividers |
| `--city-concrete` | `#303741` | Muted surface variation |
| `--signal-yellow` | `#FCEE0A` | Primary action and key highlight |
| `--neon-cyan` | `#00E5FF` | Technical / data accent |
| `--neon-magenta` | `#FF2E88` | Secondary / emotional accent |
| `--warning-red` | `#FF4B4B` | Error / warning only |
| `--text-primary` | `#F4F5F7` | Primary text |
| `--text-secondary` | `#A4ADB8` | Secondary text |

Keep the overall page dark. Use yellow as the primary signal colour, cyan and magenta as limited supporting accents. Do not apply all three equally to every element.

## 7.2 Typography

- Display: condensed or angular display font; consider Oxanium or Rajdhani.
- Headings: Space Grotesk / Barlow Condensed.
- Technical metadata: IBM Plex Mono.
- Body: Inter or another highly readable sans-serif.
- Keep paragraphs comfortable to read. Do not use a decorative typeface for long text.

## 7.3 Panels and controls

- Panels: carbon/black surfaces with a fine border and limited translucency.
- Corners: mix sharp corners and clipped/chamfered accents rather than rounding every element.
- Buttons: clear primary/secondary hierarchy, tactile pressed state, high contrast and labels.
- Borders: segmented, circuit-like or corner-frame accents where they improve hierarchy.
- Icons: one consistent icon system, not a mix of emoji and random icon libraries.
- HUD: compact labels and status lines; do not place essential paragraphs inside tiny interface panels.

## 7.4 Anti-generic rules

Do not use:
- Purple gradient on every section.
- Random floating orbs.
- Excessive glow on every border.
- Generic SaaS bento grids that have no content logic.
- Excessively rounded cards throughout.
- Stock AI robot imagery.
- Fake graphs, fake uptime indicators, fake status telemetry or fake skill bars.
- Dozens of simultaneous animations.
- Unreadable microcopy.
- The exact Cyberpunk 2077 logo, UI screenshot, Edgerunners character art or official soundtrack without permission.

---

# 8. Performance, accessibility and IP boundaries

## 8.1 Performance requirements

- Load the 3D scene lazily or progressively; do not block the first paint.
- Use one main WebGL canvas where possible.
- Limit draw calls, particle count, textures and DPR.
- Compress models and textures; use appropriate texture sizes.
- Pause animation when off-screen, tab-hidden or reduced-motion is active.
- Provide a non-WebGL fallback using a poster image / CSS environment.
- Ensure the hero text and CTA render independently of WebGL.
- Avoid large video autoplay on mobile; use a poster and an explicit playback path if needed.
- Measure actual LCP, CLS, INP, JS bundle sizes and WebGL frame behaviour before reporting performance.

## 8.2 Accessibility requirements

- Native scrolling; no forced scroll capture.
- Keyboard-operable nav, project cards, dialogs and command palette.
- Visible focus styles.
- Semantic buttons and links.
- Accessible names for icon-only buttons.
- Captions or text alternatives for meaningful video.
- Sufficient contrast over all backgrounds.
- Reduced-motion mode.
- No essential information conveyed by colour alone.
- Large touch targets on mobile.
- Mobile navigation must not depend on hover or a custom cursor.

## 8.3 Intellectual property and assets

- Use original 3D city geometry, signage, graphics, logos and avatar artwork.
- Avoid importing ripped game textures, official UI screenshots, Edgerunners character art, copyrighted soundtrack or sound effects.
- Use licensed stock or independently created city imagery only where necessary.
- If using any franchise assets, document their source, licence and usage rights; do not assume fan use automatically grants commercial rights.
- Include a discreet unofficial fan-inspired disclaimer where appropriate.

---

# 9. Implementation phases and deliverables

## Phase 0 — Existing project and content audit

- Inspect the active repository and branch.
- Identify current framework, build tooling, data model, routes and existing components.
- Separate reusable professional content from old Pokémon-specific design.
- Identify all Pokémon labels, assets, icons, navigation and interactions to remove.
- Preserve verified owner profile, project, skill, experience, achievement and certificate information.
- Never import Sukrut Dusane's content from the reference archive.

Deliver: `CYBERPUNK_PORTFOLIO_AUDIT.md`.

## Phase 1 — Universe research and visual direction

- Review the official Cyberpunk 2077 and Edgerunners sources.
- Build a visual reference board with original design notes.
- Define palette, typography, surfaces, HUD, motion and asset rules.
- Produce desktop and mobile storyboards.

Deliver: `CYBERPUNK_WORLD_RESEARCH.md`, `VISUAL_DIRECTION.md`.

## Phase 2 — 21st.dev and component investigation

- Search the 21st.dev library for the categories that fit.
- Inspect the specific source code, author, dependencies, compatibility and licence.
- Preview on desktop and mobile.
- Adopt a curated set of major components; do not import everything.
- Implement native equivalents for simpler controls when that is cleaner.

Deliver: `21ST_COMPONENT_ADOPTION_MATRIX.md`.

## Phase 3 — Design system and landing prototype

- Build theme tokens and shared HUD components.
- Implement the 3D hero scene.
- Add the hero text, CTAs, skip path and scroll indicator.
- Add the first scroll-linked camera transition.

Deliver: `CYBERPUNK_DESIGN_SYSTEM.md`, running prototype and screenshots.

## Phase 4 — Scroll story and content sections

- About / operator dossier.
- Projects / fixer board.
- Skills / cyberdeck.
- Experience / chronicle.
- Achievements and certifications / reputation archive.
- Community / crew where verified.
- Contact / connect to the net.
- Supporting detail pages.

Deliver: working content sections and detail routes.

## Phase 5 — Interaction polish

- Navigation dock and command palette.
- Project search and filters.
- Holographic project cards.
- Scroll chapter progress.
- Timelines and galleries.
- Contact modal or contact page.
- Optional original ambience control.

Deliver: complete interaction layer.

## Phase 6 — Quality assurance and deployment readiness

Test at 1440×900, 1280×800, 768×1024, 390×844 and 360×800.

Test:
- Real browser scrolling on desktop and mobile.
- 3D loading and WebGL fallback.
- Scroll-linked camera choreography.
- Navigation and command palette.
- All project detail routes and external links.
- Resume and contact actions.
- Search and filters.
- Keyboard access.
- Reduced motion.
- No console errors.
- Layout overflow and visual clipping.
- Bundle size and actual performance metrics.

Deliver: `CYBERPUNK_QA_REPORT.md` and `FINAL_IMPLEMENTATION_REPORT.md`.

---

# 10. Acceptance criteria

The redesign is complete only when:

1. The Pokémon-specific visual theme and interactions have been removed from the new experience.
2. The homepage has a genuine 3D cyberpunk city scene or an equally strong original 3D centrepiece.
3. Scroll progress drives a deliberate cinematic story sequence.
4. Navigation remains intuitive and can bypass the cinematic sequence.
5. Projects are presented as detailed, evidence-backed case studies.
6. Skills are organised into a clear technical capability system.
7. Experience, education, achievements and certifications remain accurate.
8. The uploaded reference is used for information architecture only, not its identity or claims.
9. The design uses an original, coherent Cyberpunk-inspired visual language.
10. UI components are selected and verified, not blindly bulk-imported.
11. The site works on desktop, tablet and mobile.
12. Motion respects reduced-motion preferences and does not hijack scroll.
13. The 3D scene is lazy/progressive and has a fallback.
14. No fabricated metrics, testimonials, experience or achievements exist.
15. Real browser QA and build results are documented honestly.

---

# 11. Research and component references

## Cyberpunk official sources

- [CD PROJEKT RED — Cyberpunk 2077 universe / Hello, Night City](https://www.cyberpunk.net/en/news/20960/hello-night-city)
- [CD PROJEKT RED — Cyberpunk: Edgerunners official page](https://www.cyberpunk.net/en/edgerunners)
- [CD PROJEKT RED — Cyberpunk: Edgerunners 2 official page](https://www.cyberpunk.net/en/edgerunners2)
- [Netflix Media Center — Cyberpunk: Edgerunners](https://media.netflix.com/en/only-on-netflix/81054853)
- [CD PROJEKT RED — Cyberpunk 2077 Ultimate Edition Game Booklet (PDF)](https://cdn-s-cyberpunk.cdprojektred.com/CP2077-UE-Booklet-EN-1.pdf)
- [CD PROJEKT RED Support — Cyberpunk 2077 accessibility features](https://support.cdprojektred.com/en/cyberpunk/pc/gameplay/issue/1661/accessibility-features-1)

## 21st.dev

- [21st.dev component library](https://21st.dev/community/components)
- [Hero scroll animation collection](https://21st.dev/community/components/explore/hero-scroll-animation)
- [On-scroll animation collection](https://21st.dev/community/components/explore/on-scroll-animation)
- [Sticky scroll reveal collection](https://21st.dev/community/components/explore/sticky-scroll-reveal)
- [3D React components collection](https://21st.dev/community/components/explore/3d-react-components)
- [Scroll media expansion hero](https://21st.dev/@arunachalam/components/scroll-expansion-hero)
- [Scroll Morph Hero](https://21st.dev/@prashantsom75/components/scroll-morph-hero)
- [Story scroll](https://21st.dev/@boudjadjasamira/components/story-scroll)
- [Spline Scene](https://21st.dev/@serafimcloud/components/splite)
- [HolographicCard](https://21st.dev/@dhileepkumargm/components/holographic-card)
- [Animated Shader Hero](https://21st.dev/@ravikatiyar162/components/animated-shader-hero)
- [3D Stacked Website Cards Scroll](https://docs.21st.dev/@kedhareswer/components/case-stack-scroll)
- [Glitch Text Loader](https://docs.21st.dev/@elements-/components/loader-glitch-text)
- [Custom cursor collection](https://21st.dev/community/components/explore/cursor-custom)
- [React footer collection](https://21st.dev/community/components/explore/react-footer)
- [Website navigation collection](https://21st.dev/community/components/explore/website-navigation-bar)

## Other creative front-end resources

- [React Bits](https://reactbits.dev/)
- [React Bits component docs](https://www.reactbits.dev/get-started/index)
- [Codrops Creative Hub](https://tympanus.net/codrops/hub/)
- [GSAP ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

---

# 12. Final creative direction

Make it feel like a journey through the dark future, but don't bury the portfolio inside visual noise.

The best version will have:
- One memorable 3D city scene.
- A strong scroll-driven narrative.
- A compact, persistent interface.
- A small collection of excellent interactions.
- Rich, accurate case studies.
- A cyberdeck-style skills system.
- An evidence-backed career/reputation archive.
- A clear way to contact the owner or download the resume.

**The city creates the atmosphere. The projects provide the proof. The interface gets out of the way.**


# 13. AAA-GAME-INSPIRED VISUAL FIDELITY — DESIGN AND TECHNICAL BLUEPRINT

**Revision:** 6 November 2026 — user explicitly raised the target from a general 3D cyberpunk landing page to AAA-game-inspired graphics.

## 13.1 What “AAA-inspired” means for this website

The target is not literal parity with Cyberpunk 2077's native PC/console renderer. A browser-based Three.js scene has different GPU budgets, asset loading constraints, device variability and access to rendering features. The goal is to reproduce the *perceived richness* of a premium game environment through strong environment art, carefully authored materials, lighting, atmosphere, composition and animation.

A polished neon gradient with a spinning object is not enough. A sparse city made from repeated cubes is not enough. The scene needs recognizable architecture, layered urban depth, environmental storytelling and believable surface response.

CD PROJEKT RED's official presentation of Night City emphasizes the contrast between corporate high-rises and street-level life, while the official Cyberpunk 2077 page describes the contrast between places such as Corpo Plaza and the Badlands. Those are useful worldbuilding cues for original city art direction, not instructions to copy specific game locations. <https://www.cyberpunk.net/us/en/cyberpunk-2077> <https://www.cyberpunk.net/en/news/20960/hello-night-city>

## 13.2 Environmental art direction

### City silhouette

- A dense vertical skyline with a mix of megastructures, residential towers, commercial slabs, transit structures and rooftop machinery.
- Varied heights and silhouettes; avoid a uniform wall of identical rectangular towers.
- A clearly readable hero tower / landmark that anchors the composition.
- Foreground structures, midground street canyon and distant skyline should be separated through atmospheric perspective.

### Architecture and set dressing

Design modular architecture in Blender or an equivalent 3D authoring tool:
- Facade/window kits with multiple variations.
- Structural supports, girders, service ducts and exposed pipes.
- Walkways, skybridges, transit rails and utility cables.
- Rooftop HVAC, antennas, water tanks and mechanical equipment.
- Storefronts, shutters, doors, signage frames and loading bays.
- Traffic barriers, bollards, road paint, drains and street furniture.
- Original fictional billboards and animated digital displays.

Create a handful of hero props with more detail and reuse modular kits / instancing for distant city massing. Use asymmetry and intentional repetition rather than random noise.

### Weather and atmosphere

- Rain at several depths with slightly different speeds and sizes.
- Wet road surfaces and puddle masks.
- Steam and smoke from vents / rooftops.
- Distant haze and controlled volumetric-looking light shafts.
- Vehicle headlights and taillights moving along a small number of defined paths.
- Neon spill on nearby metal, glass, concrete and asphalt.
- Some windows and signs animate; the entire environment must not flicker.

## 13.3 Material standard

Use glTF PBR materials and maps thoughtfully. Khronos glTF supports physically based material properties including base colour, metallic, roughness, normal, occlusion, emissive, clearcoat, transmission and related material properties. KTX 2.0 / Basis Universal supports efficient texture delivery and GPU memory savings on compatible viewers. <https://www.khronos.org/gltf/> <https://www.khronos.org/ktx/>

Required examples:
- Asphalt: dark base, varied roughness, normal detail, puddle mask, controlled reflective response.
- Concrete: diffuse surface with roughness and subtle normal variation.
- Metal: metallic response with roughness variation and edge wear.
- Glass: dark reflective surfaces with selective emissive interior panels.
- Plastic: non-metallic response with a more controlled specular highlight.
- Neon: emissive signage textures / meshes with bloom restricted to bright emissive regions.
- Screens: custom animated textures with original graphic content.

Avoid a scene where every object has the same wet mirror finish.

## 13.4 Lighting and post-processing

The target look needs a deliberate lighting hierarchy:
1. Environmental base light / sky contribution.
2. Large-area key lighting for architecture readability.
3. Practical neon / signage / window lighting.
4. Street and vehicle lights.
5. Small accent lights that draw attention to the hero focal point.

Required quality controls:
- Filmic tone mapping / exposure calibration.
- Selective bloom for emissive elements.
- Ambient occlusion only when its quality-to-cost ratio is justified.
- Shadow maps reserved for the lights and objects that visibly benefit from them.
- Fog/haze to give distance separation.
- Depth of field only during deliberate cinematic shots.
- Film grain and vignette at low levels.
- Chromatic aberration / glitch only during one-off transition beats.

Three.js documents an EffectComposer post-processing workflow and provides passes such as bloom, film grain, SSAO, SSR and related effects. Each pass should be profiled independently; stacking every effect is not a quality strategy. <https://threejs.org/manual/pages/post-processing.html> <https://threejs.org/docs/pages/UnrealBloomPass>

Cyberpunk 2077's higher-end console graphics options describe ray-traced reflections, shadows, ambient occlusion, skylight and emissive lighting. These are useful references for *what contributes to visual fidelity*, but a browser prototype should approximate these carefully with environment maps, baked lighting, selected reflection passes, PBR materials and budgeted shadows rather than promise hardware ray tracing. <https://www.playstation.com/en-in/games/cyberpunk-2077/>

## 13.5 3D camera narrative

One controlled camera sequence should connect the hero to the rest of the site.

| Scroll chapter | Visual event | Portfolio purpose |
|---|---|---|
| 0–20% | Establish skyline, distant traffic, atmospheric perspective | Identity and positioning |
| 20–45% | Descend between buildings; parallax structures cross frame | Transition into operator dossier |
| 45–70% | Street / rooftop level; signs and light sources become legible | Projects and work |
| 70–85% | City recedes / scene reframes as data surfaces become dominant | Skills and experience |
| 85–100% | Lighting narrows to a clean contact portal / terminal | Contact and resume actions |

These percentages are a starting storyboard, not rigid values. Adjust based on actual content length and readability. Preserve normal scroll and allow users to skip the cinematic sequence.

GSAP ScrollTrigger supports pinning, scrubbed progress, callbacks and responsive media matching. Use it to map native scroll progress to a reversible camera timeline. Do not build an unnecessary scroll-jacking system. <https://gsap.com/docs/v3/Plugins/ScrollTrigger/>

## 13.6 3D rendering and performance architecture

### Preferred implementation

- Three.js + React Three Fiber for the primary scene in a React app.
- Drei where helpers materially reduce complexity.
- One shared WebGL canvas for the main city environment.
- GSAP ScrollTrigger for scroll-driven choreography.
- DOM-based content for text, navigation, forms and project case studies.

### Rendering principles

React Three Fiber's performance guidance warns that mounting lots of objects, materials and lights has processing / compilation cost and recommends sharing resources and instancing repeated geometry. Its scaling guide also explains on-demand rendering as a way to avoid continuously rendering a scene when no animation is needed. Apply these ideas. <https://r3f.docs.pmnd.rs/advanced/pitfalls> <https://r3f.docs.pmnd.rs/advanced/scaling-performance>

- Share geometry and material instances where appropriate.
- Instance repeated windows, lights, pipes and facade pieces.
- Merge static meshes where it reduces draw calls without harming culling.
- Use LODs and frustum culling.
- Use fog / visibility distance for far background.
- Load high-detail hero assets first; defer decorative city clusters.
- Use dynamic imports for the 3D scene.
- Avoid full-scene React state updates every frame.
- Pause when hidden / off-screen where possible.
- Dispose render targets, textures and GPU resources correctly.

### Quality tiers

**Cinematic Desktop:** high-detail assets, higher capped DPR, carefully budgeted shadows and selected post-processing; intended for capable desktop GPUs.

**Balanced:** same composition and quality language, lower DPR, fewer particles, lower shadow resolution and reduced reflections; default when hardware is unknown.

**Performance / Mobile:** high-quality pre-rendered or layered fallback, minimal real-time effects, fewer particles and no expensive screen-space effects. Keep typography, navigation and calls to action fully usable.

A fallback must preserve the art direction; it must not be an empty black screen or a flat gradient.

### Performance targets to measure

- Capable desktop: target 55–60 FPS; investigate sustained drops below 45 FPS.
- Mid-range laptop: target at least 45 FPS in Balanced mode.
- Mobile: target 30 FPS or use the layered / pre-rendered fallback when that cannot be sustained.

These are targets, not universal guarantees. State the device, browser, screen size, DPR and test procedure when reporting results.

## 13.7 Asset pipeline and provenance

Recommended workflow:
- Model custom architecture and hero props in Blender.
- Export glTF 2.0 / GLB.
- Use Meshopt or Draco geometry compression where appropriate.
- Use KTX2 / Basis texture compression and mipmaps.
- Use texture atlases for repeated facades.
- Generate low-resolution / LOD variants for distant structures.
- Keep a source manifest for every downloaded asset.

Potential CC0 material / HDRI / prop sources:
- Poly Haven licence: <https://polyhaven.com/license>
- ambientCG: <https://ambientcg.com/>

Both sites publish CC0 licensing for their asset libraries. Still record the exact item and licence evidence used at the time of download. <https://polyhaven.com/license> <https://ambientcg.com/>

## 13.8 21st.dev component categories for AAA presentation

21st.dev is a React component discovery library, not a source of finished AAA game environments. Use it for interface structure, scroll choreography references, shader surfaces and micro-interactions. Author the main 3D city independently with a proper asset pipeline.

### High-fit categories

| Category | Use in this project |
|---|---|
| Heroes | Cinematic landing and identity composition |
| Backgrounds / Shaders | Atmospheric shader layer, subtle particle field, city ambience support |
| Borders | Technical segmented / illuminated panel borders |
| Calls to Action / Buttons | Primary mission CTA, resume, contact |
| Docks / Navigation Menus | Compact HUD / chapter navigation |
| Galleries / Carousels | Project showcase and visual case studies |
| Gradients | Controlled atmospheric colour transitions, not generic full-page gradients |
| Marquees | Short technology / capability ticker where useful |
| Maps | Optional city district navigation / project map only if it adds real value |
| Scroll Areas / Steppers / Timelines | Chapter progress, career timeline, scroll narrative |
| Texts | Large display typography, character reveal, technical labels |
| Avatars / Badges / Profiles | Operator dossier, profile identity, verified status |
| Cards / Grids & Bento | Project previews, case studies, selected content dashboards |
| Charts & Data Viz / Stats & KPIs | Only when backed by genuine data |
| Dialogs / Modals / Accordions / Tabs | Project detail and content organization |
| Cursors | Optional desktop-only custom cursor, never required for usability |
| Alerts / Notifications / Toasts | Real status and action feedback only |
| Inputs / Search Bars / Selects / Filters | Project and skill discovery |
| Links / Lists / Sidebars / Footers | Supporting navigation and readable information architecture |
| Videos / Images | Original environmental media and case-study evidence |

### Conditional / normally exclude

- Clients, Testimonials: only when genuine and approved evidence exists.
- Pricing Sections: irrelevant to a personal portfolio.
- Calendars / Date Pickers: no meaningful need unless scheduling is actually implemented.
- Sign In / Sign Up: no user account system is required.
- File Uploads: unnecessary unless there is a real and secure submission workflow.
- AI Chats: only if a genuinely functioning portfolio assistant exists.
- Comparisons: only for a real and meaningful project/technology comparison.
- Tables: appropriate for detailed architecture or technical data, not decorative filler.

Useful live collections and examples:
- 21st.dev components: <https://21st.dev/community/components>
- Scroll-driven hero templates: <https://21st.dev/community/components/explore/scroll-driven-hero-template>
- Scroll animation components: <https://21st.dev/community/components/explore/scroll-animation-component>
- Shader UI: <https://21st.dev/community/components/explore/shader-ui>
- 3D React components: <https://21st.dev/community/components/explore/21-3d>
- WebGL components: <https://21st.dev/community/components/explore/webgl-components>
- React timeline components: <https://21st.dev/community/components/explore/react-timeline-component>
- React marquee components: <https://21st.dev/community/components/explore/react-marquee>
- HolographicCard: <https://mcp.21st.dev/@dhileepkumargm/components/holographic-card>

Examples surfaced by the current library include Scroll Morph Hero, Shader Animation, Zoom Parallax, Full Screen Scroll FX, Cinematic landing Hero, Video Scroll Hero, Animated Shader Hero, Spline Scene, HolographicCard, 3D image gallery, 3D orbit gallery, realistic fog background, 3D Marquee and Motion Footer. Inspect source, dependencies, author and licence before selecting any one. <https://21st.dev/community/components/explore/scroll-animation-component> <https://21st.dev/community/components/explore/scroll-driven-hero-template> <https://21st.dev/community/components/explore/21-3d> <https://21st.dev/community/components/explore/shader-ui>

## 13.9 Required prototype evidence

Before building the full site, deliver a real working hero prototype with:
1. A skyline establish shot.
2. A street-level reveal shot.
3. A scroll-controlled camera sequence.
4. PBR materials and layered environmental lighting.
5. Rain / fog / traffic / animated signs in a controlled amount.
6. A properly composed operator identity and primary CTA.
7. A mobile / low-power fallback.
8. A quality-tier selector.

Capture desktop stills and a short screen recording of the scroll sequence. The image must remain convincing when paused. Do not call a flat background “3D”.

## 13.10 Intellectual property

Use an original fictional megacity and original visual assets. Do not rip or reuse Cyberpunk 2077 assets, screenshots, models, textures, logos, characters, animation frames or soundtrack without permission. CD PROJEKT RED's fan-content rules distinguish fan sites and websites from the use of protected game content in standalone products; review the current official guidelines before publication. <https://www.cdprojektred.com/en/fan-content> <https://www.cyberpunk.net/en/modding-support>

---

# 14. Updated acceptance standard

The project is only visually approved when the real-time city prototype demonstrates:
- Distinct architecture and convincing scale.
- Multiple levels of environmental depth.
- PBR material variation.
- Wet-surface response and readable reflections.
- Controlled neon bloom and atmospheric lighting.
- Moving environmental elements.
- A deliberate scroll-driven camera story.
- A measured performance tier and graceful mobile fallback.
- Screenshot / recording evidence from a running browser.

The art direction should feel closer to a premium game environment capture than a typical animated portfolio landing page, while retaining readable professional content and a fast path to projects, resume and contact.
