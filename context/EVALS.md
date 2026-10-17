# EVALS.md

## Prediction Stake

Author: Aashi Mehta, Implementer. Committed before either build was opened.
Predictions are unchanged. Results are written beneath each one.

### Tight
bolt.new will satisfy 2 out 3 EARS rows; AI Studio will satisfy 2 out of 3 EARS rows.

**Result (October 17, 2026):** bolt.new satisfied 1 of 3 (F2-1 Partial, F2-2 Pass,
F2-3 Fail). AI Studio satisfied 2 of 3 (F2-1 Pass, F2-2 Pass, F2-3 Partial). Only
Pass counts as satisfied. Right for AI Studio, wrong for bolt.new.

### Loose
bolt.new will follow STYLE.md closesly, while AI Studio will add more than needed because it transforms whole projects.

**Result (October 17, 2026):** Partly held.
- bolt.new's code follows the tokens (14px inline sizes, text-error for errors,
  primary and accent classes). Its sign-in page shows no navy or gold.
  AI Studio also used navy, gold borders, 14px, and the token hex values.
  The contrast I predicted between the two did not appear.
- AI Studio added features outside F2: MomentComposer.tsx, TestingGuide.tsx,
  mockData.ts, a persona switcher, Reset Data, and Simulate Join. bolt.new added
  email/password auth and a database with three migrations. Clearly unneeded
  files by one rule: 3 for each build. So "AI Studio adds more" did not hold in
  file count. AI Studio's extras were product features and test scaffolding.
  bolt.new's were infrastructure.
- The reason ("transforms whole projects") was not tested.
- Not checked: whether any text is under 14px in either running app **[CONFIRM or delete this line]**.

### Open
Will either platform create dependencies that were not requested in the prompt?

**Result (October 17, 2026):** Yes, both.
- bolt.new: @supabase/supabase-js, imported in src/lib/supabase.ts. Its own
  .bolt/prompt told it not to install other packages unless necessary.
- AI Studio: express, dotenv, @google/genai, and motion are declared in
  package.json. A search of src/ and vite.config.ts found no imports, so they are
  declared but unused.
- Shared scaffold (React, Vite, Tailwind, TypeScript, lucide-react) is not counted.

## Error Log

Frequency = failed attempts out of attempts of the same action, per build. Most
frequent first. Bolt counts are from the published site (trip-creation-app-45fd.bolt.host).

| Rank | Failure | Builder | Frequency | Rows | Cause |
|---|---|---|---|---|---|
| 1 | Valid invite refused when used outside the browser that created the trip | AI Studio | 4 of 4 cross-origin attempts (same-tab: 0 of 1 failed) | F2-3 | Confirmed in code: all trips are in one browser's localStorage (storage.ts); there is no backend. |
| 2 | Accepting a valid invite ends in "Could not load this trip" | bolt.new | 2 of 2 | F2-3 | Likely, from policy code: trips and trip_members policies reference each other (recursion). Response body not read. |
| 3 | Trip list returns HTTP 500 ("Could not load your trips") | bolt.new | 2 of 2 (tester1, tester2) | F2-1, F2-3 | Same likely cause as rank 2. |
| 4 | Error and "No trips yet" shown on the same screen | bolt.new | 2 of 2 | F2-1 | A failed load is rendered as an empty list. |
| 5 | list_trip_members returns HTTP 400 | bolt.new | 1 of 1 | F2-3 | Unconfirmed. |
| 6 | No creator label shown after creating a trip | bolt.new | 1 of 1 | F2-1 | Not built. |

Not counted as build failures (test setup, see DDRs):
- bolt.new preview invite link showed "Connect to Project" and a blank page until
  the app was published.
- One "Invalid login credentials" console error on sign-in.
- A host-level 404 when I edited the hostname instead of the token.