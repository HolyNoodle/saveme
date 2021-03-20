import { Palette, Theme, Themes } from "./types";

export const palette: Palette = {
  active: '#C23BE7',
  main: '#774DC2',
  secondary: '#479FA0',
  neutral: '#FFFFFF'
}

export const women: Theme = {
  PRIMARY_BACKGROUND_COLOR: palette.neutral,
  PRIMARY_TEXT_COLOR: palette.main,
  SECONDARY_TEXT_COLOR: palette.secondary,
  PRIMARY_BUTTON_BACKGROUND_COLOR: palette.main,
  SECONDARY_BUTTON_BACKGROUND_COLOR: palette.secondary,
  PRIMARY_BUTTON_TEXT_COLOR: palette.neutral,
  SECONDARY_BUTTON_TEXT_COLOR: palette.neutral,
  ACTIVE_COLOR: palette.active,
  INACTIVE_COLOR: palette.secondary,
  SIZES: {
    small: '0.85',
    normal: '1.0',
    large: '1.15'
  },
  STATUS: {
    OK: '#06d6a0',
    WARN: '#f4a261',
    ERROR: '#e63946'
  }
};

const themes: Themes = { women }

export default themes;