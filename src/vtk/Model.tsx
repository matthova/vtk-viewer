import React from "react";
import vtkHttpDataSetReader from "vtk.js/Sources/IO/Core/HttpDataSetReader";

import { VTKRendererContext } from "./VTKRenderer";

type ModelContextType = {
  modelReader: any;
  modelData: any;
};

export const ModelContext = React.createContext<ModelContextType>({
  modelReader: null,
  modelData: null,
});

type ModelProps = {
  url: string;
  onData?: (data: any) => void;
};
export const Model: React.FC<ModelProps> = ({ children, onData, url }) => {
  const { renderWindow, renderer } = React.useContext(VTKRendererContext);
  const [modelReader] = React.useState<any>(
    vtkHttpDataSetReader.newInstance({ fetchGzip: true })
  );
  const [modelData, setModelData] = React.useState<any>(null);

  React.useEffect(() => {
    if (!renderWindow || !renderer) {
      return;
    }

    modelReader
      .setUrl(url, { loadData: true })
      .then(() => {
        const data = modelReader.getOutputData();
        onData?.(data);
        setModelData(data);
      })
      .catch((e: any) => {
        console.error("Loading error", e);
      });
  }, [modelReader, onData, renderWindow, renderer, url]);

  return (
    <ModelContext.Provider value={{ modelReader, modelData }}>
      {children}
    </ModelContext.Provider>
  );
};
