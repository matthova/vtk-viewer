import { css, styled } from "./theme";

export const Container = styled("div")`
  display: flex;
  align-items: center;
  height: 36px;
  margin-top: 8px;
`;

const THUMB_SIZE = 24;
const SLIDER_SIZE = 2;
const thumbStyles = css`
  border: none;
  height: ${THUMB_SIZE}px;
  width: ${THUMB_SIZE}px;
  border-radius: 50%;
  background: black;
  cursor: pointer;
  margin-top: -${THUMB_SIZE / 2 - SLIDER_SIZE / 2}px;
  box-shadow: none;
`;

const trackStyles = css`
  width: 100%;
  height: ${SLIDER_SIZE}px;
  cursor: pointer;
  box-shadow: none;
  background: blue;
  border-radius: ${SLIDER_SIZE / 2}px;
  border: none;
`;

// Style tips from https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
export const Range = styled("input").attrs({ type: "range" })`
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%;
  height: 100%;
  background: transparent; /* Otherwise white in Chrome */
  &:focus {
    outline: none; /* Removes the blue border. */
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${thumbStyles}
  }
  &::-moz-range-thumb {
    ${thumbStyles}
  }
  &::-webkit-slider-runnable-track {
    ${trackStyles}
  }
  &::-moz-range-track {
    ${trackStyles}
  }
`;

export const InputField = styled("input").attrs({ type: "text" })`
  width: 84px;
  margin-left: 12px;
  padding: 12px;
  background: white;
  border-radius: 4px;
  border: 1px solid black;
  outline: none;
`;
