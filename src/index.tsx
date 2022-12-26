import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'antd/dist/reset.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ConfigProvider
    locale={zhCN}
    theme={{
      token: {
        colorPrimary: '#00b96b'
      }
    }}
  >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ConfigProvider>
)
