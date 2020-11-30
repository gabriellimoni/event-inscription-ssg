import Head from 'next/head'
import styles from '../styles/Home.module.css'

import RegisterForm from '../components/registerForm'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>LimoniConf - Inscreva-se!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Inscreva-se na LimoniConf</h1>
        <h2 className={styles.description}>
          Conferência de tecnologia mais amada de {' '}
          <a 
            href="https://pt.wikipedia.org/wiki/Dois_C%C3%B3rregos"
            target="_blank"
          >
            Dois Córregos - SP
          </a>
        </h2>

        <section className={styles.box}>
          <RegisterForm />
        </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="http://api.whatsapp.com/send?phone=+5514981135119"
          target="_blank"
        >
          Made by Gabriel Limoni
        </a>
      </footer>
    </div>
  )
}
