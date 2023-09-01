import React from 'react';

import { RouterProvider } from 'react-router-dom';
import router from 'routers';
import { GlobalStyles } from 'style/global';

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
