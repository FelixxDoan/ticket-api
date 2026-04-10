import { Router } from "express"
import { loginController, registerController } from "./auth.controller.js"

const r = Router()

r.post('/register', registerController)
r.post('/login', loginController)

export default r
