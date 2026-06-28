# Daily Energy Analytics Foundation

## Purpose

Daily Energy includes a privacy-safe analytics foundation for understanding basic product usage without collecting personal identity.

Analytics calls are routed through:

```text
src/lib/analytics.js
```

If no analytics provider is configured, the app continues to work normally. The utility safely no-ops unless a supported browser analytics object exists.

## GA4 Setup

Google Analytics 4 is loaded globally through the Next.js `Script` component when this environment variable exists:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-1NY8070518
```

Use `.env.example` as the reference for local and deployment configuration. If `NEXT_PUBLIC_GA_MEASUREMENT_ID` is missing, no GA4 script is loaded and the app continues normally.

The GA4 loader sets `send_page_view: false` so the app-controlled `page_view` event remains the single source of truth.

## Active Events

### page_view

Sent when the Daily Energy module loads.

Collected fields:

- module
- path
- timestamp

Trigger:

- App mount

### draw_card

Sent when a card draw generates a Daily Energy result.

Collected fields:

- card_id
- card_name
- card_name_th
- aura
- orientation
- aspect
- energy_score
- timestamp

Trigger:

- User clicks the main draw/open card button

### copy_ai_poster_prompt

Sent when a user copies an AI Poster Prompt.

Collected fields:

- platform_name
- card_id
- card_name
- card_name_th
- aura
- orientation
- aspect
- energy_score
- timestamp

Trigger:

- User clicks one of the platform prompt copy buttons: Midjourney, ChatGPT Image, Flux, Stable Diffusion, or Gemini

### open_today_reading

Sent when the Today's Reading section becomes visible after a draw.

Collected fields:

- card_id
- card_name
- card_name_th
- aura
- orientation
- aspect
- energy_score
- timestamp

Trigger:

- Result area becomes visible after the card reveal finishes

### draw_again

Sent when the user uses the Draw Again control from the result section.

Collected fields:

- card_id
- card_name
- card_name_th
- aura
- orientation
- aspect
- energy_score
- timestamp

Trigger:

- User clicks Draw Again from the Today's Reading section

### reading_complete

Sent when the user reaches the bottom of the visible reading result.

Collected fields:

- card_id
- card_name
- card_name_th
- aura
- orientation
- aspect
- energy_score
- timestamp

Trigger:

- The bottom result panel enters the viewport. This fires once per reading instance.

## What Is Not Collected

The app does not intentionally collect:

- name
- email
- phone number
- personal identity
- birth data
- exact location
- free-form user text
- account identifiers

Some external analytics providers may automatically process technical metadata such as browser, device, coarse location, or IP address depending on their configuration. That behavior should be controlled in the provider dashboard and privacy settings.

## Supported Provider Hooks

The foundation currently supports safe calls to common browser globals if present:

- `window.dataLayer`
- `window.gtag`
- `window.plausible`
- `window.posthog`

It also dispatches a local browser event:

```text
soul-of-love:analytics
```

This can be used later for debugging, custom dashboards, or a first-party analytics bridge.

When GA4 is configured, these tracked events are sent through `gtag()`:

- `page_view`
- `draw_card`
- `draw_again`
- `open_today_reading`
- `copy_ai_poster_prompt`
- `reading_complete`

## Future Planned Events

These events are reserved for future interactions but are not currently fired because the matching UI does not exist in the production surface:

- `copy_positive_prompt`
- `copy_negative_prompt`
- `copy_full_prompt`
- `copy_suno_prompt`
- `download_image`
- `share_reading`
- `favorite_card`

They should be implemented only when the matching button or reliable user action exists.

## Future Dashboard Idea

Future internal dashboards can summarize:

- most drawn Major Arcana cards
- aura distribution
- Light vs Shadow orientation ratio
- average energy score
- AI prompt copy platform usage
- daily draw volume
- repeat draw behavior

The dashboard should remain aggregate-first and avoid storing personal user identity unless a future platform account system is intentionally designed with consent and privacy controls.
