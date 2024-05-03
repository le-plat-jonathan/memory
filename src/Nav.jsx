import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import App from './components/Game/App';

function Nav() {

  const router = createBrowserRouter([
  {
    path: '/',
    element: <Menu />
  },
  {
    path: '/App',
    element: <App />
  }
  ])

return (
  <div>
    <RouterProvider router={router}/>
  </div>
)
}

export default Nav;
