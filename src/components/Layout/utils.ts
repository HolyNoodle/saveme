import { Theme } from "src/types";

export const scaleItem = ({size = 'normal', theme}:{size? : string, theme: Theme}) => `transform: scale(${theme.SIZES[size]})`;