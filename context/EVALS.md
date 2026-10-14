# EVALS.md

Status: ACTIVE. Accountable: Semaj Johnson II, Phase 1 Reviewer.

## Opportunity Solution Tree

```mermaid
flowchart TD
    O["Outcome: a group can find what happened on a trip, months later, without scrolling a group chat"]

    O --> P1["Capture is too slow in the moment"]
    O --> P2["Nothing is findable after the trip ends"]
    O --> P3["The record is scattered across people"]
    O --> P4["Sharing outside the group is all-or-nothing"]

    P1 --> S1["One screen: photo, note, place, submit"]
    P1 --> S2["Partial moments allowed — any one field is enough"]
    P2 --> S3["Search a trip by word, place, date, or member"]
    P2 --> S4["Moments shown in added order, each attributed"]
    P3 --> S5["One trip, one invite link, every member posting to it"]
    P4 --> S6["A trip is private until its creator shares it"]

    S1 --> A1["Do members add anything during a trip, or only after it?"]
    S2 --> A2["Is a note-only or place-only moment worth keeping, or noise?"]
    S3 --> A3["When someone looks for an old moment, what do they search by first?"]
    S4 --> A4["Does knowing who added a moment change whether people trust the record?"]
    S5 --> A5["Will a group actually move off its group chat for the length of a trip?"]
    S6 --> A6["Does a private-by-default trip get shared, or quietly never shared?"]
```

## Riskiest Assumption (RAT)

**Assumption:** people will add moments *during* a trip, not after it.

**Why it is the riskiest:** every opportunity below the outcome depends on a record existing. Search (F5) has nothing to search, attribution (F4) has nothing to attribute, and sharing (F6) has nothing to share. If capture happens only after the trip — or not at all — the app is a photo album people fill out as homework, and the outcome is unreachable no matter how good the rest of the build is. It comes from A1, the leftmost assumption test in the tree.

**What would show it is false:** in user research by October 22, people describe taking photos during trips but writing anything down only afterward, if ever. In Phase 2, moments whose timestamps cluster after a trip's end date rather than during it.

**How we would test it cheaply:** ask the three interviewees for their last trip, and have them open their camera roll and their group chat and show us what they posted and when. Past behavior, not intention — the HW2 rule.

## Evals Planned for Phase 2

| What | Grader | Checks |
|---|---|---|
| Code eval, `evals/` run with `npm test` | Code | One test per Must-be EARS row with a server-side effect: F1-2 duplicate username, F2-2 join without a valid invite, F3-3 empty moment refused, F4-2 deleting someone else's moment refused. Each test names its EARS row in the title. |
| Judgment eval, `docs/JUDGMENT.md` | Rubric, two graders | At least ten binary questions covering the rows code cannot check: attribution visible on every moment, search terms preserved on an empty result, a private trip invisible to non-members. Two columns, disagreements marked. Agreement under 80 percent is a finding about the rubric. |
| Error-analysis log | Human | Every failure across the probe, the tests, and the judgment eval, counted and sorted. The most frequent failure is the next fix. |

## Prediction Stakes


### Aashi Mehta, Implementer — committed <date>

**Tight:** bolt.new will satisfy 2 out 3 EARS rows; AI Studio will satisfy 2 out of 3 EARS rows.

*Result:

**Loose:** bolt.new will follow STYLE.md closesly, while AI Studio will add more than needed because it transforms whole projects.

*Result:*

**Open:** Will either platform create dependencies that were not requested in the prompt?

*Result:*

