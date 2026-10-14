# STYLE.md

Brought in from HW5

# Tokens: what a machine reads.


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

Tokens above, rationale below. The frontmatter is what a machine reads; this
body is what a human reads. One sentence per token. "Looks clean" is fog;
"gold fails contrast on white at body size" is at altitude.

## Rationale

- **color-primary**: Deep blue gives the directory a calm, work-focused tone and maintains a 16.78:1 contrast ratio against white, so it passes the 4.5:1 body-text standard for headings and labels.
- **color-text**: Near-black body text maintains a 17.40:1 contrast ratio against white, which keeps the directory readable for long scanning without forcing a dark theme.
- **color-error**: The red error color is reserved for failure states only and measures 7.71:1 against white, which keeps the message legible while remaining distinct from the standard informational blue and black text.
- **color-background**: White creates a minimal, neutral field behind the interface and makes the dark text and blue accents read clearly at a glance.
- **color-accent**: Gold is restricted to accent borders and the selected-guide border, not body text, because it measures 2.99:1 on white and fails the 4.5:1 threshold for normal text.
- **font-body / font-heading**: Arial is installed on every device, so the page renders the same everywhere with no font download, and heading weight and size carry the hierarchy instead of a second typeface.
- **space-unit**: An 8px rhythm keeps the form and list aligned without making a small tool feel crowded.
- **font-size-min**: 14px is the smallest text so supporting instructions remain readable for users scanning quickly.

## Refusals

Things this interface will never do, and why. Taken from the interface you
resent. Name the Law of UX it breaks (lawsofux.com).

1. No modal interrupts an entry submission. It breaks the Law of UX: User Control by adding a decision the user did not request.
2. No decorative animation delays the directory list. It breaks the Law of UX: Doherty Threshold by making a simple result feel slower.

## Sources

- Admired: GOV.UK forms, for direct labels and restrained spacing.
- Resented: notification-heavy social feeds, for interrupting a focused task with competing prompts.