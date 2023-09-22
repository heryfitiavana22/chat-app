const BRAND_COLOR = "#6278ff";
export const COLORS = {
    BRAND_COLOR,
    primary: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: BRAND_COLOR,
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
        950: "#451a03",
    },
    secondary: "#fcd34d",
    neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
        950: "#0a0a0a",
    },
    error: "#FF5744",
    success: "#88E25A",
    warning: "#F9CF13",
    info: "#0289FF",
} as const;

export const BG_MAIN = COLORS.neutral[50];
