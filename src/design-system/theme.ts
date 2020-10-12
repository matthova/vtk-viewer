import * as baseStyled from "styled-components";

export const {
  css,
  createGlobalStyle,
  keyframes,
  default: styled,
  ThemeProvider,
  ThemeContext,
} = baseStyled as baseStyled.ThemedStyledComponentsModule<Theme>;

const colors = {
  primary: 'blue',
  onPrimary: 'white',
  background: 'white',
  onBackground: 'black',
  surface: '#eeeeee',
  onSurface: 'black',
  error: 'red',
};

const typography = {
  heading0: css`
    font-family: roboto;
    font-size: 50px;
    font-weight: 400;
    line-height: 70px;
    letter-spacing: 2px;
  `,
  heading1: css`
    font-family: roboto;
    font-size: 46px;
    font-weight: 400;
    line-height: 54px;
    letter-spacing: 1.84px;
  `,
  heading2: css`
    font-family: roboto;
    font-size: 42px;
    font-weight: 400;
    line-height: 50px;
    letter-spacing: 1.68px;
  `,
  heading3: css`
    font-family: roboto;
    font-size: 38px;
    font-weight: 400;
    line-height: 44px;
    letter-spacing: 1.52px;
    margin-bottom: 20px;
  `,
  heading4: css`
    font-family: roboto;
    font-size: 34px;
    font-weight: 400;
    line-height: 40px;
    letter-spacing: 1.36px;
  `,
  heading5: css`
    font-family: roboto;
    font-size: 30px;
    font-weight: 400;
    line-height: 36px;
    letter-spacing: 1.2px;
  `,
  heading6: css`
    font-family: roboto;
    font-size: 26px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 1.04px;
  `,
  headingBold0: css`
    font-family: roboto;
    font-size: 50px;
    font-weight: 700;
    line-height: 70px;
    letter-spacing: 2px;
  `,
  headingBold1: css`
    font-family: roboto;
    font-size: 46px;
    font-weight: 700;
    line-height: 54px;
    letter-spacing: 1.84px;
  `,
  headingBold2: css`
    font-family: roboto;
    font-size: 42px;
    font-weight: 700;
    line-height: 50px;
    letter-spacing: 1.68px;
  `,
  headingBold3: css`
    font-family: roboto;
    font-size: 38px;
    font-weight: 700;
    line-height: 44px;
    letter-spacing: 1.52px;
  `,
  headingBold4: css`
    font-family: roboto;
    font-size: 34px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 1.36px;
  `,
  headingBold5: css`
    font-family: roboto;
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: 1.2px;
  `,
  headingBold6: css`
    font-family: roboto;
    font-size: 26px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 1.04px;
  `,
  paragraph0: css`
    font-family: roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 34px;
    letter-spacing: 2.2px;
  `,
  paragraph1: css`
    font-family: roboto;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 1.98px;
  `,
  paragraph2: css`
    font-family: roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 1.76px;
  `,
  paragraphBold0: css`
    font-family: roboto;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 2.2px;
  `,
  paragraphBold1: css`
    font-family: roboto;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 1.98px;
  `,
  paragraphBold2: css`
    font-family: roboto;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 1.76px;
  `,
  label0: css`
    font-family: roboto;
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0;
  `,
  label1: css`
    font-family: roboto;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0;
  `,
};

export type BreakpointObject = Record<
  "mobile" | "tablet" | "desktop",
  string | number
>;

export const breakpoints: BreakpointObject = {
  mobile: "0px",
  tablet: "768px",
  desktop: "1024px",
};

// using blank object for space to prevent using default styled-system space value
const space = {};

const zIndices = {
  body: 0,
  bodyLift: 1000,
  modal: 2000,
  modalLift: 3000,
};

export const theme = {
  breakpoints,
  colors,
  space,
  typography,
  zIndices,
};

// have to manually declare each key/val of theme type to prevent circular
// dependency in themed styled-components declaration
export type Theme = {
  breakpoints: typeof breakpoints;
  colors: typeof colors;
  space: typeof space;
  typography: typeof typography;
  zIndices: typeof zIndices;
};
