import throwError from "./throwError.js"

const codes = {
    account: "ACC",
    billing: "BIL",
    technical: "TEC",
    general: "GEN"
}

const createTicketCode = (category) => {
    const prefix = codes[category]

    if(!prefix) throwError(400, "Invalid category")
    
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export default createTicketCode