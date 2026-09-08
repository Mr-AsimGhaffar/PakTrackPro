// Meta (Facebook) Pixel helpers.
// The base pixel code lives in index.html so it loads before the React bundle.
// This module only wraps the tracking calls so the app stays typed and never
// throws when the pixel is blocked, offline, or absent (tests, SSR, ad blockers).

type PixelParams = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (
      command: "init" | "track" | "trackCustom",
      target: string,
      params?: PixelParams,
      options?: { eventID?: string },
    ) => void;
  }
}

const CURRENCY = "PKR";

type TrackedProduct = {
  id: string;
  name: string;
  price: number;
};

type TrackedLineItem = {
  id: string;
  quantity: number;
  price: number;
};

const isPixelReady = () =>
  typeof window !== "undefined" && typeof window.fbq === "function";

/** Fires one of Meta's standard events (PageView, AddToCart, Purchase, ...). */
export const trackEvent = (eventName: string, params?: PixelParams) => {
  if (!isPixelReady()) return;
  window.fbq!("track", eventName, params);
};

/** Fires an event that is not part of Meta's standard event list. */
export const trackCustomEvent = (eventName: string, params?: PixelParams) => {
  if (!isPixelReady()) return;
  window.fbq!("trackCustom", eventName, params);
};

export const trackPageView = () => trackEvent("PageView");

export const trackViewContent = (product: TrackedProduct) =>
  trackEvent("ViewContent", {
    content_type: "product",
    content_ids: [product.id],
    content_name: product.name,
    value: product.price,
    currency: CURRENCY,
  });

export const trackAddToCart = (product: TrackedProduct, quantity: number) =>
  trackEvent("AddToCart", {
    content_type: "product",
    content_ids: [product.id],
    content_name: product.name,
    contents: [{ id: product.id, quantity }],
    value: product.price * quantity,
    currency: CURRENCY,
  });

export const trackInitiateCheckout = (
  items: TrackedLineItem[],
  value: number,
) =>
  trackEvent("InitiateCheckout", {
    content_type: "product",
    content_ids: items.map((item) => item.id),
    contents: items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      item_price: item.price,
    })),
    num_items: items.reduce((total, item) => total + item.quantity, 0),
    value,
    currency: CURRENCY,
  });

export const trackPurchase = (items: TrackedLineItem[], value: number) =>
  trackEvent("Purchase", {
    content_type: "product",
    content_ids: items.map((item) => item.id),
    contents: items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      item_price: item.price,
    })),
    num_items: items.reduce((total, item) => total + item.quantity, 0),
    value,
    currency: CURRENCY,
  });

/** WhatsApp is the main enquiry channel, so a chat click counts as a lead. */
export const trackLead = (source: string) =>
  trackEvent("Lead", { content_name: source });
