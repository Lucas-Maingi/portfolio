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

I led the README with **PR-AUC (0.89)** instead of ROC-AUC, because for a class that's 0.116% positive, precision-recall is the metric that reflects reality. And I wrote a plain "known limitations" section stating that real-world performance will be lower. Counterintuitively, **the honest 0.89 is a stronger hiring signal than a suspicious 1.0** — it shows I know what the numbers mean.

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
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
