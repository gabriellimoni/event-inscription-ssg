import getUserInscriptionData from '../../../lib/getUserInscriptionData'
import Link from 'next/link'
import Head from 'next/head'

import styles from '../../../styles/Ticket.module.css'

export default function EventInscription ({ userData }) {
    const { name, email, eventId, pictureUrl} = userData
    return (
        <>
            <Head>
                <title>Ticket do evento - {name}</title>
            </Head>
            <div className={styles.ticketWrapper}>
                <section className={styles.ticketContainer}>
                    <div className={styles.userData}>
                        <h1>{eventId.toUpperCase()}</h1>
                        <h2>{name}</h2>
                        <h3>{email}</h3>
                    </div>
                    
                    <p>

                    </p>

                    <img src={pictureUrl} width="300px"/>
                </section>

                <br/>
                <Link href="/"><a>Voltar</a></Link>
            </div>
        </>
    )
}

export async function getStaticProps (ctx) {
    const { params } = ctx
    const userEmail = params.userEmail

    const userData = await getUserInscriptionData(userEmail)
    
    return {
        props: {
            userData
        }
    }
}

export async function getStaticPaths () {
    return {
        paths: [],
        fallback: 'blocking',
    }
}