import React from 'react'
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import Layout from '../views/Layout'
import Home from '../components/Home'
import About from '../components/About'
import ErrorPage from '../views/ErrorPage'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'home',
        element: <Navigate to='/' />
      },
      {
        path: 'about',
        element: <About />
      }
    ]
  }
]

export default createBrowserRouter(routes)