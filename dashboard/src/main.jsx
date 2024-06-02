import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Pages
import Index from './pages/index';

const router = createBrowserRouter([
  { path: '/', element: <Index /> },
  // ...
]);

createRoot(document.getElementById('root')).render(
  <div className='antialiased'>
    <RouterProvider router={router} />
  </div>
);
