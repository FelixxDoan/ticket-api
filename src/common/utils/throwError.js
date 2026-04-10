const throwError = (statusCode, message) => {
    const e = new Error(message)
    e.statusCode = statusCode
    throw e
}

export default throwError