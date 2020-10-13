import React from "react";

import { DesignSystemProvider, Slider } from "./design-system";
import { VTKRenderer } from "./vtk/VTKRenderer";
import { Model } from "./vtk/Model";
import { MarchingCubes } from "./vtk/MarchingCubes";
import * as S from "./AppStyles";

function App() {
  const [isoValue, setIsoValue] = React.useState<number>(1200);

  return (
    <DesignSystemProvider>
      <S.Container>
        <S.Controls>
          <S.SliderContainer>
            <S.ControlLabel>ISO Value</S.ControlLabel>
            <Slider
              min={1}
              max={4000}
              value={isoValue}
              onChange={(e) => {
                setIsoValue(Number(e.target.value));
              }}
              enableInputField
            />
          </S.SliderContainer>
        </S.Controls>
        <VTKRenderer>
          <Model url={`${process.env.PUBLIC_URL}/headsq.vti`}>
            <MarchingCubes isoValue={isoValue} />
          </Model>
        </VTKRenderer>
      </S.Container>
    </DesignSystemProvider>
  );
}

export default App;
