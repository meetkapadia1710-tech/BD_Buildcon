# 3D Construction Scene — Flagship Overhaul Plan

**Scope:** the scroll-driven WebGL construction scene on the homepage
(`components/motion/building/*`, mounted by `components/motion/BuildingScroll.tsx`).

**Goal:** move the scene from "toy blocks" to **premium architectural scale-model** quality —
deliberately stylized (not photoreal), on-brand, and fast enough for 1M users on mid-range phones.

---

## 1. Diagnosis — why it currently reads as cartoonish

These are the specific causes, mapped to code. Fixing these is the plan; everything else is polish.

| #   | Problem                                                                                                                                                                                   | Where                                                         | Why it hurts                                                                                                        |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1   | **Razor-sharp box edges everywhere.** Every member is a raw `BoxGeometry` (`GEO_COLUMN`, `GEO_BEAM`, `GEO_UNIT`…).                                                                        | `building/constants.ts`, `TowerCrane.tsx`                     | Real objects have chamfered edges that catch specular light. Sharp CG boxes are the #1 "toy render" tell.           |
| 2   | **Wrong proportions.** Columns are 0.14 units on a 10-unit bay (~1:70). Real RCC columns are ~1:15–1:25. Rebar starters are as tall as a floor. Slabs are paper-thin with no edge fascia. | `GEO_COLUMN`, `FoundationWorks.tsx` starter bars              | The eye reads proportion before detail. Toothpick columns + floating wafers = model kit, not building.              |
| 3   | **Featureless concrete monoliths.** The cores are single flat-grey boxes that outrun the floors by 6+ storeys mid-scroll — exactly the awkward frame in the screenshot.                   | `Building.tsx` (core lead), `MAT_CORE`                        | A giant untextured grey slab dominating the frame reads as unfinished CG.                                           |
| 4   | **Flat, single-color materials.** Every material is one uniform albedo; no tonal variation, no panel joints, no roughness breakup.                                                        | `constants.ts` materials                                      | Uniform color across large surfaces is the "clay render" look.                                                      |
| 5   | **Milk-white void.** White fog into white background with no ground plane; only faint contact shadows seat the model.                                                                     | `Scene.tsx` fog, `Ground.tsx`                                 | Objects floating in white with weak shadows read as clip-art.                                                       |
| 6   | **No ambient occlusion.** The post stack (bloom/vignette/SMAA) skips AO entirely (the `@react-three/postprocessing` / three r184 incompatibility noted in `Effects.tsx`).                 | `Effects.tsx`                                                 | AO is the single highest-impact pass for architectural scenes — it darkens junctions and makes geometry feel solid. |
| 7   | **Static camera, awkward composition.** Fixed 3/4 view; the crane hook line bisects the tall core; dead space top-right.                                                                  | `CameraRig.tsx` (its own comment says the dolly was deferred) | Flagship scroll scenes move the camera with the story.                                                              |

**What is already right (keep it):** shared geometries/materials, quality tiering (`useQuality.ts`),
Lightformer-baked environment (no HDRI fetch), reduced-motion fallback, dynamic import with `ssr: false`,
the phase-band staging system (`staging.ts`). The architecture does not need a rewrite — it needs an art pass
and a performance pass.

---

## 2. Art direction target

**"The architect's scale model, digitally."** A pristine museum-quality physical model on a sunlit table:
matte warm-white concrete, dark anodized steel, brand-teal accents, soft golden key light, crisp AO in every
junction. This is a _stylized_ target — we are explicitly **not** doing photorealism, PBR texture sets,
HDRI files, or GLTF photo-scans. Everything stays procedural and tiny.

Reference points: Apple Maps 3D landmark models, high-end archviz "white model" renders, Zaha Hadid / BIG
competition models. Brand tie-in: the page already has a teal CAD grid — the scene should feel like it
_grew out of the drawing_.

### Signature moment (every flagship scene needs one)

