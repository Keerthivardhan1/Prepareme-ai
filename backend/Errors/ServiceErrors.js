
export class ServiceError extends Error {
    constructor({ msg ,  error }) {
        super(msg)
        this.msg = msg
        this.error = error
    }
}

