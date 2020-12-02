import getUserInscriptionData from '../../../lib/getUserInscriptionData'

import Link from 'next/link'

export default function EventInscription ({ userData }) {
    const { name, email, eventId, pictureUrl} = userData
    return (
        <>
            <h1>{eventId.toUpperCase()}</h1>
            <h2>{name}</h2>
            <h3>{email}</h3>
            <img src={pictureUrl} width="300px"/>

            <br/>
            
            <Link href="/"><a>Voltar</a></Link>
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