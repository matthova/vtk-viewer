import React from "react";

import * as S from "./SliderStyles";

export const Slider: React.FC<
  Pick<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "max" | "min" | "onChange" | "value" | "step"
  > & {
    enableInputField?: boolean;
    testID?: string;
  }
> = ({ max, min, onChange, value, enableInputField, step, testID }) => {
  return (
    <S.Container>
      <S.Range
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        data-testid={testID ? `${testID}-range` : undefined}
      />
      {enableInputField ? (
        <S.InputField
          data-testid={testID ? `${testID}-input` : undefined}
          value={value}
          onChange={onChange}
        />
      ) : null}
    </S.Container>
  );
};
