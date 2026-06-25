export type NavLink = {
  label: string;
  shortLabel?: string;
  href: string;
};

export type LandingContent = {
  brand: {
    name: string;
    expanded: string;
    tagline: string;
    constituency: string;
    constituencyShort: string;
  };
  nav: {
    links: NavLink[];
    submit: string;
    submitShort: string;
    track: string;
    trackShort: string;
    menu: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    processStrip: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaTertiary: string;
    stats: { v: string; l: string }[];
  };
  about: {
    tag: string;
    title: string;
    body: string;
    bodyNote: string;
    pillars: { t: string; d: string; i: string }[];
  };
  leadership: {
    tag: string;
    title: string;
    viewMore: string;
    leaders: {
      name: string;
      role: string;
      quote: string;
      badge: string;
    }[];
  };
  features: {
    tag: string;
    title: string;
    items: { t: string; d: string }[];
  };
  workflow: {
    tag: string;
    title: string;
    steps: { n: string; t: string; d: string }[];
  };
  impact: {
    tag: string;
    title: string;
    body: string;
    metrics: { v: string; l: string }[];
  };
  volunteer: {
    tag: string;
    title: string;
    body: string;
    roles: { n: string; r: string; w: string }[];
  };
  digitalAccess: {
    tag: string;
    title: string;
    body: string;
    bullets: string[];
    ctaAndroid: string;
    ctaIos: string;
  };
  testimonials: {
    tag: string;
    title: string;
    body: string;
    comingSoonTitle: string;
    comingSoonBody: string;
  };
  cta: {
    tag: string;
    title: string;
    body: string;
    submit: string;
    track: string;
    volunteer: string;
    submitUrl: string;
  };
  footer: {
    description: string;
    quickLinksTitle: string;
    quickLinks: NavLink[];
    serviceLinksTitle: string;
    serviceLinks: string[];
    reachUsTitle: string;
    address: string;
    phone: string;
    emailSupport: string;
    emailGrievance: string;
    copyright: string;
    tagline: string;
  };
  language: {
    label: string;
    tamil: string;
    english: string;
  };
};
