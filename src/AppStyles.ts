import { styled } from "./design-system";

export const Container = styled("div")`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Controls = styled("div")`
  flex: 0 0 300px;
  background: #f5f5f5;
`;

export const SliderContainer = styled("div")`
  display: flex;
  padding: 16px;
  align-items: center;
  > div:not(:last-child) {
    margin-right: 16px;
  }
`;

export const ControlLabel = styled("div")`
  flex: 0 0 auto;
`;
export const Slider = styled("input").attrs({ type: "range" })``;
