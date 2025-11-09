import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";

import './index.css'
import App from './App.jsx'
import router from './layouts/routes.jsx';
import AuthProvider from './context/AuthProvider.jsx';




createRoot(document.getElementById('root')).render(
 
  <AuthProvider>
     <RouterProvider router={router} />
  </AuthProvider>
 
)
