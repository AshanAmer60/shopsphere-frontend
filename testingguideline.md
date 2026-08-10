You set up **Vitest** (test runner built on Vite). Resume-wise, say **Vitest** for testing; **Vite** only if you also use it to build/serve an app. Below is a path from beginner → portfolio-ready, using your ShopSphere products tests as the home base.

---

## Clarify the names (so you don’t mislabel on a resume)

| Tool | What it is |
|---|---|
| **Vite** | Fast app bundler/dev server (often instead of Create React App) |
| **Vitest** | Unit/component test runner that uses Vite under the hood |

What you implemented in ShopSphere is **Vitest + Testing Library**. Put that on the resume.

---

## Phase 0 — Mindset (1 day)

Goal: know *why* you’re testing.

1. A test is a small script that:
   - sets up conditions
   - runs your code
   - asserts an expected result
2. You’re not testing “does the site look pretty?” — you’re testing behavior:
   - “API returns products → names show up”
   - “user types cotton → Leather Bag hides”
3. Re-read your own `page.test.tsx` and narrate it out loud. If you can explain it, you understand the basics.

**Resume signal later:** “Wrote component tests for product listing/search with Vitest and Testing Library.”

---

## Phase 1 — Vitest basics without React (2–3 days)

Goal: get comfortable with Vitest alone.

Practice in a tiny file like `math.test.ts`:

1. `describe` — group related tests  
2. `it` / `test` — one behavior  
3. `expect(...).toBe(...)` — assertion  
4. `beforeEach` / `afterEach` — setup/cleanup  
5. Run with `npm test` (watch) and `npm run test:run` (once)

Learn these matchers next:

- `toBe`, `toEqual`
- `toContain`
- `toThrow`
- `toBeTruthy` / `toBeFalsy`

**Checkpoint:** write 5–10 pure function tests (filter, format price, discount calc). No React yet.

---

## Phase 2 — Mocking (critical for real apps) (2–3 days)

Goal: control dependencies.

In your project you already do this:

```ts
vi.mock('axios', () => ({ default: { get: vi.fn() } }))
```

Practice:

1. `vi.fn()` — spy/fake function  
2. `mockResolvedValue` / `mockRejectedValue` — success vs error  
3. Assert a function was called: `expect(axios.get).toHaveBeenCalledWith(...)`  
4. Reset mocks between tests (`beforeEach`)

**Exercises on ShopSphere:**

- Test: API fails → page doesn’t crash (or shows error, if you add UI)
- Test: `axios.get` was called with the products URL
- Test: empty `items: []` → empty grid / no product names

**Checkpoint:** you can explain *why* we mock axios (no real network, fast, deterministic).

---

## Phase 3 — React Testing Library (your current level+) (3–5 days)

Goal: test components the way users use them.

Core loop:

1. `render(<Component />)`
2. Query the screen (`getBy…`, `findBy…`, `queryBy…`)
3. Interact (`userEvent.click`, `userEvent.type`)
4. Assert (`toBeInTheDocument`, etc.)

Learn query priority (RTL recommends this order):

1. Role (`getByRole('button', { name: /…/i })`) — best  
2. Label text  
3. Placeholder / text  
4. Test id — last resort  

Learn async:

- `findBy*` — waits for element  
- `waitFor` — waits for assertion  
- Don’t use arbitrary `setTimeout` unless you must  

**ShopSphere practice tests to add yourself:**

1. Renders heading “What we have for you”  
2. Search with no matches → both products gone  
3. Clearing search brings products back  
4. Discounted product shows sale price (extend mock data)  
5. Missing `_id` warning gone / keys stable  

Also keep: cleanup after each test (you already fixed this).

**Checkpoint:** you choose queries intentionally and never “test implementation details” (internal state variables) unless necessary.

---

## Phase 4 — Make it project-real (1 week)

Goal: coverage that a hiring manager respects.

Expand beyond one page:

1. Auth form validation (invalid email, required fields)  
2. Protected route / redirect behavior (if you have it)  
3. Cart add/remove/quantity (great for portfolio demos)  
4. Error and loading states  
5. One shared helper module fully unit-tested (price, stock text, filters)

Organize:

```text
component.tsx
component.test.tsx   // next to the file (what you have) is fine
```

Optional later:

- `test:run` in CI (GitHub Actions) so PRs fail on broken tests  
- Coverage: `vitest --coverage` and aim for meaningful paths, not 100% vanity

**Portfolio artifact:** “ShopSphere — Vitest suite covering product fetch, search filtering, and [cart/auth] flows.”

---

## Phase 5 — Resume / interview readiness

### What to put on a resume (honest + strong)

Good:

> Frontend testing with **Vitest** and **React Testing Library**; component tests for API-driven product listing, search filtering, and mocked HTTP with `vi.mock`.

Also fine if true:

> Configured Vitest (jsdom, setup files, path aliases) in a Next.js app.

Avoid overselling:

- Don’t say “E2E testing” for Vitest component tests  
- Don’t say “Vite expert” unless you also built apps with Vite as the bundler  

### How to talk about it in interviews (30-second version)

> “I set up Vitest in ShopSphere. Components fetch with axios, so I mock axios, render the page, wait for products, then simulate search with user-event and assert the filtered UI. I also learned cleanup matters because leftover DOM breaks getBy queries.”

### Portfolio checklist

- [ ] 8–15 solid tests across 2–3 features  
- [ ] At least one success + one failure/empty path  
- [ ] Mocks used correctly (no real API in unit tests)  
- [ ] `npm run test:run` passes locally  
- [ ] Short README section: how to run tests  
- [ ] You can explain every line of your hardest test  

---

## Suggested weekly plan

| Week | Focus |
|---|---|
| 1 | Vitest basics + matchers + pure functions |
| 2 | Mocks + async + deepen products tests |
| 3 | Second feature (cart or auth) + loading/error |
| 4 | CI `test:run`, polish README, practice explaining |

---

## Learning order of docs (don’t binge everything)

1. Vitest: getting started, mocking  
2. Testing Library: queries, user-event  
3. Common mistakes: testing implementation details, missing cleanup, not awaiting async UI  

---

## Next concrete step (today)

Open `page.test.tsx` and add **one** new test by yourself, for example:

- typing a nonsense query removes all products  
- or asserting `axios.get` was called once  

If it fails, read the error the same way we did with “multiple elements with placeholder” — that’s how you actually learn.

If you want, switch to Agent mode and I can help you add that next test while you watch the pattern; in Ask mode I can only guide.