**Blueprint-to-built.** At progress 0, each building's massing appears as glowing teal blueprint
wireframe (matching the page's CAD grid). As its construction band starts, the wireframe fades and the real
structure rises through it. Implementation: one `THREE.LineSegments` (`EdgesGeometry` of the envelope box)
per building with a fading `LineBasicMaterial` — ~3 draw calls, near-zero cost, huge narrative payoff
("from drawing to delivery" — which is literally the section's copy).

---

## 3. Workstreams

### WS1 — Geometry & proportion (biggest visual win per hour)

1. **Chamfer everything.** Swap raw `BoxGeometry` for `RoundedBoxGeometry`
   (`three/examples/jsm/geometries/RoundedBoxGeometry`) with a small radius (2–4 segments). Because
   geometries are shared constants, this is a ~10-line change that upgrades every member in the scene.
2. **Re-proportion the structure** (`constants.ts`, `Building.tsx`):
   - Columns: 0.14 → ~0.45 on a 10-unit bay; slight taper is optional but not required.
   - Slabs: add a visible edge band (slightly darker fascia material on the slab rim, or just thicker slab
     at 0.22 with a 2-tone gradient).
   - Rebar starters: half the height, thinner, 4-bar cluster instead of 3 fat sticks.
3. **Fix the core monolith** (`Building.tsx`):
   - Cap core lead to ~2 floors above the topmost slab (derive core height from floor progress instead of
     an independent ramp).
   - Add a **climbing-formwork collar** at the core top (teal + dark grey ring, 2 boxes) so the leading
     edge reads as "under construction", not "grey obelisk".
   - Give the core panel joints: either 3 shallow inset grooves (cheap geometry) or a procedural line
     pattern in the shader (see WS2).
4. **Facade system.** Replace the single glass box + spandrel bands with a **procedural curtain wall**:
   keep the one envelope box, but give it a custom `onBeforeCompile` shader that draws the mullion grid
   (vertical + horizontal lines, per-floor spandrel band, slight per-window tint variation from a hash).
   One draw call, looks like a real facade. Fallback if shader work overruns: instanced mullion strips.
5. **Crane rebuild-lite** (`TowerCrane.tsx` — keep the lattice logic, fix the read):
   - Thicker chords (0.1 → 0.16), chamfered members, proper operator cab (2–3 boxes with a dark glass
     face), hook block with sheave detail, aviation beacon at the A-frame tip.
   - Scale check: the mast should read _lighter_ than the building columns, but not thinner than handrails.
6. **Working-floor dressing.** On the top 1–2 incomplete floors of each tower: perimeter **safety-screen
   panels** (thin translucent teal strips — the classic construction-site signature, in brand color) and
   1–2 material pallets. All instanced, ~4 draw calls total.

### WS2 — Materials & color

1. **Kill the pure greys.** New palette (still `MeshStandardMaterial`, colors only):
   - Concrete: warm off-whites (`#e8e4dd` / `#d6d1c8` range) instead of `#c8c8c8`/`#b8b8b8`.
   - Steel: near-black with blue undertone `#23272e`, metalness ~0.85, roughness ~0.35.
   - Keep teal `#16a8b8` strictly as _accent_ (crane jib, formwork collar, safety screens, blueprint lines).
   - Machines: desaturate the yellow slightly (`#e6a91f`), keep as the only warm accent.
2. **Tonal variation on large surfaces.** A single shared 256×256 procedural noise texture (generated once
   on a canvas at runtime — no network fetch) plugged into `roughnessMap` + a subtle `map` multiply on
   concrete materials. Kills the flat-clay look for ~50KB of GPU memory.
3. **Glass that reads as glass.** Drop `transmission` (expensive, and invisible against white). Instead:
   lower opacity + strong env reflection + the WS1 mullion shader. `MeshPhysicalMaterial` → back to
   `MeshStandardMaterial` with `transparent` — cheaper and better-looking here.
4. **Ground the model** (`Ground.tsx`): keep contact shadows, but add a **site-plan mat** — a large disc
   with a procedural/canvas texture: 2–3% grey site outline, faint access road, teal survey markers,
   radially fading to page-white at the rim. The model finally sits _on_ something without introducing a
   horizon.

### WS3 — Lighting, AO, post

1. **Ambient occlusion (desktop tier).** Spike `n8ao`'s `N8AOPostPass` in the existing vanilla
   `postprocessing` composer (`Effects.tsx`) — it's designed for exactly this setup and is maintained
   against current three. If the spike fails on three 0.184, fall back to `SSAOEffect` from
   `postprocessing` itself. Mobile tier: no SSAO — instead add cheap **baked AO cards** (dark gradient
   planes under slab edges and at building bases), which cost ~nothing and fake 70% of the effect.
2. **Shadow quality.** Tighten the directional shadow camera to the cluster bounds, `PCFSoftShadowMap`,
   evaluate drei `<SoftShadows>` (PCSS) on the high tier only.
3. **Tone mapping.** A/B `AgXToneMapping` vs ACES — AgX (built into three ≥ r160) handles bright
   white scenes with less highlight skew and reads more "editorial".
4. **Retune the rig** (`Lighting.tsx`): raise key intensity ~1.6, deepen the fill ratio so faces model
   more strongly (current render is nearly shadowless — see screenshot), warm the fog color to match the
   new paper-white (`#fdfcfa`), pull fog start in slightly so the far edge melts sooner.
5. **Bloom discipline.** Keep bloom only for the crane beacon + sun glints (raise threshold to ~1.0).

### WS4 — Choreography & camera

1. **Scroll-linked dolly** (`CameraRig.tsx` — finishing what its comment already promises):
   - Foundation phase: lower, closer hero angle looking slightly up.
   - Structure phase: slow orbital drift (~12° total) while craning up.
   - Envelope→handover: pull back and rise to the wide 3/4 reveal.
   - Implement as 3–4 keyframed positions interpolated by `smoothstep` over progress, applied through a
     damped spring (`THREE.MathUtils.damp`) so fast scrolling never snaps. Respect reduced-motion (static
     camera path already handled by the paused branch).
2. **Restage the build order** so no scroll position looks broken (the screenshot _is_ the current 40%
   state): floors chase the core closely (WS1.3), crane erects before the first tower passes 2 floors,
   machines arrive/leave with soft scale+fade rather than pop.
3. **Idle micro-motion** (only while section is in view): crane cable pendulum (±0.5°), beacon blink,
   slow crane slew ±3°. These run on the same frame loop — see WS5.2 for how this stays cheap.
4. **Entrance reveal:** on first viewport entry, the site-plan mat wipes in radially and blueprint lines
   draw on (0.8s, once). Ties into the signature moment.

### WS5 — Performance at 1M-user scale

The scene must get _cheaper_ than today while looking better. Budgets below are gates, not wishes.

1. **Instancing pass.** Today ≈ **900–1000 draw calls** (each column/beam/slab/lattice member is its own
   mesh — e.g. tower A alone is 14 floors × 13 meshes). Convert repeated members to `InstancedMesh` per
   (geometry, material) pair — columns, beams, slabs, rebar, crane lattice, safety screens:
   - Per-frame staging updates write instance matrices (scale/position per instance) instead of touching
     ~1000 `THREE.Object3D`s in JS — this also cuts main-thread cost, not just GPU.
   - Target: **< 120 draw calls desktop, < 70 mobile.**
2. **Render only when needed.** Switch `<Canvas frameloop="demand">` and `invalidate()` from the scroll
   `MotionValue` change handler + the idle-motion ticker (which runs at 30fps and _only_ while an
   `IntersectionObserver` reports the section visible). Off-screen or scroll-idle ⇒ **zero GPU work** —
   the single biggest battery/thermal win available.
3. **Lazy mount.** Keep `dynamic(..., { ssr: false })`, but additionally gate mounting on
   `IntersectionObserver` (rootMargin ~1 viewport) so users who never reach the section never download
   three.js. Render a small blurred poster `<Image>` of the final frame as the placeholder → no layout
   shift, instant perceived load.
4. **Tier ladder** (extend `useQuality.ts` — add a `mid` tier and a GPU probe: `WEBGL_debug_renderer_info`
   string + `devicePixelRatio` + `deviceMemory` heuristic):
   - **high** (desktop dGPU): AO, soft shadows, bloom, full detail, DPR ≤ 2.
   - **mid** (laptops/recent phones): no AO pass (baked cards), 1024 shadows, no bloom, DPR ≤ 1.5.
   - **low** (old/Android-mass-market): no post, no shadow map (contact shadows only), reduced machine
     fleet + no crane diagonals (flag exists), DPR 1.
   - **floor** (no WebGL / `prefers-reduced-motion` / context-loss): static poster image + the existing
     list layout. Also handle `webglcontextlost` → swap to poster, log analytics event.
5. **Adaptive degradation:** drei `<PerformanceMonitor>` — if FPS dips below target for 2s, step the tier
   down live (drop DPR first, then post, then shadows).
6. **Bundle budget:** scene chunk (three + fiber + drei imports + postprocessing) ≤ **250 KB gzip**;
   verify drei imports stay tree-shaken (import from `@react-three/drei/core/...` if needed); no new
   runtime deps except (possibly) `n8ao` (~30 KB).
7. **Memory hygiene:** keep the existing dispose paths; the new canvas-generated textures are shared
   singletons; confirm with `renderer.info` in a dev overlay (`?debug3d=1` query flag showing draw calls,
   triangles, FPS, tier).

### WS6 — QA, rollout, and guardrails

1. **Visual regression:** Playwright captures at progress 0 / 0.25 / 0.5 / 0.75 / 1 on desktop + mobile
   viewports, compared per PR. The mid-scroll frames are exactly where the current scene falls apart —
   pin them.
2. **Device matrix:** mid-range Android (Moto G class), iPhone 11/SE, low-power-mode iOS Safari,
   Windows laptop with iGPU. Target: **60fps desktop, ≥ 40fps mid-tier mobile, no thermal throttle in a
   2-minute scroll session.**
3. **Feature flag:** ship behind `NEXT_PUBLIC_SCENE_V2`; old scene remains the fallback for one release.
4. **Analytics:** emit tier selected, context-loss events, fallback-poster served — so "1M users" is a
   measured claim about who actually gets WebGL, not a guess.

---

## 4. Phasing & sequence

| Phase                                  | Contents                                                                                                       | Outcome gate                                                          |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **P0 — Instrument & guard** (do first) | Debug overlay, draw-call/FPS baseline, `frameloop="demand"`, IntersectionObserver mount+pause, poster fallback | Zero off-screen GPU work; baseline numbers recorded                   |
| **P1 — Proportion & chamfer**          | WS1.1–1.3, WS2.1 palette                                                                                       | Mid-scroll screenshot no longer embarrassing; no perf regression      |
| **P2 — Instancing**                    | WS5.1                                                                                                          | Draw calls under budget; scroll scrubbing butter-smooth on mid mobile |
| **P3 — Materials & ground**            | WS1.4 facade shader, WS2.2–2.4                                                                                 | Scene reads "architectural model" in stills                           |
| **P4 — Light & post**                  | WS3 (AO spike first — it's the risk item)                                                                      | AO on desktop tier; AgX/ACES decision made                            |
| **P5 — Choreography**                  | WS4 camera dolly, restage, signature blueprint moment, idle motion                                             | Full-scroll capture looks flagship; reduced-motion path intact        |
| **P6 — Harden & ship**                 | WS5.4–5.7 tiers, WS6 QA matrix, flag rollout                                                                   | Budgets green on device matrix; flag flipped                          |

Each phase is independently shippable; P1+P2 alone already remove ~70% of the "cartoonish" complaint.

## 5. Risks

- **`n8ao` vs three 0.184** — spike before committing (P4 starts with it); two fallbacks identified
  (SSAO from `postprocessing`, baked AO cards). AO is desirable, not load-bearing.
- **Facade shader scope creep** — timebox; instanced mullions are the escape hatch.
- **Instancing refactor breaking staging animation** — the visual-regression captures from P0 exist
  precisely to catch this; convert one building first, then roll out.
- **Old-device blowups** — the floor tier (poster) is the safety net; context-loss handler makes it
  automatic.

## 6. Non-goals

Photorealism, HDRI/GLTF assets, physics, WebGPU, user-orbitable camera (scroll stays the only input),
and any change to the section's copy/layout in `BuildingScroll.tsx` beyond the canvas itself.
