function isBrowser() {
  return typeof window !== "undefined";
}

function cleanPayload(payload = {}) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== "")
  );
}

export function getReadingAnalyticsPayload(reading) {
  if (!reading) return {};

  return cleanPayload({
    card_id: reading.card?.id,
    card_name: reading.card?.englishName,
    card_name_th: reading.card?.thaiName,
    aura: reading.aura?.name,
    orientation: reading.orientation,
    aspect: reading.orientation === "reversed" ? "Shadow" : "Light",
    energy_score: reading.energyScore,
    timestamp: new Date().toISOString()
  });
}

export function trackEvent(eventName, payload = {}) {
  if (!isBrowser()) return;

  const safePayload = cleanPayload(payload);
  window.dataLayer?.push?.({
    event: eventName,
    ...safePayload
  });

  window.gtag?.("event", eventName, safePayload);
  window.plausible?.(eventName, { props: safePayload });
  window.posthog?.capture?.(eventName, safePayload);

  window.dispatchEvent(
    new CustomEvent("soul-of-love:analytics", {
      detail: {
        event: eventName,
        payload: safePayload
      }
    })
  );
}

export function trackPageView(payload = {}) {
  trackEvent("page_view", {
    path: isBrowser() ? window.location.pathname : "/",
    timestamp: new Date().toISOString(),
    ...payload
  });
}
