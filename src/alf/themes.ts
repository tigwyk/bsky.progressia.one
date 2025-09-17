import {atoms} from '#/alf/atoms'
import {type Palette, type Theme} from '#/alf/types'
import {
  defaultScale,
  dimScale,
  MAGENTA_HUE,
  PURPLE_HUE,
  RED_HUE,
} from '#/alf/util/colorGeneration'

/** ----------------------------------------------------------------
 *  Core brand swatches lifted 1‑for‑1 from the guideline pages.
 *  (Add or rename here – _never_ inside a palette – to keep ALF’s
 *  public API unchanged.)
 * ----------------------------------------------------------------*/
export const BRAND = {
  /* Neutrals */
  black: '#0D0015',
  white: '#FFFFFF',
  twilight: '#1A0D26',
  gray300: '#B8A9C9',
  gray400: '#9A8AAE',
  gray600: '#6A5A7A',

  /* Primary / "Magenta‑violet" */
  primaryLight: '#FF006E',
  primaryLightTint: '#FFE5F4',
  primaryDark: '#FF3D8B',
  primaryDarkTint: '#4D1A35',

  /* Accent / Electric‑purple ("success") */
  secondary: '#8B5CF6',
  secondaryTint: '#E9D5FF',

  /* Negative / Brand red */
  negative: '#F40B42',
} as const

const themes = createThemes({
  hues: {
    primary: MAGENTA_HUE,
    negative: RED_HUE,
    positive: PURPLE_HUE,
  },
})

/**
 * @deprecated use ALF and access palette from `useTheme()`
 */
export const lightPalette = themes.lightPalette
/**
 * @deprecated use ALF and access palette from `useTheme()`
 */
export const darkPalette = themes.darkPalette
/**
 * @deprecated use ALF and access palette from `useTheme()`
 */
export const dimPalette = themes.dimPalette
/**
 * @deprecated use ALF and access theme from `useTheme()`
 */
export const light = themes.light
/**
 * @deprecated use ALF and access theme from `useTheme()`
 */
export const dark = themes.dark
/**
 * @deprecated use ALF and access theme from `useTheme()`
 */
export const dim = themes.dim

export const defaultTheme = themes.light

