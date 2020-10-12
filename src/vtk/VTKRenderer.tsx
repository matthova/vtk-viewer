import React from "react";
import "vtk.js/Sources/favicon";

import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import { Renderer } from 'vtk.js/Sources/Rendering/Core/Renderer';
import vtkHttpDataSetReader from 'vtk.js/Sources/IO/Core/HttpDataSetReader';
import vtkImageMarchingCubes from 'vtk.js/Sources/Filters/General/ImageMarchingCubes';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';

type VTKRendererContextType = {
  renderer: Renderer | null
}

export const VTKRendererContext = React.createContext<VTKRendererContextType>({ renderer: null});

export const VTKRenderer: React.FC = ({ children }) => {
  const [renderer, setRenderer] = React.useState<Renderer | null>(null);

  React.useEffect(() => {
    const fullScreenRenderWindow = vtkFullScreenRenderWindow.newInstance({
      background: [0, 0, 0],
    });
    
    const renderWindow = fullScreenRenderWindow.getRenderWindow();
    const renderer = fullScreenRenderWindow.getRenderer();
    setRenderer(renderer);
    renderer
      .getActiveCamera()
      .set({ position: [1, 1, 0], viewUp: [0, 0, -1] });

    
    // function updateIsoValue(e: any) {
    //   const isoValue = Number(e.target.value);
    //   marchingCube.setContourValue(isoValue);
    //   renderWindow.render();
    // }
 
    const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });

    reader
      .setUrl(`${process.env.PUBLIC_URL}/headsq.vti`, { loadData: true })
      .then(() => {
        const data = reader.getOutputData();
        const dataRange = data.getPointData().getScalars().getRange();
        const firstIsoValue = (dataRange[0] + dataRange[1]) / 3;

        // const el = document.querySelector(".isoValue");
        // if (!el ) {
        //   return;
        // }
        // el.setAttribute("min", dataRange[0]);
        // el.setAttribute("max", dataRange[1]);
        // el.setAttribute("value", String(firstIsoValue));
        // el.addEventListener("input", updateIsoValue);
        
        const mapper = vtkMapper.newInstance();
        const marchingCube = vtkImageMarchingCubes.newInstance({
          contourValue: 0.0,
          computeNormals: true,
          mergePoints: true,
        });
        marchingCube.setInputConnection(reader.getOutputPort());
        marchingCube.setContourValue(firstIsoValue);
        const actor = vtkActor.newInstance();
        actor.setMapper(mapper);
        mapper.setInputConnection(marchingCube.getOutputPort());    
        renderer.addActor(actor);
        renderer.resetCamera();
        renderWindow.render();
      }).catch((e: any) => {
        console.error('Loading error', e);
      })
  }, []);

  return (
    <VTKRendererContext.Provider value={{ renderer }}>
      {children}
    </VTKRendererContext.Provider>
  );
};
