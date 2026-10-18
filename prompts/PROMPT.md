# PROMPT.md



---
Build a small web app that implements the feature "Create a trip and invite members" so that every acceptance criterion below is satisfied, following the style tokens given.

## Feature: F2 Create a trip and invite members (Must-be)

F2-1. WHEN a signed-in person creates a trip with a name, the app shall make them its creator and give them an invite link.

F2-2. IF someone tries to join a trip without a valid invite link, THEN the app shall refuse and show no trip details.

F2-3. The app shall give each trip one reusable invite link.

## Exclusions

- Editing photos.
- Direct messaging. It does not replace the texting app.
- Connecting to other social media.

## Users

Profile 1. Full-time working professional who travels casually. Shares trip moments by texting friends many times a day while traveling, instead of posting to social media. Sends photos, short stories, and places he loved, in the moment. Has little patience for long reviews or blogging.
Job: When something funny or worth remembering happens on a trip, I want to share it with my friends right away without the pressure of a public post, so I can bring them along on what I am doing.
Success: His friends on the trip see the moment the same day, and it stays together with the rest of the trip instead of scattered across text threads.

## Style tokens

| Token | Value |
|---|---|
| color-primary | #051E39 |
| color-accent | #B39051 |
| color-background | #FFFFFF |
| color-text | #1A1A1A |
| color-error | #A02020 |
| font-body | Arial |
| font-heading | Arial |
| font-size-min | 14px |
| space-unit | 8px |
| radius | 4px |

Usage rules:
- color-accent is for borders only, never body text (it fails contrast on white).
- color-error is reserved for failure states only.
- No text smaller than 14px.
- Spacing is multiples of 8px.

Refusals:
- No modal interrupts an entry submission.
- No decorative animation delays the list of results.

---

## Retries

None