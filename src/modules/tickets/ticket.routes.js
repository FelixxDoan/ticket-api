import { Router } from "express"
import authenticate from './../../common/middlewares/authenticate.js';
import requireRole from "../../common/middlewares/role.js";
import { createTicketController, detailTicketController, listTicketController, assignTicketController, statusTicketController } from "./ticket.controller.js";

const r = Router()

r.post("/create", authenticate, requireRole(["customer"]), createTicketController)

r.get("/all", authenticate, listTicketController)
r.get("/:id", authenticate, detailTicketController)

r.patch("/:id/assign", authenticate, requireRole(["admin"]), assignTicketController)
r.patch("/:id/status", authenticate, requireRole(["staff", "admin"]), statusTicketController)


export default r