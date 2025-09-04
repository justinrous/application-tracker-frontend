import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router'

import Root from './Root/Root.tsx';
import App from './App/App.tsx';
import LoginPage from './LoginPage/LoginPage.tsx';
import Register from './Register/Register.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: App },
      { path: 'login', Component: LoginPage },
      { path: "register", Component: Register }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
