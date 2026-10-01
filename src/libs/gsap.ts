import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  // Mobile browsers fire `resize` every time the URL bar slides in/out.
  // Refreshing on those produces visible jumps in scrubbed animations.
  ignoreMobileResize: true,
  // Start/end callbacks (e.g. `onToggle`) fire at most once per frame instead
  // of once per scroll event, so they never thrash the style engine.
  limitCallbacks: true,
});

/**
 * Seconds a scrubbed tween takes to catch up with the scroll position.
 * `1` feels laggy; smaller tracks the scroll more tightly while still
 * smoothing out wheel/touch deltas. Bump per-animation if you want more glide.
 */
export const SCRUB = 0.6;

/**
 * Resolves the page gutter (`--pl`) to a pixel number.
 *
 * Measured from a real element whose CSS is `left: var(--pl)`, so we always
 * get the value resolved by the browser for the *current* breakpoint — no
 * manual parsing of `dvw` / `%` units, and no stale value after a resize.
 */
export const getGutter = (ref: Element | null): number => {
  if (typeof window === "undefined") return 0;
  const fallback = window.innerWidth * 0.05;
  if (!ref) return fallback;
  const px = parseFloat(getComputedStyle(ref).left);
  return Number.isFinite(px) ? px : fallback;
};

export type SplitTypes = "words" | "chars" | "lines" | "words,chars";

/** SSR-safe wrapper around SplitType. Returns `null` outside the browser. */
const splitText = (target: string | HTMLElement, types: SplitTypes = "words") => {
  if (typeof window === "undefined") return null;

  try {
    return new SplitType(target, { types });
  } catch (error) {
    console.error("Error inicializando SplitType:", error);
    return null;
  }
};

export { gsap, ScrollTrigger, splitText, Flip };
