import React from 'react';
import { DesignSystemProvider } from './design-system';
import { VTKRenderer } from './vtk/VTKRenderer';
import { Model } from './vtk/Model';
import { MarchingCubes } from './vtk/MarchingCubes';

function App() {
  return (
    <DesignSystemProvider>
      <VTKRenderer>
        <Model url={`${process.env.PUBLIC_URL}/headsq.vti`}>
          <MarchingCubes />
        </Model>
      </VTKRenderer>
    </DesignSystemProvider>
  );
}

export default App;
