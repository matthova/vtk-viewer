import React from "react";
import vtkImageMarchingCubes from "vtk.js/Sources/Filters/General/ImageMarchingCubes";
import vtkMapper from "vtk.js/Sources/Rendering/Core/Mapper";
import vtkActor from "vtk.js/Sources/Rendering/Core/Actor";

import { VTKRendererContext } from "./VTKRenderer";
import { ModelContext } from "./Model";

export const MarchingCubes: React.FC<{ isoValue: number }> = ({ isoValue }) => {
  const { renderWindow, renderer } = React.useContext(VTKRendererContext);
  const { modelData, modelReader } = React.useContext(ModelContext);
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
    const mapper = vtkMapper.newInstance();
    const marchingCube = vtkImageMarchingCubes.newInstance({
      contourValue: 0.0,
      computeNormals: true,
      mergePoints: true,
    });
    marchingCube.setInputConnection(modelReader.getOutputPort());
    marchingCube.setContourValue(isoValue);
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
  }, [isoValue, modelData, modelReader, renderWindow, renderer]);

  return null;
};
