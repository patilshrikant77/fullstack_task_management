import React from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import Login from '../pages/Login'; // Adjust path as necessary
import Home from '../pages/Home'; // Adjust path as necessary
import Register from '../pages/Register'; // Adjust path as necessary
import Layout from '../components/Layout'; // Adjust path as necessary
import { PrivateRoute } from './PrivateRoute'; // Adjust path as necessary

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
     <PrivateRoute>
      <Layout>
          <Home />
       </Layout>
       </PrivateRoute>
    ),
  },
  {
    path: '/signin',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: '/signup',
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
];

const AppRoutes: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

export default AppRoutes;
