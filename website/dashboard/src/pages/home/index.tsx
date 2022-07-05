import type { NextPage } from 'next'
import Nav from '../../components/nav'
import styles from '../../styles/page/view.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
        <Nav/>
    </div>
  )
}

export default Home
