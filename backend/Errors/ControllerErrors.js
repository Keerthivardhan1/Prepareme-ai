
export class ControllerError extends Error {
    constructor({ msg ,  error }) {
        super(msg)
        this.msg = msg
        this.error = error
    }
}

