import { Button, Container } from '@mantine/core'
import type { NextPage } from 'next'
import Nav from '../components/nav'
import Theme from '../styles/home.theme'

const Home: NextPage = () => {
  return (
    <div style={{background : Theme.primary, minWidth : "100vw", minHeight : "100vh"}}>
      <div style={{position : "absolute", left : 0}}>
        <Nav/>
      </div>
    </div>
  )
}

export default Home
