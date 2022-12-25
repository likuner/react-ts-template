import React, { useState } from 'react'
import styles from './index.module.less'
import logo from '../../assets/logo.png'
import { Alert, Input, Space } from 'antd'

export default function Demo() {
  const [msg, setMsg] = useState('Welcome to React Template!')

  const handleChange = (e: any) => {
    setMsg(e.target.value)
  }

  return (
    <Space direction='vertical' size='middle' className={styles.container}>
      <img src={logo} className={styles.imgBox} />
      <Alert type='info' message={msg} />
      <Input value={msg} onChange={handleChange}/>
    </Space>
  )
}