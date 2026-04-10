const errCodes = {
    400: "VALIDATION_ERROR",
    401: "UNAUTHORIZED",
    403: "FORBIDDEN",
    404: "NOT_FOUND",
    429: "RATE_LIMITED",
    504: "UPSTREAM_TIMEOUT",
}

const handleErrorMiddleware = (err, req, res, next) => {
    const { requestId } = req
    let { statusCode, message } = err

    let errCode

    const fallback = (currentStatus) => {
        statusCode = currentStatus
        errCode = "INTERNAL_ERROR"
        message = 'unexpected server error'
    }

    errCode = errCodes[statusCode]
    if (errCode === undefined) fallback(500)
        
    if (!message) message = "resquest rejected"

    res.status(statusCode).json({ requestId, errCode, message, ok: false })

}

export default handleErrorMiddleware