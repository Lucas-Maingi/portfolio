export interface Post {
  slug: string;
  title: string;
  date: string; // ISO
  readingTime: string;
  excerpt: string;
  /** Markdown body rendered on the post page. */
  body: string;
}

export const posts: Post[] = [
  {
    slug: "pandas-3-broke-my-model-serving",
    title: "A pandas 3.0 upgrade silently broke my model serving",
    date: "2026-07-03",
    readingTime: "5 min read",
    excerpt:
      "The tests passed. The container crashed. The difference was a dtype default that changed between pandas 2 and 3 — and it's exactly the class of bug that never appears in a notebook.",
    body: `
I was hardening the Docker image for **Aegis**, my churn-prediction service, when I hit one of those bugs that only exists in the gap between "works on my machine" and "works in the container I actually deploy."

## The symptom

The full test suite passed locally. But when I built a *fresh, lean* environment to verify the production image, the API's \`/predict\` endpoint crashed:

\`\`\`
ValueError: could not convert string to float: 'Yes'
\`\`\`

XGBoost was receiving a raw \`'Yes'\` string where it expected a number. Yet the exact same code, model artifact, and library versions passed the test suite minutes earlier in a different virtualenv.

## The hunt

Identical sklearn, xgboost, and numpy versions across both environments. So it wasn't those. I diffed the full package lists and found the one that mattered:

- Passing env: **pandas 2.3.3**
- Failing env: **pandas 3.0.3**

## The cause

My preprocessor mapped binary Yes/No columns to 1/0 with a guard:

\`\`\`python
elif col in df.columns and df[col].dtype == object:
    df[col] = df[col].map({"Yes": 1, "No": 0})
\`\`\`

In pandas 2, string columns have dtype \`object\`, so the guard is true and the mapping runs. **In pandas 3.0, string columns default to the new \`StringDtype\`** — which is *not* \`object\`. The guard silently evaluates false, the mapping is skipped, and raw \`'Yes'\`/\`'No'\` strings sail straight through a passthrough transformer into XGBoost.

No error. No warning. Just wrong data reaching the model — the worst kind of failure.

## The fix

Test for what I actually care about — a *non-numeric* dtype — instead of one specific dtype name:

\`\`\`python
elif not pd.api.types.is_numeric_dtype(df[col]):
    df[col] = df[col].map({"Yes": 1, "No": 0})
\`\`\`

This is correct on both pandas 2 and 3: object and string columns are non-numeric (so they map), already-encoded integer columns are numeric (so they're left alone). I fixed the same \`select_dtypes(include="object")\` footgun in the data loader, pinned pandas below 3.0 in the serving requirements for numerical reproducibility with the trained artifacts, and re-ran the full suite green on **both pandas 2.3.3 and 3.0.3**.

## The lesson

Two things I now treat as non-negotiable:

1. **Verify against the environment you deploy to, not the one you develop in.** A lean, fresh install caught a bug my comfortable dev venv hid.
2. **Guard on the property you mean, not a proxy for it.** \`dtype == object\` was never really the question; "is this column non-numeric?" was. Encoding the actual intent made the code survive a major-version upgrade for free.

This bug would never surface in a notebook run top-to-bottom. It surfaces the first time someone rebuilds your environment — which in production is always.
`.trim(),
  },
  {
    slug: "the-94-percent-that-wasnt",
    title: "The 94% that wasn't: reading data leakage in a fraud model",
    date: "2026-07-01",
    readingTime: "4 min read",
    excerpt:
      "A near-perfect score on a fraud dataset isn't a trophy — it's a warning light. Here's why I report the lower number, and what metric actually matters at scale.",
    body: `
When I first trained the fraud model for **PesaGuard** on the PaySim dataset, the XGBoost classifier returned a **ROC-AUC of ~1.0**. It would have looked fantastic on a portfolio card. I didn't use it. Here's why.

## A perfect score is a smell, not a trophy

The single most recognisable red flag in applied ML is a near-perfect metric on a hard problem. To an experienced reviewer it signals one of two things: either you've got **data leakage** (information from the future or the label sneaking into your features), or you're **inflating**. Neither is the impression you want to make.

In PaySim's case it's neither dishonest nor leaked — it's that PaySim is a **simulator**. Its fraud follows clean, separable rules (balance-draining \`TRANSFER\` → \`CASH_OUT\` chains), so a tree ensemble carves it apart almost perfectly. That says everything about the dataset and nothing about how the model would do on real, adversarial, drifting fraud.

## So I report the honest number

I led the README with **PR-AUC (0.95 for the ensemble)** instead of ROC-AUC, because for a class that's 0.116% positive, precision-recall is the metric that reflects reality — and I labelled it plainly as an upper bound on a simulator. And I wrote a "known limitations" section stating that real-world performance will be lower. Counterintuitively, **an honest PR-AUC framed with its caveats is a stronger hiring signal than a suspicious ROC-AUC of 1.0** — it shows I know what the numbers mean.

## The metric that actually scales

Model quality aside, the number that decides whether a fraud system is usable is the **false-positive rate**. Consider mobile-money scale — ~40 million transactions a day:

| False-positive rate | False alerts / day |
| :--- | :--- |
| 1% | ~400,000 |
| 0.005% | ~2,000 |

At 400,000 false alerts a day, no operations team can function and legitimate users get locked out. The entire model is tuned to hold FPR near 0.005% while keeping recall high, because at scale **that trade-off is the product** — not the headline accuracy.

## Takeaway

If a model looks too good, interrogate it before you celebrate it. And when you write it up, report the metric that maps to the decision the business actually makes. Honesty about limitations reads as competence, not weakness.
`.trim(),
  },
  {
    slug: "known-limitations-in-every-readme",
    title: "Why I put a “Known Limitations” section in every ML README",
    date: "2026-06-30",
    readingTime: "3 min read",
    excerpt:
      "The fastest way to signal senior judgment on a junior résumé is to show you know where your own work breaks.",
    body: `
Every one of my project READMEs ends with a section titled **Known Limitations & Road to Production**. It's the part I'd least want to cut, because it does more work for me than any benchmark.

## Anyone can ship a demo. Fewer can tell you where it breaks.

A live demo with a big metric says "I can make something work once." A clear-eyed account of the gap between that demo and a real deployment says "I understand what production actually demands." The second is the thing employers are trying to find out, and most portfolios never address it.

## What goes in the section

For each project I write down, honestly:

- **Data ceiling.** "These metrics come from a clean public/synthetic dataset. Real data drifts and is messier; expect lower, moving numbers."
- **What's measured vs. claimed.** "Latency was measured on one machine without concurrent load; production needs load testing and horizontal scaling."
- **What's stubbed.** "The feedback loop is logged but retraining is manual — there's no automated drift detection yet."
- **Where it wouldn't scale.** "Rate limiting is in-process and would need Redis behind multiple replicas."

## Why it works in my favour

It reframes every shortcut from a *hidden weakness a reviewer might catch* into *evidence that I already caught it*. It turns "this is just a portfolio project" — which the reviewer is thinking anyway — from a silent deduction into a demonstration of judgment. And it's honest, which means I can defend every line of it in an interview.

Confidence isn't claiming your work is production-ready. It's being precise about exactly how far from production it is, and what the road there looks like.
`.trim(),
  },
  {
    slug: "why-my-whatsapp-agent-never-invents-a-price",
    title: "Why my WhatsApp AI agent never invents a price",
    date: "2026-07-04",
    readingTime: "4 min read",
    excerpt:
      "Building Hermes, a WhatsApp commerce agent with real M-Pesa payments, the hardest design decision wasn't the LLM — it was deciding what the agent is never allowed to say.",
    body: `
Hermes is a WhatsApp AI agent that answers questions, takes orders, and collects M-Pesa payment for small businesses. The tempting version of this project lets the LLM answer anything conversationally. I built the opposite.

## The rule

Every factual claim the agent makes — a price, a stock level, store hours, a delivery policy — is retrieved from the business's own catalog and info, never generated. If the catalog doesn't cover a question, the agent says so and hands off to a human. It is not allowed to sound confident about something it doesn't actually know.

## Why this matters more than the LLM choice

A shop's WhatsApp line is the storefront. If the agent invents a price and a customer holds them to it, that's real money lost, not an amusing chatbot glitch. The failure mode of "grounded system that sometimes says 'let me check'" is annoying. The failure mode of "fluent system that confidently hallucinates a price" is a business liability. I designed for the first failure mode on purpose.

## How it's enforced architecturally, not just prompted

Prompting a model to "only use real data" is advice, not a guarantee — it can still hallucinate under pressure. So Hermes's \`lookup_knowledge\` and \`capture_order\` tools are the *only* path to a fact reaching the customer, and they're backed by a plain lookup against the business's \`Product\`/info records. If the lookup misses, the tool itself returns "I'm not sure — let me get someone from the team," and flags the conversation for human handoff. The LLM narrates; it doesn't invent.

## The same pattern shows up everywhere I build agents

This is the same principle behind the human-approval gates in my AIOps and job-search agents: the LLM proposes, but the system — not the model's confidence — decides what's allowed to become a real-world action. Grounding facts and gating actions are two versions of the same idea: an agent's freedom should end exactly where a real cost begins.
`.trim(),
  },
  {
    slug: "copilot-not-autopilot",
    title: "Copilot, not autopilot: the safety-gate pattern for AI agents",
    date: "2026-07-04",
    readingTime: "4 min read",
    excerpt:
      "Two of my agent projects — an AI ops responder and a job-application assistant — could both technically act with zero human involvement. I built neither one that way, and here's the pattern I used instead.",
    body: `
SentryBrain diagnoses server incidents and can propose the exact command to fix them. JobSentry can find a job listing, score it, draft a cover letter, and drive a browser to submit the application. Both could be built to act completely autonomously. I didn't build either one that way, and it wasn't a technical limitation — it was the correct call.

## Autonomy is not free

Auto-remediating a production incident with no human in the loop means one wrong diagnosis turns one outage into two — and the second one is self-inflicted. Auto-submitting job applications at scale means low-quality, untailored submissions going out faster than a human could ever review them, which damages the applicant's reputation with every recruiter who notices the pattern. In both cases, full autonomy doesn't just risk failure — it risks doing real, compounding damage *faster*.

## The three-layer pattern I use

Across both projects the same shape recurs:

1. **Autonomous where it's safe.** Read-only diagnostics, search, scoring, and drafting all run without asking — nothing here can hurt anything.
2. **A hard stop before anything irreversible.** Restarting a service, running a remediation script, or submitting a form to a real employer all require an explicit human approval step. No exceptions.
3. **Verification after the fact.** SentryBrain checks that a "fix" actually resolved the incident before closing it; JobSentry's board tracks real recruiter replies rather than assuming a submitted application is a success.

## Why I'd rather ship this than a flashier demo

A fully autonomous agent is a better demo. A gated one is a better *product* — because the gate is what makes it trustworthy enough for someone to actually turn on in their business, on their servers, with their job search. Anyone can build the exciting version. The judgment is in knowing where to put the brake pedal.
`.trim(),
  },
  {
    slug: "what-building-an-llm-firewall-taught-me",
    title: "What building an LLM security gateway taught me about prompt injection",
    date: "2026-07-04",
    readingTime: "3 min read",
    excerpt:
      "Reading about prompt injection and PII leakage is one thing. Building a proxy that has to actually catch it in real traffic is another — here's what changed my mind.",
    body: `
Aegis Shield is a drop-in proxy that sits between an application and an LLM provider, scanning requests going up and responses coming back down for PII leaks, prompt injection, and secret exposure. Building the scanners taught me more than reading about the threat model ever did.

## PII detection is not "just regex"

A regex that matches 16 digits catches every card-shaped number, including ones that aren't real cards. Aegis Shield's card detector runs a **Luhn checksum** on top of the pattern match — the same validation a real payment processor uses — because a naive regex alone produces enough false positives to make the tool annoying rather than useful. The lesson: a detector that "sort of works" on a demo input and one that holds up on real traffic are different amounts of engineering, not the same thing with a different regex.

## Prompt injection isn't one signature, it's a spectrum

Keyword matching ("ignore previous instructions") catches the laziest attempts and nothing else. A meaningfully harder injection doesn't use any flagged phrase at all — it just doesn't *look* like the rest of the conversation. That's why Aegis Shield pairs keyword matching with an entropy-based signal: text that's anomalously structured relative to normal input is itself a signal, independent of what words it uses. Neither signal alone is enough; together they catch more of the spectrum.

## The real lesson: a guardrail is judged on its false-positive rate, not just its catch rate

A filter that blocks 100% of attacks and 30% of legitimate requests will be disabled by week two. Every scanner in Aegis Shield was tuned with as much attention to *what it should let through* as to what it should catch — because a security layer nobody keeps turned on isn't a security layer.
`.trim(),
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
