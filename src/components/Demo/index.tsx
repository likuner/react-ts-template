import React from 'react'
import styles from './index.module.less'
import logo from '../../assets/logo.png'

export default function Demo() {
  return <div className={styles.container}>
    hello
    <img src={logo} />
  </div>
}