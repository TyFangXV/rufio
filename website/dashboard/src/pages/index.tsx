import type { NextPage } from 'next'
import { useSelector } from 'react-redux'
import styles from '../styles/Home.module.css'
import { RootState } from '../utils/redux/store'

const Home: NextPage = () => {
  const {isSignedIn} = useSelector((state:RootState) => state.account.data);
  return (
    <div className={styles.container}>
      {

        isSignedIn ? (
          <button className={styles.btn}>View Dashboard</button>
        ) : (
          <button className={styles.btn} onClick={() => window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`)}>Sign In</button>
        )
      }
    </div>
  )
}

export default Home
