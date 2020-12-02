import RegistrationError from '../../frontServices/RegistrationError'
import styles from './registerForm.module.css'

import uploadFile from '../../frontServices/uploadFile'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function RegisterForm () {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    function FormOrLoading () {
        if (loading) {
            return (
                <h1>Enviando...</h1>
            )
        } else return Form()
    }

    function Form () {
        return (
            <form 
                className={styles.formContainer} 
                onSubmit={handleSendInscription}
            >
                <h3 className={styles.formTitle}>Inscreva-se</h3>
                
                <input 
                    className={styles.formInputText} 
                    type="text" 
                    required
                    placeholder="Seu nome"
                    name="name"
                />
                <input 
                    className={styles.formInputText} 
                    type="email" 
                    required
                    placeholder="Seu melhor e-mail"
                    name="email"
                />
                
                <input type="file" name="picture"/>
                
                <input type="submit"/>
            </form>
        )
    }

    async function handleSendInscription (event) {
        event.preventDefault()
        const { name, email, pictureFile } = getInputFromEvent(event)
        
        try {
            setLoading(true)

            const pictureUrl = await uploadFile({ 
                file: pictureFile, 
                key: email 
            })

            const registerPostData = {
                name, email, pictureUrl,
            }

            await doRegister(registerPostData)

            // todo handle success properly
            router.push(`/inscription/evento_unico/${email}`)
            alert('Registrado com sucesso!')
        } catch (error) {
            // guarantee that it has a error message issued from us
            if (error instanceof RegistrationError)
                alert(error.message)
            else // otherwise pops a generic error 
                alert('Error on register...')
        } finally {
            setLoading(false)
        }
    }

    function getInputFromEvent(event) {
        const name = event.target.name.value
        const email = event.target.email.value
        const pictureFile = event.target.picture.files[0]

        return { name, email, pictureFile }
    }

    async function doRegister(registerData) {
        const response = await fetch('/api/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerData),
        })
        if (response.status != 201) {
            const data = await response.json()
            switch (data.errorCode) {
                case 'user/already-registered':
                    throw new RegistrationError('Email already registered!', data.errorCode)
                default:
                    throw new RegistrationError()
            }
        }
    }

    return FormOrLoading()
}