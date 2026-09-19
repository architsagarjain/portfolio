import { loadFont as loadSerif } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadSans } from "@remotion/google-fonts/PlusJakartaSans";

/**
 * Brand tokens pulled from the live product (staging.shaadimangalam.com):
 * - Colors from /redesign/css/biodata-templates.css
 * - Fonts from the site's Google Fonts stack
 */

const serif = loadSerif("normal", {
  weights: ["500", "600", "700"],
  subsets: ["latin"],
});

const sans = loadSans("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const fontSerif = serif.fontFamily;
export const fontSans = sans.fontFamily;

export const C = {
  maroon: "#8B1727",
  maroonDeep: "#4A0B13",
  maroonDark: "#7A1622",
  gold: "#C9A14A",
  goldSoft: "#E6C98F",
  goldDeep: "#9A7D3C",
  cream: "#F3EDE6",
  creamWarm: "#FBF4E4",
  ink: "#362823",
  blush: "#DAC5CA",
  rose: "#C2A6AD",
  paper: "#FFFDF8",
};

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/** Real template names from the live site's template picker */
export const TEMPLATE_NAMES = [
  "Traditional",
  "Royal",
  "Gold",
  "Modern",
  "Floral",
  "Ornate",
  "Classic",
  "Minimal",
  "Heritage",
  "Gilded",
  "Blue",
  "Premium",
] as const;

/** Per-template accent used in the mock thumbnail grid */
export const TEMPLATE_STYLES: Record<
  string,
  { bg: string; accent: string; head: string }
> = {
  Traditional: { bg: "#FBF4E4", accent: "#8B1727", head: "#8B1727" },
  Royal: { bg: "#4A0B13", accent: "#C9A14A", head: "#E6C98F" },
  Gold: { bg: "#F6E7C8", accent: "#9A7D3C", head: "#9A7D3C" },
  Modern: { bg: "#FFFFFF", accent: "#362823", head: "#362823" },
  Floral: { bg: "#FDF0EE", accent: "#B4564F", head: "#8B1727" },
  Ornate: { bg: "#FBF4E4", accent: "#C9A14A", head: "#8B1727" },
  Classic: { bg: "#FFFFFF", accent: "#8B1727", head: "#362823" },
  Minimal: { bg: "#FAFAF8", accent: "#362823", head: "#362823" },
  Heritage: { bg: "#F3EDE6", accent: "#7A1622", head: "#7A1622" },
  Gilded: { bg: "#FFFDF8", accent: "#C9A14A", head: "#C9A14A" },
  Blue: { bg: "#EEF3FA", accent: "#2C4A73", head: "#2C4A73" },
  Premium: { bg: "#FFFFFF", accent: "#362823", head: "#362823" },
};

/** Real sample bio-data from the site's own preview data (SM_SAMPLE) */
export const SAMPLE_BIO = {
  name: "Priya Sharma",
  age: "28 yrs",
  height: "5'4\"",
  qualification: "MBA",
  occupation: "Product Manager",
  company: "Infosys, Bengaluru",
  city: "Jaipur",
  native: "Jaipur, Rajasthan",
  father: "Shri Rajesh Sharma",
  fatherOcc: "Retired Bank Manager",
  mother: "Smt. Sunita Sharma",
  motherOcc: "Homemaker",
  diet: "Vegetarian",
  religion: "Hindu",
  caste: "Brahmin",
  gotra: "Bharadwaj",
  rashi: "Kanya (Virgo)",
  manglik: "No",
  income: "₹20 – 35 LPA",
  familyType: "Nuclear Family",
  expectations:
    "Looking for a kind, well-educated and family-oriented partner.",
};

/**
 * Legacy token exports consumed by scenes from a previous session
 * (HookScene, IntroScene, AiExtractScene). Kept so that earlier work
 * keeps compiling alongside the new composition.
 */
export const theme = {
  bg: "#1A0A0A",
  bgCard: "#2A1515",
  burgundy: "#8B1727",
  burgundyDark: "#4A0B13",
  burgundyDeep: "#1A0A0A",
  gold: "#C9A14A",
  goldLight: "#E6C98F",
  cream: "#F3EDE6",
  creamSoft: "#FBF4E4",
  offWhite: "#FFFDF8",
  textMuted: "#B8A89E",
};

export const fonts = {
  display: fontSerif,
  body: fontSans,
  mono: fontSans,
};

export const CTA_URL = "shaadimangalam.com/bio-data";
