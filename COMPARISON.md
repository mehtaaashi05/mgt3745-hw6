# COMPARISON.md

## Row-by-Row Evidence

Pass = the row's behavior was observed working. Partial = part works or works only under limits. Fail = not observed or broken. "Reusable" = worked for two people.

| EARS row | bolt.new | Evidence | AI Studio | Evidence |
|---|---|---|---|---|
| F2-1 | Partial | Link given; no creator label [F2-1 evidence](docs/img/Bolt_F2-1_evidence.png)| Pass | Name-only creation; creator shown; one code. [F2-1 evidence](docs/img/aistudio_F2-1_evidence.png)  |
| F2-2 | Pass | Bad token: "The invite link is not valid", no details. [F2-2 evidence](docs/img/Bolt_F2-2_evidence.png)| Pass | Refusal card hides name, dates, members; valid code joins in same tab. [F2-2 evidence](docs/img/aistudio_F2-2_evidence.png) |
| F2-3 | Fail | Two users join with one token (code eval passes), but the joined member cannot read the trip. [F2-3 evidence](docs/img/Bolt_F2-3_Evidence.png) | Pass | Same-browser only: two users joined with one code, but trips live in localStorage, so the code fails from another tab or origin (4 of 4 attempts). No row requires cross-device use; see Spec Gaps, “Where trips live". [F2-3 evidence](docs/img/aistudio_F2-3_Evidence.png) 

The manual tests and the code eval agree on every row.

## Scope Creep

Rule applied to both: a file counts if F2-1 to F2-3 can be met without it. Scaffold and config files are excluded. Neither build made anything on the
FEATURES.md exclusion list.

| | bolt.new | AI Studio |
|---|---|---|
| Files not needed | 3: AuthScreen.tsx, AuthContext.tsx, add_list_trip_members.sql | 3: MomentComposer.tsx, TestingGuide.tsx, mockData.ts |
| Arguable (counted as needed) | revoke_public_execute_trip_functions.sql, TripDetail.tsx | PersonaSwitcher.tsx, TripCard.tsx, Header.tsx |
| Other additions | Supabase database; email/password auth | Reset Data; Simulate Join; seeded trip; destination and dates fields; in-app criteria checklist |
| FEATURES.md exclusions built | None | None |

## Judgment Eval

Agreement rate with the classmate: 11 of 12 (92%). Details in JUDGMENT.md.

## Findings

**First: Bolt.new's join works but its trip view does not.**
The code eval shows two users can join with one token, but the next read fails with Postgres error 42P17, infinite recursion in the policy for trip_members. The same cause explains the HTTP 500 on the trip list and the "Could not load this trip" screen. bolt.new's migration header says F2-1 to F2-3 are handled, and its chat said "Your app is complete." A builder's self-report is not evidence. Only one error, the 400 on list_trip_members, is still unexplained.

**Second:** 
the builders resolved "signed-in" differently (real accounts versus a dropdown). AI Studio shipped test scaffolding that reports on its own rows. It was not used as evidence.

## Spec Gaps

| Gap | What each builder assumed | EARS change or exclusion |
|---|---|---|
| Successful join | Both invented one | Add F2-4: WHEN a signed-in person opens a valid invite link, the app shall add them to the trip as a member and open it. |
| "Signed-in" | bolt.new: real accounts. AI Studio: persona dropdown. | F2-1: "WHEN a person signed in under F1 creates a trip..." |
| What a "link" is | bolt.new: URL with token. AI Studio: code or URL. | F2-1, F2-3: the link is a URL that opens the join page. |
| Where trips live | bolt.new: server. AI Studio: browser localStorage. | Add: the app shall keep trips and members on the server. |
| Creator display | bolt.new: none. AI Studio: badge in three places. | F2-1: the app shall show the creator's name on the trip. |
| Trip contents | AI Studio added destination and dates. | Add exclusion: a trip has only a name. |
| Creator or member opens own link | bolt.new: error shown | IF a member opens a valid link for a trip they already belong to, THEN open the trip with no duplicate membership. |
| Failed loads | bolt.new: error plus "No trips yet" | IF trips fail to load, THEN say so and show no empty message. |

## Recommendation

### Criteria and Weights 

| Criterion | Weight (1 to 5) | Why |
|---|---|---|
| Passes F2-1 to F2-3 | 5 | The rows are the contract. |
| Refusal shows no trip details (F2-2) | 4 | The only privacy row here. |
| Fits ADR-001 (Workers + D1, static page) | 4 | Phase 2 code must merge into our stack. |
| Scope discipline | 3 | Extra code is extra review. |
| Testable offline with node:test | 3 | The team needs repeatable checks. |
| Style token adherence | 2 | Cheap to fix later. |

### Scores

| Criterion | Weight | bolt.new | AI Studio |
|---|---|---|---|
| Passes F2-1 to F2-3 | 5 | 2 | 4 |
| Refusal shows no details | 4 | 5 | 5 |
| Fits ADR-001 | 4 | 3 | 3 |
| Scope discipline | 3 | 3 | 2 |
| Testable offline | 3 | 2 | 5 |
| Style adherence | 2 | 3 | 4 |
| **Weighted total** | | **63** | **81** |

### Decision

Use AI Studio's output as the starting point for F2 in Phase 2, and port it to our stack. Its logic is plain TypeScript functions (createNewTrip, joinTripWithCode) that the code eval ran with no browser, so it can be tested offline and moved into a Worker. bolt.new's logic is Postgres functions and row-level security, which D1 (SQLite) cannot run. Its policy bug sits in the layer we would replace, and Supabase is a second vendor, which ADR-001 says needs a new ADR and a TOOLS.md row.

What gets harder: AI Studio has no server, so we must replace localStorage with Worker endpoints and D1 tables ourselves, and we own invite validation and membership checks. ADR-001 already names these as our security bugs. We must also remove the test scaffolding (Reset Data, Simulate Join, persona switcher).

## Handoff to the Team

Issue proposing FEATURES.md changes: https://github.com/mehtaaashi05/mgt3745-team-Alpha-/issues/59