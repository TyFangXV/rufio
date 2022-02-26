import { Container } from '@mantine/core'
import type { NextPage } from 'next'
import Nav from '../components/nav'
import PopUp from '../components/popup'
import Theme from '../styles/home.theme'


const Home: NextPage = () => {
  return (
    <div style={{background : Theme.primary, minWidth : "100vw", minHeight : "100vh"}}>
      <div style={{position : "absolute", left : 0}}>
        <Nav/>
      </div>
      <Container id='popupModels'>
        <PopUp/>
      </Container>
    </div>
  )
}

export default Home
