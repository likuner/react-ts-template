import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Result } from 'antd'

const About: React.FC = () => {
  const { title = '🥤这是 About 组件' } = useParams()

  const navigate = useNavigate()

  return (
    <Result
      title={title}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>Back Home</Button>
      }
    />
  )
}

export default About