import React from "react";
import vtkImageMarchingCubes from "vtk.js/Sources/Filters/General/ImageMarchingCubes";
import vtkMapper from "vtk.js/Sources/Rendering/Core/Mapper";
import vtkActor from "vtk.js/Sources/Rendering/Core/Actor";

import { VTKRendererContext } from "./VTKRenderer";
import { ModelContext } from "./Model";

export const MarchingCubes: React.FC = ({ children }) => {
  const { renderWindow, renderer } = React.useContext(VTKRendererContext);
  const { modelData, modelReader } = React.useContext(ModelContext);
  const dataRange = modelData?.getPointData().getScalars().getRange();
  const [isoValue, setIsoValue] = React.useState<number>(
    dataRange ? (dataRange[0] + dataRange[1]) / 3 : 0
  );
  const [marchingCube, setMarchingCube] = React.useState<any>();

  React.useEffect(() => {
    if (!marchingCube || !renderWindow) {
      return;
    }
    marchingCube.setContourValue(isoValue);
    renderWindow.render();
  }, [isoValue, marchingCube, renderWindow]);

  React.useEffect(() => {
    if (
      renderWindow === null ||
      renderer === null ||
      modelData === null ||
      modelReader === null
    ) {
      return;
    }
    const dataRange = modelData.getPointData().getScalars().getRange();
    const firstIsoValue = (dataRange[0] + dataRange[1]) / 3;
    setIsoValue(firstIsoValue);
    const mapper = vtkMapper.newInstance();
    const marchingCube = vtkImageMarchingCubes.newInstance({
      contourValue: 0.0,
      computeNormals: true,
      mergePoints: true,
    });
    marchingCube.setInputConnection(modelReader.getOutputPort());
    marchingCube.setContourValue(firstIsoValue);
    mapper.setInputConnection(marchingCube.getOutputPort());

    const actor = vtkActor.newInstance();
    actor.setMapper(mapper);
    renderer.addActor(actor);
    renderer.resetCamera();
    renderWindow.render();
    setMarchingCube(marchingCube);

    return () => {
      renderer.removeActor(actor);
    };
  }, [modelData, modelReader, renderWindow, renderer]);

  return (
    <>
      {children}
      {dataRange ? (
        <input
          type="range"
          min={dataRange[0]}
          max={dataRange[1]}
          value={isoValue}
          style={{ position: "relative", zIndex: 9999 }}
          onChange={(e) => {
            setIsoValue(Number(e.target.value));
          }}
        />
      ) : null}
    </>
  );
};
