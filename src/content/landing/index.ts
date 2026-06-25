import { ta } from "./ta";
import { en } from "./en";
import type { LandingContent } from "./types";

export type Locale = "ta" | "en";

export const landingContent: Record<Locale, LandingContent> = { ta, en };

export type { LandingContent, NavLink } from "./types";
