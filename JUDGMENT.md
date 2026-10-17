# JUDGMENT.md

## What Is Being Judged
Parts of F2-1, F2-2, and F2-3 that depend on what a person sees on screen, which
a node:test check cannot read: whether the creator is shown as creator, whether a
refusal leaks trip details, whether the message is understandable, and whether
the screen shows more than one invite link or contradicts itself. A person has to
judge these because they are about what the screen communicates, not about a
return value. The code eval in evals/ covers the logic of F2-1 to F2-3.

## Procedure
Both graders answered the same six Yes/No questions for each build, working
alone, before comparing. The second grader saw no verdicts and no summary from me.

### Evidence Given to the classmate
- builds/bolt.zip and builds/aistudio.zip (the builds themselves)
- The published bolt.new app URL and screenshots in screenshots/
- The three F2 EARS rows, copied unchanged
- The six questions below, with no "You" column

## Results
Y = yes, N = no. "You" answers are provisional until confirmed against the evidence.

| Item | Question (Yes / No) | Build | You | Second grader |
|---|---|---|---|---|
| J1a | After creating a trip with only a name, does the screen show the signed-in person as the trip's creator? (F2-1) | bolt.new | N | N |
| J1b | Same question | AI Studio | Y | Y |
| J2a | After creating a trip, does the screen show an invite link or code the creator can copy? (F2-1) | bolt.new | Y | Y|
| J2b | Same question | AI Studio | Y | Y|
| J3a | When an invalid invite is used, does the screen refuse without showing the trip's name, destination, dates, or members? (F2-2) | bolt.new | Y | Y|
| J3b | Same question | AI Studio | Y | Y|
| J4a | Does the refusal message say in plain words that the invite was not accepted? (F2-2) | bolt.new | Y | Y |
| J4b | Same question | AI Studio | Y | Y|
| J5a | Does the trip show exactly one invite link or code, with no second link or regenerate option? (F2-3) | bolt.new | Y | Y |
| J5b | Same question | AI Studio | Y | Y |
| J6a | Does the build avoid showing an error message and an "empty" message at the same time? | bolt.new | N | N |
| J6b | Same question | AI Studio | Y | N |

Agreement rate: <11 of 12, 92%

## Disagreements

**J6b (AI Studio): I answered Y, the classmate answered N.**
I answered Y because I saw no screen where AI Studio showed an error and an
empty-state message together. The classmate answered N because
they were confused about what indicated the empty-state message. This suggests the question is too loose about what counts as an "error."
Rewrite for next time: "Does any single screen show a failure message and a
'nothing here yet' message at the same time? Name the screen." 

All other 11 items matched. The questions are binary and the screenshots show
each state directly.