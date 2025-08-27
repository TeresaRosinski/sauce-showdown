// App configuration constants
export const APP_CONFIG = {
  TOTAL_MATCHUPS: 4,
  MATCHUP_HEIGHT: 380,
  CONTAINER_WIDTH: 300,
  CONTAINER_HEIGHT: 600,
  LOGO_SIZE: 24,
} as const

// Color constants
export const COLORS = {
  SAUCE_RED: "#DA291C",
  SAUCE_YELLOW: "#F4B52A", 
  SAUCE_BLACK: "#000000",
  WHITE: "#FFFFFF",
  GRAY_500: "#6b7280",
  GRAY_600: "#4b5563",
  GRAY_800: "#1f2937",
} as const

// Image placeholder constants
export const PLACEHOLDERS = {
  SAUCE: "/placeholder.svg",
  PERSON: "/placeholder-user.jpg", 
  LOGO: "/placeholder-logo.svg",
} as const

// Text constants
export const TEXT = {
  APP_TITLE: "Sauce Showdown!",
  APP_DESCRIPTION: "Vote for the new sauce you want to try and get more votes in the app to unlock exclusive rewards.",
  CTA_BUTTON: "Download the App",
  BACK_BUTTON: "Back",
  VOTE_BUTTON: "Vote",
  VS_TEXT: "VS",
} as const
