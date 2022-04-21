import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'



const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <h1>drex</h1>
    </div>
  )
}

export default Home
