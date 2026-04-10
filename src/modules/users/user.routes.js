import { Router } from "express";
import authenticate from './../../common/middlewares/authenticate.js';
import { profileController } from "./user.controller.js";

const r = Router()

r.get("/me", authenticate, profileController)

export default r