export interface CaseStudy {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  tech: string[];
  metric: string;
  metricLabel: string;
  liveUrl?: string;
  githubUrl: string;
  /** Markdown body rendered on the case-study page. */
  body: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "argus",
    name: "Argus",
    tagline: "Eval, tracing & regression-gate toolkit for LLM applications.",
    category: "AI Tooling / Open Source",
    tech: ["Python", "Click", "SQLite", "Streamlit", "GitHub Actions", "Docker"],
    liveUrl: "https://huggingface.co/spaces/lucas-maingi/argus-eval",
    githubUrl: "https://github.com/Lucas-Maingi/argus",
    metric: "CI-gated",
    metricLabel: "Quality Regressions",
    body: `
## The problem

Every team shipping an LLM feature eventually hits the same wall: *did this prompt or model change make things better or worse?* A demo that looks good once tells you nothing about whether your last edit quietly broke a case you weren't watching. The 2026 hiring signal is loud on this - teams building AI products are bottlenecked on **evaluation and observability**, not on prompting. Argus is my answer.

## What I built

Argus is a small, self-hostable toolkit that does three things, usable together or independently:

- **Eval suites** - test cases defined in YAML, scored with pluggable scorers (exact match, substring with partial credit, regex, or an LLM-as-judge), run against *any* Python callable.
- **A regression gate** - compares a run against a stored baseline and exits non-zero if quality drops beyond a tolerance you set, reporting exactly which cases newly regressed. This is the piece that turns "we ran some evals" into a CI check.
- **Tracing** - a \`@traced\` decorator recording latency, input/output, and optional token/cost, persisted to SQLite and browsable in a Streamlit dashboard.

Deliberately **zero dependency on any provider SDK** - Argus scores and traces any callable that takes a string and returns a string, so it works the same whether that's Claude, OpenAI, a local model, or a mock.

## The part I'm proudest of: the CI dogfoods itself

The GitHub Actions pipeline doesn't just run unit tests - it runs Argus against its own example suite, saves a baseline, then runs a **deliberately regressed** version and asserts the gate catches it. The shell logic is inverted so that the gate *working correctly* is what keeps CI green. The badge isn't proof the code compiles; it's proof the core promise - "this will catch a real quality regression" - actually holds on every push.

## Built like production tooling, found real bugs like it

48 tests (no network or API keys required), ruff-linted, Dockerised with a health-checked image, and shipped as a proper \`pip\`-installable package with a console entry point. Pushing it commit-by-commit through CI surfaced exactly the class of bug that only appears outside a notebook:

- The installed \`argus\` command couldn't import a user's own \`--target\` module because the console-script entry point (unlike \`python -m\`) doesn't put the working directory on \`sys.path\` - a genuine usability bug real users would hit right after \`pip install\`.
- The CLI crashed on Windows' legacy cp1252 console because I'd used Unicode symbols in output - so all terminal output is now plain ASCII.

Each was fixed in its own commit with failing-then-passing CI - the honest trail of iterative development, not one polished drop.

## What I'd do next

Add async/batched eval runs for large suites, a Postgres store option for team use, and first-class adapters for the common provider SDKs so the "wrap your callable" step is optional.
`.trim(),
  },
  {
    slug: "hermes",
    name: "Hermes",
    tagline: "A WhatsApp AI commerce agent for African SMEs, with real M-Pesa payment collection.",
    category: "AI Agents / Fintech",
    tech: ["Python", "FastAPI", "M-Pesa Daraja", "WhatsApp Cloud API", "LLM tools", "Docker"],
    liveUrl: "https://github.com/Lucas-Maingi/hermes",
    githubUrl: "https://github.com/Lucas-Maingi/hermes",
    metric: "Order → Pay → Confirm",
    metricLabel: "End-to-end, no human",
    body: `
## The problem

In Kenya and much of Africa, **WhatsApp is the storefront and M-Pesa is the checkout.** A shop owner spends hours a day answering the same questions ("do you have X? how much? where are you?"), taking orders by hand, and chasing payments - and loses sales entirely after hours. Existing chatbots are Western, don't speak Swahili/Sheng naturally, and don't touch M-Pesa.

## What I built

Hermes is an AI agent that runs a business's WhatsApp line end to end. In one bilingual conversation it answers FAQs grounded in the shop's own catalog (so it never invents a price), builds an order conversationally, triggers an **M-Pesa STK-push** for payment, confirms when paid, and hands off to a human the moment it's unsure. The owner gets a dashboard showing deflection rate and revenue collected - value stated in shillings.

## Why it's a real product, not a demo

This was the bar I held myself to. The integrations are the *real* ones:

- The actual **Meta WhatsApp Cloud API** - webhook verification handshake, inbound-message parsing, and outbound sending via the Graph API.
- The actual **M-Pesa Daraja** flow - OAuth token, STK-push \`processrequest\`, status query, and callback parsing, against sandbox or production.
- A **provider-agnostic LLM** layer running on Groq's free tier or OpenAI by config.

A business supplies their credentials and Hermes serves real customers over their real WhatsApp line and collects real money. Faithful simulators for M-Pesa and the LLM sit behind the same interfaces, so the entire flow is testable and demoable with zero accounts - which is exactly how the 83-test suite and the live demo run.

## Engineering

Built milestone by milestone (8 milestones, each its own commit + CI run): domain models, a tool-calling agent orchestrator, five grounded tools (knowledge, order capture, STK push, payment check, human handoff), a multi-tenant catalog, SQLite persistence with deflection/revenue metrics, a FastAPI surface (\`/webhook\`, \`/mpesa/callback\`, \`/chat\`), and a Streamlit chat-simulator + owner dashboard. It understands English and Swahili/Sheng because the market does. CI runs lint + 83 tests + a Docker build/boot on every push.

## What's left to go live

Deliberately, only the business realities I can't write in code: M-Pesa production credentials (a registered business + Safaricom Go-Live), a verified WhatsApp number, and always-on hosting. The README states this line explicitly.
`.trim(),
  },
  {
    slug: "the-watcher",
    name: "The Watcher",
    tagline: "Architectural security intelligence — collapses scanner alert noise into the few root causes actually generating it.",
    category: "AI Reasoning / Security",
    tech: ["Python", "NetworkX", "FastAPI", "React", "MCP", "LLM reasoning"],
    liveUrl: "https://github.com/Lucas-Maingi/the-watcher",
    githubUrl: "https://github.com/Lucas-Maingi/the-watcher",
    metric: "56 → 6",
    metricLabel: "Findings to root causes",
    body: `
## The problem

Security scanners are firehoses. A single over-permissioned IAM policy copy-pasted across 40 services produces 40+ separate findings — and every tool shows you the 40, none show you the one. That's alert fatigue: the real, expensive pain isn't a shortage of findings, it's that the handful of *architectural* root causes generating them are buried in the noise.

## What I built

The Watcher builds a **property graph** of a stack — repos, CI pipelines, IAM roles, buckets, security groups, and the trust relationships between them — then reasons over it to find the root causes. On the built-in demo company, **56 scanner-style findings collapse to 6 root causes**, each with a reasoning trace, a blast-radius estimate, and a fix.

## The design decision that makes it work

Detectors don't just flag a resource — they record **which graph node structurally causes each signal**, plus the exact traversal as a reasoning trace. Clustering then becomes trivial: signals sharing a root node are symptoms of the same disease. Critically, **the LLM only writes the prose narrative — it cannot add, remove, or re-score a single finding.** Detection stays deterministic, reproducible, and auditable; explanation gets to be human. Without an API key you get honest offline templates and everything else works identically.

Blast radius is *exact* where the graph can answer it (which services, which resources) and *banded* where it can't (effort in hours/days/weeks — a precise number for a cross-team IAM migration would be fiction). That honesty about what's knowable is the whole point.

## For coding agents

The reasoning engine is exposed as four **MCP tools**, so a coding agent working in a file can ask \`get_context_for("services/payments/handler.py")\` and get the architectural root causes touching that service — the shared IAM template it inherits, the CI key its deploys use — not lint output.

## Engineering

Python backend (a \`watcher\` package: graph store, deterministic detectors, clustering engine, blast-radius, LLM/template narrative) + a React/Vite dashboard. Read-only GitHub and AWS connectors (the minimum IAM policy is documented — using \`ReadOnlyAccess\` for a tool like this would be ironic). 16 tests including one that proves every reasoning trace only references nodes that actually exist. CI runs lint + tests + a demo smoke-test on every push. The README's "honest limitations" section names exactly what it does *not* cover yet.
`.trim(),
  },
  {
    slug: "pesaguard",
    name: "PesaGuard",
    tagline: "Real-time mobile-money fraud detection with explainable alerts.",
    category: "Machine Learning + Data Engineering",
    tech: ["Python", "XGBoost", "Isolation Forest", "FastAPI", "Streamlit", "Docker"],
    metric: "0.95",
    metricLabel: "PR-AUC on PaySim",
    liveUrl: "https://github.com/Lucas-Maingi/PesaGuard",
    githubUrl: "https://github.com/Lucas-Maingi/PesaGuard",
    body: `
## The problem

Mobile money (M-Pesa, MTN MoMo, Airtel Money) moves the daily economy across much of Africa — and fraud rides on the same rails. A compromised account is drained with a \`TRANSFER\` to a mule account followed by an immediate agent \`CASH_OUT\`. The window to stop it is seconds, so a fraud system has to score a transaction *before it settles* and hand a human analyst a reason they can act on.

## What I built

PesaGuard is a three-tier system: a **FastAPI** scoring service, a hybrid ML ensemble, and a **Streamlit** analyst console.

- **Hybrid ensemble.** A supervised **XGBoost** classifier (catching known fraud patterns) is blended with an unsupervised **Isolation Forest** (catching novel anomalies): \`score = 0.7 × calibrated_xgb + 0.3 × anomaly\`.
- **Real-time feature engineering.** Each incoming transaction is enriched with the sender's recent velocity, amount deviation (z-score vs their history), and balance-drain ratio — computed on the fly from the serving database.
- **Explainability per alert.** Every score ships with its top SHAP drivers translated into plain English ("amount is 100% of balance", "3 transactions in the last hour"), so an analyst isn't staring at a black box.

## The engineering decisions that mattered

**I refused to report the impressive-but-dishonest number.** On the PaySim dataset, tree ensembles hit a near-perfect ROC-AUC of ~1.0. That is a property of a *simulator* with cleanly separable fraud — not evidence of production quality. Reporting it would signal to any experienced reviewer either that I don't recognise data leakage or that I'm inflating. So I led with **PR-AUC — 0.95 for the final ensemble** — the right metric for a 0.116%-positive class, and wrote a "known limitations" section stating plainly that these numbers are an upper bound and real-world scores will be lower.

**False-positive rate is the metric that actually scales.** At 40M transactions/day, a 1% false-positive rate means 400,000 false alerts — an alert queue no team can work. The whole model is tuned to keep FPR near 0.005% while holding high recall, because at mobile-money scale that trade-off *is* the product.

## Making it production-shaped

- **Dockerised** API + dashboard with a lean serving image; \`libgomp1\` installed explicitly for XGBoost's OpenMP runtime.
- **36-test pytest suite** covering the feature pipeline, ensemble logic, and every API route.
- **GitHub Actions CI** running lint, tests, and a container smoke test that boots the image and polls \`/health\`.
- An **analyst feedback endpoint** (\`POST /feedback\`) so labels can flow back for monitored retraining.

## What I'd do next

Load-test the scoring path under concurrency (Locust), move velocity features to a proper feature store sourced from the operator's core ledger, and add automated drift detection to trigger retraining.
`.trim(),
  },
  {
    slug: "aegis",
    name: "Aegis Churn Analytics",
    tagline: "Churn prediction that tells a retention team who to save — and why.",
    category: "Machine Learning",
    tech: ["Python", "XGBoost", "SHAP", "FastAPI", "Streamlit", "Docker"],
    metric: "0.81",
    metricLabel: "Churn Recall (Telco)",
    liveUrl: "https://github.com/Lucas-Maingi/aegis-churn-analytics",
    githubUrl: "https://github.com/Lucas-Maingi/aegis-churn-analytics",
    body: `
## The problem

Acquiring a SaaS customer costs far more than keeping one, yet churn is usually noticed *after* the cancel button. A churn model's value isn't its accuracy score — it's handing a retention team a ranked list of at-risk accounts early enough to act, each with a reason attached.

## What I built

Aegis is a **FastAPI** prediction service plus a **Streamlit** dashboard, built around the concerns that separate a notebook from a product.

- **Tuned XGBoost** selected via randomized search + 5-fold CV, benchmarked against LightGBM and logistic-regression baselines, tracked in MLflow.
- **SHAP explanations** returned with every prediction — the top-3 drivers in plain English so a success manager knows whether to offer a discount, fix a support issue, or push an annual contract.
- **Product-grade API:** \`X-API-Key\` auth on every route, strict Pydantic validation (bad category or negative tenure → structured \`422\`), sliding-window rate limiting, and non-blocking Supabase logging via background tasks.

## Honest metrics, and why recall is favoured

On the held-out IBM Telco split: **ROC-AUC 0.847, churn-class recall 0.81, precision 0.52.** That precision is a deliberate choice — the cost of a *missed* churner (lost lifetime revenue) dwarfs the cost of a *false alarm* (a retention email to a happy customer), so the threshold is tuned toward recall. ~0.84 AUC is near the practical ceiling widely reported on Telco; I say so rather than dressing it up.

## The bug I'm proudest of catching

While making the serving image lean, I built a fresh environment that happened to pull **pandas 3.0**. Tests passed on my dev machine (pandas 2.3) but the container's \`/predict\` crashed with \`could not convert string to float: 'Yes'\`.

The cause: pandas 3.0 infers string columns as the new \`StringDtype\`, not \`object\`. My binary Yes/No→1/0 encoder was guarded by \`dtype == object\`, so on pandas 3 the mapping silently no-op'd and raw \`'Yes'\` strings flowed straight into XGBoost. I fixed the guard to test for a *non-numeric* dtype (robust across pandas 2 and 3), fixed the same footgun in the data loader, pinned pandas for reproducible serving, and verified the full suite on **both pandas 2.3.3 and 3.0.3**. I also decoupled the serving path from training-only dependencies (mlflow, lightgbm) that were being imported transitively and bloating/breaking the image.

That's the kind of failure that never shows up in a notebook and always shows up in production — and it's exactly why I test against the environment I deploy to.

## Making it production-shaped

Dockerised serving image, GitHub Actions CI (lint + coverage + container health smoke test), and an explicit "known limitations" section covering dataset drift, in-process rate limiting, and per-request SHAP cost.
`.trim(),
  },
  {
    slug: "aletheia",
    name: "Aletheia",
    tagline: "Agentic, defensive OSINT — know your own exposure before an attacker does.",
    category: "Full Stack + AI Engineering",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "LLMs"],
    liveUrl: "https://www.aletheia.software",
    githubUrl: "https://github.com/Lucas-Maingi/Aletheia",
    metric: "29",
    metricLabel: "OSINT Connectors",
    body: `
## The problem

Security and risk teams keep asking questions that are slow to research by hand: *What of ours is already exposed in a breach? Is someone impersonating our brand? Who exactly are we about to do business with?* The raw data is public — it's the collection, correlation, and synthesis that eats hours.

## What I built

Aletheia is a **Next.js + TypeScript** application (PostgreSQL via Prisma) that runs OSINT investigations as **automated agentic workflows** across pluggable connectors, then uses an LLM to synthesise the raw findings into a structured, cited report.

- **Modular connector engine.** Each source is an isolated, typed connector returning a normalised result and registered in a central registry, so an investigation fans out across sources in parallel. Connectors favour free, key-optional public APIs — breach intelligence, infrastructure/attack-surface, sanctions screening, historical (Wayback) footprint, knowledge-graph enrichment.
- **Case management.** Investigations persist as cases, so findings can be reviewed, shared, and re-run over time.
- **LLM synthesis.** Instead of dumping raw hits, an LLM correlates them into a readable narrative with citations back to each source.

## A deliberate repositioning

Aletheia started life framed around person-tracking — the kind of capability that reads as surveillance. I rewrote its positioning around **authorized, defensive use**: attack-surface discovery, breach-exposure monitoring, brand-abuse detection, and consent-based due diligence, with an explicit *Responsible Use* policy. Same engine, legitimate market, and none of the legal or hiring-optics liability. It's a reminder that framing and ethics are part of the engineering, not an afterthought.

## Status

Aletheia is the most ambitious of my projects and remains in active development — the connector engine and case management are working, with the synthesis and reporting layers being expanded.
`.trim(),
  },
  {
    slug: "job-sentry",
    name: "JobSentry",
    tagline: "A semi-autonomous AI copilot for the job search — with a human in the loop.",
    category: "AI Agents / Automation",
    tech: ["Python", "FastAPI", "Playwright", "Streamlit", "IMAP", "Docker"],
    liveUrl: "https://github.com/Lucas-Maingi/job-sentry",
    githubUrl: "https://github.com/Lucas-Maingi/job-sentry",
    metric: "Search → Apply",
    metricLabel: "Human-in-the-loop",
    body: `
## The problem

Job hunting is a repetitive pipeline: search listings, judge relevance, tailor a cover letter, fill the same fields into yet another form, then track who replied. It's hours of low-value work that's easy to do badly and hard to do consistently.

## What I built

JobSentry automates the pipeline while keeping a human in control. It discovers roles via search APIs, **scores each against your resume** (flagging weak matches below a threshold), drafts a tailored cover letter and application answers, and presents everything on a **Streamlit Kanban board for review before anything is sent**. On approval, Playwright fills the application form; IMAP monitoring then watches for recruiter replies and moves cards to Interview / Rejected / Offer automatically.

## The design decision that matters: safety over full autonomy

The tempting version of this tool auto-submits hundreds of applications. That's exactly what I *didn't* build. Fully-automated mass-applying produces low-quality submissions, trips bot detection, and can violate site terms — it hurts more than it helps. JobSentry is deliberately a **copilot**: it does the tedious 90% (find, score, draft, pre-fill) and stops at the point where human judgment matters (final review and submit). The README documents these "safety protocol layers" as a first-class design choice, not an afterthought.

## Engineering

A FastAPI backend orchestrates search and drafting; a Streamlit board is the human-review surface; Playwright handles browser automation; IMAP closes the loop on responses. Containerized with Docker Compose, with a pytest suite and green CI.
`.trim(),
  },
  {
    slug: "sentry-brain",
    name: "SentryBrain",
    tagline: "AIOps: LLM-driven server monitoring and auto-remediation, gated by human approval.",
    category: "AI Agents / DevOps",
    tech: ["Python", "FastAPI", "psutil", "SQLite", "LLM diagnosis", "Docker"],
    liveUrl: "https://github.com/Lucas-Maingi/sentry-brain",
    githubUrl: "https://github.com/Lucas-Maingi/sentry-brain",
    metric: "Detect → Fix",
    metricLabel: "With human approval",
    body: `
## The problem

On-call is exhausting because the same incidents recur: a process OOMs, a disk fills, a service dies. Diagnosing and fixing them is often mechanical — but doing it at 3am, correctly, under pressure, is not.

## What I built

SentryBrain is a three-tier AIOps system. A lightweight **Sentry Agent** runs on target hosts, streaming metrics (CPU, RAM, disk) and logs. A FastAPI **Central Brain** ingests the telemetry, detects anomalies, and uses an LLM to diagnose the root cause and propose a fix. A Streamlit dashboard (plus Discord alerts) puts an operator in control. The loop is: monitor → diagnose → alert → **approve** → execute → verify.

## The safety model is the product

Auto-remediation that runs destructive commands unsupervised is a great way to turn one outage into two. So SentryBrain enforces three escalating layers: **diagnostic** (read-only) commands run automatically; **remediation** (destructive) commands require explicit human approval; and every fix is **objectively verified** afterward before the incident is closed. The LLM proposes; a human disposes; the system checks its own work.

## Engineering

FastAPI ingestion + diagnosis, SQLite incident store, a Streamlit control plane, and Discord notifications, all containerized. pytest suite and green CI. It demonstrates the pattern enterprises actually want from "agentic ops": autonomy for the safe parts, hard gates on the dangerous ones.
`.trim(),
  },
  {
    slug: "aegis-shield",
    name: "Aegis Shield",
    tagline: "A drop-in security gateway that sits between your app and any LLM provider.",
    category: "LLM Security / Infrastructure",
    tech: ["Python", "FastAPI", "SQLite", "Streamlit", "Docker"],
    liveUrl: "https://github.com/Lucas-Maingi/aegis-shield",
    githubUrl: "https://github.com/Lucas-Maingi/aegis-shield",
    metric: "1-line",
    metricLabel: "Drop-in LLM firewall",
    body: `
## The problem

Every company shipping an LLM feature has the same unguarded seam: raw user input goes up to a provider, and raw model output comes back down. That's where PII leaks out, prompt injections sneak in, and API keys or infrastructure details escape in responses — usually with no inspection at all.

## What I built

Aegis Shield is a **proxy that sits between your application and the LLM provider** (OpenAI, Anthropic, others) and scans traffic both directions. Inbound: PII detection (emails, SSNs, card numbers with Luhn validation) and multi-signal prompt-injection detection (keyword + entropy). Outbound: filters for API-key and infrastructure leakage. It's a **drop-in** — you override one \`base_url\` and it's in the path, OpenAI-API-compatible. Exact-match response caching gives sub-10ms returns on repeats, and per-key token-bucket rate limiting protects spend. A Streamlit dashboard shows real-time security analytics.

## Why it matters

LLM security / guardrails is one of the fastest-growing concerns in production AI, and most teams have nothing at this layer. Aegis Shield is the kind of infrastructure component that's immediately legible to a security-conscious engineering team: a clear threat model, concrete allowed/blocked examples, and a deployment story that's one config line.

## Engineering

A FastAPI proxy with layered scanners, SQLite audit + cache store, Docker Compose deployment, a pytest suite, and green CI. Built to be understood and trusted, which for a security tool is the whole point.
`.trim(),
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