export function createThemes({
  hues,
}: {
  hues: {
    primary: number
    negative: number
    positive: number
  }
}): {
  lightPalette: Palette
  darkPalette: Palette
  dimPalette: Palette
  light: Theme
  dark: Theme
  dim: Theme
} {
  /**
   * ----------------------------------------------------------------
   *  _All_ runtime‑visible tokens are hard‑coded to match the guide.
   *  The keys remain identical, so nothing else breaks.
   * ----------------------------------------------------------------*/
  const color = {
    like: '#FF006E',
    trueBlack: BRAND.black,

    /* ----------  Neutral Scale (white → black) ---------- */
    gray_0: BRAND.white,
    gray_25: '#F7F2FF',
    gray_50: '#F0E6FF',
    gray_100: '#E8D9FF',
    gray_200: BRAND.gray300, // #B8A9C9
    gray_300: '#A693C3',
    gray_400: BRAND.gray400, // #9A8AAE
    gray_500: '#7E6B92',
    gray_600: BRAND.gray600, // #6A5A7A
    gray_700: '#524263',
    gray_800: '#3B2A4D',
    gray_900: '#251837',
    gray_950: '#1A0D26',
    gray_975: '#100820',
    gray_1000: BRAND.black,

    /* ----------  Primary (magenta) – light palette anchor ---------- */
    primary_25: BRAND.primaryLightTint,
    primary_50: '#FFD1E8',
    primary_100: '#FFB3DC',
    primary_200: '#FF94D0',
    primary_300: '#FF75C4',
    primary_400: '#FF56B8',
    primary_500: BRAND.primaryLight,
    primary_600: '#CC0056',
    primary_700: '#990041',
    primary_800: '#66002B',
    primary_900: '#330016',
    primary_950: '#1A000B',
    primary_975: '#0D0005',

    /* ----------  "Positive / Success" purple scale ---------- */
    green_25: BRAND.secondaryTint,
    green_50: '#F3E8FF',
    green_100: '#E9D5FF',
    green_200: '#D8BFD8',
    green_300: '#C4A5C4',
    green_400: '#B794F6',
    green_500: BRAND.secondary,
    green_600: '#805AD5',
    green_700: '#6B46C1',
    green_800: '#553C9A',
    green_900: '#44337A',
    green_950: '#322659',
    green_975: '#1A1338',

    /* ----------  Negative / Error (brand red) ---------- */
    red_25: '#FFE5EC',
    red_50: '#FFD9E3',
    red_100: '#FFC1D1',
    red_200: '#FF9AB3',
    red_300: '#FF7396',
    red_400: '#FF4B78',
    red_500: BRAND.negative, // #F40B42
    red_600: '#C00A32',
    red_700: '#920826',
    red_800: '#630619',
    red_900: '#35030D',
    red_950: '#1B0206',
    red_975: '#0E0103',
  } as const

  const lightPalette = {
    white: BRAND.white,
    black: BRAND.black,
    like: color.like,

    contrast_25: color.gray_25,
    contrast_50: color.gray_50,
    contrast_100: color.gray_100,
    contrast_200: color.gray_200,
    contrast_300: color.gray_300,
    contrast_400: color.gray_400,
    contrast_500: color.gray_500,
    contrast_600: color.gray_600,
    contrast_700: color.gray_700,
    contrast_800: color.gray_800,
    contrast_900: color.gray_900,
    contrast_950: color.gray_950,
    contrast_975: color.gray_975,

    primary_25: BRAND.primaryLightTint,
    primary_50: color.primary_50,
    primary_100: color.primary_100,
    primary_200: color.primary_200,
    primary_300: color.primary_300,
    primary_400: color.primary_400,
    primary_500: BRAND.primaryLight,
    primary_600: color.primary_600,
    primary_700: color.primary_700,
    primary_800: color.primary_800,
    primary_900: color.primary_900,
    primary_950: color.primary_950,
    primary_975: color.primary_975,

    positive_25: color.green_25,
    positive_50: color.green_50,
    positive_100: color.green_100,
    positive_200: color.green_200,
    positive_300: color.green_300,
    positive_400: color.green_400,
    positive_500: color.green_500,
    positive_600: color.green_700,
    positive_700: color.green_700,
    positive_800: color.green_800,
    positive_900: color.green_900,
    positive_950: color.green_950,
    positive_975: color.green_975,

    negative_25: color.red_25,
    negative_50: color.red_50,
    negative_100: color.red_100,
    negative_200: color.red_200,
    negative_300: color.red_300,
    negative_400: color.red_400,
    negative_500: color.red_500,
    negative_600: color.red_600,
    negative_700: color.red_700,
    negative_800: color.red_800,
    negative_900: color.red_900,
    negative_950: color.red_950,
    negative_975: color.red_975,
  } as const

  const darkPalette: Palette = {
    white: BRAND.white,
    black: BRAND.black,
    like: color.like,

    contrast_25: color.gray_975,
    contrast_50: color.gray_950,
    contrast_100: color.gray_900,
    contrast_200: color.gray_800,
    contrast_300: color.gray_700,
    contrast_400: color.gray_600,
    contrast_500: color.gray_500,
    contrast_600: color.gray_400,
    contrast_700: color.gray_300,
    contrast_800: color.gray_200,
    contrast_900: color.gray_100,
    contrast_950: color.gray_50,
    contrast_975: color.gray_25,

    primary_25: BRAND.primaryDarkTint,
    primary_50: color.primary_950,
    primary_100: color.primary_900,
    primary_200: color.primary_800,
    primary_300: color.primary_700,
    primary_400: color.primary_600,
    primary_500: BRAND.primaryDark,
    primary_600: color.primary_400,
    primary_700: color.primary_300,
    primary_800: color.primary_200,
    primary_900: color.primary_100,
    primary_950: color.primary_50,
    primary_975: color.primary_25,

    positive_25: color.green_975,
    positive_50: color.green_950,
    positive_100: color.green_900,
    positive_200: color.green_800,
    positive_300: color.green_700,
    positive_400: color.green_600,
    positive_500: color.green_500,
    positive_600: color.green_400,
    positive_700: color.green_300,
    positive_800: color.green_200,
    positive_900: color.green_100,
    positive_950: color.green_50,
    positive_975: color.green_25,

    negative_25: color.red_975,
    negative_50: color.red_950,
    negative_100: color.red_900,
    negative_200: color.red_800,
    negative_300: color.red_700,
    negative_400: color.red_600,
    negative_500: color.red_500,
    negative_600: color.red_400,
    negative_700: color.red_300,
    negative_800: color.red_200,
    negative_900: color.red_100,
    negative_950: color.red_50,
    negative_975: color.red_25,
  } as const

  const dimPalette: Palette = {
    ...darkPalette,
    black: BRAND.twilight,
    like: color.like,

    contrast_25: `hsl(${hues.primary}, 28%, ${dimScale[1]}%)`,
    contrast_50: `hsl(${hues.primary}, 28%, ${dimScale[2]}%)`,
    contrast_100: `hsl(${hues.primary}, 28%, ${dimScale[3]}%)`,
    contrast_200: `hsl(${hues.primary}, 28%, ${dimScale[4]}%)`,
    contrast_300: `hsl(${hues.primary}, 24%, ${dimScale[5]}%)`,
    contrast_400: `hsl(${hues.primary}, 24%, ${dimScale[6]}%)`,
    contrast_500: `hsl(${hues.primary}, 20%, ${dimScale[7]}%)`,
    contrast_600: `hsl(${hues.primary}, 20%, ${dimScale[8]}%)`,
    contrast_700: `hsl(${hues.primary}, 20%, ${dimScale[9]}%)`,
    contrast_800: `hsl(${hues.primary}, 20%, ${dimScale[10]}%)`,
    contrast_900: `hsl(${hues.primary}, 20%, ${dimScale[11]}%)`,
    contrast_950: `hsl(${hues.primary}, 20%, ${dimScale[12]}%)`,
    contrast_975: `hsl(${hues.primary}, 20%, ${dimScale[13]}%)`,

    primary_25: `hsl(320, 15%, ${dimScale[1]}%)`,
    primary_50: `hsl(320, 18%, ${dimScale[2]}%)`,
    primary_100: `hsl(320, 22%, ${dimScale[3]}%)`,
    primary_200: `hsl(320, 25%, ${dimScale[4]}%)`,
    primary_300: `hsl(320, 28%, ${dimScale[5]}%)`,
    primary_400: `hsl(320, 32%, ${dimScale[6]}%)`,
    primary_500: `hsl(320, 35%, ${dimScale[7]}%)`,
    primary_600: `hsl(320, 38%, ${dimScale[8]}%)`,
    primary_700: `hsl(320, 42%, ${dimScale[9]}%)`,
    primary_800: `hsl(320, 45%, ${dimScale[10]}%)`,
    primary_900: `hsl(320, 48%, ${dimScale[11]}%)`,
    primary_950: `hsl(320, 50%, ${dimScale[12]}%)`,
    primary_975: `hsl(320, 55%, ${dimScale[13]}%)`,

    positive_25: `hsl(${hues.positive}, 50%, ${dimScale[1]}%)`,
    positive_50: `hsl(${hues.positive}, 60%, ${dimScale[2]}%)`,
    positive_100: `hsl(${hues.positive}, 70%, ${dimScale[3]}%)`,
    positive_200: `hsl(${hues.positive}, 82%, ${dimScale[4]}%)`,
    positive_300: `hsl(${hues.positive}, 82%, ${dimScale[5]}%)`,
    positive_400: `hsl(${hues.positive}, 82%, ${dimScale[6]}%)`,
    positive_500: `hsl(${hues.positive}, 82%, ${dimScale[7]}%)`,
    positive_600: `hsl(${hues.positive}, 82%, ${dimScale[8]}%)`,
    positive_700: `hsl(${hues.positive}, 82%, ${dimScale[9]}%)`,
    positive_800: `hsl(${hues.positive}, 82%, ${dimScale[10]}%)`,
    positive_900: `hsl(${hues.positive}, 82%, ${dimScale[11]}%)`,
    positive_950: `hsl(${hues.positive}, 82%, ${dimScale[12]}%)`,
    positive_975: `hsl(${hues.positive}, 82%, ${dimScale[13]}%)`,

    negative_25: `hsl(${hues.negative}, 70%, ${dimScale[1]}%)`,
    negative_50: `hsl(${hues.negative}, 80%, ${dimScale[2]}%)`,
    negative_100: `hsl(${hues.negative}, 84%, ${dimScale[3]}%)`,
    negative_200: `hsl(${hues.negative}, 88%, ${dimScale[4]}%)`,
    negative_300: `hsl(${hues.negative}, 91%, ${dimScale[5]}%)`,
    negative_400: `hsl(${hues.negative}, 91%, ${dimScale[6]}%)`,
    negative_500: `hsl(${hues.negative}, 91%, ${dimScale[7]}%)`,
    negative_600: `hsl(${hues.negative}, 91%, ${dimScale[8]}%)`,
    negative_700: `hsl(${hues.negative}, 91%, ${dimScale[9]}%)`,
    negative_800: `hsl(${hues.negative}, 91%, ${dimScale[10]}%)`,
    negative_900: `hsl(${hues.negative}, 91%, ${dimScale[11]}%)`,
    negative_950: `hsl(${hues.negative}, 91%, ${dimScale[12]}%)`,
    negative_975: `hsl(${hues.negative}, 91%, ${dimScale[13]}%)`,
  } as const

  const light: Theme = {
    scheme: 'light',
    name: 'light',
    palette: lightPalette,
    atoms: {
      text: {
        color: lightPalette.black,
      },
      text_contrast_low: {
        color: lightPalette.contrast_400,
      },
      text_contrast_medium: {
        color: lightPalette.contrast_700,
      },
      text_contrast_high: {
        color: lightPalette.contrast_900,
      },
      text_inverted: {
        color: lightPalette.white,
      },
      bg: {
        backgroundColor: lightPalette.white,
      },
      bg_contrast_25: {
        backgroundColor: `hsl(${hues.primary}, 20%, ${defaultScale[13]}%)`,
      },
      bg_contrast_50: {
        backgroundColor: `hsl(${hues.primary}, 20%, ${defaultScale[12]}%)`,
      },
      bg_contrast_100: {
        backgroundColor: `hsl(${hues.primary}, 20%, ${defaultScale[11]}%)`,
      },
      bg_contrast_200: {
        backgroundColor: lightPalette.contrast_200,
      },
      bg_contrast_300: {
        backgroundColor: lightPalette.contrast_300,
      },
      bg_contrast_400: {
        backgroundColor: lightPalette.contrast_400,
      },
      bg_contrast_500: {
        backgroundColor: lightPalette.contrast_500,
      },
      bg_contrast_600: {
        backgroundColor: lightPalette.contrast_600,
      },
      bg_contrast_700: {
        backgroundColor: lightPalette.contrast_700,
      },
      bg_contrast_800: {
        backgroundColor: lightPalette.contrast_800,
      },
      bg_contrast_900: {
        backgroundColor: lightPalette.contrast_900,
      },
      bg_contrast_950: {
        backgroundColor: lightPalette.contrast_950,
      },
      bg_contrast_975: {
        backgroundColor: lightPalette.contrast_975,
      },
      border_contrast_low: {
        borderColor: lightPalette.contrast_100,
      },
      border_contrast_medium: {
        borderColor: lightPalette.contrast_200,
      },
      border_contrast_high: {
        borderColor: lightPalette.contrast_300,
      },
      shadow_sm: {
        ...atoms.shadow_sm,
        shadowColor: lightPalette.black,
      },
      shadow_md: {
        ...atoms.shadow_md,
        shadowColor: lightPalette.black,
      },
      shadow_lg: {
        ...atoms.shadow_lg,
        shadowColor: lightPalette.black,
      },
    },
  }

  const dark: Theme = {
    scheme: 'dark',
    name: 'dark',
    palette: darkPalette,
    atoms: {
      text: {
        color: darkPalette.white,
      },
      text_contrast_low: {
        color: darkPalette.contrast_400,
      },
      text_contrast_medium: {
        color: darkPalette.contrast_600,
      },
      text_contrast_high: {
        color: darkPalette.contrast_900,
      },
      text_inverted: {
        color: darkPalette.black,
      },
      bg: {
        backgroundColor: darkPalette.black,
      },
      bg_contrast_25: {
        backgroundColor: `hsl(${hues.primary}, 28%, ${defaultScale[1]}%)`,
      },
      bg_contrast_50: {
        backgroundColor: `hsl(${hues.primary}, 28%, ${defaultScale[2]}%)`,
      },
      bg_contrast_100: {
        backgroundColor: `hsl(${hues.primary}, 28%, ${defaultScale[3]}%)`,
      },
      bg_contrast_200: {
        backgroundColor: darkPalette.contrast_200,
      },
      bg_contrast_300: {
        backgroundColor: darkPalette.contrast_300,
      },
      bg_contrast_400: {
        backgroundColor: darkPalette.contrast_400,
      },
      bg_contrast_500: {
        backgroundColor: darkPalette.contrast_500,
      },
      bg_contrast_600: {
        backgroundColor: darkPalette.contrast_600,
      },
      bg_contrast_700: {
        backgroundColor: darkPalette.contrast_700,
      },
      bg_contrast_800: {
        backgroundColor: darkPalette.contrast_800,
      },
      bg_contrast_900: {
        backgroundColor: darkPalette.contrast_900,
      },
      bg_contrast_950: {
        backgroundColor: darkPalette.contrast_950,
      },
      bg_contrast_975: {
        backgroundColor: darkPalette.contrast_975,
      },
      border_contrast_low: {
        borderColor: darkPalette.contrast_100,
      },
      border_contrast_medium: {
        borderColor: darkPalette.contrast_200,
      },
      border_contrast_high: {
        borderColor: darkPalette.contrast_300,
      },
      shadow_sm: {
        ...atoms.shadow_sm,
        shadowOpacity: 0.7,
        shadowColor: color.trueBlack,
      },
      shadow_md: {
        ...atoms.shadow_md,
        shadowOpacity: 0.7,
        shadowColor: color.trueBlack,
      },
      shadow_lg: {
        ...atoms.shadow_lg,
        shadowOpacity: 0.7,
        shadowColor: color.trueBlack,
      },
    },
  }

  const dim: Theme = {
    ...dark,
    scheme: 'dark',
    name: 'dim',
    palette: dimPalette,
    atoms: {
      ...dark.atoms,
      text: {
        color: dimPalette.white,
      },
      text_contrast_low: {
        color: dimPalette.contrast_400,
      },
      text_contrast_medium: {
        color: dimPalette.contrast_600,
      },
      text_contrast_high: {
        color: dimPalette.contrast_900,
      },
      text_inverted: {
        color: dimPalette.black,
      },
      bg: {
        backgroundColor: dimPalette.black,
      },
      bg_contrast_25: {
        backgroundColor: dimPalette.contrast_25,
      },
      bg_contrast_50: {
        backgroundColor: dimPalette.contrast_50,
      },
      bg_contrast_100: {
        backgroundColor: dimPalette.contrast_100,
      },
      bg_contrast_200: {
        backgroundColor: dimPalette.contrast_200,
      },
      bg_contrast_300: {
        backgroundColor: dimPalette.contrast_300,
      },
      bg_contrast_400: {
        backgroundColor: dimPalette.contrast_400,
      },
      bg_contrast_500: {
        backgroundColor: dimPalette.contrast_500,
      },
      bg_contrast_600: {
        backgroundColor: dimPalette.contrast_600,
      },
      bg_contrast_700: {
        backgroundColor: dimPalette.contrast_700,
      },
      bg_contrast_800: {
        backgroundColor: dimPalette.contrast_800,
      },
      bg_contrast_900: {
        backgroundColor: dimPalette.contrast_900,
      },
      bg_contrast_950: {
        backgroundColor: dimPalette.contrast_950,
      },
      bg_contrast_975: {
        backgroundColor: dimPalette.contrast_975,
      },
      border_contrast_low: {
        borderColor: dimPalette.contrast_100,
      },
      border_contrast_medium: {
        borderColor: dimPalette.contrast_200,
      },
      border_contrast_high: {
        borderColor: dimPalette.contrast_300,
      },
      shadow_sm: {
        ...atoms.shadow_sm,
        shadowOpacity: 0.7,
        shadowColor: `hsl(320, 28%, 6%)`,
      },
      shadow_md: {
        ...atoms.shadow_md,
        shadowOpacity: 0.7,
        shadowColor: `hsl(320, 28%, 6%)`,
      },
      shadow_lg: {
        ...atoms.shadow_lg,
        shadowOpacity: 0.7,
        shadowColor: `hsl(320, 28%, 6%)`,
      },
    },
  }

  return {
    lightPalette,
    darkPalette,
    dimPalette,
    light,
    dark,
    dim,
  }
}
