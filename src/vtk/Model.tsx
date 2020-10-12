import React from 'react';
import vtkImageMarchingCubes from "vtk.js/Sources/Filters/General/ImageMarchingCubes";
import vtkHttpDataSetReader from "vtk.js/Sources/IO/Core/HttpDataSetReader";
import vtkMapper from "vtk.js/Sources/Rendering/Core/Mapper";
import vtkActor from "vtk.js/Sources/Rendering/Core/Actor";

import { VTKRendererContext } from './VTKRenderer';

type ModelContextType = {
  modelReader: any;
  modelData: any;
}

export const ModelContext = React.createContext<ModelContextType>({ modelReader: null, modelData: null})
export const Model: React.FC<{ url: string }> = ({ children, url }) => {
  const { renderWindow, renderer} = React.useContext(VTKRendererContext);
  const [modelReader] = React.useState<any>(vtkHttpDataSetReader.newInstance({ fetchGzip: true }));
  const [modelData, setModelData] = React.useState<any>(null);

  React.useEffect(() => {
    if (!renderWindow || !renderer) {
      return;
    }
  
    modelReader
      .setUrl(url, { loadData: true })
      .then(() => {
        const data = modelReader.getOutputData();
        setModelData(data);
      })
      .catch((e: any) => {
        console.error("Loading error", e);
      });
  }, [modelReader, renderWindow, renderer, url])

  return (
    <ModelContext.Provider value={{modelReader, modelData}}>{children}</ModelContext.Provider>
  )
}
