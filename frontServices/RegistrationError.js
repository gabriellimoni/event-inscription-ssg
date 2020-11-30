export default class RegistrationError extends Error {
    constructor (message='Error on register...', code='default') {
        super(message)
        this.code = code
    }
}