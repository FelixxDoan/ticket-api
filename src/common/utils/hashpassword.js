import bcrypt from 'bcrypt'
const saltRound = 10

export const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(saltRound)

    return await bcrypt.hash(password, salt)  
}

export const comparePass = async(password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword)
}

