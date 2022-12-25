import React, { useState } from 'react'
import styles from './index.module.less'
import logo from '../../assets/logo.png'
import { Alert, Image, Input, Space } from 'antd'

export default function Demo() {
  const [msg, setMsg] = useState('Welcome to React Template!')

  const handleChange = (e: any) => {
    setMsg(e.target.value)
  }

  return (
    <Space direction='vertical' size='middle' className={styles.container}>
      <Image src={logo} width={100} />
      <Alert type='info' message={msg} />
      <Input value={msg} onChange={handleChange}/>
    </Space>
  )
}