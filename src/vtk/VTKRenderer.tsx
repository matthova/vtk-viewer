import React from "react";
import "vtk.js/Sources/favicon";

import vtkGenericRenderWindow from "vtk.js/Sources/Rendering/Misc/GenericRenderWindow";
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
  const viewRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // @ts-ignore
    const genericRenderWindow = vtkGenericRenderWindow.newInstance({
      background: [0, 0, 0],
    });
    genericRenderWindow.setContainer(viewRef.current);
    // call resize once to fire a render with the proper resolution
    genericRenderWindow.resize();

    const renderWindow = genericRenderWindow.getRenderWindow();
    setRenderWindow(renderWindow);

    const renderer = genericRenderWindow.getRenderer();
    setRenderer(renderer);
    renderer.getActiveCamera().set({ position: [1, 1, 0], viewUp: [0, 0, -1] });
  }, []);

  return (
    <VTKRendererContext.Provider value={{ renderer, renderWindow }}>
      {children}
      <div ref={viewRef} style={{ width: "100%", height: "100%" }} />
    </VTKRendererContext.Provider>
  );
};
