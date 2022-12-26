import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Result } from 'antd'

const About: React.FC = () => {
  const [search] = useSearchParams()
  const title = search.get('title') || '这是 About 组件'

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