// let esMovil:boolean = window.matchMedia("(max-width: 1024px)").matches;

// DEPRECATED: this 1300px breakpoint does not match the `desktop-up` SCSS mixin
// (1024px), so anything gated on it disagrees with the styles it animates.
// Prefer `gsap.matchMedia()` — it re-evaluates on breakpoint change and drives
// an automatic `ScrollTrigger.refresh()`, which this cannot do.
export const isMobile = ()=> window.matchMedia("(max-width: 1300px) and (orientation:portrait)").matches;
// export const isMobile = ()=> /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);;

export const changeClass = (esMovil: boolean) => {
  const { classList } = document.documentElement
  classList.remove(esMovil ? 'desktop' : 'mobile')
  classList.add(esMovil ? 'mobile' : 'desktop')
}

export const deviceDetected = ()=> {
  const ua = navigator.userAgent.toLowerCase();
  const ancho = window.innerWidth;

  const portrait = window.matchMedia("(orientation:portrait)").matches

  if (
    /tablet|ipad|playbook|silk|(android(?!.*mobile))/i.test(ua) ||
    (ancho >= 768 && ancho <= 1300)
  ) {
    return `${portrait ? 'tablet portrait' : 'tablet landscpe'}`;
  }

  if (
    /mobile|iphone|ipod|android|blackberry|iemobile|opera mini/i.test(ua) ||
    ancho < 768
  ) {
    return `${portrait ? 'mobile portrait' : 'mobile landscpe'}`;
  }

  return "desktop";
}
