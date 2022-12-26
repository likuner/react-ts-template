import React from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import Demo from '../components/Demo'
import Layout from '../components/Layout'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        // path: 'about',
        element: <Demo />
      }
    ]
  }
]

export default createBrowserRouter(routes)