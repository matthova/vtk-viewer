import React from "react";
import "vtk.js/Sources/favicon";

import vtkFullScreenRenderWindow from "vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow";
import { Renderer } from "vtk.js/Sources/Rendering/Core/Renderer";
import { RenderWindow } from "vtk.js/Sources/Rendering/Core/RenderWindow";

type VTKRendererContextType = {
  renderWindow: RenderWindow | null;
  renderer: Renderer | null;
};

export const VTKRendererContext = React.createContext<VTKRendererContextType>({
  renderWindow: null,
  renderer: null,
});

export const VTKRenderer: React.FC = ({ children }) => {
  const [renderWindow, setRenderWindow] = React.useState<RenderWindow | null>(
    null
  );
  const [renderer, setRenderer] = React.useState<Renderer | null>(null);

  React.useEffect(() => {
    const fullScreenRenderWindow = vtkFullScreenRenderWindow.newInstance({
      background: [0, 0, 0],
    });

    const renderWindow = fullScreenRenderWindow.getRenderWindow();
    setRenderWindow(renderWindow);

    const renderer = fullScreenRenderWindow.getRenderer();
    setRenderer(renderer);
    renderer.getActiveCamera().set({ position: [1, 1, 0], viewUp: [0, 0, -1] });
  }, []);

  return (
    <VTKRendererContext.Provider value={{ renderer, renderWindow }}>
      {children}
    </VTKRendererContext.Provider>
  );
};
