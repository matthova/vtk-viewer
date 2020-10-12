import React from 'react';
import { DesignSystemProvider } from './design-system';
import { VTKRenderer } from './vtk/VTKRenderer';

function App() {
  return (
    <DesignSystemProvider>
      <div>hello world</div>
      <VTKRenderer />
    </DesignSystemProvider>
  );
}

export default App;
