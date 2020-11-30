import styles from './registerForm.module.css'

import uploadFile from '../../frontServices/uploadFile'
import { useState } from 'react'

export default function RegisterForm () {
    const [loading, setLoading] = useState(false)

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
            alert('Registrado com sucesso!')
        } catch (error) {
            // todo handle error properly
            alert(error.message)
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
        try {
            const response = await fetch('/api/sign-up', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerData),
            })
            if (response.status != 201) {
                console.log(response)
                throw new Error()
            }
        } catch (error) {
            // todo check for error types
            // - like "Mail already registered"...
            throw new Error('Failed to register, try again later...')
        }
    }

    return FormOrLoading()
}