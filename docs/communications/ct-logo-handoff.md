# Crosstalk Lab — Logo Design Handoff

**Status:** In progress — geometry unresolved, atmosphere and color established
**Last updated:** 2026-03-05
**Reference image:** `../assets/ct-logo-reference-gemini-v3.png`
**See also:** ZK `ct-color-system-philosophy.md` for the philosophical rationale behind all design decisions

---

## Summary

Three generative passes with Gemini Image Generation produced a strong atmospheric and color reference but consistently failed to render the correct geometry. This document provides everything needed to continue the work — whether with a different AI image tool, Adobe tools, or a human designer.

The reference image should be treated as a **color, glow, and atmosphere guide only**. The geometry must be corrected in the next pass.

---

## The Shape

A **regular tetrahedron** — the simplest Platonic solid.

- Exactly **4 vertices**
- Exactly **6 edges**
- Exactly **4 faces**, each an equilateral triangle
- All edges equal length

**This is NOT a square pyramid.** A square pyramid has 5 vertices, 8 edges, and a rectangular base. Gemini generated a square pyramid on all three attempts despite explicit correction. Do not repeat this prompt path with Gemini.

### Perspective

Orient with one vertex at the top (apex), triangular base at the bottom, rotated approximately 15–20° off-axis so all six edges are simultaneously visible. No edge should be hidden behind another face.

### Edge connectivity

```
Apex (white) connects to: green, blue, amber  [3 lateral edges]
Green connects to: blue, amber                [2 base edges]
Blue connects to: amber                       [1 base edge]
                                    Total: 6 edges ✓
```

---

## Vertex Color Assignments

| Position | Role | Cool color (at vertex) | Warm color (at edge midpoint) |
|----------|------|------------------------|-------------------------------|
| Apex (top) | User | `#d8dfe8` | `#e8e0d4` |
| Base — left | ChatGPT | `#6bcf8e` | `#a0e8b0` |
| Base — right | Gemini | `#7ba4f4` | `#a0c0f8` |
| Base — rear | Claude | `#d4a574` | `#e8c090` |

---

## Edge Treatment

Each edge carries two simultaneous gradients:

1. **Hue gradient** — transitions between the cool colors of its two endpoint vertices
2. **Temperature gradient** — shifts from cool at each vertex toward warm at the midpoint

The warm midpoint is the generative zone between positions — the heat produced by epistemic friction between perspectives. This is not decorative; it is the conceptual core of the design. See `ct-color-system-philosophy.md`.

---

## Glow

- Each edge has a soft outer glow in its warm midpoint color
- Quality: **bioluminescent, not neon** — diffuse, organic, subtle
- The reference image captures this quality well — preserve it

---

## Vertices

- Small solid dot at each vertex
- Dot color: the cool vertex color for that position
- The reference image captures the dot treatment well — preserve it

---

## Canvas and Background

- **Size:** 500×500px
- **Background:** `#0a0e17` — deep navy, near-black; matches the CT application background
- **Faces:** unfilled — wireframe only; the tetrahedron is transparent
- No labels, no text, no additional elements

---

## What Gemini Got Right (Preserve These)

- Background color match — very close to `#0a0e17`
- Glow quality — bioluminescent feel, soft and diffuse
- Color graduation along edges — hue transitions between vertex colors visible and correct
- Vertex dot treatment — small, clean, correctly colored
- White apex placement — correct from second pass onward
- Overall atmosphere — floating in deep space, luminous, precise

---

## What Needs Correction

- **Geometry** — square pyramid (5 vertices, 8 edges) must become regular tetrahedron (4 vertices, 6 edges)
- **Base** — triangular, not rectangular; three corners, not four
- **Extra green vertex** — Gemini consistently split the green vertex into two; there is exactly one green vertex

---

## Prompt for a Different AI Image Tool

Use the reference image (`ct-logo-reference-gemini-v3.png`) as a style reference and apply the following specification:

---

*Using the provided reference image for color, glow, and atmosphere only — the geometry in the reference is incorrect and must not be reproduced.*

Create a wireframe tetrahedron logo at 500×500px on a background of `#0a0e17` (deep navy, near-black).

A regular tetrahedron has exactly 4 vertices, 6 edges, and 4 equilateral triangular faces. The base is a triangle — three corners, three edges. Three lateral edges rise from the base triangle to a single apex. This is NOT a square pyramid; do not render a rectangular base.

**Vertices (exactly 4, one of each color):**
- Apex (top): cool blue-white `#d8dfe8`
- Base left: medium green `#6bcf8e`
- Base right: periwinkle blue `#7ba4f4`
- Base rear: warm amber `#d4a574`

**Edges (exactly 6):**
Each edge is a gradient between its two endpoint vertex colors, shifting from cool at the vertices to warm at the midpoint. Warm midpoint colors: white edge midpoints `#e8e0d4`, green edge midpoints `#a0e8b0`, blue edge midpoints `#a0c0f8`, amber edge midpoints `#e8c090`.

Each edge has a soft outer glow in its warm midpoint color — bioluminescent, not neon.

Small solid vertex dots in each vertex's cool color. Faces unfilled. No labels or text.

Perspective: elevated slightly above the base edge, rotated 15–20° off-axis, all six edges simultaneously visible.

---

## Notes for a Human Designer (Illustrator Workflow)

1. **Draw the wireframe first** — construct a regular tetrahedron in perspective in Illustrator using the pen tool or 3D tools; get the geometry exact before applying any color
2. **Apply gradient strokes** — Illustrator supports gradient strokes natively; apply the cool-to-warm-to-cool gradient along each edge using the vertex colors as endpoints and the warm midpoint colors as midpoint stops
3. **Add glow as a layer effect** — duplicate each edge path, apply a Gaussian blur in the warm midpoint color, set to Screen blending mode; adjust opacity for the bioluminescent quality shown in the reference image
4. **Vertex dots** — small circles at each vertex, filled with the cool vertex color, same glow treatment
5. **Reference image** — use `ct-logo-reference-gemini-v3.png` throughout as the color and atmosphere target; the glow quality in particular is worth matching closely

---

## AI Generation History

| Pass | Tool | Prompt focus | Result |
|------|------|-------------|--------|
| v1 | Gemini | Full initial spec | Square pyramid; amber apex; color and atmosphere excellent |
| v2 | Gemini | Geometry correction; white to apex | Square pyramid persists; white apex correct; color excellent |
| v3 | Gemini | Explicit edge/vertex counts; per-color vertex constraints | Square pyramid unchanged; effectively identical to v2 |

**Conclusion:** Gemini's image generation has a strong prior toward square pyramid for any "pyramid + apex" concept that overrides geometric specification. Further iteration with Gemini is not recommended. Use the v3 output as a reference image for the next tool or for a human designer.
