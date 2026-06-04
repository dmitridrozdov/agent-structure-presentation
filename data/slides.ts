export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  body: string;
  visual: "intro" | "split-brain" | "truth-source" | "chain" | "quality" | "originals" | "memory" | "map" | "human" | "outro";
  speakerNotes: string;
  accent: string;
}

export const slides: Slide[] = [
  {
    id: 0,
    title: "The Proper Structure of an Agentic System",
    subtitle: "8 principles that outlast any tool or model",
    body: "For the last six months I've been building nothing but agentic systems. And I've found one recurring mistake: stuff one agent with 40 instructions and hope it figures things out. AI doesn't work that way — and it's not a magic pill yet.",
    visual: "intro",
    accent: "#6EE7B7",
    speakerNotes: "Open with the core pain point — teams are over-relying on a single 'super-agent' hoping prompts alone carry the weight. Set the frame: this is about architecture, not prompting tricks. The skeleton matters more than the individual bones.",
  },
  {
    id: 1,
    title: "1. One brain is bad. Break into roles.",
    subtitle: "One agent = one narrow task",
    body: "Six simple narrow agents outperform one complex generalist. Each has a shorter context, fewer hallucinations, and errors are easier to catch. When something breaks, you immediately see which step failed — instead of digging through one huge instruction.",
    visual: "split-brain",
    accent: "#818CF8",
    speakerNotes: "Emphasise that 'narrow' is a feature, not a limitation. Short context = fewer distractions = higher accuracy. Use the analogy of a surgical team vs. a single doctor trying to do everything at once. The coordination overhead is worth it because debugging becomes trivial.",
  },
  {
    id: 2,
    title: "2. Single Source of Truth",
    subtitle: "Facts live in one place. Always.",
    body: "Price baked into five agent prompts? Change one, forget four — the system contradicts itself. One facts file holds ALL data: numbers, dates, prices, names. Every agent reads it first. Edit once, it propagates everywhere. Don't confuse it with config (CLAUDE.md = how to work; facts file = data).",
    visual: "truth-source",
    accent: "#FCD34D",
    speakerNotes: "Draw the contrast sharply: config vs facts. CLAUDE.md is operational instructions — how agents behave. The facts file is the knowledge base — what they know. Mixing them creates an unmaintainable mess. Relate to database normalization — the same principle applies.",
  },
  {
    id: 3,
    title: "3. Dependency Chains",
    subtitle: "Next step doesn't start until previous finishes",
    body: "Agents run in stages. Block two: audience analysis. Block two builds strategy on top of that. Block two doesn't even start until block one is done — there's nothing to read yet. Dependencies are always written directly into the instructions: who waits for whom. Without this, agents operate on raw data and produce incorrect results.",
    visual: "chain",
    accent: "#34D399",
    speakerNotes: "This is the orchestration layer. Think of it like CI/CD pipelines — a deploy job can't run before tests pass. Explicit dependencies prevent race conditions and ensure agents aren't hallucinating into a void. Show how this makes the system deterministic and debuggable.",
  },
  {
    id: 4,
    title: "4. Two-Layer Quality Control",
    subtitle: "An agent can't proof its own work",
    body: "An agent won't catch its own errors — it wrote them, it thinks they're fine. Layer one: self-check (agent verifies facts before submitting). Layer two: a separate reviewer agent with fresh eyes. The second layer catches what the first missed.",
    visual: "quality",
    accent: "#F472B6",
    speakerNotes: "This mirrors human editorial workflows — writer, editor, fact-checker. The key insight is that self-review is systematically biased. The reviewer agent needs a distinct prompt focused on critique, not creation. Consider making the reviewer adversarial — explicitly instructed to find flaws.",
  },
  {
    id: 5,
    title: "5. No Paraphrasing. Originals Only.",
    subtitle: "Pass the source, not the summary",
    body: "Agent retells conclusions to the next, that one to the next — meaning slowly evaporates. What comes out is nothing like what went in. Agents pass originals: exact numbers, quotes, specifics. If an agent says 'clients want cheaper' without showing where it came from — that conclusion can't be trusted. The next in chain must be able to verify.",
    visual: "originals",
    accent: "#FB923C",
    speakerNotes: "This is the telephone game problem applied to AI. Every summarization step introduces lossy compression and potential hallucination. Enforce a rule: conclusions must be accompanied by the raw evidence. This also creates an audit trail — you can trace any output back to its origin.",
  },
  {
    id: 6,
    title: "6. Memory & Decision Log",
    subtitle: "The system remembers what it learned and what you decided",
    body: "Two things get stored: insights from analysis (auto-written to memory, auto-pulled on next run) and your decisions ('remove this, add that' live in a separate log). Without this, every run starts from zero and the system asks about things you already decided 10 times over.",
    visual: "memory",
    accent: "#A78BFA",
    speakerNotes: "Distinguish between two types of memory: analytical memory (what the system discovered) vs. directive memory (what the human decided). These need separate storage so you can audit and override each independently. Also prevents the frustrating UX where you explain context repeatedly.",
  },
  {
    id: 7,
    title: "7. Dependency Map: What to Re-run",
    subtitle: "Know the blast radius of every change",
    body: "With many agents you must see the full map — who builds on whose results. Change one report early in the chain: immediately clear which five agents downstream need re-running and which twenty don't. Without this map, any small edit becomes a full system restart and a token bonfire.",
    visual: "map",
    accent: "#38BDF8",
    speakerNotes: "This is impact analysis. In software engineering it's like a dependency graph for builds. Draw it visually for your team. When you update agent A's output schema, every downstream consumer must be reviewed. The map is also a cost-control tool — unnecessary re-runs are expensive.",
  },
  {
    id: 8,
    title: "8. Humans at Critical Points",
    subtitle: "Full autonomy is a myth — and a liability",
    body: "Full autonomy is a myth and a way to get burned. A healthy system leaves checkpoints where a human reviews and confirms before moving forward.",
    visual: "human",
    accent: "#F87171",
    speakerNotes: "Human-in-the-loop isn't a weakness — it's a feature. Identify the high-stakes decision points: strategy approval, budget decisions, public-facing outputs. Automate the boring, supervise the consequential. Also: build approval flows that are fast and low-friction, otherwise humans become the bottleneck.",
  },
  {
    id: 9,
    title: "These 8 rules are timeless",
    subtitle: "Models change monthly. Architecture lives forever.",
    body: "Models will change ten times a month. Tools will become obsolete. But these 8 principles will remain. The architecture outlasts any tool everyone's talking about today.",
    visual: "outro",
    accent: "#6EE7B7",
    speakerNotes: "Land the key message: invest in architectural thinking, not tool-chasing. The companies winning with AI are the ones with solid multi-agent architecture, not the ones with the flashiest model. These principles apply equally whether you're building content pipelines, sales automation, or research systems.",
  },
];
