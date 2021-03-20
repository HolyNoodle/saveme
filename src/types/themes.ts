export interface Palette {
  active: string,
  main: string,
  secondary: string,
  neutral: string
}
export interface Size {
  small: string,
  normal: string,
  large: string
}
export interface Status {
  OK: string,
  WARN: string,
  ERROR: string
}
export interface Theme {
  PRIMARY_BACKGROUND_COLOR: string,
  PRIMARY_TEXT_COLOR: string,
  SECONDARY_TEXT_COLOR: string,
  PRIMARY_BUTTON_BACKGROUND_COLOR: string,
  SECONDARY_BUTTON_BACKGROUND_COLOR: string,
  PRIMARY_BUTTON_TEXT_COLOR: string,
  SECONDARY_BUTTON_TEXT_COLOR: string,
  ACTIVE_COLOR: string,
  INACTIVE_COLOR: string,
  SIZES: Size,
  STATUS: Status
}
export interface Themes {
  women: Theme
}