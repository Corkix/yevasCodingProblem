// Tider 160–350ms
export const DUR = {
  short: 0.18,
  base: 0.24,
  long: 0.32,
};

// Consistent ease (easeOut-liknande, skön respons)
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Grid-entrance: staggerad lista
export const listContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 }
  }
};

export const listItem = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE }
  }
};

// Kort-hover (lyft lite, subtilt)
export const cardHover = {
  hover: {
    y: -2,
    scale: 1.01,
    transition: { duration: DUR.short, ease: EASE }
  }
};

// Liten bild-zoom vid hover
export const mediaHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { duration: DUR.base, ease: EASE }
  }
};

// CTA-feedback
export const cta = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: DUR.short, ease: EASE } },
  tap:   { scale: 0.98, transition: { duration: DUR.short, ease: EASE } },
};

// Favorit-hjärta pop animation
export const heartPop = {
  off: { scale: 1 },
  on: {
    scale: [1, 1.12, 1],
    transition: { times: [0, 0.5, 1], duration: DUR.long, ease: EASE }
  }
};
