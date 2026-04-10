import Ticket from './ticket.model.js';
import createTicketCode from './../../common/utils/createTicketCode.js';
import throwError from '../../common/utils/throwError.js';
import { checkRole } from '../users/user.service.js';
import { categoryArr, priorityArr, statusArr } from '../../common/utils/enumfield.js';

export const createTicketService = async (data, createdBy) => {

    const {
        title,
        description,
        category = "general",
        priority,
    } = data

    if (!title ||
        !description ||
        !createdBy) {
        throwError(400, "Missing fields")
    }


    if (!categoryArr.includes(category)) throwError(400, "Category invalid")

    if (!priorityArr.includes(priority)) throwError(400, "Priority invalid")

    const safeCategory = category?.trim().toLowerCase() || 'general'

    let code = createTicketCode(safeCategory)

    try {
        let newTicket = new Ticket({
            title,
            description,
            category: safeCategory,
            priority,
            createdBy,
            code
        })
        return await newTicket.save()
    } catch (error) {
        if (error.code === 11000) {
            code = createTicketCode(safeCategory)
            let newTicket = new Ticket({
                title,
                description,
                category: safeCategory,
                priority,
                createdBy,
                code
            })
            return await newTicket.save()
        }
        console.log(error)
        throw (error)
    }
}

export const detailTicketService = async (id, createdBy) => {
    if (!id || !createdBy) throwError(400, "Missing credential")

    const ticket = await Ticket.findOne({ _id: id, createdBy })

    if (!ticket) throwError(404, "Ticket not exist")

    return ticket
}

export const listTicketService = async (option, { limit, skip, safeCount }) => {

    if (safeCount === 1) {
        const [lstTicket, total] = await Promise.all([
            Ticket.find(option).skip(skip).limit(limit),
            Ticket.countDocuments(option)
        ])
        return { lstTicket, total }
    }

    return await Ticket.find(option).skip(skip).limit(limit)

}

export const assignTicketService = async ({ staffId, id }) => {

    if (!staffId) throwError(400, "Missing staff id")

    const isStaff = await checkRole(staffId, "staff")
    if (!isStaff) throwError(400, "Not a staff")

    if (!id) throwError(400, "Missing ticket id")

    const ticket = await Ticket.findOneAndUpdate(
        { _id: id },
        {
            $set:
            {
                assignedTo: staffId,
                status: "assigned"
            }
        })

    if (!ticket) throwError(404, "Ticket not exist")

    return { assignedTo: staffId, status: "assigned" }
}

export const statusTicketService = async (option) => {

    const { status, ...newOption } = option

    if (!newOption._id) throwError(400, "Missing id ticket")

    if (!statusArr.includes(status)) throwError(400, "Status invalid")

    const ticket = await Ticket.findOneAndUpdate(
        newOption,
        {
            $set: { status }
        }
    )

    if (!ticket) throwError(404, "Ticket not exist")

    return { status }
}

export const checkExistTicket = async (id) => {
    return await Ticket.findById(id)
}

export const checkBelongTicket = async (_id, user) => {

    if (user.role === "customer") {
        return await Ticket.findOne({ _id, createdBy: user.id })
    }

    if (user.role === "staff") {
        return await Ticket.findOne({ _id, assignedTo: user.id })
    }

    return true
}