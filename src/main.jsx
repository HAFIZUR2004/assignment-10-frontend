import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";

import './app.css';
import router from './layouts/routes.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import ThemeProvider from './context/ThemeProvider.jsx'; // <-- new

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        {({ darkMode, toggleTheme }) => (
          <RouterProvider router={router} context={{ darkMode, toggleTheme }} />
        )}
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
