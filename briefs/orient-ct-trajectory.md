# Crosstalk Lab (CT) — Design Trajectory Brief

## Origin

CT emerged from the observation that single-model AI interaction has structural limitations that cannot be resolved through prompting. Sycophancy — the tendency of a model to converge toward a user's evident preferences — is not a behavioral flaw to be corrected; it is a geometric property of one-to-one conversation. No instruction to "be more critical" fully escapes it because the social pressure toward agreement is built into the interaction structure. Hallucination is similarly structural: a single model has no external check on its own outputs within a session.

CT's approach is architectural rather than behavioral. It does not ask models to be less sycophantic or more accurate. It changes the interaction geometry so that those attractors have less room to operate — multiple simultaneous perspectives, no single social pressure point, model-to-model evaluation that removes the user's ego investment from the evaluative loop.

## Interaction Geometry

CT treats conversation structure as a geometric property. Different configurations of participants, roles, and routing rules produce different epistemic shapes — and those shapes determine what kinds of thinking are possible within them.

The current implementation sits at what CT calls 2D+: three models responding to the same conductor, with directed routing between them. The conductor shapes participation from outside the structure.

The design trajectory moves toward 3D: the human conductor enters the structure as a fourth vertex rather than an external director. This is not simply "more models" — it is a dimensional expansion in which the human's perspective becomes structurally constitutive rather than merely directive.

## Interaction Preset System

CT is developing a layered preset system for configuring the epistemic shape of a session before it begins:

**Tetras** — named four-role configurations assigning distinct epistemic functions to each of the three AI models, with the human conductor as the fourth vertex. A Tetra specifies what each participant does and what kind of thinking the session is structured to produce.

**Hedras** — named facing configurations assigning each model an epistemic orientation (a position, perspective, or stance) toward the object of inquiry. Composable with Tetras: a model can simultaneously hold a role and a facing.

**Heptas** — seven-participant configurations; design still in early development. The geometric extension beyond the tetrahedron toward more complex interaction solids.

These presets are not templates for conversation topics. They are configurations of the interaction geometry itself — who is at each vertex, what they are doing, and how they are oriented toward the inquiry.

## What Is Not Settled

The preset system is under active development. The relationship between geometric complexity and epistemic value is an open question — more participants and more structure do not automatically produce better thinking. The conditions under which added dimensionality helps versus introduces noise are not yet well understood.
